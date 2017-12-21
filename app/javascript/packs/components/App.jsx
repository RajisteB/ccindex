import React, { Component } from 'react'
// import axios from 'axios'
// import cc from 'cryptocompare'
// import moment from 'moment'
import Prices from './Prices'


// var mktCapRanked = [];
// var coinImg = [];
// var coinSymbol = [];
// let sorted = [1,2,3,4,5];
// let symbols = [];

class App extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         apiDataLoaded: false,
    //         symbolsLoaded: false,
    //         data: [],
    //         rank: [],
    //         symbol: [],
    //         statistics: [],
    //         price: "",
    //         days: "",
    //         hours: "",
    //         minutes: "",
    //         seconds: "",
    //     }
    // }

    // getMkt = () => {
    //     // coinmarketcap api call
    //     axios.get('https://api.coinmarketcap.com/v1/ticker/')
    //         .then(res => {
    //             let market = res.data
    //             // sort data by markecap
    //             market.sort(function (a, b) {
    //                 return parseInt(a.rank) - parseInt(b.rank)
    //             });
    //             // push top 15 coins by marketcap into array
    //             for (var i = 0; i < 15; i++) {
    //                 mktCapRanked.push(market[i]);
    //             }
    //         }).then(() => {
    //             cc.coinList()
    //                 .then(res => {

    //                     let list = res.Data;
                        
    //                     mktCapRanked.map(mkt => {
    //                         for (var coin in list) {
    //                             if (mkt.name == list[`${coin}`].CoinName || mkt.symbol == list[`${coin}`].Symbol) {
    //                                 mkt.image = `https://www.cryptocompare.com/${list[coin].ImageUrl}`
    //                             }
    //                         }
    //                     })

    //                     mktCapRanked.map(mkt => {
    //                         if (mkt.name == 'IOTA') {
    //                             mkt.symbol = 'IOT'
    //                         }
    //                         symbols.push(mkt.symbol);
    //                     })

    //                 }).then(() => {
    //                     cc.priceFull(symbols, ['USD'])
    //                     .then(res => {
    //                         let status = res;
    //                         let totalCap = 0;
    //                         let totalPrice = 0;
    //                         let totalPct = 0;

    //                         mktCapRanked.map(rank => {
    //                             rank.info = status[`${rank.symbol}`];
    //                             if(rank.info.USD.PRICE < rank.info.USD.OPEN24HOUR) {
    //                                 rank.color = 'red';
    //                             } else {
    //                                 rank.color = 'green';
    //                             }
    //                         })
    //                         console.log(mktCapRanked);

    //                         mktCapRanked.map(coin => {
    //                             totalPrice += coin.info.USD.PRICE;
    //                             totalCap += coin.info.USD.MKTCAP;
    //                             totalPct += coin.info.USD.CHANGEPCT24HOUR;
    //                         })

    //                         let avgPrice = totalPrice / 15;
    //                         let avgCap = (totalCap * 0.06);
    //                         let pct = (avgPrice * 0.06) / 15;
    //                         let weighted = totalCap * .06 / 15;
    //                         let divisor = 552236357654.3704;
    //                         let capInitDivisor = 5522.254425814366;
    //                         let value = totalCap / divisor;
    //                         let dailychg = totalPct / 15;
    //                         let capD = totalCap / 100000000;
    //                         let indexPrice = parseFloat(value).toFixed(2);


    //                         console.log(`Total Price: ${totalPrice}`);
    //                         console.log(`Total MktCap: ${totalCap}`);
    //                         console.log(`Avg Price: ${avgPrice}`);
    //                         console.log(`Avg Cap: ${avgCap}`);
    //                         console.log(`$${pct}`);
    //                         console.log(weighted);
    //                         console.log(`$${parseFloat(value).toFixed(2)}`);
    //                         console.log(dailychg);
    //                         // set state
    //                         this.setState({
    //                             rank: mktCapRanked,
    //                             apiDataLoaded: true,
    //                             price: indexPrice
    //                         })

    //                     })
    //                 })
    //         })
    // }

    // countdown = () => {
    //     setInterval(() => {
    //         var now = new Date();
    //         var endDate = new Date('2018', '02', '13');
    //         var duration = moment.duration(diff);
    //         var one_day = 1000*60*60*24;
            
    //         var a = now.getTime();
    //         var b = endDate.getTime();
            
    //         var diff = b - a
    //         var diff_ms = diff/1000;

    //         var sec = Math.floor(diff_ms % 60);
    //         diff_ms = diff_ms/60;
    //         var min = Math.floor(diff_ms % 60);
    //         diff_ms = diff_ms / 60;;
    //         var hours = Math.floor(diff_ms % 24);
    //         var days = Math.floor(diff_ms / 24);


    //         this.setState({
    //             days: days,
    //             hours: hours,
    //             minutes: min,
    //             seconds: sec
    //         })
    //     }, 1000)
    // }

    // timeout = () => {
    //     this.getMkt();
    // }


    // componentDidMount() {
    //     this.timeout();
    //     this.countdown();
    // }




    // render() {
    //     return (
    //         <div>
    //             <div className="quote-container">
    //                 <div className="dataset">
    //                     {this.state.apiDataLoaded ? this.state.rank.map(rank => {
    //                         return (
    //                                 <div className="databox" key={rank.id}>
    //                                     <div className="symbol-img">
    //                                         <img src={rank.image} height="30px" width="30px" />
    //                                     </div>
    //                                     <div className="v-break">
    //                                     </div>
    //                                     <div className="datacontent">
    //                                         <div className="data-upper">
    //                                             <p>{rank.name}</p>
    //                                             <p style={{ color: rank.color }} id={`${rank.symbol}-CHG`} className="changepct"></p>
    //                                         </div>
    //                                         <div className="data-lower">
    //                                             <p style={{color: rank.color}} id={`${rank.symbol}-PRICE`}>{parseFloat(rank.info.USD.PRICE).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             )
    //                     }): <p>Loading...</p> }
    //                 </div>
    //                 <div className="navset">
    //                     <div className="countdown">
    //                         <div className="timer">
    //                             <h1>{this.state.days}</h1>
    //                             <h6>Days</h6>
    //                         </div>
    //                         <div className="timer">
    //                             <h1>{this.state.hours}</h1>
    //                             <h6>Hours</h6>
    //                         </div>
    //                         <div className="timer">
    //                             <h1>{this.state.minutes}</h1>
    //                             <h6>Minutes</h6>
    //                         </div>
    //                         <div className="timer">
    //                             <h1>{this.state.seconds}</h1>
    //                             <h6>Seconds</h6>
    //                         </div>
    //                     </div>
    //                     <div>
    //                         <h2>${this.state.price}</h2>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    render() {
        return (
            <div>
                <Prices />
            </div>
        )
    }

}

export default App;
