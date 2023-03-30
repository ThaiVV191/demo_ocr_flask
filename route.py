from flask import Flask, render_template, request, redirect, url_for,send_file, Response, jsonify
from flask_cors import CORS
import os
import base64
import cv2
import io
from io import BytesIO
import numpy as np
from PIL import Image
import time

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'images'
CORS(app)
def process_image(file):
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    image = Image.open(filepath).convert('RGB')
    img_resized = image.resize((400,300))
    w,h = img_resized.size
    buffer = BytesIO()
    img_resized.save(buffer, format='JPEG')
    encoded_image = base64.b64encode(buffer.getvalue()).decode('utf-8')
    '''
        informations to dict
        {'id_number': [[x1,  y1, x2, y2],id_number, confidence_score], ....}
    '''
    time.sleep(10)
    id_number = [[0, 0, 40, 40],'12312454353423423423423', 99]
    information_car = {'feature-id-number': id_number, }
    return encoded_image, information_car

@app.route("/", methods=['POST'])
def upload_file():
        if 'myImage' in request.files and request.files['myImage']:
            file = request.files['myImage']
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
            # Xử lý ảnh ở đây
            processed_image, information_car = process_image(file)
            print(information_car)
            # Trả về ảnh đã xử lý

            return jsonify({'image': processed_image, 'informations': information_car})

if __name__ == '__main__':
    app.run(debug=True)
