# Back Repository

---

###### update 24/02/2023

##### we made a deploying for this repo `https://back-ph2h.onrender.com/jobs`

---

### There json files in `json` folder can import them and run with `Insomia` or `Postman` to test the apis

---

###### Explanation for the way and the request method and if there is any header or json data

### Customer chat

#### validation pattern

```
message ['string',required]
```

```
POST https://back-ph2h.onrender.com/chat
Content-Type: application/json

{
    "message":"what if my visa not workig correctly"
}
```

## Job posts

##### get all jobs with default (page=1, limit =10, sort=created_at, descending order ,skills =ALL)

```
GET  https://back-ph2h.onrender.com/jobs/
```

##### search for a word in the job name or the job description

```
GET  https://back-ph2h.onrender.com/jobs/?search=word
```

##### for change the limit of jobs which want to return

```
GET  https://back-ph2h.onrender.com/jobs/?limit=3
```

##### for change the page of the jobs we work on

```
GET  https://back-ph2h.onrender.com/jobs/?page=2
```

##### to filter the jobs with a certain skill or more

```
GET  https://back-ph2h.onrender.com/jobs/?skills=sum,add
```

##### to filter the jobs with a job type

```
GET  https://back-ph2h.onrender.com/jobs/?job_type=full-time,part-time,service
```

##### to filter the jobs with a job city(location)

```
GET  https://back-ph2h.onrender.com/jobs/?city=tanta
```

##### to sort the jobs by specific column and ascending order

```
GET  https://back-ph2h.onrender.com/jobs/?sort=job_name,asc
```

##### to sort the jobs by specific column and (default descending order)

```
GET  https://back-ph2h.onrender.com/jobs/?sort=job_name
```

##### let's merge all this attributes into one

```
GET  https://back-ph2h.onrender.com/jobs/?page=4&limit=3&skills=sum,add&sort=job_name,asc&search=calc
```

---

##### Get specific job with its comments and replies

```
GET  https://back-ph2h.onrender.com/jobs/63a1dbb8b4a47f5e085b9dbf
```

#### get all skills

```
GET https://back-ph2h.onrender.com/jobs/skills
```

#### get all egypt cities

```
GET https://back-ph2h.onrender.com/cities
```

#### get all user

```
GET https://back-ph2h.onrender.com/user
```

#### related

```

GET https://back-ph2h.onrender.com/jobs/related
```

#### get specific

```
                                        /-------user id --------/
GET https://back-ph2h.onrender.com/user/6449249fe8392437d61826ff
```

#### get user profile

##### (user details, jobs that the user has posted, jobs that the user had been accepted for, rates and feeback for the user)

```
                                                /-------user id --------/
GET https://back-ph2h.onrender.com/user/profile/6449249fe8392437d61826ff
```

##### Create new job

###### Creating job validation pattern

```
    title (string => "test name", required),
    description (string => "test description", required),
    type (string => "full-time", required),
    salary (string => "100", required),
    skills (array of strings => ["skill 1","skill 2"], required),

    location (string => "cairo", optional),
    required_experience (string => "beginner"-"intermediate"-"expert" , optional)
    duration (string => "20", optional),
    images (images => one or multiple images,optional)
```

```
POST https://back-ph2h.onrender.com/jobs/
Content-Type: application/json

{
  "title": "test autherization",
  "description": "barista autherization.",
  "skills": [
    "noop"
  ],
  "type": "part-time",
  "location": "test",
  "salary": "500",
  "duration": "2",
}
```

##### Delete job

```
DELETE https://back-ph2h.onrender.com/jobs/63a1e1aced38843b5f4a3512
```

##### Update job

##### Updating job validation pattern

```
   title (string => "test name", optional),
    description (string => "test description", optional),
    skills (array => ["test skill 1","test skill 2"], optional),
    type (string => "full-time", optional),
    location (string => "cairo", optional),
    required_experience (string => "beginner", optional)
    salary (string => "100", optional),
    duration (string => "20", optional),
    images (images => one or multiple images,optional),
    is_active (boolean => true, optional)
    is_hidden (boolean => true, optional)
```

```
PATCH https://back-ph2h.onrender.com/jobs/63b604852e043ba4d05c2469
Content-Type: application/json

{
"title" : "job name",
"type": "full-time"
}
```

---

## Authentication

#### Signup user validation pattern

```
fields required:

    f_name (string, required),
    l_name (string, required),
    email (string[correct email], required),
    password (string, required),
    confirm_password (string, required),

    phone (string, optional),
    gender (string, optional),
    age (number, optional),
    city (string, optional),
    country (string, optional),
    past_experience (string, optional)
    skills (array, optional),
```

#### signup

```
POST  https://back-ph2h.onrender.com/signup
Content-Type: application/json

{
    "f_name": "Mahmoud",
    "l_name": "Mosbah",
    "email": "xmosb7@gmail.com",
    "password": "12345678",
    "confirm_password": "12345678",
    "phone": "01210662977",
    "gender" : "male"
}
```

#### login

```
POST  https://back-ph2h.onrender.com/login
Content-Type: application/json

{
  "email":"test",
  "password":"test"
}
```

#### to access secure path as (/user/profile) require authentication

```
GET  https://back-ph2h.onrender.com/user/profile/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0NGJlMjU0NDAwNDAzOTJjMGRiYTUyNSIsImVtYWlsIjoidGVzdDIiLCJ1c2VybmFtZSI6InRlc3QtdXNlciIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTY4Mjg1MDI3N30.ZGzWfFVGZcOJNSjOQ64s2AHPMvFh0-oGl9RKd8E29dY
```

### upload only user profile image

```
POST https://back-ph2h.onrender.com/upload/profile/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0NGJlMjU0NDAwNDAzOTJjMGRiYTUyNSIsImVtYWlsIjoidGVzdDIiLCJ1c2VybmFtZSI6InRlc3QtdXNlciIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTY4Mjg1MDI3N30.ZGzWfFVGZcOJNSjOQ64s2AHPMvFh0-oGl9RKd8E29dY

attach the image as 'images'
[![img.png](img.png)]

```

### upload only user card id image

```
POST https://back-ph2h.onrender.com/upload/id/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0NGJlMjU0NDAwNDAzOTJjMGRiYTUyNSIsImVtYWlsIjoidGVzdDIiLCJ1c2VybmFtZSI6InRlc3QtdXNlciIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTY4Mjg1MDI3N30.ZGzWfFVGZcOJNSjOQ64s2AHPMvFh0-oGl9RKd8E29dY

attach the image as 'images'
[![img.png](img.png)]

```

---

## Comments & replies

#### create a comment for a job post (require authentication)

```
                                            /---------job_id---------/
POST  https://back-ph2h.onrender.com/comment/643ff4d6e008206b6ecae1fd/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0NGJlMjU0NDAwNDAzOTJjMGRiYTUyNSIsImVtYWlsIjoidGVzdDIiLCJ1c2VybmFtZSI6InRlc3QtdXNlciIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTY4Mjg1MDI3N30.ZGzWfFVGZcOJNSjOQ64s2AHPMvFh0-oGl9RKd8E29dY
Content-Type: application/json

{
"content":"test-comment"
}
```

#### create a reply for specific comment for a job post (require authentication)

```
                                            /------comment_id--------/
POST  https://back-ph2h.onrender.com/comment/644e3d2b6e5c5b8ee0a665e8/reply/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0NGJlMjU0NDAwNDAzOTJjMGRiYTUyNSIsImVtYWlsIjoidGVzdDIiLCJ1c2VybmFtZSI6InRlc3QtdXNlciIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTY4Mjg1MDI3N30.ZGzWfFVGZcOJNSjOQ64s2AHPMvFh0-oGl9RKd8E29dY
Content-Type: application/json

{
"content":"test-reply"
}
```

---

### Rate [require authentication]

##### fields required for rating from worker for the job and the owner

```
    rating [int, required]
    feedback [string, optional]
```

### rating from worker for the job and the owner [need authentication]

```
                /-------job id --------/
POST /rate/job/6463b901b377ff4bae1c9c1a
Content-Type: application/json

{
	"rating":5,
	"feedback":"nice job, cute owner"
}

```

##### fields required for rating from owner for the user

```
    rating [int, required]
    feedback [string, optional]
```

### rating from owner for the user

```
                /-------- job id --------/
POST /rate/user/6461757025d3b22292e0b2a6
Content-Type: application/json

{
	"rating":5,
	"feedback":"nice job"
}


```

---

---

### Offers / applies

##### fields required for making offer

```
    price [string, required]
    message [string, optional]
```

### create offer / apply for specific job

```
                  /--------job id --------/
POST /offer/apply/6461757025d3b22292e0b2a6
Content-Type: application/json

{
    "price": "5"
}
```

### accept specific offer

```
                   /------ offer id ------/
POST /offer/accept/6496dfef6feefd920273f024

```

### get all offers for all jobs

```
GET /offer/
```

### get all offers for present user

```
GET /offer/user
```

### get all offers for specific job

```
               /------ job id ------/
GET /offer/job/64954e48bb4c768655bba547
```

### get specific offer

```
           /------ offer id ------/
GET /offer/6496dfef6feefd920273f024
```

[//]: # "### get all offers for specific user"
[//]: # "```"
[//]: #
[//]: #
[//]: # "```"

### delete specific offer

```
              /------ offer id ------/
DELETE /offer/6496dfef6feefd920273f024

```

### admin panel request (need authentication & admin privilege)

```
GET /admin

```

### admin to upgrade an user privilege to admin privilege

```
                         /----- user id ----------/
POST /admin/user/upgrade/6496dfef6feefd920273f024
```

### admin to upgrade other admin privilege to user privilege

```
                           /----- user id ----------/
POST /admin/user/downgrade/6496dfef6feefd920273f024
```

### admin to block a user

```
                       /----- user id ----------/
POST /admin/user/block/6496dfef6feefd920273f024
```

### admin to unblock a user

```
                         /----- user id ----------/
POST /admin/user/unblock/6496dfef6feefd920273f024
```

### admin to delete(actually hidden & block) a user account

```
                         /----- user id ----------/
POST /admin/user/unblock/6496dfef6feefd920273f024
```

### admin to delete a job

```
                       /----- job id ----------/
POST /admin/job/delete/6496dfef6feefd920273f024
```

### admin to delete a job & the owner

```
                            /----- job id ----------/
POST /admin/job/delete_both/6496dfef6feefd920273f024
```

---

### chatgpt API

```
POST /chat

```

---

#### the profile api contains :

## getting one profile (by direct click on the user_name or by search method) (get)

```
- https://back-ph2h.onrender.com/profile/64a37fe71eb603da27a61e72
```

## updating the user profile (patch)

```
- https://back-ph2h.onrender.com/profile/64a37fe71eb603da27a61e72
- {
  "phone":"5555555"
  }
```

## getting all the profiles (only by admin)(not accessable by this user )

```
- https://back-ph2h.onrender.com/profile/
```

### deleting user profile (only by admin)

```
https://back-ph2h.onrender.com/profile/the user id

```

##### the conversation api contains

1-starting a conversation between two users and send the first message between them
(requires the id of the 2 users and the message in the body)

2-send messeges insdie the conversation and saving it
(requires the id of the sender , the conversationId and the message )

3- getting all the conversation content (by click on the user name to open his chat head)
(requires the id of the conversation in the params )
4- getting all the user chats
(requires the id of the user in the params )

##### start a conversation between two users and send the first message :

```
post request :
https://back-ph2h.onrender.com/conversation/first_message


in the body of this request you should provide :
{
"senderId":"6463b901b377ff4bae1c9c1a",
"receiverId":"6450ca3370ca0d14ce63542d",
"text" :"heyy this is my second mrssage as a reply"
}



```

### to send messeges insdie the conversation

```
post request
https://back-ph2h.onrender.com/conversation/new_message

in the body of this request you should provide :
{
"sender":"64500e8576088eaedd21fff0",
"conversationId":"6465190867734265dde8bfb9",
"text" :"heyy this is my third mrssage"
}
```

### to get the conversation content (messeges)

```
get request "/conversation/:conversationId"
https://back-ph2h.onrender.com/conversation/6465190867734265dde8bfb9
```

### to get all the user chats

```
get request "/conversation/chats/:userId"
https://back-ph2h.onrender.com/conversation/chats/6463b901b377ff4bae1c9c1a
```

#### to report a job post

```
post request "/report/reported_jobs/64a893b7205107f13de57c2d"

the body should have :
{
"report_messages":"this doesn't make sense to me",
}

```

#### to report a user

```
post request "/report/report_user/64a8b01ba074b1554a7dc4c5"

the body should have :
{
"report_messages":"this user violates the service conditions",
"reporterId":"64a8b01ba074b1554a7dc4c5"
}
```

#### and for the admin he can get the reported users or the repoted job posts :

### to get the reported job posts :

```
get request "/report/reported_jobs"
```

### to get the reported users :

```
get request "/report/reported_users"
```

### change the job status :

```
post request "/jobs/update_status/64a89e201697e8996e61bbed"

with a body content of :
{
"is_finished":"true"
}
```
