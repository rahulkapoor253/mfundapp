import React from 'react';
import './App.css';
import logo from './logo.png';
import Searchbar from './Components/Searbar';
import {Card, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      fundsData : [],
      searchVal : '',
      redirect : null,
      schemeCode : ''
    }
  }

  handleFundSelect = schemeCode => {
    console.log(schemeCode);
    this.setState({
      searchVal : '',
      redirect : '/fund',
      schemeCode : schemeCode
    })
    //load new component with schemeCode and call api to fetch fund data

  }

  handleBestFunds = (event) => {
    console.log(event.target.name);
    this.setState({
      redirect : '/fund',
      schemeCode : event.target.name
    })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect,
        state: { schemeCode: this.state.schemeCode }
    }} />
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo-title">Mfunds <img className="logo-img" alt="logo" src={logo}/></h1>
        
        <div className="search-container">
           <Searchbar handleFundDropddown={this.handleFundSelect} data={this.state.fundsData} searchTerm={this.state.searchVal}/>
        </div>

        <h1 className="funds-title">Best 3 funds</h1>
      
       <div className="container">
        <Card className="card-container">
          <Card.Body>
           <Card.Title>Kotak Bluechip Fund - Growth - Direct</Card.Title>
            <Button className="card-btn" variant="primary" name="120152" size="lg" block onClick={this.handleBestFunds}>Choose fund</Button>
          </Card.Body>
        </Card>

        <Card className="card-container">
          <Card.Body>
           <Card.Title>Mirae Asset Emerging Bluechip Fund - Direct Plan - Growth</Card.Title>
            <Button className="card-btn" variant="primary" name="118834" size="lg" block onClick={this.handleBestFunds}>Choose fund</Button>
          </Card.Body>
        </Card>

        <Card className="card-container">
          <Card.Body>
           <Card.Title>Axis Long Term Equity Fund - Growth</Card.Title>
            <Button className="card-btn" variant="primary" name="112323" size="lg" block onClick={this.handleBestFunds}>Choose fund</Button>
          </Card.Body>
        </Card>
        </div>

      </header>
    </div>
  );

  }

}
export default App;
