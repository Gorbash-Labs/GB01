## Overview / Vision
Goru is made to be a community resource for sharing reviews, advice, code snipets, and offers to help for public APIs and other technologies.
There is a directory of "Technologies" with a link to the main page, link to an image, and brief description.
Each Tech can have many "Posts" which are user-submitted content to help others who might be interested. Posts are markdown enabled and can show code blocks. Front-end code allows image uploading and display, though the back end doesn't actually handle them correctly.
User accounts track user submissions and may provide contact information.

## Current Status
The core backend routes are hooked up and working with the database. The server provides all techs on load, all info + posts for a tech when queried, takes submissions for either type, and is set up to handle user authorization/authentication. Images are not handled.
The front-end has a number of loose ends that are not hooked up or have some problems. 


## Known Issues // Unreached Goals
- Post submission is currently broken. The state tracking for entry text may crashing with the fancy text entry box. (We've also not chased down how the syntax on that box comes through. The front-end will render Markdown, so that would be ideal, but users could write raw markdown into the submission field as well.)
- User account creation and log in are not set up on the front end.  Cookie authorization is not tested. Currently everything is public and tracking uploader / userId is incomplete.
- Post edit/deletion are not hooked up on the back end or front end.
- Some var names are inconsistent throughout the app. Failed communication between front/server/db often means a var name is different somewhere.
- Several db values (keywords, language) are set up to cross-reference with an explicitly enforced list in the db side. These could be a pulldown menu on the front end to ensure the available values are chosen or re-written to be handled some other way.
- Tags for techs ('library' 'api') and posts ('review', 'tech advice') are not set up on the front end, for creating or viewing.



## Back-End Routes 
(vars in all caps, tabbed items haven't been implemetned on back end)

GET /api/tech -- return list of all techs
GET /api/tech/TECH_ID -- return a particular tech
  GET /api/tech/search?keywords=SEARCH_TERMS -- return all matching techList
GET /api/tech/posts/TECH_ID -- return all posts matching tech

GET /api/post/POST_ID -- return a particular post
  GET /api/post/posts-by-user/USER_ID -- return all posts by 1 user

  GET /api/user/USER_ID -- get all info on a user as {user, posts}

POST /api/user/login -- try to log user in (sends cookies)
POST /api/tech -- add a new tech with attached info
POST /api/post -- add new post with attached info
  PUT /api/post/POST_ID -- update 1 post with attached info
  DELETE /api/post/POST_ID -- delete 1 post
POST /api/user/newuser -- create a new user with attached info


## Data Structures

user-class-example
{
  userId: number,
  username: string,
  password: string, //hashed+salted
  contact: string,
  permissions: number, //0 for everyone
  organizationId: number, //1 for everyone while all on ctri17
}

tech-class-example
{
  techId: number
  name: string,
  typeApi: bool,
  typeFramework: bool,
  typeLibrary: bool,
  link: string,
  description: string
  image: string, //link to image
  keywords: [string], // array of strings parsed through a separate lookup table
}

post-class-example
{
  postId: number,
  techId: number, <- are we hard coding this id in the frontend? i feel not
  userId: number,
  typeReview: bool,
  typeAdvice: false,
  typeCodeSnippet: false,
  typeHelpOffer: false,
  language: string,
  title: string,  <- frontend sends string back to backend for id conversion
  comment: string,
  image: string,
}

## Cookies & Authentication:
- Create Username + Password (stored as plaintext strings in DB)
- UserID stored as cookie: "SSID": UserId (number from db)
  - res.cookie("SSID", DB_USERS_USERID, {maxAge: 90000, httpOnly: true})
- Authentication: Require user+password to get updated cookie
- Authorization to Edit/Delete: Require matching SSID
- Logout: cookies.set('SSID',{expires: new Date(0)});
- Status: code is bypassed in middleware routes and not used for authentication.

