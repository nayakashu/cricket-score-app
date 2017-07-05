# stack-route-cricket-app

***********************************************************************************************************
# Cricket App for Stack Route Assignment
***********************************************************************************************************

# For testing the back-end APIs, the following instructions can be followed.

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

4. For updating the selected player details

Request: PUT
Request URL: https://stackroutecricket.herokuapp.com/api/updatePlayer/5958afd52902671ce409978f

4. For deleting the selected player details

Request: DELETE
Request URL: https://stackroutecricket.herokuapp.com/api/deletePlayer/5958afd52902671ce409978f

***********************************************************************************************************

# Front-End has been created with HTML, CSS, Bootstrap (3.3.7) and Angular JS (1.6.5)
The front-end resources are located inside public folder which is configured as static middleware for express.

The front-end consists of the following.

1. A horizontal banner with the name of the app.
2. A vertical nav-bar list with a searchbox to list and filter the names of the Cricket Players and to select the desired player.
3. A side panel to display the ODI, Test and T20 career stats of the selected player.
4. Buttons to Add, Del or Edit a player.
5. The Add, Del and Edit operations happen through a modal dialog.
6. Form Validation with respective error messages has been implemented for Add / Edit forms.
7. Success and Error messages are dynamically shown in the modal dialog based on the user's operation.

***********************************************************************************************************

# Deployment

1. HerokuApps server has been used to deploy this app.
2. The app URL: https://stackroutecricket.herokuapp.com/
2. The HerokuApps server takes care of installing the dependent node and bower components.
3. npm is used as the package manager for the back-end - node, express, mongodb and mongoose.
4. bower is used as the package manager for the front-end - jQuery, bootstrap and angular.