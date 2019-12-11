import numpy as np
import cv2
import pybase64
import io
from PIL import Image

from flask import Flask
from flask import request
from flask import jsonify


def base64_to_cv2(image64):
    encoded = image64.split(',')[1] + '==='  # add 3 '=' for correct base64 padding
    decoded = pybase64.b64decode(encoded)
    return np.array(Image.open(io.BytesIO(decoded)))

def cv2_to_base64(image):
    ret, decoded = cv2.imencode('.png', image)
    encoded = pybase64.b64encode(decoded).decode('utf-8')
    return 'data:image/png;base64,' + encoded #+ '==='  # add 3 '=' for correct base64 padding


app = Flask(__name__)

@app.route('/py_api', methods=['POST'])
def test():
    image64 = request.get_json()['image64']
    cv2_img = base64_to_cv2(image64)
    cv2_img_gray = cv2.cvtColor(cv2_img, cv2.COLOR_RGB2GRAY)
    image64_gray = cv2_to_base64(cv2_img_gray)
    return jsonify(
        image64 = image64_gray
    )

if __name__ == "__main__":
    app.run(host='localhost', port=5000)
