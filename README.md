# Plus1
*Plus 1 is a web application uses Django on backend and React.js on frontend. This web app is similar to Medium website. And this web app made for CS50w final project(capstone). In this application, you can write what you want without any limitation and share it with other users.*

## Installation
First you must have [Node >= 14.0.0 and npm >= 5.6](https://nodejs.org/en/) and [Python3](https://www.python.org/downloads/) installed on your computer.

After installing Python 3, run the following command for the required python libraries:

`pip install -r requirements.txt`

or

`pip3 install -r requirements.txt`

## Usage
Start a terminal/command promp and use 'cd' command to change your directory to backend:

`cd backend`
After this command you are now in the backend directory. Now you can start backend server:

`python3 manage.py runserver`

or 

`python manage.py runserver`

Now you should be seeing text like this:

```
System check identified no issues (0 silenced).
January 16, 2022 - 18:19:38
Django version 3.2.5, using settings 'cs50w.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

It means you started the backend server correctly. Now you must start frontend to use web app. Run the following command to return to the root directory:
`cd ..`

Then you must change your directory to frontend to start React app:
`cd front`

Then run the following command to install the required npm modules from package.json:
`npm install`

After that you run following command:
`npm start`

Last command will run your React App and it will automatically start your web browser and you can see and use the web app.


## Distinctiveness and Complexity
I think this web application is different from the other applications we did during the course. This app is not a social media app and not an e-commerce app. I tried to make a medium-like application. The main purpose of the application is for people to write whatever they want and share it with other users without any limitation.

About the complexity I used functions and libraries that come with django and python on backend. I didn't use django rest framework because I didn't think it was necessary for this application. But on frontend side I used React, which I have

## Project Files
```
Capstone
______
requirements.txt : Contains required Python libraries' list.
README.md : This readme file!
│ 
│   
│     
│
frontend
│   │   node_modules : Contains node modules, everything in this folder is created automatically by 
│   │                  NPM.
│   │   package.json : Contains required npm modules for the application
│   │   package-lock.json : a JSON file used by Node to keep some package details.
│   │   public : Contains some icons, images and txt files. Everything in there was created by create- 
│   │            react-app.
│   │___src : Main source code folder for our React front-end.
│   │   │    Components: Contains our React components. Everything in this folder is used in the 
│   │   │                website.
│   │   │    App.css : Main stylesheet for the website. All the styles are defined here.
│   │   │    App.js : Main page of the website. All the components are starting to being used here.
│   │   │    index.js : A javascript file where app created.
│   └───│    index.css : A Css file defines general stylesheet.
│   
└───backend
|   │___cs50w : Main Django app folder
|   |   |    __pycache__ : Cache folder, nothing important
|   |   |    __init__.py : Default Django project file
|   |   |    asgi.py : Default Django project file, contains some settings about ASGI
|   |   |    settings.py : Django project settings file.
|   |   |    urls.py : URLs for the project are defined here.
|   |___|    wsgi.py : Default Django project file, contains some settings about WSGI
|   |   
|   │___backend_app : Backend API application.
|   |   |    __pycache__ : Cache folder, nothing important
|   |   |    migrations : Contains Django migrations
|   |   |    __init__.py : Default Django project file
|   |   |    admin.py : Contains Admin panel model registrations.
|   |   |    apps.py : Contains some app config, created by Django automatically.
|   |   |    models.py : Contains Django models.
|   |   |    test.py : A test file, automatically created by Django.
|   |   |    urls.py : Contains URL configuration for the REST API. 
|   |   |    views.py : Contains views (what the app returns when a request is made to an URL defined in views.py). 
|   |   |    
|   |   |    
|   │   |
```
