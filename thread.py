import cherrypy
import requests
import cherrys
import json
import threading
import time
from bs4 import BeautifulSoup

class Heart:

    def main():
        global REDIS_QUEUE
        cherrypy.lib.sessions.RedisSession = cherrys.RedisSession

    def __init__(self, period):
        self.period = period
        self.count = 0
        self.timer = None
        

    def __call__(self):
        self.count += 1
        self.start()

    def start(self):
        self.timer = threading.Timer(self.period, self)
        url2 = "https://www.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json"
        soup2 = BeautifulSoup( requests.session().get(url2).text, "html5lib")
        inner_ul = soup2.find('p')
        inner_ul_text = soup2.text.strip()
        input_json = json.loads(inner_ul_text)
        #print(input_json["time"])
        cherrypy.lib.sessions.RedisSession = json.loads(inner_ul_text)
        cherrypy.lib.sessions.RedisSession["time"] = "May 26, 2017 15:59:40"
        #print(soup2.prettify())
        print(cherrypy.lib.sessions.RedisSession["time"])
      
        self.timer.start()


        #return json.dumps({"time": cherrypy.lib.sessions.RedisSession["time"], "data" : cherrypy.lib.sessions.RedisSession["data"]})


class HelloWorld(object):
    @cherrypy.expose
    @cherrypy.tools.json_out()
    def index(self):
        #url = 'http://www.nseindia.com/live_market/dynaContent/live_analysis/top_gainers_losers.htm?cat=G'
        #url2 = "https://www.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json"
        #soup = BeautifulSoup( requests.session().get(url).text, 'html5lib')
        #soup2 = BeautifulSoup( requests.session().get(url2).text, "html5lib")
        #inner_ul = soup2.find('p')
        #inner_ul_text = soup2.text.strip()
        #cherrypy.lib.sessions.RedisSession = json.loads(inner_ul_text)
        print('testing')
        print(cherrypy.lib.sessions.RedisSession["time"])
        return json.dumps({"time": cherrypy.lib.sessions.RedisSession["time"], "data" : cherrypy.lib.sessions.RedisSession["data"]})
    


def TEST():
    beat = Heart(5)                       # beat at 1 second intervals
    beat.start()
    start = time.time()
TEST()    

if __name__ == '__main__':
    conf = {
        '/': {
        'request.dispatch':  cherrypy.dispatch.MethodDispatcher(),
        'tools.sessions.on': True,
        'tools.sessions.storage_type' : 'redis',
        'tools.response_headers.on': True,
        'tools.response_headers.headers': [('Content-Type',  'text/plain')]
        }
    }
    cherrypy.quickstart(HelloWorld())