var cricketApp = angular.module('CricketApp', []);

cricketApp.controller('CricketAppController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    /**
     * Getting the list of player names
     */
    var refreshPlayerList = function () {
        var getPlayersURL = apiBaseURL + 'GetPlayers';
        $http.get(getPlayersURL).then(function (response) {
            $scope.allPlayers = response.data;

            /**
             * Show details of first player by default
             */
            $scope.selectedPlayer = response.data[0];
            $scope.selectedPlayerID = response.data[0]._id;
        });
    };

    var resetModal = function () {
        $scope.successMessage = null;
        $scope.errorMessage = null;
        $scope.deleteDisabled = false;
        $scope.playerAdded = false;

        $scope.playerName = '';
        
        $scope.odiBat = '';
        $scope.odiBowl = '';
        $scope.odiCatch = '';

        $scope.testBat = '';
        $scope.testBowl = '';
        $scope.testCatch = '';
        
        $scope.t20Bat = '';
        $scope.t20Bowl = '';
        $scope.t20Catch = '';
    };

    /**
     * App Name
     */
    $scope.AppName = "StackRoute Cricket App";

    /**
     * Constants
     */
    var apiBaseURL = $location.$$absUrl + 'api/';

    /**
     * Reset Modal
     */
    resetModal();

    /**
     * Get List of all players
     */
    refreshPlayerList();

    /**
     * Get data for the selected player
     */
    var getPlayerByIDURL = apiBaseURL + 'searchPlayer/';
    $scope.getPlayerDetails = function (playerID) {
        $http.get(getPlayerByIDURL + playerID).then(function (response) {
            $scope.selectedPlayer = response.data;

            /**
             * Selected player ID
             */
            $scope.selectedPlayerID = response.data._id;
        });
    };

    /**
     * Add / Edit Players data
     */
    $scope.saveCricketData = function () {

        $scope.successMessage = null;
        $scope.errorMessage = null;

        if ($scope.playerName.length == 0) {
            $scope.errorMessage = "Please provide player name";
            return;
        } else {
            if ($scope.odiBat == null || !Number.isInteger($scope.odiBat) || $scope.odiBat < 0) {
                $scope.errorMessage = "ODI Batting avg is invalid.";
                return;
            }
            if ($scope.odiBowl == null || !Number.isInteger($scope.odiBowl) || $scope.odiBowl < 0) {
                $scope.errorMessage = "ODI Bowling avg is invalid.";
                return;
            }
            if ($scope.odiCatch == null || !Number.isInteger($scope.odiCatch) || $scope.odiCatch < 0) {
                $scope.errorMessage = "ODI Catching avg is invalid.";
                return;
            }

            if ($scope.t20Bat == null || !Number.isInteger($scope.t20Bat) || $scope.t20Bat < 0) {
                $scope.errorMessage = "T20 Batting avg is invalid.";
                return;
            }

            if ($scope.t20Bowl == null || !Number.isInteger($scope.t20Bowl) || $scope.t20Bowl < 0) {
                $scope.errorMessage = "T20 Bowling avg is invalid.";
                return;
            }

            if ($scope.t20Catch == null || !Number.isInteger($scope.t20Catch) || $scope.t20Catch < 0) {
                $scope.errorMessage = "T20 Catching avg is invalid.";
                return;
            }

            if ($scope.testBat == null || !Number.isInteger($scope.testBat) || $scope.testBat < 0) {
                $scope.errorMessage = "Test Batting avg is invalid.";
                return;
            }

            if ($scope.testBowl == null || !Number.isInteger($scope.testBowl) || $scope.odiBat < 0) {
                $scope.errorMessage = "Test Bowling avg is invalid.";
                return;
            }

            if ($scope.testCatch == null || !Number.isInteger($scope.testCatch) || $scope.testCatch < 0) {
                $scope.errorMessage = "Test Catching avg is invalid.";
                return;
            }

            /**
             * Get data for the player to be added / edited
             */
            var playerData = {
                PlayerName: $scope.playerName,
                ODIStats: {
                    Batting: $scope.odiBat,
                    Bowling: $scope.odiBowl,
                    Catching: $scope.odiCatch
                },
                TestStats: {
                    Batting: $scope.testBat,
                    Bowling: $scope.testBowl,
                    Catching: $scope.testCatch
                },
                T20Stats: {
                    Batting: $scope.t20Bat,
                    Bowling: $scope.t20Bowl,
                    Catching: $scope.t20Catch
                }
            };

            if($scope.editPlayerFlag == false) {
                var savePlayerURL = apiBaseURL + 'addPlayer/';
                $http.post(savePlayerURL, playerData).then(function (response) {
                    $scope.successMessage = "New Player Added!";
                    $scope.playerAdded = true;
                }, function (error) {
                    $scope.errorMessage = error.data;
                });
            }
            
            if($scope.editPlayerFlag == true) {
                var editPlayerURL = apiBaseURL + 'updatePlayer/';
                $http.put(editPlayerURL + $scope.selectedPlayer._id, playerData).then(function (response) {
                    $scope.successMessage = "Player Details Updated!";
                }, function (error) {
                    $scope.errorMessage = error.data;
                });
            }
        }
    };
    
    $scope.setAddPlayerFlag = function () {
        resetModal();
        $scope.editPlayerFlag = false;
        $scope.modalTitle = 'Add New Player';
    };

    $scope.editPlayer = function () {
        if($scope.selectedPlayer == null) {
            return;
        } else {
            $scope.successMessage = null;
            $scope.errorMessage = null;

            $scope.playerName = $scope.selectedPlayer.PlayerName;
            
            $scope.odiBat = $scope.selectedPlayer.ODIStats.Batting;
            $scope.odiBowl = $scope.selectedPlayer.ODIStats.Bowling;
            $scope.odiCatch = $scope.selectedPlayer.ODIStats.Catching;

            $scope.testBat = $scope.selectedPlayer.TestStats.Batting;
            $scope.testBowl = $scope.selectedPlayer.TestStats.Bowling;
            $scope.testCatch = $scope.selectedPlayer.TestStats.Catching;
            
            $scope.t20Bat = $scope.selectedPlayer.T20Stats.Batting;
            $scope.t20Bowl = $scope.selectedPlayer.T20Stats.Bowling;
            $scope.t20Catch = $scope.selectedPlayer.T20Stats.Catching;

            $scope.editPlayerFlag = true;
            $scope.modalTitle = 'Edit Player';
        }
    };

    $scope.deletePlayer = function (playerID) {
        var deletePlayerURL = apiBaseURL + 'deletePlayer/';
        $http.delete(deletePlayerURL + playerID).then(function (response) {
            $scope.successMessage = "Player Deleted!";
            $scope.deleteDisabled = true;
            console.log('Player Deleted');
        }, function (error) {
            $scope.errorMessage = error.data;
        });
    };

    $scope.closeModal = function () {
        resetModal();
        refreshPlayerList();
    };
}]);