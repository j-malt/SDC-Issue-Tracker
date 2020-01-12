import random
import json
from google.cloud.language import enums
from google.cloud.language import types
from google.cloud import language
client = language.LanguageServiceClient()


def bundle(tweets):
    if not tweets:
        return ''
    bundled_data = []
    for idx in tweets:
        tweet = tweets[idx]
        data = []
        data.append(tweet['name'])
        data.append(tweet['text'])
        data.append(random.randint(0, 1))
        document = types.Document(
            content=tweet['text'],
            type=enums.Document.Type.PLAIN_TEXT)
        sentiment = client.analyze_sentiment(document=document).document_sentiment.score
        data.append(sentiment)
        bundled_data.append(data)

    return json.dumps(bundled_data)
