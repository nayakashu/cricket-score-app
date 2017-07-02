/**
 * playerRouter.js -> API Router for adding and searching a player's details
 */

var express = require('express');

var routes = function(PlayerModel) {
    var playerRouter = express.Router();

    /**
     * Add a new player
     */

    playerRouter.route('/addPlayer')

    .post(function(req, res) {
        var player = new PlayerModel({
            PlayerName: req.body.PlayerName,
            ODIStats: req.body.ODIStats,
            TestStats: req.body.TestStats,
            T20Stats: req.body.T20Stats
        });
        
        player.save(function(err) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.json({ msg: "Player added successfully"});
            }
        });
    })

    .get(function(req, res) {
        res.json({ msg: "GET -> addPlayer"});
    });

    /**
     * Get all players
     */

    playerRouter.route('/getPlayers')

    .get(function(req, res) {
        PlayerModel.find(req.query, function(err, players) {
            if(err) {
                res.status(500).send(err);
            } else {
                if(players.length === 0) {
                    res.json({ msg: "No players found!" });
                } else {
                    res.json(players);
                }
            }
        });
    });

    /**
     * Search a player by PlayerID
     */

    playerRouter.route('/searchPlayer/:PlayerID')

    .get(function(req, res) {
        PlayerModel.findById(req.params.PlayerID, function(err, player) {
            if(err) {
                res.status(500).send(err);
            } else {
                if(player === null) {
                    res.json({ msg: "No player found for this ID!" });
                } else {
                    res.json(player);
                }
            }
        });
    });

    return playerRouter;
};

module.exports = routes;