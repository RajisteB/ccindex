import React, { Component } from 'react';
import axios from 'axios';
import cc from 'cryptocompare';
var mktCapRanked = [];
// var coinImg = [];
// var coinSymbol = [];
let sorted = [1, 2, 3, 4, 5];
let symbols = [];
class Test extends Component {
    constructor() {
        super();
        this.state = {
            apiDataLoaded: false,
            symbolsLoaded: false,
            data: {},
            rank: [],
            symbol: [],
        }
    }

    componentDidMount() {
        cc.priceFull(['BTC', 'ETH', 'BCH', 'XRP', 'LTC', 'IOT', 'DASH', 'XMR', 'XEM', 'BTG', 'EOS', 'ADA', 'ETC', 'NEO', 'XLM'], ['USD'])
            .then(res => {
                this.setState({
                    data: res,
                    apiDataLoaded: true,
                })
            });
        axios.get('https://api.coinmarketcap.com/v1/ticker/')
            .then(res => {
                let
                    market = res.data;
                console.log(market);
                // sort data by markecap
                market.sort(function (a, b) {
                    return parseInt(a.rank) - parseInt(b.rank)
                });
                // push top 15 coins by marketcap into array
                for (var i = 0; i < 15; i++) {
                    mktCapRanked.push(market[i]);
                }
                // set state
                this.setState({
                    rank: mktCapRanked,
                })
            }).then(() => {
                cc.coinList()
                    .then(res => {
                        let response = res.Data;
                        mktCapRanked.map(rank => {
                            for (var res in response) {
                                if (rank.name == response[`${res}`].CoinName || rank.symbol == response[`${res}`].Symbol) {
                                    symbols.push(response[`${res}`])
                                }
                            }
                        })
                        this.setState({
                            symbol: symbols,
                            symbolsLoaded: true
                        })
                    })
            })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        {this.state.symbolsLoaded ? this.state.symbol.map(symbol => {
                            return <div className="col-sm">
                                <h3>{symbol.Id}</h3>
                            </div>
                        }) : <p>Loading...</p>}
                    </div>
                </div>
            </div>
        )
    }
}
export default Test;