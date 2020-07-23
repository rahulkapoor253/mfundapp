import React from 'react';
import './App.css';
import logo from './logo.png';
import Searchbar from './Components/Searbar';
import {Card, Button} from 'react-bootstrap';

class App extends React.Component {
  
  handleFundSelect = schemeCode => {
    console.log(schemeCode);
  }

  render() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo-title">Mfunds <img className="logo-img" alt="logo" src={logo}/></h1>
        
        <div className="search-container">
           <Searchbar handleFundDropddown={this.handleFundSelect}/>
        </div>

        <h1 className="funds-title">Best 3 funds</h1>
      
       <div className="container">
        <Card className="card-container">
          <Card.Body>
           <Card.Title>Kotak Bluechip Fund - Growth - Direct 120152</Card.Title>
            <Button className="card-btn" variant="primary" size="lg" block>Choose fund</Button>
          </Card.Body>
        </Card>

        <Card className="card-container">
          <Card.Body>
           <Card.Title>Mirae Asset Emerging Bluechip Fund - Direct Plan - Growth 118834</Card.Title>
            <Button className="card-btn" variant="primary" size="lg" block>Choose fund</Button>
          </Card.Body>
        </Card>

        <Card className="card-container">
          <Card.Body>
           <Card.Title>Axis Long Term Equity Fund - Growth 112323</Card.Title>
            <Button className="card-btn" variant="primary" size="lg" block>Choose fund</Button>
          </Card.Body>
        </Card>
        </div>

      </header>
    </div>
  );

  }

}
export default App;
