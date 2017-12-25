import React, { Component } from 'react'
import { Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, LineChart } from 'recharts'
import axios from 'axios'
import ReactHighCharts from 'react-highcharts'
import _ from 'underscore'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const composite = [];
const result = [];
const aggIndex = [];
let aggregate = "";
var coins = ["ETH", "BCH", "XRP"];

class History extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            aggregate: []
        }
    }
    getComposite = () => {
        let pre = `https://min-api.cryptocompare.com/data/histoday?fsym=`
        let post = `&limit=364&aggregate=1&tsym=USD&toTS=1483246800`

        axios.all([
            axios.get(`${pre + 'BTC' + post}`),
            axios.get(`${pre + 'ETH' + post}`),
            axios.get(`${pre + 'BCH' + post}`),
            axios.get(`${pre + 'XRP' + post}`),
            axios.get(`${pre + 'LTC' + post}`),
            axios.get(`${pre + 'IOT' + post}`),
            axios.get(`${pre + 'ADA' + post}`),
            axios.get(`${pre + 'DASH' + post}`),
            axios.get(`${pre + 'XEM' + post}`),
            axios.get(`${pre + 'BTG' + post}`),
            axios.get(`${pre + 'XMR' + post}`),
            axios.get(`${pre + 'EOS' + post}`),
            axios.get(`${pre + 'NEO' + post}`),
            axios.get(`${pre + 'QTUM' + post}`),
            axios.get(`${pre + 'XLM' + post}`),
            // var coins = ["ETH", "BCH", "XRP", "LTC", "IOT", "ADA", "DASH", "XEM", "BTG", "XMR", "EOS", "NEO", "QTUM", "XLM"];
        ])
        .then(res => {
            let response = res;

            response.map(data => {
                let ohlc = data.data.Data
                let trim = ohlc.filter(a => a.close > 0)

                trim.map(d => {
                    let ms = new Date(d.time * 1000);
                    let year = ms.getFullYear();
                    let month = months[ms.getMonth()];
                    let day = ms.getDate();
                    let index = trim.indexOf(d);
                    let nextDay = index + 1;
                    let prevDay = index - 1;

                    if (trim[prevDay] != undefined && trim[prevDay].close != 0) {
                        d.return = +(parseFloat(((d.close - trim[0].close) / trim[0].close) * 100).toFixed(2));
                    } else {
                        d.return = 0;
                    }

                    d.time = `${month} ${day}, ${year}`

                })
                
                for (var i = 0; i < trim.length; i++) {
                    aggIndex.push({
                        x: trim[i].time
                    })
                }

                aggregate = aggIndex.slice(0, 365);
                aggregate.map(agg => {
                    agg.z = 0;
                })

                if(response.indexOf(data) === 0) {
                    let btc = data.data.Data;
                    btc.map(bit => {
                        aggregate.map(agg => {
                            if (bit.time === agg.x) {
                                agg.y = bit.return;
                            }
                        })
                    })
                } else if(response.indexOf(data) !== 0) {
                    let cc = data.data.Data;
                    // console.log(cc);
                    
                    cc.map(sec => {
                        aggregate.map(agg => {
                            if (sec.time == agg.x) {
                                agg.z += sec.return
                            }
                        })
                    })
                }

                aggregate.map(avg => {
                    avg.z = (+(parseFloat((avg.z / 14)).toFixed(2)));
                })

                this.setState({
                    data: aggregate
                })
        
            })
            // console.log(response);
            // console.log(aggregate);
        })
    }
        
    
    componentDidMount() {
        { this.getComposite() }
    }


    render() {
        return (
            <div className="charts">
                <div className="chartset">
                    <AreaChart width={650} height={380} data={this.state.data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="x" label={{angle: -45}} tick={{fontSize: 10}} />
                        <YAxis type='number' tick={{ fontSize: 10 }} label={{ value: '% Cumulative Return', angle: -90, position: 'insideLeft'}} dataKey={`y`} interval={1} padding={{top: -300}} allowDataOverflow={true} ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200]}/>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <Tooltip />
                        <Legend iconType="square" verticalAlign={'top'}/>
                        {/* <Area name="BTC" type="monotone" dataKey="y" stroke="#F22613" fillOpacity={0.8} fill="#F22613" /> */}
                        <Area name="CCIX" type="monotone" dataKey="z" stroke="#82ca9d" fillOpacity={0.8} fill="#82ca9d" unit="%"/>
                    </AreaChart>
                </div>
                <div className="return">
                    <h1>A simpler way to invest in cryptocurrencies</h1>
                    <p>
                        The cryptocurrency space is constantly changing and many protocols are seeing
                        significant growth in both their market cap and their development communities.
                        The monthly rebalanced CCIX Index will hold the top 15 cryptocurrencies ranked by market 
                        cap, volume, and other inputs.
                    </p>
                </div>
            </div>
        )
    }
}


export default History;