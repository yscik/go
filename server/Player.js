var sys =   require("sys");

function Player(physics) {
    var username,
        physicsObject;

/* public */
    this.__constructor = function(uname, physics) {
        username = uname;
        physicsObject = physics.createBox({x:400, y: 400});
    };
    
    this.setLinearVelocity = function(velocity) {
        physicsObject.SetLinearVelocity(velocity);
    };
    
    this.serialize = function() {
        var position = physicsObject.GetPosition(),
            angle = -1 * Math.round(physicsObject.GetAngle() * 57.29);
        var x = Math.round(position.x),
            y = Math.round(position.y);
        
        return {username: username, x: x, y: y, angle: angle};
    };

/* konstruktor hívás */
    this.__constructor.apply(this, arguments);
};

exports.Player = Player;
