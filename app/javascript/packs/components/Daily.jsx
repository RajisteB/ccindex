import React, { Component } from 'react'
import axios from 'axios'
import cc from 'cryptocompare'

let marketCap = [];


class Daily extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    getChg = () => {
        axios.get('https://api.coinmarketcap.com/v1/ticker/')
        .then(res => {
            let mkt = res.data;

            mkt.sort(function (a, b) {
                return parseInt(a.rank) - parseInt(b.rank)
            });

            for (var i = 0; i < 15; i++) {
                marketCap.push(mkt[i])
            }

            console.log(marketCap);
            this.setState({
                data: marketCap
            })
        })
    }

    componentWillMount() {
        this.getChg();
    }

    render() {
        return (
            <div className="dailyChg">
                {this.state.data.map(coin => {
                    return (
                        <div key={coin.rank} className="coinContent">
                            <div className="coinSymbol">
                                {coin.symbol}
                            </div>
                            {coin.percent_change_24h > 0 ? 
                                <div className="coinPct" id={`${coin.symbol}-CHG`} style={{ color: 'green' }}>{`+${coin.percent_change_24h}%`}</div> : 
                                <div className="coinPct" id={`${coin.symbol}-CHG`} style={{ color: 'red' }}>{`-${coin.percent_change_24h}%`}</div>
                            }
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default Daily;
