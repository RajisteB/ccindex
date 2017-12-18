// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require rails-ujs
//= require socket.io
//= require turbolinks
//= require_tree .

$(document).ready(function() {
    var socket = io.connect('https://streamer.cryptocompare.com/');
    var subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD', '5~CCCAGG~BCH~USD', '5~CCCAGG~XRP~USD', '5~CCCAGG~LTC~USD', '5~CCCAGG~IOT~USD', '5~CCCAGG~ADA~USD', '5~CCCAGG~DASH~USD', '5~CCCAGG~XEM~USD', '5~CCCAGG~XMR~USD', '5~CCCAGG~BTG~USD', '5~CCCAGG~EOS~USD', '5~CCCAGG~XLM~USD', '5~CCCAGG~ETC~USD', '5~CCCAGG~NEO~USD' ]
    socket.emit('SubAdd', { subs: subscription });
    socket.on("m", function(message) {
        var messageType = message.substring(0, message.indexOf("~"));
        var res = {};
        if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
            res = CCC.CURRENT.unpack(message);
            console.log(res);
            if (res.PRICE === undefined) {
                return
            } else {

                $(`#${res.FROMSYMBOL}-PRICE`).text(`$${res.PRICE.toLocaleString()}`);
            }
        }
    })

})