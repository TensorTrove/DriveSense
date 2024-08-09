![Logo](https://github.com/TensorTrove/innovent-project/blob/main/assets/Default_A_cuttingedge_DriveSense_AI_assistant_for_car_navigati_0.jpg)

# DriveSense: AI Assistant for Car Navigation with Obstacle Detection and Retrieval-Augmented Generation

**Advanced Smart Car Assistant System**


This project is an advanced smart car assistant system that combines conversational AI with video processing and machine learning capabilities. Here's a brief overview of how the system is designed and integrated:

#### Conversational AI Integration:

- Langchain and Llama-3.1 are used to handle natural language processing tasks. The assistant can interpret and respond to user commands, utilizing large language models to provide relevant information and perform actions.
- Hugging Face Models are incorporated for enhanced language understanding and generation.
#### Video Processing and Object Detection:

- YOLO (You Only Look Once) is employed for real-time object detection in video streams. The assistant can process video feeds to detect specific objects, such as potholes, and annotate the video with bounding boxes and labels.
- The system uses OpenCV to handle video capture, processing, and output. Detected objects are highlighted in the video, which is then saved for further analysis.
#### Model Training:

- Ultralytics YOLO is used for training custom object detection models. The system includes functionality to train a YOLO model on a specified dataset and save the trained model for future use.
- A dataset is extracted from a ZIP file and used to train the model, which is then utilized for object detection tasks in video processing.
#### API Integration:

- A FastAPI server provides an interface for interacting with the smart car assistant. Users can send commands to the server, such as requesting video processing or model training, and receive responses accordingly.

This system combines state-of-the-art AI and machine learning technologies with practical video processing capabilities to create a versatile and intelligent smart car assistant.


## Run Locally

Clone the project

```bash
  git clone https://github.com/TensorTrove/innovent-project
```

Go to the project directory

```bash
  cd innovent-project
```

Install dependencies

```bash
  pip install -r requirements.txt

```

Now run the jutyper Notebooks as usual

## Authors

- [@ankitdey-marsh](https://www.github.com/ankitdey-marsh)
- [@Terminal127](https://www.github.com/Terminal127)
- [@debjit-mandal](https://www.github.com/debjit-mandal)
- [@nilotpal-basu](https://www.github.com/nilotpal-basu)
- [@MrCelestial](https://www.github.com/MrCelestial)


## Badges

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
