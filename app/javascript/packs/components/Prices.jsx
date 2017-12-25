import React, { Component } from 'react'
import axios from 'axios'
import cc from 'cryptocompare'
import Countdown from './Countdown'

var mktCapRanked = [];
var coinImg = [];
var coinSymbol = [];
var symbols = [];

class Prices extends Component {
    constructor() {
        super();
        this.state = {
            apiDataLoaded: false,
            rank: [],
            price: ""
        }
    }

    getMkt = () => {
        // coinmarketcap api call
        axios.get('https://api.coinmarketcap.com/v1/ticker/')
            .then(res => {
                let market = res.data
                // sort data by markecap
                market.sort(function (a, b) {
                    return parseInt(a.rank) - parseInt(b.rank)
                });
                // push top 15 coins by marketcap into array
                for (var i = 0; i < 15; i++) {
                    mktCapRanked.push(market[i]);
                }
            }).then(() => {
                cc.coinList()
                    .then(res => {

                        let list = res.Data;

                        mktCapRanked.map(mkt => {
                            for (var coin in list) {
                                if (mkt.name == list[`${coin}`].CoinName || mkt.symbol == list[`${coin}`].Symbol) {
                                    mkt.image = `https://www.cryptocompare.com/${list[coin].ImageUrl}`
                                }
                            }
                        })

                        mktCapRanked.map(mkt => {
                            if (mkt.name == 'IOTA') {
                                mkt.symbol = 'IOT'
                            }
                            symbols.push(mkt.symbol);
                        })

                    }).then(() => {
                        cc.priceFull(symbols, ['USD'])
                            .then(res => {
                                let status = res;
                                let totalCap = 0;
                                let totalPrice = 0;
                                let totalPct = 0;

                                mktCapRanked.map(rank => {
                                    rank.info = status[`${rank.symbol}`];
                                    if (rank.info.USD.PRICE < rank.info.USD.OPEN24HOUR) {
                                        rank.color = 'red';
                                    } else {
                                        rank.color = 'green';
                                    }
                                })
                                // console.log(mktCapRanked);

                                mktCapRanked.map(coin => {
                                    totalPrice += coin.info.USD.PRICE;
                                    totalCap += coin.info.USD.MKTCAP;
                                    totalPct += coin.info.USD.CHANGEPCT24HOUR;
                                })

                                let avgPrice = totalPrice / 15;
                                let avgCap = (totalCap * 0.06);
                                let pct = (avgPrice * 0.06) / 15;
                                let weighted = totalCap * .06 / 15;
                                let divisor = 552236357654.3704;
                                let capInitDivisor = 5522.254425814366;
                                let value = totalCap / divisor;
                                let dailychg = totalPct / 15;
                                let capD = totalCap / 100000000;
                                let indexPrice = parseFloat(value).toFixed(2);


                                // console.log(`Total Price: ${totalPrice}`);
                                // console.log(`Total MktCap: ${totalCap}`);
                                // console.log(`Avg Price: ${avgPrice}`);
                                // console.log(`Avg Cap: ${avgCap}`);
                                // console.log(`CIX15 Coin Value: $${parseFloat(value).toFixed(2)}`);
                                // console.log(`Avg Pct Chg: ${dailychg}%`);
                                // set state
                                this.setState({
                                    rank: mktCapRanked,
                                    apiDataLoaded: true,
                                    price: indexPrice
                                })

                            })
                    })
            })
    }

    componentDidMount() {
        this.getMkt();
    }

    render() {
        return (
            <div className="quotes">
                <div className="dataset">
                    {this.state.apiDataLoaded ? this.state.rank.map(rank => {
                        return (
                            <div className="databox" key={rank.id}>
                                <div className="symbol-img">
                                    <img src={rank.image} height="30px" width="30px" />
                                </div>
                                <div className="v-break">
                                </div>
                                <div className="datacontent">
                                    <div className="data-upper">
                                        <p>{rank.name}</p>
                                    </div>
                                    <div className="data-lower">
                                        <p style={{ color: rank.color }} id={`${rank.symbol}-PRICE`}>{parseFloat(rank.info.USD.PRICE).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p>Loading...</p>}
                </div>
                <div className="navset">
                    <Countdown />
                    <div className="icoStats">
                        <div>
                            <h4>Contributors:</h4>
                            <h6>138</h6>
                        </div>
                        <div>
                            <h4>Total Holdings:</h4>
                            <h6>$ 252,328.32</h6>
                        </div>
                        <div>
                            <h4>Curr Coin Price:</h4>
                            <h6>${this.state.price}</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default Prices;