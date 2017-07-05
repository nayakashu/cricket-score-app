var cricketApp = angular.module('CricketApp', []);

cricketApp.controller('CricketAppController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    var refreshPlayerList = function () {
        var getPlayersURL = apiBaseURL + 'GetPlayers';
        $http.get(getPlayersURL).then(function (response) {
            $scope.allPlayers = response.data;

            // Show details of first player by default
            $scope.selectedPlayer = response.data[0];
            $scope.selectedPlayerID = response.data[0]._id;
        });
    };

    // App Name
    $scope.AppName = "StackRoute Cricket App";

    // Constants
    var apiBaseURL = $location.$$absUrl + 'api/';
    $scope.errorMessage = null;
    $scope.successMessage = null;

    // Get List of all players
    refreshPlayerList();

    // Get data for selected player
    var getPlayerByIDURL = apiBaseURL + 'searchPlayer/';
    $scope.showDetails = function (playerID) {
        $http.get(getPlayerByIDURL + playerID).then(function (response) {
            $scope.selectedPlayer = response.data;

            // Selected player ID
            $scope.selectedPlayerID = response.data._id;
        });
    };

    // Add / Edit Players data
    $scope.saveCricketData = function () {

        $scope.successMessage = null;
        $scope.errorMessage = null;

        if ($scope.playerName == null) {
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

            // Get data for selected player
            var savePlayerData = apiBaseURL + 'addPlayer';

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

            console.log(playerData);

            $http.post(savePlayerData, playerData).then(function (response) {
                // Reset Modal
                resetModal();
                $scope.successMessage = "New player added!";
            }, function (error) {
                $scope.errorMessage = error.data;
            });

        }

    }

    $scope.closeModal = function () {
        resetModal();
        refreshPlayerList();
    }

    var resetModal = function () {
        $scope.playerName = '';
        $scope.successMessage = null;
        $scope.errorMessage = null;
        $scope.odiBat = '';
        $scope.odiBowl = '';
        $scope.odiCatch = '';
        $scope.testCatch = '';
        $scope.testBat = '';
        $scope.testBowl = '';
        $scope.t20Catch = '';
        $scope.t20Bat = '';
        $scope.t20Bowl = '';
    };

}]);