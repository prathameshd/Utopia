# Profile Services

This repo contains the APIs for User Management Services like setHistoryAndMood, getHistoryAndMood etc.

# API Reference

- Get History and mood (/getHistoryAndMood)
```sh
Type: GET
HEADER: Authorization: Bearer <token>
RESPONSE:
{
    "message": "success",
    "data": [ "history": [{<songObj>}, {}, ..],
            "mood" : [<valence1>, <valence2>, ...]
    ]
}
```

- Set History and mood (/setHistoryAndMood)
```sh
Type: POST
HEADER: Authorization: Bearer <token>
REQUEST:
{
 "songId" : <songIdString>,
 "mood" : <valenceInteger>
}

RESPONSE:
{
    "message" : <successOrError>,
    "data" : [<mongoDB_ResponseObj>]
}
```

- Get Profile details (/getPersonalDetails)
```sh
Type: GET
HEADER: Authorization: Bearer <token>
RESPONSE:
{
    "message": <successOrError>,
    "data": [<userObj>]
}
```
