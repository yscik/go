var sys =   require("sys");

function Message() {
    var createMessage = function(event, data) {
        return JSON.stringify({event: event, data:data});
    };
};

exports.Message = Message;
