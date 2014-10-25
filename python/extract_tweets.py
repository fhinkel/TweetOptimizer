# -*- coding: utf-8 -*-
'''
Created on Oct 25, 2014

@author: tim
'''
import cPickle as pickle
import string
import re
import operator


http_regex = re.compile(r'''(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))''', re.DOTALL)

exclude = set(string.punctuation)


s = "string. With. Punctuation?" # Sample string 
out = s.translate(string.maketrans("",""), string.punctuation)

print out


data = pickle.load(open('/home/tim/data/hackday/data_de.p','r'))

print len(data)

print data[0].keys()


word_retweet_count = {}
word_count = {}
processed_tweets = []
for item in data:    
    text = item['text']
    text = http_regex.sub('',text)    
    text = text.replace(',','').replace('.','').replace(';','').replace('(','').replace(')','')
    text = text.replace(':','').replace('!','').replace('?','').replace('RT','')    
    processed_tweets.append(text.lower().strip())
    
    for word in text.split(' '):
        if any(x.isupper() for x in word): 
            if word not in word_retweet_count:
                word_retweet_count[word] = item['retweet_count']
                word_count[word] = 1
            else:
                word_retweet_count[word] += item['retweet_count']
                word_count[word] += 1
            
    
stopwords = pickle.load(open('stopwords_german.p','r'))
    
sorted_words = sorted(word_retweet_count.items(), key=operator.itemgetter(1),reverse=True)


word_to_retweet_ratio = {}
for pair in sorted_words:
    if word_count[pair[0]] > 10:    
        if pair[0].lower() not in stopwords and pair[1] > 10 and len(pair[0]) > 3:
            print pair, word_count[pair[0]]
            word_to_retweet_ratio[pair[0]] = pair[1]/float(word_count[pair[0]])
            
            
print len(word_to_retweet_ratio.keys())
pickle.dump(word_to_retweet_ratio,open('word_retweet_ratio.p','wb'))
    
with open('/home/tim/trunk/processed_tweets.txt','wb') as f:
    for tweet in processed_tweets:
        f.write(tweet.encode('utf-8') + '\n')
    
    