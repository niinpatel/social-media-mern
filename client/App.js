import React, {Component} from 'react'
import MainRouter from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import {hot} from 'react-hot-loader'

class App extends Component {

    render(){
        return (
            <div>
                Hello World
            </div>
        )
    }
}

export default hot(module)(App)