from flask import Flask, render_template, request, jsonify
import pyodbc
import jwt
from passlib.hash import pbkdf2_sha256
import json

# Open the JSON file and load its contents
# with open('D:\CODE_LOCAL\PYTHON\MACHINE_LEARNING\chatbot-deployment-main\intents.json') as json_file:
#     intentsJSON = json.load(json_file)
    
from chat import get_response

from flask_cors import CORS  # Import the CORS module

app = Flask(__name__)

# Replace these with your actual secret key and salt
SECRET_KEY = "your_secret_key"
SALT = "your_salt"

user = {"username": "user", "password": pbkdf2_sha256.hash("123")}

# CORS(app)  # Enable CORS for your app
CORS(app, resources={
    r"/*": {"origins": "*"},
    r"/login": {"origins": "http://localhost:3000"}
})

@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    username = auth.username
    password = auth.password
    
    # Connect to the database
    conn = pyodbc.connect('DRIVER={SQL Server};SERVER=LAPTOPVUNAACER\\SQLEXPRESS;DATABASE=chatbotDB;UID=sa;PWD=123')
    cursor = conn.cursor()

    # Perform a SELECT query to check if the username exists
    cursor.execute("SELECT username,password FROM usertable WHERE username=?", username)
    existing_user = cursor.fetchone()

    conn.close()
    
    print(' existing_user: ',existing_user)
    if auth and auth.username == existing_user.username and pbkdf2_sha256.verify(auth.password, existing_user.password):
        token = jwt.encode({"user": username}, SECRET_KEY, algorithm='HS256')
        return jsonify({"token": token})
    
    return jsonify({"message": "Authentication failed"}), 401

# def login():
#     auth = request.authorization
#     print(' auth: ', auth)
#     if auth and auth.username == user['username'] and pbkdf2_sha256.verify(auth.password, user['password']):
#         token = jwt.encode({"user": auth.username}, SECRET_KEY, algorithm='HS256')
#         return jsonify({"token": token})

#     return jsonify({"message": "Authentication failed"}), 401

# def verify_token(token):
#     try:
#         decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
#         return decoded_token.get('user')
#     except jwt.ExpiredSignatureError:
#         return None
def verify_token(token):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        username = decoded_token.get('user')
        return username
    except jwt.ExpiredSignatureError:
        return None
    
@app.post("/predict")
def predict():
    token = request.headers.get("Authorization")
    print(' token: ',token)
    if not token:
        return jsonify({"message": "Token missing"}), 401

    username = verify_token(token)
    if not username:
        return jsonify({"message": "Invalid token"}), 401

    text = request.get_json().get("message")
    
    response = get_response(text)
    
    message = {"answer": response}
    
    return jsonify(message)

# ---------------------------------------interact with SQL server

@app.route('/api/addsearchmonitor', methods=['POST'])
def search_handler():
    data = request.get_json()
    search = data.get('search')
    tag = data.get('tag')
    print(' data: ',data)
    # Insert the search query into the searchmonitor table
    conn = pyodbc.connect('DRIVER={SQL Server};SERVER=LAPTOPVUNAACER\\SQLEXPRESS;DATABASE=chatbotDB;UID=sa;PWD=123')
    
    cursor = conn.cursor()
    cursor.execute("INSERT INTO searchmonitor (search, tag, searchtime) VALUES (?, ?, GETDATE())", search, tag)  
    conn.commit()
    conn.close()

    return jsonify(message='Search query added to the database')

@app.route('/api/addUser', methods=['POST'])
def addUser():
    data = request.get_json()
    username = data.get('username')
    fullname = data.get('fullname')
    email = data.get('email')
    # password = data.get('password')
    password = pbkdf2_sha256.hash(data.get('password')) # mã hóa password
    phone = data.get('phone')
    role = "customer"
    print(' data: ',data)
    # Insert the search query into the searchmonitor table
    conn = pyodbc.connect('DRIVER={SQL Server};SERVER=LAPTOPVUNAACER\\SQLEXPRESS;DATABASE=chatbotDB;UID=sa;PWD=123')
    
    cursor = conn.cursor()
    cursor.execute("INSERT INTO usertable (username,fullname,email,password,phone,role) VALUES (?,?,?,?,?,?)", username,fullname,email,password,phone,role)  
    conn.commit()
    conn.close()

    return jsonify(message='Search query added to the database')

@app.route('/api/findUser', methods=['POST'])
def findUsernameExisted():
    data = request.get_json()
    username = data.get('username')

    print(' data: ', data)
    # Connect to the database
    conn = pyodbc.connect('DRIVER={SQL Server};SERVER=LAPTOPVUNAACER\\SQLEXPRESS;DATABASE=chatbotDB;UID=sa;PWD=123')
    cursor = conn.cursor()

    # Perform a SELECT query to check if the username exists
    cursor.execute("SELECT username,password,role FROM usertable WHERE username=?", username)
    existing_username = cursor.fetchone()

    conn.close()
    print(' existing_username: ',existing_username) #  data:  {'username': 'NguyenAnhVu'}
    if existing_username:
        return jsonify(exists=True)
    else:
        return jsonify(exists=False)

@app.route('/api/findallsearchmonitor', methods=['GET'])
def get_searches():
    conn = pyodbc.connect('DRIVER={SQL Server};SERVER=LAPTOPVUNAACER\\SQLEXPRESS;DATABASE=chatbotDB;UID=sa;PWD=123')
    cursor = conn.cursor()
    
    # Select all rows from the searchmonitor table
    cursor.execute("SELECT idsearch, search, tag, searchtime FROM searchmonitor")
    rows = cursor.fetchall()
    
    searches = [{'id': row.idsearch, 'search': row.search, 'tag': row.tag, 'searchtime': row.searchtime} for row in rows]
    
    conn.close()
    
    return jsonify(searches)

# if __name__ == "__main__":
#     app.run(debug=True)
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

'''
Here's how you can test the token authentication and API endpoints using Postman:

Login Request:

Open Postman.
Create a new POST request.
Set the URL to your Flask application's /login route.
In the "Authorization" tab, select "Basic Auth" and enter the username and password.
Send the request.
You should receive a response containing a JSON object with a token.
Predict Request:

Create another POST request.
Set the URL to your Flask application's /predict route.
In the "Headers" section, add a header with the key Authorization and the value Bearer <your_token> where <your_token> is the token you obtained from the login request.
In the "Body" section, choose "raw" and select "JSON (application/json)" from the dropdown.
Enter the JSON data for the message. For example:
json
Copy code
{
  "message": "Hello, chatbot!"
}
Send the request.
You should receive a response with the chatbot's answer.
Remember to adjust the URLs to match your server's address and port. Additionally, make sure you have properly implemented the Flask routes and JWT token handling in your backend.

Please be cautious with sensitive information such as passwords and secret keys when testing APIs and using tools like Postman.
'''

# ,
# {
#   "tag": "",
#   "patterns": [
#     "",
#     ""
#   ],
#   "responses": [
#     ""
#   ]
# }
# ,
'''

give me list of synonym of sentence below and put them in a list in python
how to buy product

give me the technical support procedure in e-commerce website
and put them in a list with order number

Please review our procedure below

Please review procedure of changeing account information below:
{
    "tag": "",
    "patterns": [
    "",
    ""
    ],
    "responses": [
    ""
    ]
},

procedure of customer to recover account on website e-commercew

put in number order on the beginning of each element
store in list array, I want number oder at beggining

'''