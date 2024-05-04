# OBESITY RISK PREDICTION

Obesity Risk Prediction is an application that uses a `React UI` powered by a simple `Flask API Server`. **React** is a popular Javascript library for coding user interfaces and Flask is a leading web framework written in Python. 

<br />

## ✨ **Start the Flask API** `
```bash
$ cd backend  
$ pip install -r requirements.txt     # Download the dependencies required for our flask backend
$ python app.py                       # Run the application
```

At this point, the API should be up & running at `http://localhost:5000`

<br />

## ✨ **Start the React UI** (use another terminal)

> 👉 **Step 1** - Change the directory to `obesity-app`. 

```bash
$ cd obesity-app
```

<br >

> 👉 **Step 2** - Install dependencies via NPM or yarn

```bash
$ npm install
// OR
$ yarn
```

<br />

> 👉 **Step 3** - Start in development mode

```bash
$ npm run start 
// OR
$ yarn start
```

Once all the above commands are executed, the `React UI` should be visible in the browser. By default, the app redirects the users to application. 

<br />

![React Flask Authentication - Open-source full-stack seed project crafted by CodedThemes and AppSeed.](https://user-images.githubusercontent.com/51070104/137620059-07547eb2-0e7c-45e3-b825-67f5c72e4d3e.gif)

<br />

## ✨ General Information

The product is built using a `two-tier` pattern where the React frontend is decoupled logically and physically from the API backend. In order to use the product in a local environment, a few simple steps are required: 

- `Compile and start` the **Flask API Backend**
  - be default the server starts on port `5000`
- `Compile and start` the **React UI**
  - UI will start on port `3000` and expects a running backend on port `5000`
- `Configuration` (Optional)
  - Change the API port
  - Configure the API port used by the React UI to communicate with the backend 

<br />

