from flask import Flask, render_template, request, redirect, url_for,send_file, Response, jsonify
import os
import base64
import cv2
import io
from io import BytesIO
import numpy as np
from PIL import Image

app = Flask(__name__, template_folder='./templates')
app.config['UPLOAD_FOLDER'] = 'images'

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/upfile')
def upfile():
    return render_template('upfile.html')

@app.route('/upfile', methods=['POST'])
def process_button():
    # Xử lý dữ liệu ở đây
    return render_template('upfile.html')

def process_image(file):
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    image = Image.open(filepath)
    img_resized = image.resize((400,300))
    w,h = img_resized.size
    buffer = BytesIO()
    img_resized.save(buffer, format='JPEG')
    encoded_image = base64.b64encode(buffer.getvalue()).decode('utf-8')
    '''
        informations to dict
        {'id_number': [[x1,  y1, x2, y2],id_number, confidence_score], ....}
    '''
    id_number = [[0, 0, 40, 40],'12312454353423423423423', 99]
    information_car = {'feature-id-number': id_number}
    return encoded_image, information_car

@app.route('/upload_file', methods=['POST'])
def upload_file():
    if 'myImage' in request.files and request.files['myImage']:
        file = request.files['myImage']
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        # Xử lý ảnh ở đây
        processed_image, information_car = process_image(file)
        # Trả về ảnh đã xử lý

        return jsonify({'image': processed_image, 'informations': information_car})
    else:
        return render_template('upfile.html')

if __name__ == '__main__':
    app.run(port=5001)