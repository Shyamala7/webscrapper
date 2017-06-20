import requests
from bs4 import BeautifulSoup

url = 'http://www.nseindia.com/live_market/dynaContent/live_analysis/top_gainers_losers.htm?cat=G'
parser = 'html5lib'
s = requests.session()
r = s.get(url)
soup = BeautifulSoup(r.text, parser)
l = soup.table
#print (l)






url = "https://www.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json"
parser = 'html5lib'
s = requests.get(url)
r = s.get(url)
soup = BeautifulSoup(r.text, parser)


print(soup.read())
