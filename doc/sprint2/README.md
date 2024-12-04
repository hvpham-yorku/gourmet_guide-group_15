# Gourmet Guide

## Motivation

Gourmet Guide is a platform designed for food lovers, home cooks, and professional chefs to easily find, share, and organize recipes. With features like personalized recommendations and easily accessible video tutorials, Gourmet Guide aims to save users time and help them discover new dishes by providing a curated selection of recipes and recommended cooking channels.

Our objective is to build a recipe web app that users can use to search for the recipe of their next meal. It will have a database that contains recommended and well-reviewed/curated/reputable recipes and will allow users to search for specific recipes using filters such as by main ingredient, by cuisine, and by dietary restrictions. The application will also integrate YouTube videos into our web app, allowing people to find videos showcasing recipes related to their search and recommended channels.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/hvpham-yorku/gourmet_guide-group_15.git
cd gourmet_guide-group_15
```

### 2. Setup environment variables

Create `.env` files within the client and server directories using the provided `.env.example` files as a template, and populate the variables to match your configuration

```bash
# Edit the created files after running the following commands if needed
cp client/.env.example client/.env
cp server/.env.example server/.env
```

**IMPORTANT!**

In order for user authentication to work, you must create your own `TOKEN_KEY` for JWT to sign! To create your own `TOKEN_KEY`, we can use Node.js's built-in crypto package through the following bash command:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" >> server/.env
```

Verify that the output of the above command has been properly added to your `.env`

```
TOKEN_KEY=[GENERATED_KEY_FROM_NODE_CRYPTO_PACKAGE]
```

**IMPORTANT!**

In order the recipe generation AI to work, you must create and use your own ChatGPT API key! Once you have obtained your API key, append it to your `.env` file like so:

```
OPENAI_API_KEY=[CHATGPT_API_KEY]
```

**MongoDB environment variables are described in the next section, under "Install and Setup MongoDB"**

### 3. Install dependencies

Install frontend dependencies

```bash
cd client
npm install
```

Install backend dependencies

```bash
cd server # Assumes you're in project root directory
npm install
```

**Install and Setup MongoDB**

If you do not have MongoDB installed on your computer, follow this guide: https://www.mongodb.com/docs/manual/installation/

Now that you have installed MongoDB onto your computer. To link your database to your backend follow the steps below.

STEP 1: Go into your MongoDB cloud clusters, which should look like the image below:
![alt text](image.png)

STEP 2: Click on the Database Access, which is on the left of the sidebar. Click on ADD NEW DATABASE USER which will pop up a modal, like the image below:
![alt text](image-1.png)

STEP 3: Fill out the Password Authentication with your desired username and password for the database of this particular project.

STEP 4: Before saving this, click the Built-in Role dropdown, and select Read and write to any database. Now, go ahead to click Add user.

STEP 5: Click on Database, and on the left side of the sidebar, click the connect button, which is beside View Monitoring. A modal popup will be displayed, then click connect your application and copy the code snippet you find there.
![alt text](image-2.png)

You will replace <username> and <password> with the username and password you created in STEP 3.

Now copy and paste the connection string into the server `.env` file. Finally, your server .env file should ultimately look like this:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.pvqft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

SERVER_PORT=3000

OPENAI_API_KEY=

TOKEN_KEY=
```

Now you are all set!

## Starting The Development Servers

Frontend

```bash
cd client
npm run dev
```

Backend

```bash
cd server
npm run dev
```

Both the frontend and backend development servers should now be available at their respective ports on localhost

MongoDB

Running the `mongod.exe` will make MongoDB available to connect to, you can run the `.exe` through the following command

```bash
path/to/mongod.exe
```

## Contribution

We welcome contributions to Gourmet Guide\! Please follow these guidelines to get started:

-   Getting the Code: To start working on your contribution, please first fork the repository then create the branch that will host your contribution.
-   Branch Naming: Use feature/\<feature-name\> for new features and bugfix/\<issue-number\> for bug fixes.
-   Git Flow: We follow the Git flow model, and all changes should be merged into the main branch via pull requests.
-   Issues and PRs: Use GitHub Issues for reporting bugs or requesting features. Submit pull requests with a clear description of your changes.

Thank you for helping to make Gourmet Guide a valuable resource for food enthusiasts everywhere\!
