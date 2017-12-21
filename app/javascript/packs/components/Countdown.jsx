import React, { Component } from 'react'
import moment from 'moment'

class Countdown extends Component {
    constructor() {
        super();
        this.state = {
            days: "",
            hours: "",
            minutes: "",
            seconds: ""
        }
    }

    countdown = () => {
        setInterval(() => {
            var now = new Date();
            var endDate = new Date('2018', '02', '13');
            var duration = moment.duration(diff);
            var one_day = 1000 * 60 * 60 * 24;

            var a = now.getTime();
            var b = endDate.getTime();

            var diff = b - a
            var diff_ms = diff / 1000;

            var sec = Math.floor(diff_ms % 60);
            diff_ms = diff_ms / 60;
            var min = Math.floor(diff_ms % 60);
            diff_ms = diff_ms / 60;;
            var hours = Math.floor(diff_ms % 24);
            var days = Math.floor(diff_ms / 24);


            this.setState({
                days: days,
                hours: hours,
                minutes: min,
                seconds: sec
            })
        }, 1000)
    }

    componentDidMount() {
        this.countdown();
    }

    render() {
        return (
            <div className="countdown">
                <div className="timer">
                    <h1>{this.state.days}</h1>
                    <h6>Days</h6>
                </div>
                <div className="timer">
                    <h1>{this.state.hours}</h1>
                    <h6>Hours</h6>
                </div>
                <div className="timer">
                    <h1>{this.state.minutes}</h1>
                    <h6>Minutes</h6>
                </div>
                <div className="timer">
                    <h1>{this.state.seconds}</h1>
                    <h6>Seconds</h6>
                </div>
            </div>
        )
    }
}

export default Countdown;