# stack-route-cricket-app
Cricket App for Stack Route Assignment

***********************************************************************************************************
For testing the back-end APIs, the following instructions can be followed.

** Need a API testing client like Postman or DHC **

There are three APIs.

1. For adding a new player
 
Request: POST
Request URL: https://stackroutecricket.herokuapp.com/api/addPlayer
Request Body: 

{
    "PlayerName": "TestPlayer",
    "ODIStats": {
    	"Batting": 60,
    	"Bowling": 20,
    	"Catching": 30
    },
    "TestStats": {
    	"Batting": 80,
    	"Bowling": 15,
    	"Catching": 40
    },
    "T20Stats": {
    	"Batting": 40,
    	"Bowling": 10,
    	"Catching": 45
    }
}

2. For getting the details of players

Request: GET
Request URL: https://stackroutecricket.herokuapp.com/api/getPlayers

3. For getting the player details by searching with player ID

Request: GET
Request URL: https://stackroutecricket.herokuapp.com/api/searchPlayer/5958afd52902671ce409978f

***********************************************************************************************************
