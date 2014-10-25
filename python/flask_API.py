'''
Created on Sep 29, 2014

@author: tim
'''
from flask import Flask
from flask import request
from flask import Response
from flask.ext.cors import CORS
from relation_calculator import Relation_Calculator
import sys
import json

from crossdomain import crossdomain

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

base_path = sys.argv[0].replace('flask_API.py','')

rel = Relation_Calculator()

@app.route('/relatedhashtags', methods=['OPTIONS', 'GET', 'POST'])
@crossdomain(origin='*')
def getRelatedHashtags():    
    global rel
    jsondata = request.get_json(force=True)
    hashtag = jsondata['term']

    keywords = rel.get_keywords(hashtag, searchtype = 0)
    dictKeywords = {'terms' : keywords}

    return Response(json.dumps(dictKeywords),  mimetype='application/json')    


@app.route('/relateduser', methods=['OPTIONS', 'GET', 'POST'])
@crossdomain(origin='*')
def getRelatedUser():    
    global rel
    jsondata = request.get_json(force=True)
    hashtag = jsondata['term']

    keywords = rel.get_keywords(hashtag, searchtype = 1)
    dictKeywords = {'terms' : keywords}

    return Response(json.dumps(dictKeywords),  mimetype='application/json')  

@app.route('/relatedwords', methods=['OPTIONS', 'GET', 'POST'])
@crossdomain(origin='*')
def getRelatedWords():    
    global rel
    jsondata = request.get_json(force=True)
    hashtag = jsondata['term']

    keywords = rel.get_keywords(hashtag, searchtype = 3)
    dictKeywords = {'terms' : keywords}

    return Response(json.dumps(dictKeywords),  mimetype='application/json')    

@app.route('/relatedall', methods=['OPTIONS', 'GET', 'POST'])
@crossdomain(origin='*')
def getRelatedAll():    
    global rel
    jsondata = request.get_json(force=True)
    hashtag = jsondata['term']

    keywords = rel.get_keywords(hashtag, searchtype = 4)
    dictKeywords = {'terms' : keywords}

    return Response(json.dumps(dictKeywords),  mimetype='application/json')  

if __name__ == "__main__":
    app.debug = True
    app.run()
    
    