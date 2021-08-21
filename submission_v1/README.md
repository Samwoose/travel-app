# Travel App Project(Capstone Project)
This project is to implement an app that provides weather and fact about a city user wants to visit.

## Installation
- Node
- express
- Please refer to package.json for the other dependencies and develop dependencies.
(Node packages can be installed with npm install 'name of package')

## Directory structure
__test__
-formHandler.spec.js <br/>
-urlChecker.spec.js <br/>
img <br/>
-nlpLogo.png <br/>
src <br/>
-client <br/>
--js <br/>
---fromHandler.js <br/>
---urlChecker.js <br/>
--styles <br/>
---style.css<br/>
--view <br/>
---index.html <br/>
--index.js <br/>
-server <br/>
--index.js <br/>
.babelrc <br/>
.gitignore <br/>
package-lock.json <br/>
package.json <br/>
README.md <br/>
webpack.dev.js <br/>
webpack.prod.js <br/>

## How to check out the website
- Get your personal Meaning API keys by signing up the web services 
at https://www.weatherbit.io/ , https://www.geonames.org/ , https://pixabay.com/
- substitue varibles userName, apiKeyWather, apiKeyPhoto to your API keys(or username) in server.js in server directory 
- Open the terminal and navigate your working directory to the directory where src directory is located.
- install packages with command: npm install
- Rebuild code using webpack with command: npm run build-prod
- For development mode you can use this command instead: npm run build-dev
- Run the server in production mode with command:
npm run start
- Open your browser(e.g. Chrome) and type http://localhost:8083/
- Provide name of a city and date of arrival.
e.g.los angeles , 2021-08-21
- Click submit button. 

## Important functions in app.js
-please take a look at comment in app.js
## Important functions in daysCalculator.js
-please take a look at comment in daysCalculator.js

## Future work
- Customize UI more visually pleasantly 
