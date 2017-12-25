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

// $(document).ready(function() {

//     var currentPrice = {};
//     var socket = io.connect('https://streamer.cryptocompare.com/');
//     var subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD', '5~CCCAGG~BCH~USD', '5~CCCAGG~XRP~USD', '5~CCCAGG~LTC~USD', '5~CCCAGG~IOT~USD', '5~CCCAGG~ADA~USD', '5~CCCAGG~DASH~USD', '5~CCCAGG~XEM~USD', '5~CCCAGG~XMR~USD', '5~CCCAGG~BTG~USD', '5~CCCAGG~EOS~USD', '5~CCCAGG~XLM~USD', '5~CCCAGG~ETC~USD', '5~CCCAGG~NEO~USD' ]
//     socket.emit('SubAdd', { subs: subscription });
//     socket.on("m", function(message) {
//         var messageType = message.substring(0, message.indexOf("~"));
//         var res = {};
//         if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
//             res = CCC.CURRENT.unpack(message);
//             // console.log(res);
//             var from = res['FROMSYMBOL'];
//             var to = res['TOSYMBOL'];
//             var fsym = CCC.STATIC.CURRENCY.getSymbol(from);
//             var tsym = CCC.STATIC.CURRENCY.getSymbol(to);
//             var pair = from + to;

//             if (!currentPrice.hasOwnProperty(pair)) {
//                 currentPrice[pair] = {};
//             }

//             for (var key in res) {
//                 currentPrice[pair][key] = res[key];
//             }

//             if (currentPrice[pair]['LASTTRADEID']) {
//                 currentPrice[pair]['LASTTRADEID'] = parseInt(currentPrice[pair]['LASTTRADEID']).toFixed(0);
//             }
//             currentPrice[pair]['CHANGE24HOUR'] = CCC.convertValueToDisplay(tsym, (currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR']));
//             currentPrice[pair]['CHANGE24HOURPCT'] = ((currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR']) / currentPrice[pair]['OPEN24HOUR'] * 100).toFixed(2) + "%";;
//             // console.log(currentPrice[pair], from, tsym, fsym);
//             console.log(currentPrice[pair]);

//             if (res.PRICE === undefined) {
//                 return
//             } else {

//                 $(`#${currentPrice[pair].FROMSYMBOL}-PRICE`).text(`$${currentPrice[pair].PRICE.toLocaleString()}`);
//                 $(`#${currentPrice[pair].FROMSYMBOL}-CHG`).text(`${currentPrice[pair].CHANGE24HOURPCT}`);
//             }
//         }
//     })

// })