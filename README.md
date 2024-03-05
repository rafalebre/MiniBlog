# MiniBLOG

## Description

MiniBLOG is a lightweight blogging platform that allows users to share photos via URLs, providing titles, descriptions, and tagging each post with relevant keywords. Designed for simplicity, it does not support user interactions with posts beyond viewing detailed information by opening the photo to access the descriptive text. It features a search tool that matches words exactly as tagged, enhancing the user experience by filtering content through tags.

## Features

- **User Authentication**: Secure sign-up and login functionality powered by Firebase.
- **Post Creation**: Users can share photos by submitting URLs, along with titles, descriptions, and multiple tags for each post.
- **Search Functionality**: A search tool that allows users to find posts by matching exact tags.
- **User Dashboard**: A dashboard for users to view and edit their own posts.

## Technology Stack

- **Frontend**: React (utilizing context, router, hooks, and more)
- **Backend**: Firebase for user authentication and Firestore as the database solution.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- A Firebase account.

### Setup

1. Clone this repository to your local machine:
git clone https://github.com/rafalebre/MiniBlog.git

2. Navigate to the project directory and install dependencies:
cd MiniBlog
npm install

3. Set up Firebase:
- Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
- Add a web app to your Firebase project and get your Firebase configuration object.

### Configuring Firebase

1. Inside the `src/firebase` directory of your project, create a file named `config.js`.
2. Use the Firebase configuration object you obtained from adding a web app to your Firebase project. It should look similar to this:

 ```js
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";

 const firebaseConfig = {
   apiKey: "your-apiKey",
   authDomain: "your-authDomain",
   projectId: "your-projectId",
   storageBucket: "your-storageBucket",
   messagingSenderId: "your-messagingSenderId",
   appId: "your-appId"
 };

 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

 export { db };
 ```

 Replace the placeholder values with your actual Firebase config values.

### Running the Application

After configuring Firebase, you can start the application by running:
npm start


This will launch the MiniBLOG on `http://localhost:3000`.

## Screenshots

### Home Page for a Logged-In User
![Home Page](https://github.com/rafalebre/MiniBlog/blob/main/screenshots/Screenshot%202024-03-05%20at%2018.28.38.png)

### Post Creation Form
![Create Post Form](https://github.com/rafalebre/MiniBlog/blob/main/screenshots/Screenshot%202024-03-05%20at%2018.28.48.png)

### User Dashboard with Edit Options
![Dashboard](https://github.com/rafalebre/MiniBlog/blob/main/screenshots/Screenshot%202024-03-05%20at%2018.28.59.png)

## Contribution

This project was created as a learning endeavor, and I'm open to anyone who wishes to contribute or fork the repository to expand on the MiniBLOG. Feel free to send pull requests or create issues for any bugs you find or features you think would make a great addition.

## Contact

For any queries or suggestions, feel free to reach out through GitHub.

.
.
.
.
.
.
.
.
.
.
.

# EXTRAS
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
