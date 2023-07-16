/*
USER

userId: auto generated* (required)
username: string   (required)
password: string // hashed + salt     (required)
Contact: string   
permissions: smallInt // 0 = default user permission  (required)
organizationID: COMMUNITY_communityId = 1
*/

/*
COMMUNITY

communityId: number auto-generated (required)
name: string (e.g CTRI17)
*/

/*
TECHONOLOY

technologyID: number auto generated*
name: string (required)
type-api: false   
type-framwork: false 
type-library: false
link: http site link
description: string (300 letters)   (required) 
image: hot link or a file link    (required)

*/

/*
TECH-LOOKUP-KEY-WORDS
uniqueId: 
techId: TECHNOLOGY_technologyID
keyword: string //map, location, pin, find, directions, car, drive
*/

/*
POST

postId: number  (required)
technologyId: number (required)
userId: USER_userId number (required)
type-review: false
type-advice: false
type-codeSnippet: false
type-helpOffer: false 
language: LANGUAGE_langId (required)
title: string
comment: string (5,000 chars) (required)
image: aws bucket (stretch goal)
*/

/*
LANGUAGE
language_id: number  (required)
name:  string
*/

/*
SESSION

OAuth: 
*/
