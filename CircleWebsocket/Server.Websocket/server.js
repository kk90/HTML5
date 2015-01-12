var port = 4000;

var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({ port: port });

server.broadcast = function (data, client) {
    var clients = this.clients;
    for (var i = 0, max = clients.length; i <max; i++) {
        if (client !== this.clients[i]) {
            this.clients[i].send(data);
        }
    }
};

server.on("connection", function (client) {
    client.on("message", function (message) {
        server.broadcast(message, client);
    });
});