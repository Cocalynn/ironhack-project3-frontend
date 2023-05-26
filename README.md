# BrainBounce 🧠


## Description

Brainbounce is an online learning platform that democratizes education by making it accessible to everyone, everywhere, much like Udemy. It offers a wide variety of courses across diverse fields such as technology, business, arts, language, and personal development. Designed for self-paced learning, Brainbounce hosts expert-led courses that range from beginner to advanced levels. With Brainbounce, you can learn at your own rhythm, track your progress, and engage with instructors and peers. Whether you're seeking professional development or personal enrichment, Brainbounce provides the tools and resources you need to achieve your learning goals.

## Getting Started
Clone the repository to your local machine and run npm install to install all the dependencies mentioned in the package.json file.

```bash
git clone <repository_url>
cd ironhack-project3-frontend
npm install
```

## Running the Application
Use the following commands to run the application:

- To start the application:
```bash
npm start
```
- To build the application:
```bash
npm run build
```
- To test the application:
```bash
npm run test
```

## MVP (DOM)

- User authentication and authorization
  - Log in and sign up
  - Google, Amazon anf Facebook log in option
  - Email verification after signing up
  - Forget password option
  - Profile image and nick name personalization
- For Lecturer: Upload new courses and chapters
- For User: 
  - Browse, buy and learn courses 
  - Track course learning progress
  - Add courses to wishlist
- User-friendly and visually appealing interface

## Backlog
- Personalized course recommendation based on tags and interests

## Data Structure

```bash
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── robots.txt
└── src
    ├── App.js
    ├── actions
    │   └── session.js
    ├── assets
    │   └── images
    │       ├── bb-logo.png
    │       ├── course-default-image.webp
    │       ├── default-profile-img.png
    │       └── form-header.png
    ├── components
    │   ├── CourseCard.jsx
    │   ├── CourseProgress.jsx
    │   ├── CourseSearch.jsx
    │   ├── FootBar.jsx
    │   ├── NavBar.jsx
    │   ├── RegisteredCourseCard.jsx
    │   ├── ReviewForm.jsx
    │   ├── Reviews.jsx
    │   ├── VideoPlayer.jsx
    │   └── WishlistCourseCard.jsx
    ├── config
    │   └── app-config.json
    ├── constants
    │   └── actionTypes.js
    ├── index.css
    ├── index.js
    ├── lib
    │   └── cognitoUtils.js
    ├── pages
    │   ├── AddChapterPage.jsx
    │   ├── AddCoursePage.jsx
    │   ├── AllCoursesPage.jsx
    │   ├── Callback.jsx
    │   ├── ChapterPage.jsx
    │   ├── CoursePage.jsx
    │   ├── ErrorPage.jsx
    │   ├── GuestHomePage.jsx
    │   ├── Home.jsx
    │   ├── LecturerPage.jsx
    │   ├── UserProfile.jsx
    │   └── test.jsx
    ├── reducers
    │   ├── index.js
    │   └── session.js
    └── store
        └── index.js

```


## Links

### Git
URls for the project repo and deploy

Frontend Repo: [https://github.com/Cocalynn/ironhack-project3-frontend](https://github.com/Cocalynn/ironhack-project3-frontend)

Frontend Deployment: [https://friendly-hare-pea-coat.cyclic.app/](https://main--harmonious-starburst-2c594b.netlify.app/)

### Slides
URls for the project presentation (slides)
https://docs.google.com/presentation/d/1XV2WaztX_9gsycxm_wHe87VRQRBks2DWD_q77r7Mun4/edit#slide=id.g24b3049221b_0_10




### Main Dependencies: 

Here are some of the key dependencies used in Brainbounce:

- React for building the user interface.
- AWS SDK, Amazon Cognito Auth JS and Amazon Cognito Identity JS for AWS services.
- Axios for promise-based HTTP client for the browser and node.js.
- Redux and Redux Thunk for state management.
- React Router Dom for routing.
- React Bootstrap and Material UI for UI components.
- jsPDF for generating PDF files.
- React Player for playing a variety of URLs including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion.
- Emotion for CSS-in-JS styling.


### Contact: 

If you have any questions, feel free to open an issue in this repository.

Enjoy using Brainbounce!
