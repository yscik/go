var sys =   require("sys");

function Entity() {
    var active = false;

    this.enable = function() { active = true; };
    this.disable = function() { active = false; };
    this.update = function() { sys.log("a"); };
    
    this.isEnabled = function() { return active; };
};

exports.Entity = Entity;
