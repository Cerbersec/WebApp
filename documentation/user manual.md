Create react app from template
~~~
npx create-react-app brantano-2.0-estore
~~~

Commands
~~~
yarn start # Starts the development server.
yarn build # Bundles the app into static files for production.
yarn test  # Starts the test runner.
yarn eject # Removes this tool and copies build dependencies, configuration files and scripts into the app directory. If you do this, you can’t go back!
~~~

Create backend and install dependencies
~~~
npm init -y
npm install express cors compression jsonwebtoken passport passport-local paypal-rest-sdk --save
npm install dotenv --save-dev
npm install -g nodemon
~~~