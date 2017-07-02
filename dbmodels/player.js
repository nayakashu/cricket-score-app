/**
 * player.js -> Mongoose schema for "players" collection
 */

/**
 * Setup Mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Players Schema
 */
var PlayerSchema = new Schema({
    PlayerName: String,
    ODIStats: Object,
    TestStats: Object,
    T20Stats: Object
});

module.exports = mongoose.model('player', PlayerSchema, 'players');