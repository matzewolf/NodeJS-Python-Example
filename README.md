# NodeJS + Python = :sparkles: 

This is an experimental project that I built for another project, just to see how to utilize NodeJS together with Python to get the most out of both.

## Getting started

### Prerequisites

You should have installed on your machine:
- Git (check with `git --version`)
- Python 3 (check with `python3 --version`)
- pipenv (check with `pipenv --version`)
- Node.js (check with `node -v`)
- npm (check with `npm -v`)

Then clone this repository into your workspace.

### Install required packages

Install all required Python packages (given in `Pipfile`) with
```
pipenv install
```
and analogously all required Node packages (given in `package.json`) with
```
npm install
```

### Run the app

Start the Python Flask server with
```
flask run
```
Then, start the NodeJS Express server with
```
node server.js
```
Finally, go to http://localhost:3000 to see the web app.
