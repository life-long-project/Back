## Back

#### update 24/02/2023

we made a deploying for this repo
` https://back-ph2h.onrender.com/jobs `
<br>
<br>

#### explanation for the way and the request method and if there is any header or json data

---
##### get all jobs with default (page=1, limit =10, sort=created_at, descending order ,skills =ALL)
```
GET  http://back-ph2h.onrender.com/jobs/
```
---

* let's list our attributes which can provide in our api
##### search for a word in the job name or the job description
```
GET  http://back-ph2h.onrender.com/jobs/?search=word
```
##### for change the limit of jobs which want to return
```
GET  http://back-ph2h.onrender.com/jobs/?limit=3
```
##### for change the page of the jobs we work on
```
GET  http://back-ph2h.onrender.com/jobs/?page=2
```
##### to filter the jobs with a certain skill or more
```
GET  http://back-ph2h.onrender.com/jobs/?skills=sum,add
```
##### to sort the jobs by specific column and ascending order
```
GET  http://back-ph2h.onrender.com/jobs/?sort=job_name,asc
```
##### to sort the jobs by specific column and (default descending order)
```
GET  http://back-ph2h.onrender.com/jobs/?sort=job_name
```

##### let's merge all this attributes into one
```
GET  http://back-ph2h.onrender.com/jobs/?page=4&limit=3&skills=sum,add&sort=job_name,asc&search=calc
```

---
##### Get scpecific job
```
GET  http://back-ph2h.onrender.com/jobs/63a1dbb8b4a47f5e085b9dbf
```

##### Create new job
```
POST http://back-ph2h.onrender.com/jobs/
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
DELETE http://back-ph2h.onrender.com/jobs/63a1e1aced38843b5f4a3512
```
##### Update job
```
PATCH http://back-ph2h.onrender.com/jobs/63b604852e043ba4d05c2469
Content-Type: application/json

{
"is_active" : false,
"job_name": "Test Name changed"
}

```




