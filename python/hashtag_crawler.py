'''
Created on Sep 26, 2014

@author: tim
'''
import tweepy
from tweepy import OAuthHandler
import time
import itertools
import os
import cPickle as pickle
import sys
import re
import traceback
os.environ['http_proxy']= ''
import logging 
import os
import os.path
t0 = time.time()

DEBUG = True

config_name = 'debug.txt'

# determine if application is a script file or frozen exe
if getattr(sys, 'frozen', False):
    application_path = os.path.dirname(sys.executable)
elif __file__:
    application_path = os.path.dirname(__file__)

config_path = os.path.join(application_path, config_name)


logging.basicConfig(filename=config_path, format='%(message)s', level=logging.DEBUG)

def log(s): 
    if DEBUG: print s 
    logging.log(logging.DEBUG, s)
        
ckeys = []
csecrets = []
atokens = []
asecrets = []
        

current_api = 0

base_path = sys.argv[0].replace('hashtag_crawler.py','')


log(base_path)

apis = []
for i in range(len(ckeys)):
    auth = OAuthHandler(ckeys[i], csecrets[i])
    auth.set_access_token(atokens[i], asecrets[i])
    apis.append(tweepy.API(auth))


def cast_status_to_dict(tweepy_status):
    ret = {}
    ret['text'] = tweepy_status.text
    ret['follower_count'] = tweepy_status.author.followers_count
    ret['friends_count'] = tweepy_status.author.friends_count
    ret['retweet_count'] = tweepy_status.retweet_count
    ret['date'] = tweepy_status.created_at
    ret['img_url'] = tweepy_status.user.profile_image_url
    ret['name'] = tweepy_status.user.name
    ret['description'] = tweepy_status.user.name
    return ret

def process_hashtag(query):
    global current_api
    global processed_hashtags    
    global data_de
    processed_hashtags[query] = True
    items = tweepy.Cursor(apis[current_api].search, q=hashtag + query,lang='de').items(max_tweets)
    i = 0
    last_error = 0
    while True:
        try: 
            i += 1
            status = next(items)
            if status.text not in unique_tweets:   
                unique_tweets[status.text] = True     
                data_de.append(cast_status_to_dict(status))
                matches = hashtag_rex.findall(status.text)  
                for match in matches:
                    match = match.lower()
                    if match not in processed_hashtags and match not in next_wave:
                        next_wave.append(match)                 
        except tweepy.TweepError:
            log(traceback.format_exc())
            if i > 0 and last_error + 2 > i: 
                time.sleep(60)
                log('Recurrent rate error. Going to sleep now...')
            last_error = i
            current_api += 1             
            log('changed to next api key: {0}'.format(current_api))
            if current_api >= len(ckeys): current_api = 0
            continue
        except StopIteration:
            break

def process_current_wave():
    global current_wave
    i = 0
    while len(current_wave) > 0:   
        log('Dumping data to {0}'.format(base_path + 'data_de3.p'))       
        pickle.dump(processed_hashtags, open(base_path + 'hashtags.p','wb'))
        pickle.dump(data_de, open(base_path + 'data_de3.p','wb'))

        process_hashtag(current_wave[0])
        processed_hashtags[current_wave[0]] = True
        log('Successfully processed hashtag: {0}'.format(current_wave[0]))
        del current_wave[0]        
        log('Dumping wave data...')
        pickle.dump(current_wave, open(base_path + 'current_wave.p','wb'))
        pickle.dump(next_wave, open(base_path + 'next_wave.p','wb'))
        i+=1
        
    log('Dumping data...')
    pickle.dump(processed_hashtags, open(base_path + 'hashtags.p','wb'))
    pickle.dump(data_de, open(base_path + 'data_de3.p','wb'))
    log('Current tweet count: {0}'.format(len(data_de)))
    
    t1 = time.time()
    
    total_min = (t1-t0)/60.
    log('Current tweet rate: {0} tweets per minute'.format(len(data_de)/total_min))

processed_hashtags = {}


if os.path.isfile(base_path + 'data_de3.p'):
    data_de = pickle.load(open(base_path + 'data_de3.p','r'))
else: data_de = [] 

if os.path.isfile(base_path + 'current_wave.p'):
    current_wave = pickle.load(open(base_path + 'current_wave.p','r'))
else: current_wave = ['hackday'] 

if os.path.isfile(base_path + 'next_wave.p'):
    next_wave = pickle.load(open(base_path + 'next_wave.p','r'))
else: next_wave = []

if os.path.isfile(base_path + 'hashtags.p'):
    processed_hashtags = pickle.load(open(base_path + 'hashtags.p','r'))
else: processed_hashtags = {}

hashtag_rex = re.compile('(?<=^|(?<=[^a-zA-Z0-9-_\.]))#([A-Za-z]+[A-Za-z0-9]+)')
 
max_tweets = 200
data_en = []
unique_tweets = {}
hashtag = '%23'

process_current_wave()
while len(next_wave) > 0:
    current_wave = next_wave
    next_wave = []
    process_current_wave()
    
    

        
        

    


            



