# Back Repository

---
###### update 24/02/2023
##### we made a deploying for this repo `https://back-ph2h.onrender.com/jobs`

---

###  There json files in ```json``` folder can import them and run with ```Insomia``` or ```Postman``` to test the apis

---
###### Explanation for the way and the request method and if there is any header or json data

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

#### Creating job validation pattern
```
title (string, required),
description (string, required),
skills (array, required),
type (string['full time', 'part time', 'service'], required),
location (string, required),
salary (integer, required),
duration (integer, required),
```


##### Create new job

```
POST https://back-ph2h.onrender.com/jobs/
Content-Type: application/json

{
  "posted_by_id": "2",
  "job_name": "cashier job",
  "job_description": "i need a calculator man.",
  "job_skills": [
    "calc",
    "sum",
    "add"
  ],
  "job_type": "part job",
  "job_location": "test",
  "salary": "50",
  "job_duration": "2 hours",
  "job_img_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
}
```

##### Delete job

```
DELETE https://back-ph2h.onrender.com/jobs/63a1e1aced38843b5f4a3512
```

##### Update job

```
PATCH https://back-ph2h.onrender.com/jobs/63b604852e043ba4d05c2469
Content-Type: application/json

{
"is_active" : false,
"job_name": "Test Name changed"
}
```

---
## Authentication

#### Signup user validation pattern
```
f_name (string, required),
l_name (string, required),
email (string[correct email], required),
password (string, required),
confirm_password (string, required),
phone (string, required),
city (string, optional),
country (string, optional),
age (integer, optional),
gender (string, required),
past_experience (string, optional),
skills (array, required),
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

---

#### the profile api contains :

- getting one profile (by direct click on the user_name or by search method)
- updating the user profile
- getting all the profiles (only by admin)
- deleting user profile (only by admin)
- creating a new profile (only in sign up)

### get all profiles for admin :
```
get request
https://jobseeker-profile-api.onrender.com/profile
```
##### get one profile :
```
get request
https://jobseeker-profile-api.onrender.com/profile/6403c7ddc6e353894f3ae9e8
```
##### update user profile :
```
https://jobseeker-profile-api.onrender.com/profile/6403c7ddc6e353894f3ae9e8
content type : application/json

patch request
{
"userName": "our best user",
"bio": " test test test ",
}
```
##### create new profile with signUp
```
https://jobseeker-profile-api.onrender.com/profile

post request
{
"userName": "khaled yasser",
"bio": "i'am a professional photographer",
"age": 23,
"location": "tanta",
"skills": [
"wedding,party,product marketing"
],
"past_jobs": ["i have worked as a photographer for my shot company for two years"],
}
```

##### delete user profile for admin :

```
delete request
https://jobseeker-profile-api.onrender.com/profile/64025a13ce6b430d475f250a
```

