import tkinter as tk
from tkinter import ttk
import requests
from PIL import Image, ImageTk
from io import BytesIO
import threading

class DashboardApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Dynamic Dashboard")
        self.root.geometry("800x600")
        self.root.config(bg="#2C3E50")

        self.speed = 60
        self.weather = "Sunny"
        self.route = "Home"
        self.time = 0

        self.create_widgets()
        self.update_dashboard()
        self.update_weather()

    def create_widgets(self):
        style = ttk.Style()
        style.configure("TLabel", background="#2C3E50", foreground="white", font=("Helvetica", 16))
        style.configure("TFrame", background="#2C3E50")
        style.configure("TButton", font=("Helvetica", 14))

        self.dashboard_frame = ttk.Frame(self.root)
        self.dashboard_frame.pack(pady=20)

        self.speed_label = ttk.Label(self.dashboard_frame, text=f"Speed: {self.speed} km/h")
        self.speed_label.grid(row=0, column=0, padx=20, pady=10)

        self.weather_frame = ttk.Frame(self.dashboard_frame)
        self.weather_frame.grid(row=0, column=1, padx=20, pady=10)
        self.weather_icon_label = ttk.Label(self.weather_frame)
        self.weather_icon_label.grid(row=0, column=0, padx=5)
        self.weather_label = ttk.Label(self.weather_frame, text=f"Weather: {self.weather}")
        self.weather_label.grid(row=0, column=1, padx=5)

        self.route_label = ttk.Label(self.dashboard_frame, text=f"Route: {self.route}")
        self.route_label.grid(row=0, column=2, padx=20, pady=10)

        self.command_entry = ttk.Entry(self.root, font=("Helvetica", 14))
        self.command_entry.pack(pady=10)

        self.command_button = ttk.Button(self.root, text="Send Command", command=self.handle_command)
        self.command_button.pack(pady=10)

        self.feedback_label = ttk.Label(self.root, text="", font=("Helvetica", 14), background="#2C3E50", foreground="yellow")
        self.feedback_label.pack(pady=10)

    def handle_command(self):
        command = self.command_entry.get()
        try:
            response = requests.post('http://localhost:5000/command', json={"command": command})
            print(response.text)
            result = response.json().get("response", "Command not recognized")
            self.feedback_label.config(text=result)
        except requests.exceptions.RequestException as e:
            self.feedback_label.config(text=f"Error: {e}")
        except ValueError:
            self.feedback_label.config(text="Error decoding server response")

    def update_dashboard(self):
        self.time += 1
        self.speed += 5
        self.weather = "Sunny" if self.time % 2 == 0 else "Rainy"
        self.route = "Home" if self.time % 2 == 0 else "Work"

        self.speed_label.config(text=f"Speed: {self.speed} km/h")
        self.weather_label.config(text=f"Weather: {self.weather}")
        self.route_label.config(text=f"Route: {self.route}")

        self.root.after(5000, self.update_dashboard)

    def update_weather(self):
        def fetch_weather():
            try:
                response = requests.get('http://localhost:5000/weather?city=San Francisco')
                if response.status_code == 200:
                    weather_data = response.json()
                    icon_url = f"http://openweathermap.org/img/wn/{weather_data['icon']}@2x.png"
                    icon_response = requests.get(icon_url)
                    icon_image = Image.open(BytesIO(icon_response.content))
                    icon_photo = ImageTk.PhotoImage(icon_image)
                    self.weather_icon_label.config(image=icon_photo)
                    self.weather_icon_label.image = icon_photo
                    self.weather_label.config(text=f"Weather: {weather_data['description']} ({weather_data['temperature']}°C)")
            except requests.exceptions.RequestException as e:
                self.weather_label.config(text=f"Error: {e}")

        threading.Thread(target=fetch_weather).start()
        self.root.after(60000, self.update_weather)

if __name__ == "__main__":
    root = tk.Tk()
    app = DashboardApp(root)
    root.mainloop()
