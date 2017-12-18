import React, { Component } from 'react'
import axios from 'axios'
import cc from 'cryptocompare'

var mktCapRanked = [];
var coinImg = [];
var coinSymbol = [];
let sorted = [1,2,3,4,5];
let symbols = [];

class App extends Component {
    constructor() {
        super();
        this.state = {
            apiDataLoaded: false,
            symbolsLoaded: false,
            data: [],
            rank: [],
            symbol: [],
            statistics: []
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

                            mktCapRanked.map(rank => {
                                rank.info = status[`${rank.symbol}`];
                                if(rank.info.USD.PRICE < rank.info.USD.OPEN24HOUR) {
                                    rank.color = 'red';
                                } else {
                                    rank.color = 'green';
                                }
                            })

                            console.log(mktCapRanked);

                            // set state
                            this.setState({
                                rank: mktCapRanked,
                                apiDataLoaded: true
                            })

                        })
                    })
            })
    }

    timeout = () => {
        this.getMkt();
    }


    componentDidMount() {
        this.timeout();
    }




    render() {
        return (
            <div>
                <div className="quote-container">
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
                                                <p>{rank.symbol} - {rank.name}</p>
                                            </div>
                                            <div className="data-lower">
                                                <p style={{ color: rank.color }} id={`${rank.symbol}-PRICE`}>{parseFloat(rank.info.USD.PRICE).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                        }): <p>Loading...</p> }
                    </div>
                    <div className="navset">
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
