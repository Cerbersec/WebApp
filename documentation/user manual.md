# Cloning the GitHub repository and installing the dependencies

Clone the project
~~~
git clone https://github.com/Cerbersec/WebApp.git
~~~

Install dependencies
~~~
cd WebApp/brantano-2.0-estore/backend
npm install
cd WebApp/brantano-2.0-estore/frontend
npm install
~~~

Run the server
~~~
npm start
~~~

View the WebApp at http://localhost:3000

# Dependencies used for the backend
```
npm install --save
```
- "compression": "1.7.4"
- "express": "4.17.1"
- "http-errors": "1.8.0"
- "nodemon": "2.0.5"
- "sequelize": "6.3.5"
- "tedious": "9.2.1"

```
npm install --save-dev
```
- "@babel/core": "7.12.1"
- "@babel/node": "7.12.1"
- "@babel/preset-env": "7.12.1"
- "dotenv": "8.2.0"