import os
from datetime import datetime
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Use relative path for SQLite database
db_path = os.path.join(os.path.dirname(__file__), 'attendance.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    check_in = db.Column(db.DateTime, default=datetime.now)
    check_out = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'name': self.name,
            'check_in': self.check_in.strftime('%Y-%m-%d %H:%M:%S') if self.check_in else None,
            'check_out': self.check_out.strftime('%Y-%m-%d %H:%M:%S') if self.check_out else None,
        }

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/attendance', methods=['GET'])
def get_attendance():
    # Get last 50 records
    records = Attendance.query.order_by(Attendance.check_in.desc()).limit(50).all()
    return jsonify([record.to_dict() for record in records])

@app.route('/api/check-in', methods=['POST'])
def check_in():
    data = request.json
    employee_id = data.get('employee_id')
    name = data.get('name')
    
    if not employee_id or not name:
        return jsonify({'status': 'error', 'message': 'ID and Name are required.'}), 400

    # Check if already checked in
    active_record = Attendance.query.filter_by(employee_id=employee_id, check_out=None).first()
    if active_record:
        return jsonify({'status': 'error', 'message': f'{name} is already checked in.'}), 400

    new_record = Attendance(employee_id=employee_id, name=name, check_in=datetime.now())
    db.session.add(new_record)
    db.session.commit()
    
    return jsonify({
        'status': 'success', 
        'message': f'Welcome back, {name}! Checked in at {new_record.check_in.strftime("%H:%M:%S")}',
        'record': new_record.to_dict()
    })

@app.route('/api/check-out', methods=['POST'])
def check_out():
    data = request.json
    employee_id = data.get('employee_id')
    
    if not employee_id:
        return jsonify({'status': 'error', 'message': 'Employee ID is required.'}), 400
    
    record = Attendance.query.filter_by(employee_id=employee_id, check_out=None).order_by(Attendance.check_in.desc()).first()
    if record:
        record.check_out = datetime.now()
        db.session.commit()
        return jsonify({
            'status': 'success', 
            'message': f'Goodbye, {record.name}! Checked out at {record.check_out.strftime("%H:%M:%S")}',
            'record': record.to_dict()
        })
    
    return jsonify({'status': 'error', 'message': 'No active check-in session found for this ID.'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
