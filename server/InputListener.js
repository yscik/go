var sys =   require('sys');

function InputListener() {
    
/* private */
    var callback = [],
        event = [];
    
/* public */
    this.__constructor = function(socket) {
        socket.addListener('input', function(data) {
//        sys.log(sys.inspect(data));
            if(data.keyCode == 0) data.key = data.charCode;
            else data.key = data.keyCode;
            
            for (c in callback[data.event]) {
                if(data.key == callback[data.event][c].key) {
                    callback[data.event][c].cb();
                }
            }
        });
    };
    
    this.setKeyEvent = function(event, key, cb) {
        if(callback[event] == undefined) callback[event] = [];
        
        callback[event].push({key: key, cb: cb});
    };
    

    this.__constructor.apply(this, arguments);
};

exports.InputListener = InputListener;
