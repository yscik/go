var sys =   require("sys")
  , http = require("http")
  , fs = require("fs")
  , path = require("path")
  , ws = require('./lib/ws')
  , phys    =   require("./Physics")
  , lvl  =   require("./Level");


function GameServer() {
    var physics,
        socket,
        entities = [],
        level;

    var tick = function(self) {
        var event = 'update',
            data = [],
            players = self.getLevel().getPlayers();
            
        for(i in players) { data.push(players[i].serialize()); }
        socket.broadcast(JSON.stringify({event: event, data: data}));
    
        for (i in entities) {
            if(entities[i].isEnabled()) {
                entities[i].update();
            }
        }
    };
    
    // TODO Csak Entity leszármazottakat fogadjon el
    var addEntity = function(entity) {
        entities.push(entity);
    };
    
/* public */
    this.__constructor = function() {
        physics = new phys.Physics();
        physics.enable();
        
        addEntity(physics);
        
        level = new lvl.Level(0, physics);
        
        var httpServer = http.createServer(function(req, res) {
            if(req.method == "GET") {
                if( req.url.indexOf("favicon") > -1 ) {
                    res.writeHead(200, {'Content-Type': 'image/x-icon', 'Connection': 'close'});
                    res.end("");
                }
                else {
                    res.writeHead(200, {'Content-Type': 'text/html', 'Connection': 'close'});;
                    fs.createReadStream( path.normalize(path.join(__dirname, "server.html")), {
                        'flags': 'r',
                        'encoding': 'binary',
                        'mode': 0666,
                        'bufferSize': 4 * 1024
                    })
                    .addListener("data", function(chunk) { res.write(chunk, 'binary'); })
                    .addListener("end",function() { res.end(); });
                }
            }
            else {
                res.writeHead(404);
                res.end();
            }
        });
        
        socket = ws.createServer({ server: httpServer });
    };

    this.init = function() {
        var self = this;
    
        socket.addListener("listening", function() {
            sys.log("Listening for connections.");
        });

        // Handle WebSocket Requests
        socket.addListener("connection", function(conn) {
            var username = "user_"+conn.id;
  
            conn.storage.set("username", username);
  
            // a belépőnek átküldjök a már bent lévő játékosokat
            var event = 'login',
               data = [],
               players = self.getLevel().getPlayers();
               
            for(i in players) { data.push(players[i].serialize()); }
  
            socket.send(
                conn.id,
                JSON.stringify({event: event, data: data}) );

            // léterhozunk neki egy úgy player
            self.getLevel().addPlayer(username);
  
            // kiküldjük mindenkinek az új játékosot
            var pdata = self.getLevel().getPlayer(username).serialize();
            socket.broadcast( JSON.stringify({ event: event, data: [pdata]}) );
  
            conn.addListener("message", function(message) {
                var msg = JSON.parse(message),
                username = conn.storage.get("username");
    sys.log(self);
                self.getLevel().getPlayer(username).setLinearVelocity(msg);
            });
        });

        socket.addListener("close", function(conn) {
            var username = conn.storage.get("username");
            self.getLevel().removePlayer(username);
            socket.broadcast(JSON.stringify({event: 'logout', data: username}));
        });

        socket.listen(8000);
        
        setInterval(tick, 17, this);
    };
    
    this.getLevel = function() {
        return level;
    }
      
        
/* hívunk konstruktort megfele */
    this.__constructor.apply(this, arguments);
};

/*
* export
*/

exports.GameServer = GameServer;

