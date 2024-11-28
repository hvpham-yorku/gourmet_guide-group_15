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
# Edit the created files after running the following commands
cp client/.env.example client/.env
cp server/.env.example server/.env
```

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

Install and Setup MongoDB

### 3. Start the development servers and dependencies

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

Running the following command will make MongoDB available at `mongodb://localhost:27017/`

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
