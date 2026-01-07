from flask import Blueprint, request, jsonify, current_app
import openai
import re

summary_api_bp = Blueprint("summary_api_bp", __name__)

def clean_summary(text: str) -> str:
    """
    Optional: Removes conversational filler if the model gets too chatty.
    e.g., "Here is a summary of the text: [Actual Summary]" -> "[Actual Summary]"
    """
    if not text:
        return ""
    # Remove leading "Here is a summary..." patterns
    pattern = r"^(Here is (a|the) summary.*?:\s*)"
    return re.sub(pattern, "", text, flags=re.IGNORECASE | re.DOTALL).strip()

def ask_groq(content: str, model_name: str = "llama-3.1-8b-instant"):
    print(f"...[AI] Thinking (Groq: {model_name})...")

    GROQ_API_KEY = current_app.config.get('GROQ_API_KEY')
    if not GROQ_API_KEY:
        print("  [!] Groq API Key missing in Flask config.")
        return None

    client = openai.OpenAI(
        base_url="https://api.groq.com/openai/v1",
        api_key=GROQ_API_KEY
    )

    # Engineered prompt for summarization
    system_instruction = (
        "You are an expert editor. You will be provided with an article or text content. "
        "Your task is to create a concise, bulleted summary of the key points. "
        "Do not include conversational filler like 'Here is the summary'. "
        "Just provide the summary directly."
    )

    prompt = f"""
    Please summarize the following content:

    {content}
    """

    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3, # Low temp for factual consistency
            max_tokens=1024
        )

        raw_summary = response.choices[0].message.content
        return clean_summary(raw_summary)

    except Exception as e:
        print(f"    [!] Groq Generation Failed: {e}")
        return None


@summary_api_bp.route("/article/summary", methods=["POST"])
def make_summary():
    # 1. Validate Request Data
    data = request.get_json()
    if not data or 'content' not in data:
        return jsonify({"error": "Missing 'content' field in JSON payload"}), 400

    content = data.get('content')

    # 2. Check for empty content
    if not content or len(content.strip()) < 200:
        return jsonify({"error": "Content is too short to summarize"}), 400

    # 3. Call AI Service
    summary = ask_groq(content)

    # 4. Handle External API Failures
    if summary is None:
        return jsonify({"error": "Failed to generate summary via Groq provider"}), 502

    # 5. Success
    return jsonify({
        "status": "success",
        "model_used": "llama-3.1-8b-instant",
        "summary": summary
    }), 200
