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
        

ckeys.append('Go2BKKaGREBEioh1BEeRhA')
csecrets.append('lSsiczxot5t1AKKhcYzlGHNXL66B8s7Wpj1QB1oM3U')
atokens.append('872274950-ihHI1EEfLd20059n8eLBFOqvJMCMCfwNqXR9ObTh')
asecrets.append('X1ic8qTu5LcjpKFckibFH7S8sNZ7ut9rr7rc2Jt4')

ckeys.append('leXgZOVbVhG5BvdnvM58BgAmy')
csecrets.append('LAOr4rkUHTxYgdPiMeTxjOxWURgb9bWdrQog1DyRM1JQhcNokY')
atokens.append('872274950-hl11IsipRPTL1MvPrsqGapJPtjj56F5E81dlGIGf')
asecrets.append('kte8SvpQBPDVezSTAtgPHZ2zhcp9SqkiV4G11m8TQ0BhG')

ckeys.append('napyrVTJtsycJ9sTQOdQw')
csecrets.append('PJ9Gr0k17L9XrhSJgmEwJ5Pkb2L8BimMyjlpcerpc')
atokens.append('872274950-mAhGAEs7TQArb8SJjb5CRsOd3GBKpqTWqxniPXZa')
asecrets.append('AgPW8xj8PFDZcJVDK3aMWpCZw2FNV5t57jzHVZc1XQSdL')

ckeys.append('oHmPy6BDn6QPISA8O4YmSFcSn')
csecrets.append('rPWtdq811nMm1Ta4TsJXs6L2j0y5BP9kFEQ6wLZJ3zmi5ypCEt')
atokens.append('872274950-FrgfRor6nmfOn9YvIDihcIPpWxjsxL1kdBRXgDj5')
asecrets.append('s3sKetUiHS7LHvBPUWFjoGASyOQy7SzFnkm6FSxiw0Sx0')

#debug!
ckeys.append('h554bvyP67an9o98A0uZl8D5i')
csecrets.append('5hvRoKrEf1LKrCIqZU0htZpzZ6yAOm8SwV3WFFetDSvb6Tf2Sl')
atokens.append('872274950-jK8Q4sZlBo8PDJwbs6frOe7CStnygnoSn0GRP7P1')
asecrets.append('lFUmOkBEtI8vOkeIeQ2bSlo9ye5A28QpQxGfo6pAjGZu0')

ckeys.append('jrwNGHc9FsCSJHk2Z0McxYgXM')
csecrets.append('VVhEWzhgjkSRuiPs4p1DfsYIB3b38shXXonc9WXFFz70KWF32Z')
atokens.append('872274950-Xe9QzakUbYdQktLxlMgYvtt4L2ulHgy4lLPZyr2q')
asecrets.append('F2EcF3S56GEfDQJnCAiSdvTzD2Zp3SB98cFJmfjCv1jyy')

ckeys.append('jrwNGHc9FsCSJHk2Z0McxYgXM')
csecrets.append('VVhEWzhgjkSRuiPs4p1DfsYIB3b38shXXonc9WXFFz70KWF32Z')
atokens.append('872274950-Xe9QzakUbYdQktLxlMgYvtt4L2ulHgy4lLPZyr2q')
asecrets.append('F2EcF3S56GEfDQJnCAiSdvTzD2Zp3SB98cFJmfjCv1jyy')

ckeys.append('pKCZtQlg3ts27JLUTzQJK0qhT')
csecrets.append('Ojr04SvTURTrVarVUQkE9b3Q5v7N6wBKLhK48T4g5sJfSmsruI')
atokens.append('872274950-Eok1pRVwol8fGSFXfyFc7f6aZTOuGNz3e0bBMq7A')
asecrets.append('cJCrBRZs9sQkJ4sxeIEJZLsR266MwxMKFj0mALJCbvjqo')

ckeys.append('e7Q1xcHIms2kMSpJzF0uVWWxU')
csecrets.append('xTZe6shkMD2cGFg42udOkU24cOnZCJq2wFP4wtOMKHmSIBSY5x')
atokens.append('872274950-tY13UAP8kiNXVaWjn0dLrjC13JhFaj9eWeVljqzu')
asecrets.append('yJ7y9PJ3nFdw5bsQnePH5F4o05SX6fpyfMIhG6Yb6m2Tr')

ckeys.append('b5MSBg9l1THMjzVEJxGKAax7m')
csecrets.append('EzLcQRZj6p1B5z2Ox5nzv1kDwL861ZCtmK4p02km1PyNY8Fidc')
atokens.append('872274950-NUxhs2SY04oEievqDujTCEghgfsD91d2easr82KH')
asecrets.append('i9hxb96b1wIbFDHbOuZxO4oxNv9jSVlZEDooaiWRES1tr')

ckeys.append('1LSVbEQDZvv1yhq8cgnYHLYr0')
csecrets.append('VZGlznquz32k4Pjz5cGbaCZ2j0TUuuNUcDltpLMVIGTIhpDAGq')
atokens.append('872274950-buBF1nz43sgsVh9hwcsv8RoX1M8xurzgZ4bdjDyD')
asecrets.append('d84pljcCcRO7L3C2IImuPjD37LMAfYTZ7GwRAU5ubGHcU')

ckeys.append('roBbWjs34pNbc21qgzKto9mvl')
csecrets.append('MrC4atAsJSB4tIvrLZ267fPR9yvZRWkZP3gBEWnS8POzSoov0p')
atokens.append('872274950-no8Hdl2ikM20WTdT1Wa7T9WTciYGDA9UBZG2MyE5')
asecrets.append('083G8Ux5fy59YtDgXYjrTr4ZJpmFWcr50Eid0gdAhzuI0')

ckeys.append('fZH9P7N0CXu5aLLWLlSI8qmjP')
csecrets.append('Pfs0ARchnKYOaTDL8I7deOQYasioj8GPeiu8ulHqhbQbsvYGzy')
atokens.append('872274950-LhxYgTpUtLEsVAn6TAMPWAYhwEIuZEOrsFa5593I')
asecrets.append('L8aoQPkVSc7EEEgBay7Jo9qbIqonISG3bpQILcx2xYjeO')

ckeys.append('Yzn6fparxxRqL9M5hPDFSrpS8')
csecrets.append('lL8fFSYJrkeri12nPV14oN5WcK2Vy0LeDmAGuXIWWz2b5QHqlF')
atokens.append('872274950-hcrxze1FxWYFx2gZtp4TgFutUaPUZGFKdXFnkWGo')
asecrets.append('4NbbDdxFWDycPEsqXrL0QGZ92VlbBkijlJubxsy1xQhTN')

ckeys.append('3MlUKIKfo7uJ2pbfx1Oi43oSx')
csecrets.append('0o733A8OvTmsCo1Vi4iJenxtAj3zVlwB9FvCsw9hBVsdByZCyE')
atokens.append('872274950-8nbgDCcVDEkMFBLJdiUD6Vf22KM6XHVSGSsKplbK')
asecrets.append('i78B5SAy88xKab6bwO4SAf8ejyLCKlVzLK9AJJte7sK8z')

ckeys.append('jzZJjV4WaQTO0UfXhlXldqDAD')
csecrets.append('Bpac2gVzeg2JwiUuTyZcnAJ3o41o8i7iqr2NYu9px08QEVmRBG')
atokens.append('872274950-nqebPIFbyi7BgWmbT5UFiKnnLB1PNGzolXpdyed3')
asecrets.append('F0rSbgdbLv9yNNUzcLCIIWNiQaBNGB77mt9uvIABkAp37')

ckeys.append('2VPJEUQ9j1U1RBifjLzoORHPz')
csecrets.append('kTSS1DsYp5awkjCWUndEoKileEDmgLouHXixAWItCtPRaaafES')
atokens.append('872274950-OYftTzpKgcvuGaq4wqW9ZCQ9D6KIciiNef3OwmfR')
asecrets.append('oBy36n6rz8G7a6sZUOzNbeWcWCzPKFu4MuNmyZUyPRfkE')

current_api = 0

base_path = sys.argv[0].replace('hashtag_crawler.py','')
data_de = []

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
        log('Dumping data to {0}'.format(base_path + 'data_de2.p'))       
        pickle.dump(processed_hashtags, open(base_path + 'hashtags.p','wb'))
        pickle.dump(data_de, open(base_path + 'data_de2.p','wb'))

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
    pickle.dump(data_de, open(base_path + 'data_de2.p','wb'))
    log('Current tweet count: {0}'.format(len(data_de)))
    
    t1 = time.time()
    
    total_min = (t1-t0)/60.
    log('Current tweet rate: {0} tweets per minute'.format(len(data_de)/total_min))




if os.path.isfile(base_path + 'current_wave.p'):
    current_wave = pickle.load(open(base_path + 'current_wave.p','r'))
else: next_wave = []
if os.path.isfile(base_path + 'next_wave.p'):
    next_wave = pickle.load(open(base_path + 'next_wave.p','r'))
if os.path.isfile(base_path + 'hashtags.p'):
    processed_hashtags = pickle.load(open(base_path + 'hashtags.p','r'))
else: cprocessed_hashtags = {}

hashtag_rex = re.compile('(?<=^|(?<=[^a-zA-Z0-9-_\.]))#([A-Za-z]+[A-Za-z0-9]+)')
 
max_tweets = 1000
data_en = []
unique_tweets = {}
hashtag = '%23'

process_current_wave()
while len(next_wave) > 0:
    current_wave = next_wave
    next_wave = []
    process_current_wave()
    
    

        
        

    


            



