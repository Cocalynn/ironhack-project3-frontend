# BrainBounce 🧠


## Description

Brainbounce is an online learning platform that democratizes education by making it accessible to everyone, everywhere, much like Udemy. It offers a wide variety of courses across diverse fields such as technology, business, arts, language, and personal development. Designed for self-paced learning, Brainbounce hosts expert-led courses that range from beginner to advanced levels. With Brainbounce, you can learn at your own rhythm, track your progress, and engage with instructors and peers. Whether you're seeking professional development or personal enrichment, Brainbounce provides the tools and resources you need to achieve your learning goals. 

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



### Library resource: 

