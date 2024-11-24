# Trood Test - Frontend

## Overview

This project is a **Single Page Application (SPA)** that allows users to manage their profile. The profile data is saved locally using `localStorage`. The application is deployed on GitHub Pages and can be accessed here:

👉 [Live Demo](https://vivinohradova.github.io/trood-test/)

## Features

- Fully functional **SPA** using modern frontend technologies.
- **Profile management** with data persistence using `localStorage`.
- Clean and responsive user interface.

## Technologies Used

- **React**: For building the user interface.
- **CSS and Sass**: For styling and preprocessing styles.
- **localStorage**: For storing and retrieving user data locally.
- **gh-pages**: For deployment to GitHub Pages.

## Dependencies

The project uses the following dependencies:

- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-icons`: ^5.3.0
- `react-scripts`: 5.0.1
- `sass`: ^1.81.0
- `web-vitals`: ^2.1.4
- `gh-pages`: ^6.2.0

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/vivinohradova/trood-test.git
   ```

2. Navigate to the project directory:
   ``` 
   cd trood-test
   ```

3. Install dependencies:
   ``` 
   npm install
   ```

4. Start the development server:
   ``` 
   npm start
   ```

5. Open the application in your browser at:
  ``` 
  http://localhost:3000
  ```

## Deployment

The project is deployed using gh-pages. To deploy changes to GitHub Pages, follow these steps:

1. Build the project:
   ``` 
   npm run build
   ```

2. Deploy to GitHub Pages:
   ``` 
   npm run deploy
   ```
Note: Ensure that your package.json is properly configured for gh-pages deployment, including setting the homepage field, and make sure the gh-pages dependency is installed.