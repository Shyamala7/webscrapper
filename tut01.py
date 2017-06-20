import cherrypy
import requests
import cherrys
import json
import threading
import time


from bs4 import BeautifulSoup


class HelloWorld(object):
    @cherrypy.expose
    @cherrypy.tools.json_out()
    def index(self):
        url = 'http://www.nseindia.com/live_market/dynaContent/live_analysis/top_gainers_losers.htm?cat=G'
        url2 = "https://www.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json"
        soup = BeautifulSoup( requests.session().get(url).text, 'html5lib')
        soup2 = BeautifulSoup( requests.session().get(url2).text, "html5lib")
       	inner_ul = soup2.find('p')
        inner_ul_text = soup2.text.strip()
        cherrypy.lib.sessions.RedisSession = json.loads(inner_ul_text)
        
        return json.dumps({"time": cherrypy.lib.sessions.RedisSession["time"], "data" : cherrypy.lib.sessions.RedisSession["data"]})
    


if __name__ == '__main__':
    conf = {
        '/': {
        'tools.sessions.on': True,
        'tools.sessions.storage_type' : 'redis'
        }
    }
    cherrypy.quickstart(HelloWorld())