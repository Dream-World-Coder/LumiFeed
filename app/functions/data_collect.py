'''

@app.before_request
def before_request():
    g.start_time = time.time()
    session['start_time'] = g.start_time
    session['ip_address'] = request.remote_addr
    session['user_agent'] = request.headers.get('User-Agent')
    session['device_type'] = get_device_type(session['user_agent'])


@app.after_request
def after_request(response):
    duration = time.time() - session['start_time']
    session['duration'] = duration
    session['end_time'] = time.time()
    session['active_time'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    user_data = {
        'ip_address': session.get('ip_address'),
        'device_type': session.get('device_type'),
        'active_time': session.get('active_time'),
        'duration': session.get('duration'),
        'start_time': session.get('start_time'),
        'end_time': session.get('end_time'),
    }
    write_to_csv(user_data)
    return response


'''

import user_agents
import os
import csv

def get_device_type(user_agent_string):
    user_agent = user_agents.parse(user_agent_string)
    if user_agent.is_mobile:
        return "Mobile"
    elif user_agent.is_tablet:
        return "Tablet"
    elif user_agent.is_pc:
        return "PC"
    else:
        return "Other"


def write_to_csv(user_data):
    file_exists = os.path.isfile('user_data.csv')
    with open('user_data.csv', mode='a', newline='') as file:
        fieldnames = ['ip_address', 'device_type', 'active_time', 'duration', 'start_time', 'end_time']
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        if not file_exists:
            writer.writeheader()  # file doesn't exist yet, write a header

        writer.writerow(user_data)

