# AttendEase | Premium Attendance & Salary Management System

AttendEase is a state-of-the-art, web-based attendance and salary tracking system designed with a modern, glassmorphic interface. It provides an intuitive platform for employees to manage their work logs and real-time earnings.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)
![Flask](https://img.shields.io/badge/flask-3.0%2B-green.svg)

## ✨ Features

- **Check-In/Check-Out System**: Simple, ID-based attendance logging.
- **Automated Salary Calculation**: Pro-rated salary tracking based on precise working hours.
- **Real-Time Data**: Live updates for logs, daily statistics, and current earnings.
- **Premium Design**: Modern UI featuring Glassmorphism, smooth animations, and a responsive layout.
- **Today's Stats**: Instant overview of total present employees and currently active sessions.
- **RESTful API**: Clean backend architecture using Flask and SQLAlchemy.
- **Persistent Storage**: Utilizes SQLite for lightweight, file-based data management.

## 💰 Salary Logic

The system automatically calculates earnings based on the following standard:
- **Monthly Base Salary**: RS
- **Work Day**: 9:00 AM — 6:00 PM (9 Required Hours)
- **Calculation**: Earnings are calculated per second of logged time using a pro-rated hourly rate derived from a 30-day month.

## 🚀 Tech Stack

- **Backend**: Python, Flask, Flask-SQLAlchemy
- **Frontend**:  JavaScript , CSS3 , HTML5
- **Database**: SQLite
- **Typography & Icons**: Google Fonts (Outfit), FontAwesome

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/attencess.git
   cd attencess
   ```

2. **Install dependencies:**
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

3. **Actions:**
   - **Check-In**: Enter Employee ID and Full Name, then click "Check In".
   - **Check-Out**: Enter Employee ID and click "Check Out".
   - **Check Salary**: Enter Employee ID in the Salary Calculator card to see total hours and pro-rated earnings.

## 📂 Project Structure

```text
attencess/
├── app.py              # Main Flask application, API endpoints & Models
├── attendance.db       # SQLite database file (auto-generated)
├── requirements.txt    # Python dependencies
├── static/
│   ├── css/
│   │   └── style.css   # Custom styles (Glassmorphism UI)
│   └── js/
│       └── script.js    # Frontend logic & Salary calculation UI
└── templates/
    └── index.html      # Main application dashboard
```


