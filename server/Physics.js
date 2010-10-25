var sys =   require("sys")
  , b2d =   require("./lib/box2dnode")
  , ent =   require("./Entity");

function Physics() {
    ent.Entity.call(this); // Öröklünk az Entitytől

    var worldAABB,
        world,
        gravity,
        doSleep;

    /*
    * public
    */

    this.__constructor = function() {
        worldAABB = new b2d.b2AABB();
        worldAABB.lowerBound.Set(-1000.0, -1000.0);
        worldAABB.upperBound.Set(1000.0, 1000.0);
        
        gravity = new b2d.b2Vec2(0.0, -10.0);
        
        doSleep = true;
        
        world = new b2d.b2World(worldAABB, gravity, doSleep);
    };
    
    this.update = function() {
        world.Step(1.0/60.0, 10);
    };
    
    this.createBox = function(opt) {
        var bodyDef = new b2d.b2BodyDef();
        bodyDef.position.Set(opt.x, opt.y);

        var body = world.CreateBody(bodyDef);

        var shapeDef = new b2d.b2PolygonDef();
        shapeDef.SetAsBox(10.0, 10.0);
        shapeDef.density = 1.0;
        shapeDef.friction = 0.3;
        body.CreateShape(shapeDef);
        body.SetMassFromShapes();
  
        return body;
    };

    this.getWorld = function() { return world; };
    this.getGravity = function() { return gravity; };
        
    /*
    * hívunk konstruktort megfele
    */
    
    this.__constructor.apply(this, arguments);
};


/*
* export
*/

exports.Physics = Physics;
