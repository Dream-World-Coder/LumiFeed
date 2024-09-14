from transformers import PegasusForConditionalGeneration, PegasusTokenizer

# Load the tokenizer and model
model_name = "google/pegasus-xsum"
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name)

text = """
A migrant worker in Kerala was found to be living in an abandoned dog kennel in the compound of a businessman, prompting the state Labour Department on Monday to order a probe.
According to officials, Shyam Sunder from West Bengal has been living in the dog kennel in Ernakulam district’s Pravam town for the last three months as he wanted to save on rent.
Action against the house owner could not be initiated, department officials said, as he had not forced Sunder to live in the kennel, which was converted into a small room. A few other migrant workers are living in another building in the same compound.
Sunder, who has been in Kerala for the last four years, had earlier lived in a nearby rented house.
An official at the Ernakulam district labour office, who looked into the issue, said the migrant worker opted for the kennel to cut the cost of rent. “He paid Rs 500 a month to live in the kennel, which had a grilled door. Earlier, he was at another house nearby, where he was paying Rs 3,000 a month as rent… Hence, this kennel looked attractive for him,” the official said.
“The Labour Department cannot initiate any action against the house owner. We will recommend that the local administration look into the matter if it involves violations with regard to giving buildings on rent,” sources said.
Piravom Municipality vice-chairman K P Salim said that after the issue came up in the media, the migrant worker was moved to another premises. “We have come to know that the migrant worker wanted the kennel premises as he cannot afford to pay higher rent. There are other migrant workers living in another building in the same compound for a rent of Rs 2,500 per head a month. Nobody forced him to stay in the kennel,” he said.
"""


def generate_summary(text):
    # tokens = tokenizer(text, truncation=True, padding="longest", return_tensors="pt")
    # summary_ids = model.generate(
    #     tokens.input_ids,
    #     max_length=300,
    #     min_length=125,
    #     length_penalty=2.0,
    #     num_beams=4,
    #     early_stopping=True,
    # )
    # summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    # return summary
    pass


# Tokenize the input text
tokens = tokenizer(text, truncation=True, padding="longest", return_tensors="pt")
if __name__ == "__main__":
    # Generate summary
    summary_ids = model.generate(
        tokens.input_ids,
        max_length=300,
        min_length=125,
        length_penalty=2.0,
        num_beams=4,
        early_stopping=True,
    )
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    print(f"{text=}", "\n\n\n")
    print(f"{summary=}")


"""
Some weights of PegasusForConditionalGeneration were not initialized from the model checkpoint at google/pegasus-xsum and are newly initialized: ['model.decoder.embed_positions.weight', 'model.encoder.embed_positions.weight']
You should probably TRAIN this model on a down-stream task to be able to use it for predictions and inference.
"""
