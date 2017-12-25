import React, { Component } from 'react'
import Prices from './Prices'
import History from './History'
import Contract from './Contract'
import Timeline from './Timeline'
import Footer from './Footer'
import Daily from './Daily'

class App extends Component {

    render() {
        return (
            <div className="content">
                <Daily />
                <Prices />
                <History />
                <Contract />
                <Timeline />
                <Footer />
            </div>
        )
    }

}

export default App;
