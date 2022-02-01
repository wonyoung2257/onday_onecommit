from email import header
import requests
from bs4 import BeautifulSoup

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://github.com/wonyoung2257',headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')
temp = soup.select('svg.js-calendar-graph-svg')
print(temp)