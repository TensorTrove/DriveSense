import tkinter as tk
from tkinter import ttk
import requests

class DashboardApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Dynamic Dashboard")
        self.root.geometry("400x300")

        self.speed = 60
        self.weather = "Sunny"
        self.route = "Home"
        self.time = 0

        self.create_widgets()
        self.update_dashboard()

    def create_widgets(self):
        self.speed_label = ttk.Label(self.root, text=f"Speed: {self.speed} km/h")
        self.speed_label.pack(pady=10)

        self.weather_label = ttk.Label(self.root, text=f"Weather: {self.weather}")
        self.weather_label.pack(pady=10)

        self.route_label = ttk.Label(self.root, text=f"Route: {self.route}")
        self.route_label.pack(pady=10)

        self.command_entry = ttk.Entry(self.root)
        self.command_entry.pack(pady=10)

        self.command_button = ttk.Button(self.root, text="Send Command", command=self.handle_command)
        self.command_button.pack(pady=10)

    def handle_command(self):
        command = self.command_entry.get()
        response = requests.post('http://localhost:5000/command', json={"command": command})
        result = response.json().get("response", "Command not recognized")
        print(result)

    def update_dashboard(self):
        self.time += 1
        self.speed += 5
        self.weather = "Sunny" if self.time % 2 == 0 else "Rainy"
        self.route = "Home" if self.time % 2 == 0 else "Work"

        self.speed_label.config(text=f"Speed: {self.speed} km/h")
        self.weather_label.config(text=f"Weather: {self.weather}")
        self.route_label.config(text=f"Route: {self.route}")

        self.root.after(5000, self.update_dashboard)

if __name__ == "__main__":
    root = tk.Tk()
    app = DashboardApp(root)
    root.mainloop()
