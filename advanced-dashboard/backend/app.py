from flask import Flask, send_from_directory, request, jsonify
import joblib
import pandas as pd
import requests

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')

model = joblib.load('traffic_model.pkl')

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/command', methods=['POST'])
def command():
    data = request.get_json()
    command = data.get('command')
    response = f"Received command: {command}"
    return jsonify({"response": response})

@app.route('/weather')
def weather():
    latitude = request.args.get('lat')
    longitude = request.args.get('lon')
    api_key = '39f58c559276ac165d4c6facf36dab3e'
    url = f'http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}&units=metric'
    weather_data = requests.get(url).json()
    return jsonify(weather_data)

@app.route('/predict_traffic', methods=['POST'])
def predict_traffic():
    data = request.get_json()
    time_of_day = data.get('time_of_day')
    df = pd.DataFrame({'time_of_day': [time_of_day]})
    prediction = model.predict(df)[0]
    return jsonify({'traffic_density': prediction})

if __name__ == "__main__":
    app.run(debug=True, port=8080)