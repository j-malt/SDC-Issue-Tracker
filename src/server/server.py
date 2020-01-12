from flask import Flask
from flask import jsonify
from flask import render_template
from flask_cors import CORS, cross_origin
import json
import random
from google.cloud.language import enums
from google.cloud.language import types
from google.cloud import language
client = language.LanguageServiceClient()
#from stream import StreamListener
import tweepy

TWITTER_CONS_KEY = "J2N98A2TlSQQmx82FcAn2OcXf"
TWITTER_CONS_KEY_SECRET = "Msfxis4bSl0aLnhSKck6KgEOqpaPuuD5xBa0ZBMWg3c47731ep"

TWITTER_ACCESS_TOKEN = "1181720822161051648-2PWxYSPfxnx1Fc2dab6GmaeJn9W7wW"
TWITTER_ACCESS_TOKEN_SECRET = "HUypd9eDu93GgZpeUpNb6a9ToR04UwV99PzZSssneRYuf"

auth = tweepy.AppAuthHandler(TWITTER_CONS_KEY, TWITTER_CONS_KEY_SECRET)
api = tweepy.API(auth)


def get_tweets(n: int):
	'''Return n most recent and popular tweets with images in them.'''
	tweets = tweepy.Cursor(api.search, q='SCD Bank', lang='en',
						tweet_mode='extended', result_type='recent').items(n)
	return tweets


def parse_tweets(tweets):
	'''Return dictionary with each tweet caption and photo url.'''
	dict = {}
	i = 0
	for status in tweets:
		tweet = {}
		id = str(status.id)
		text = status.full_text
		tweet['text'] = text
		tweet['id'] = id
		tweet['name'] = status.user.name
		document = types.Document(
					content=tweet['text'],
					type=enums.Document.Type.PLAIN_TEXT)
		tweet['sentiment'] = client.analyze_sentiment(document=document).document_sentiment.score
		tweet['technical'] = 0
		dict[id] = tweet
		i += 1
	return dict




app = Flask(__name__)
CORS(app)


@app.route('/')
def stream():
	content = parse_tweets(get_tweets(3))
	return jsonify(content)


if __name__ == '__main__':
	app.run(debug=True)





