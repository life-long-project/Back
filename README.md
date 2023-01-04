## Back

#### update 1/5/2023

we made a deploying for this repo
` https://back-ph2h.onrender.com/jobs `
<br>
<br>

#### Examples
* explanation for the way and the request method and if there is any header or json data

```
get all jobs
------------
GET  http://back-ph2h.onrender.com/jobs/
```

``` 
search for a word
-----------------
GET  http://back-ph2h.onrender.com/jobs/?q=word
```

```
get scpecific one correct
-------------------------

GET  http://back-ph2h.onrender.com/jobs/63a1dbb8b4a47f5e085b9dbf
```

```
get scpecific one not correct
-----------------------------

GET  http://back-ph2h.onrender.com/jobs/639b7c4511f314399db24111
```

```
create one
----------

POST http://back-ph2h.onrender.com/jobs/
Content-Type: application/json

{
"posted_by_id": 2,
"job_type_id": 2,
"job_description": "i need a professional cashier for 2 days",
"job_location_id": 2
}
```

```
delete one
----------

DELETE http://back-ph2h.onrender.com/jobs/63a1e1aced38843b5f4a3512
```

```
update one
----------

PATCH http://back-ph2h.onrender.com/jobs/63b604852e043ba4d05c2469
Content-Type: application/json

{
"is_active" : false,
"job_name": "Test Name changed"
}

```




