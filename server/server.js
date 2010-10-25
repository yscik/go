var sys = require("sys")
  , http = require("http")
  , fs = require("fs")
  , path = require("path")
  , gs = require("./GameServer");

var GameServer = new gs.GameServer();
GameServer.init();
