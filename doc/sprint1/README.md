# Gourmet Guide

## Motivation
Gourmet Guide is a platform designed for food lovers, home cooks, and professional chefs to easily find, share, and organize recipes. With features like personalized recommendations and easily accessible video tutorials, Gourmet Guide aims to save users time and help them discover new dishes by providing a curated selection of recipes and recommended cooking channels.

Our objective is to build a recipe web app that users can use to search for the recipe of their next meal. It will have a database that contains recommended and well-reviewed/curated/reputable recipes and will allow users to search for specific recipes using filters such as by main ingredient, by cuisine, and by dietary restrictions. The application will also integrate YouTube videos into our web app, allowing people to find videos showcasing recipes related to their search and recommended channels.

## Installation
Create a `/server/.env` file and with the following environment variables:
```
MONGODB_URI=mongodb://localhost:27017/
SERVER_PORT=5000
```
Start MongoDB
```
path/to/mongod.exe
```
Install backend dependencies and start the server
```
cd server
npm install
npm start
```
Install frontend dependencies and start the server
```
cd client
npm install
npm run dev
```

## Contribution
We welcome contributions to Gourmet Guide\! Please follow these guidelines to get started:

* Branch Naming: Use feature/\<feature-name\> for new features and bugfix/\<issue-number\> for bug fixes.  
* Git Flow: We follow the Git flow model, and all changes should be merged into the main branch via pull requests.  
* Issues and PRs: Use GitHub Issues for reporting bugs or requesting features. Submit pull requests with a clear description of your changes.

Thank you for helping to make Gourmet Guide a valuable resource for food enthusiasts everywhere\!  