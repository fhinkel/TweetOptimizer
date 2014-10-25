'''
Created on Sep 29, 2014

@author: tim
'''
from flask import Flask
from flask import request
from flask import Response
from flask.ext.cors import CORS
import sys
import json

from crossdomain import crossdomain

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


base_path = sys.argv[0].replace('flask_API.py','')

@app.route('/hello', methods=['OPTIONS', 'GET', 'POST'])
@crossdomain(origin='*')
def getRecommendations():
    
    ret = {}
    ret['hello'] = 'Hello world!'

    dump = json.dumps(ret)     

    return dump

if __name__ == "__main__":
    app.debug = True
    app.run()
    
    