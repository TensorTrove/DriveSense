import cv2 as cv
import time
import os
from ultralytics import YOLO

model = YOLO('pothole_detector.pt')

video_source = 0
cap = cv.VideoCapture(video_source)
if not cap.isOpened():
    print(f"Error: Cannot open video source {video_source}")
    exit()

width = int(cap.get(cv.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv.CAP_PROP_FRAME_HEIGHT))
fps = int(cap.get(cv.CAP_PROP_FPS))

video_writer = cv.VideoWriter('result.avi', 
                              cv.VideoWriter_fourcc(*'MJPG'), 
                              fps, (width, height))

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture image")
        break
    
    results = model(frame)
    
    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = box.xyxy[0].tolist()
            conf = box.conf[0]
            cls = int(box.cls[0])
            label = f"{model.names[cls]} {conf:.2f}"
            
            cv.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv.putText(frame, label, (int(x1), int(y1) - 10), cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    cv.imshow('Pothole Detection', frame)
    
    video_writer.write(frame)
    
    if cv.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
video_writer.release()
cv.destroyAllWindows()
print("Annotated video saved as 'result.avi'")
