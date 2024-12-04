**Meeting Summary**  
Date & Time: Nov 27, 2024, 4:30 PM \- 5:30 PM

**Participants**:  
Carson Hom  
Yousif Kndkji  
Kanwar Partap Pannu  
Andrew Peter

Sprint Goal: Enhance user accessibility features by implementing and testing the recipe filter system and integrating AI recipe chef.

**Sprint Goals**

-   Implement dietary restriction filters in the recipe search engine.
-   Add AI Chef feature.
-   Conduct usability testing for accessibility features.

**Team Capacity**

-   Carson: 10 hours/week
-   Yousif: 10 hours/week
-   Kanwar: 10 hours/week
-   Andrew: 10 hours/week
-   Total Team Capacity: 40 hours.

**Spikes**

-   Research and select a secure library for user authentication (e.g., Firebase, OAuth2).
-   Explore AI models for generating recipe suggestions (GPT-based or custom ML models).

**Decisions on User Stories**

-   User Authentication:
    -   As a user, I want to sign up and log in securely so that I can save my preferences.
    -   Acceptance Criteria:
        -   Users can register with email and password.
        -   Passwords are securely hashed.
        -   Users can log in, log out, and recover passwords.
-   Search Engine:
    -   As a user, I want to search for recipes based on keywords and filters so that I can quickly find what I need.
    -   Acceptance Criteria:
        -   Search bar for keywords.
        -   Filters for cuisine type, prep time, and difficulty.
        -   Display of paginated results.
-   Recipe AI Chef:
    -   As a user, I want the app to suggest recipes based on ingredients I have so that I can make something without extra shopping.
    -   Acceptance Criteria:
        -   Users can input a list of ingredients.
        -   AI provides 3 recipe suggestions.
        -   Recipes include titles, brief descriptions, and preparation time.

**Task Breakdown**

User Authentication:

-   Frontend:
    -   Design login and signup forms
    -   Connect forms to backend APIs
-   Backend:
    -   Implement user registration, login, and password recovery APIs
    -   Set up secure database for user credentials

Search Engine:

-   Frontend:
    -   Develop search bar and filters UI
    -   Display search results in a grid layout
-   Backend:
    -   Implement keyword-based search and filtering logic

Recipe AI Chef:

-   Frontend:
    -   Create an ingredient input form
    -   Display AI-generated recipes
-   AI/Backend:
    -   Train a simple recipe-suggestion model
    -   Deploy AI API for recipe generation
