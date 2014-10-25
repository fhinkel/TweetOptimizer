# -*- coding: utf-8 -*-
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
import re
from crossdomain import crossdomain

http_regex = re.compile(r'''(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))''', re.DOTALL)

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

base_path = sys.argv[0].replace('flask_API.py','')

rel = Relation_Calculator()

def replacePunctuation(text):
    text = http_regex.sub('',text)    
    text = text.replace(',','').replace('.','').replace(';','').replace('(','').replace(')','')
    text = text.replace(':','').replace('!','').replace('?','').replace('RT','')
    return text

def getRelatedTerms(search_term, level):
    keywords = rel.get_keywords(search_term.lower(), searchtype = level)
    words = []
    retweet_ratio = []
    confidence = []
    for items in keywords:
        words.append(items[0])
        retweet_ratio.append(items[1])
        confidence.append(items[2])
    dictKeywords = {'terms' : words, 'retweetRatios' : retweet_ratio, 'confidence' : confidence }
    return dictKeywords

@app.route('/relatedHashtags', methods=['OPTIONS', 'GET', 'POST'])
@crossdomain(origin='*')
def getRelatedHashtags():    
    global rel
    jsondata = request.get_json(force=True)
    hashtag = jsondata['term']

    return Response(json.dumps(getRelatedTerms(hashtag, 0)),  mimetype='application/json')    

@app.route('/tweetToKeywordList', methods=['OPTIONS', 'GET', 'POST'])
@crossdomain(origin='*')
def tweetToRelatedWords():    
    global rel
    jsondata = request.get_json(force=True)
    tweet = jsondata['tweet']
    tweet = replacePunctuation(tweet)
    
    print tweet
    keywordsList = []
    for word in tweet.split(' '):
        if any(x.isupper() for x in word): 
            keywordsList.append(rel.get_keywords(word.lower(), searchtype = 2)[0:10])
    dictKeywords = {'keywordList' : keywordsList}

    return Response(json.dumps(dictKeywords),  mimetype='application/json')    


@app.route('/relatedUsers', methods=['OPTIONS', 'GET', 'POST'])
@crossdomain(origin='*')
def getRelatedUser():    
    global rel
    jsondata = request.get_json(force=True)
    hashtag = jsondata['term']

    return Response(json.dumps(getRelatedTerms(hashtag, 1)),  mimetype='application/json')  

@app.route('/relatedWords', methods=['OPTIONS', 'GET', 'POST'])
@crossdomain(origin='*')
def getRelatedWords():    
    global rel
    jsondata = request.get_json(force=True)
    hashtag = jsondata['term']

    return Response(json.dumps(getRelatedTerms(hashtag, 3)),  mimetype='application/json')    

@app.route('/relatedAll', methods=['OPTIONS', 'GET', 'POST'])
@crossdomain(origin='*')
def getRelatedAll():    
    global rel
    jsondata = request.get_json(force=True)
    hashtag = jsondata['term']

    return Response(json.dumps(getRelatedTerms(hashtag, 4)),  mimetype='application/json')  

@app.route('/wordCount', methods=['OPTIONS', 'GET', 'POST'])
@crossdomain(origin='*')
def getWordCount():    
    global rel
    jsondata = request.get_json(force=True)
    word = jsondata['term']  

    return Response(json.dumps({'count' :  rel.get_word_count(replacePunctuation(word))}),  mimetype='application/json')  

if __name__ == "__main__":
    app.debug = True
    app.run()
    
    