# AttendEase | Premium Attendance Management System

AttendEase is a state-of-the-art, web-based attendance tracking system designed with a modern, glassmorphic interface. It provides an intuitive platform for employees to check in and out, while allowing administrators to track daily logs in real-time.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)
![Flask](https://img.shields.io/badge/flask-3.0%2B-green.svg)

## ✨ Features

- **Check-In/Check-Out System**: Simple, ID-based attendance logging.
- **Real-Time Data**: Live updates for current logs and daily statistics.
- **Premium Design**: Modern UI featuring Glassmorphism, smooth animations, and a responsive layout.
- **Today's Stats**: Instant overview of total present employees and currently active sessions.
- **RESTful API**: Clean backend architecture using Flask and SQLAlchemy.
- **Persistent Storage**: Utilizes SQLite for lightweight, file-based data management.

## 🚀 Tech Stack

- **Backend**: Python, Flask, Flask-SQLAlchemy
- **Frontend**: Vanilla JavaScript (ES6+), CSS3 (Glassmorphism), HTML5
- **Database**: SQLite
- **Typography & Icons**: Google Fonts (Outfit), FontAwesome

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/attencess.git
   cd attencess
   ```

2. **Create a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## 💻 Usage

1. **Run the application:**
   ```bash
   python app.py
   ```

2. **Access the web interface:**
   Open your browser and navigate to `http://127.0.0.1:5000`

3. **Recording Attendance:**
   - For **Check-In**: Enter your Employee ID and Full Name, then click "Check In".
   - For **Check-Out**: Enter your Employee ID and click "Check Out".

## 📂 Project Structure

```text
attencess/
├── app.py              # Main Flask application & Database models
├── attendance.db       # SQLite database file (auto-generated)
├── requirements.txt    # Python dependencies
├── static/
│   ├── css/
│   │   └── style.css   # Custom styles (Glassmorphism UI)
│   └── js/
│       └── script.js    # Frontend logic & API interactions
└── templates/
    └── index.html      # Main application dashboard
```

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
Designed with ❤️ by [Your Name]
