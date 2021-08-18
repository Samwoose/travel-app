# Travel App Project(Capstone Project)
This project is to implement an app that analize the sentiment of a post using natural language processing API(MeaningCloud).

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
--syles <br/>
---base.scss <br/>
---footer.scss <br/>
---form.scss <br/>
---header.scss <br/>
---resets.scss <br/>
--view <br/>
---index.html <br/>
--index.js <br/>
-server <br/>
--index.js <br/>
--mockAPI.js <br/>
.babelrc <br/>
.gitignore <br/>
package-lock.json <br/>
package.json <br/>
README.md <br/>
REQUIREMENTS.md <br/>
webpack.dev.js <br/>
webpack.prod.js <br/>

## How to check out the website
- Get your personal Meaning API key by signing up the web service at https://www.meaningcloud.com/
- substitue varible 'process.env.API_KEY' to your API key in index.js in server directory 
- Open the terminal and navigate your working directory to the directory where src directory is located.
- install packages with command: npm install
- Rebuild code using webpack with command: npm run build-prod
- For development mode you can use this command instead: npm run build-dev
- Run the server in production mode with command:
npm run start
- Open your browser(e.g. Chrome) and type http://localhost:8080/
- Provide url of article or news you want to analyze.
e.g.https://www.politico.com/news/2021/08/15/biden-white-house-afghanistan-drawdown-505018 
- Click submit button. 

## Important functions in formHandler.js
-postUserUrlHelper
 * Post user input url to the server
 * @param {string} userInputUrl url that user enters.
 * @param {string} routeUrl endpoint of route in the server
 * @return {string} newlyFormedUserUrl correctly reformedly user input url

-handleSubmit
 * Get analysis information from server and update user interface in the view.
 * @param {object} event submit event

## Important functions in urlChecker.js
-urlValidator
 * Check if url that user entered is valid.
 * -Invalid case: provided url is not an url
 * @param {string} userInputUrl url that user entered
 * @returns true: url is valid, false: url is not valid
 
## Important routes in index.js in server directory
-app.get('/nlp-api', async function(req,res))
 * Add a GET route that returns analysis of the given article/news.

-app.post('/update-url',(req,res))
 * Add a POST route that adds url that user provides to the server.

## Future work
- Customize UI more visually pleasantly 

## Licence
Udacity