from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
from transformers import pipeline

app = Flask(__name__)
CORS(app)

recognizer = sr.Recognizer()
nlp = pipeline("question-answering", model="bert-large-uncased-whole-word-masking-finetuned-squad")

user_preferences = {
    "music": "rock",
    "navigation": "shortest route",
    "climate": "cool"
}

@app.route('/command', methods=['POST'])
def command():
    data = request.json
    command = data['command']
    
    context = "You can play music, navigate to home, or adjust the climate settings in your car."
    action = nlp(question=command, context=context)['answer']
    
    if "play music" in action.lower():
        response = f"Playing {user_preferences['music']} music..."
    elif "navigate to home" in action.lower():
        response = f"Navigating to home via {user_preferences['navigation']}..."
    elif "adjust the climate" in action.lower():
        response = f"Setting climate to {user_preferences['climate']}..."
    else:
        response = "Command not recognized."
    
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
