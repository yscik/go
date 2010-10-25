var sys =   require("sys")
  , player  =   require("./Player");

function Level() {
    var players = [],
        level,
        physics;
        
    var load = function(id) {}; // beölt egy pályát
    
/* public */
    this.__constructor = function(id, phys) {
        load(id);
        physics = phys;
    };

    this.getInfo = function() {
    };
    
// játékosok
    this.addPlayer = function(username) {
        var pl = new player.Player(username, physics);
        players[username] = pl;
    };
    
    this.removePlayer = function(username) {
        delete players[username];
    };
    
    this.getPlayer = function(username) {
        return players[username];
    };
    
    this.getPlayers = function() {
        return players;
    };
    
    this.getPhysics = function() {
        return physics;
    };
    
/* hívunk konstruktort megfele */
    this.__constructor.apply(this, arguments);
};

exports.Level = Level;
