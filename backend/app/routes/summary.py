from flask import Blueprint, request, jsonify, session
from flask_login import current_user
import requests
import os
import datetime
from ..models import db
from ..models.user import User
# from ..functions.summariser import generate_summary

summary_bp = Blueprint("summary_bp", __name__)

# getAttribute('src') :- gives src as it is, like /image/url
# $(#img).src :- gives the complete image src. http://subdomain.domain/image/url

# with app.app_context():
#     if 'TOTAL_CREDITS_REMAINING' not in session:
#         session['TOTAL_CREDITS_REMAINING'] = 10


# cron job to set users credits to 10 each day
def reset_user_credits():
    """
    Resets the 'used_credits' of all verified users to 10.
    UPDATE users u SET u.used_credits = 10 WHERE u.email_verified = 1;
    """
    try:
        users_updated = User.query.filter_by(email_verified=True).update({"used_credits": current_user.total_credits})
        db.session.commit()
        print(f"[{datetime.datetime.now()}] Credits reset for {users_updated} verified users.")
    except Exception as e:
        db.session.rollback()
        print(f"[{datetime.datetime.now()}] Error resetting credits: {e}")


@summary_bp.route("/make_summary", methods=["POST"])
def make_summary():
    if not current_user.is_authenticated:
        return jsonify({'message':'please log in first to get summaries.'}), 401

    data = request.json or {}
    img_url:str = data.get("imgUrl") or ''
    text_to_summarise:str = data.get("textToSummarise") or ''

    imgTag:str = f'''<img id="ajax_img" src="{img_url}" alt="news article image" itemprop="image"><br/>'''

    # length check
    if len(text_to_summarise) < 200:
        return jsonify({"summary": f'{imgTag}{text_to_summarise}'}), 200

    if 'TOTAL_CREDITS_REMAINING' not in session:
        session['TOTAL_CREDITS_REMAINING'] = 10

    if int(session.get('TOTAL_CREDITS_REMAINING', 0)) <= 3:
        return jsonify({'error':'All credits expired for free tier, try 24Hrs Later.'}), 403

    if current_user.used_credits == current_user.total_credits:
        return jsonify({'message':'You have used all 10 of your credits. Your credits will be refilled in 24Hrs.'}), 403

    # making request
    url:str = "https://api.meaningcloud.com/summarization-1.0"
    payload={
        'key': os.getenv('MeaningCloud_SUMMARY_API_KEY'),
        'txt': text_to_summarise,
        'sentences': '5'
    }
    try:
        response = requests.post(url=url, data=payload, timeout=10)
    except Exception:
        print(Exception)
        return jsonify({'error':"api error."}), 500

    # response checking
    if response.status_code != 200:
        return jsonify({"error": "Summary Not Available, some error occurred. Sorry!."}), 500

    received_response = response.json()
    try:
        session['TOTAL_CREDITS_REMAINING'] = int(received_response['status']['remaining_credits'])
        if received_response['status']['msg'] != 'OK':
            return jsonify({'error':'Tokens Expired, summary not available.'}), 403
    except Exception as e:
        print(e)
        return jsonify({'error':'some error occurred.'}), 500

    summary = f'''{imgTag}{received_response['summary']}'''

    # increment users credits count
    try:
        current_user.used_credits += 1
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({'error':'some error occurred.'}), 500

    return jsonify({"summary": summary}), 200

'''
{
    'status':{
        'code': '0',
        'msg': 'OK',
        'credits': '1',
        'remaining_credits': '98'
    },
    'summary': 'Scientists have discovered a new ...'
}
'''
