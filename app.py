from flask import Flask, render_template, jsonify, request

import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import config
app = Flask(__name__)

client = MongoClient(config.db_link, 27017)
db= client.wonDB

@app.route('/')
def home():
  return render_template('index.html')

@app.route('/card', methods= ['GET'])
def showCard():
  # 모든 document 찾기 & _id 값 제외하고 출력하기
  # card로 데이터 내려주기
  data = list(db.users.find({}, {'_id':False}))

  return jsonify({'result':'success', 'data':data})

@app.route('/card', methods= ['POST'])
def postCard():
  nickName = request.form.get('nickName')
  comment = request.form.get('comment')
  link= request.form.get('link')
  if db.users.find_one({'nickName': nickName}):
    return jsonify({'result':'success', 'msg': 'exists'})
  else:
    doc ={
    'nickName' : nickName,
    'comment' : comment,
    'link' : link
    }

    db.users.insert_one(doc)    
    return jsonify({'result':'success'})

@app.route('/delete', methods=['POST'])
def deleteCard():
  nickName = request.form.get('nickName')
  db.users.delete_one({'nickName': nickName})
  return jsonify({'result': 'success'})


if __name__ == '__main__':  
  app.run('0.0.0.0',port=5000,debug=True)