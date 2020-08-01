# AOT F1 Dashboard

## npm Dependencies
- express
- cors
- morgan
- helmet
- dotenv
- monk
- joi or @hapi/joi

## npm Dev Dependencies
- nodemon

## How it's works

you can display every data in mongo db
-GET-
- http://localhost:5000
```JSON
{
    "carInfo": [
        {
        "_id": "5f25a0f43256392960c95ac1",
        "temp": "10"
        }
    ]
}
```

-POST-
- http://localhost:5000/api?temp=10

```JSON
{
    Status : "Success"
}
```
