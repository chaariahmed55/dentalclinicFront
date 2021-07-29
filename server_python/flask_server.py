from flask import Flask , request
from werkzeug.utils import secure_filename

import os
import random
import string

UPLOAD_FOLDER_LOGOS = './uploads/logos'
UPLOAD_FOLDER_PDFS = './uploads/pdfs'
URL_SERVER = 'http://127.0.0.1:5000'

app = Flask(__name__ , static_folder="./uploads")
app.config['UPLOAD_FOLDER_LOGOS'] = UPLOAD_FOLDER_LOGOS
app.config['UPLOAD_FOLDER_PDFS'] = UPLOAD_FOLDER_PDFS

# upload logos
@app.route('/upload', methods = ['POST'])
def upload_logo():
    # URL_SERVER = request.base_url
        # file = request.files[]
    if request.method == 'POST':
        file = request.files['file']
        file_name = f'{get_random_string(50)}.png'
        file.save(os.path.join(app.config['UPLOAD_FOLDER_LOGOS'], file_name))
        return str(f'{URL_SERVER}uploads/logos/{file_name}')


# upload pdfs
@app.route('/upload_pdf', methods = ['POST'])
def upload_pdf():
    # URL_SERVER = request.base_url
    if request.method == 'POST':
        # file = request.files[]
        file = request.files['file']
        file_name = f'{get_random_string(50)}.pdf'
        file.save(os.path.join(app.config['UPLOAD_FOLDER_PDFS'], file_name))
        return str(f'{URL_SERVER}uploads/pdfs/{file_name}')


# generate random file name 
def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

# to run server 
# 
# export FLASK_APP=flask_server
# export FLASK_ENV=development
# flask run