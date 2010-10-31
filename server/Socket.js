var sys =   require("sys")
  , http = require("http")
  , fs = require("fs")
  , path = require("path")
  , ws = require('./lib/ws');

function Socket() {
    var socket,
        port = 8000,
        listeners = [],
        messages = [];
        
    var listener_connection = function(conn) {
        for (l in listeners['connection']) {
            listeners['connection'][l](conn);
        }
        
        conn.addListener("message", listener_message);
    };
        
    var listener_message = function(data) {
        for (l in listeners['message']) l(data);
    };

/* public */
    this.__constructor = function() {
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
        
        socket.addListener("connection", listener_connection);
    };
    
    this.addListener = function(name, event, listener) {
//        listeners[event][name] = listener;
        listeners[event] = [listener];
    };

    this.addMessage = function(event, data) {
        messages.push( JSON.stringify({event: event, data: data}) );  
    };

    this.send = function(uid) {
    };
    
    this.broadcast = function() {
        for (m in messages) {
            socket.broadcast(messages[m]);
            delete messages[m];
        }
    };
    
    this.listen = function() {
        socket.listen(port);
    };
    
    this.__constructor.apply(this, arguments);
};

exports.Socket = Socket;
