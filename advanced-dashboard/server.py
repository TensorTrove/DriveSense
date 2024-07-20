from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
from transformers import pipeline
import requests

app = Flask(__name__)
CORS(app)

recognizer = sr.Recognizer()
nlp = pipeline("question-answering", model="bert-large-uncased-whole-word-masking-finetuned-squad")

user_preferences = {
    "music": "rock",
    "navigation": "shortest route",
    "climate": "cool",
}

WEATHER_API_KEY = "39f58c559276ac165d4c6facf36dab3e"

@app.route('/command', methods=['POST'])
def command():
    data = request.json
    command = data['command']
    print(f"Received command: {command}") 
    
    context = "You can play music, navigate to home, or adjust the climate settings in your car."
    try:
        action = nlp(question=command, context=context)['answer']
        print(f"Determined action: {action}")
        
        if "play music" in action.lower():
            response = f"Playing {user_preferences['music']} music..."
        elif "navigate to home" in action.lower():
            response = f"Navigating to home via {user_preferences['navigation']}..."
        elif "adjust the climate" in action.lower():
            response = f"Setting climate to {user_preferences['climate']}..."
        else:
            response = "Command not recognized."
    except Exception as e:
        print(f"Error: {e}")
        response = "An error occurred while processing the command."
    
    return jsonify({"response": response})

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', 'San Francisco')
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()
    if response.status_code == 200:
        weather_data = {
            "temperature": data["main"]["temp"],
            "description": data["weather"][0]["description"],
            "icon": data["weather"][0]["icon"]
        }
        return jsonify(weather_data)
    else:
        return jsonify({"error": "City not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
