from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'https://car-dashboard-ivory.vercel.app'], supports_credentials=True)

api_key = os.environ.get('W_API')

@app.route('/weather', methods=['GET'])
def get_weather():
    try:
        city = request.args.get('city', 'Bhubaneshwar')
        country = request.args.get('country', 'IN')
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city},{country}&appid={api_key}'

        response = requests.get(url)
        data = response.json()

        weather = {
            'temperature': round(data['main']['temp'] - 273),
            'condition': data['weather'][0]['main']
        }

        return jsonify(weather)
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to fetch weather data'}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=3001, debug=True)
