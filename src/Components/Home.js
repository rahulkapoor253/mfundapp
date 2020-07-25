import React from 'react';
import './Home.css';
import logo from '../logo.png';
import {Redirect} from 'react-router-dom';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page : props.page,
            redirect : null
        }
    }

handleHomeClick = () => {
    if(this.state.page === "fund") {
        this.setState({
            redirect : '/'
        })
    }

}

render () {
    if(this.state.redirect) {
        return <Redirect
        to={{
            pathname: this.state.redirect,
        }} />
    }

    return(
            <h1 className="logo-title" onClick={this.handleHomeClick}>Mfunds <img className="logo-img" alt="logo" src={logo}/></h1>
    )

}

}

export default Home;