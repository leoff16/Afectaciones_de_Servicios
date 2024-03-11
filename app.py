from flask import Flask, request, jsonify, render_template
import sqlite3
from datetime import datetime

app = Flask(__name__)

# Conectar a la base de datos SQLite3
conn = sqlite3.connect('data.db', check_same_thread=False)
cursor = conn.cursor()

# Crear la tabla si no existe
cursor.execute('''
    CREATE TABLE IF NOT EXISTS kpi_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        panel TEXT,
        country TEXT,
        bank TEXT,
        gmt_time TEXT,
        action TEXT
    )
''')
conn.commit()

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/send_data', methods=['POST'])
def send_data():
    data = request.get_json()
    print("Recibido:", data)
 #   data = request.json
    panel = data['panel']
    country = data['country']
    bank = data['bank']
    gmt_time = data['gmtTime']
    action = data.get('action', 'AFECTACION')  # Si no se proporciona, se asume 'AFECTACION'

    # Insertar datos en la base de datos
    cursor.execute('''
        INSERT INTO kpi_data (panel, country, bank, gmt_time, action)
        VALUES (?, ?, ?, ?, ?)
    ''', (panel, country, bank, gmt_time, action))
    conn.commit()

    return jsonify({'message': 'Data received and stored successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
