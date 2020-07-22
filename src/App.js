import React from 'react';
import './App.css';
import logo from './logo.png';
import Searchbar from './Components/Searbar';
import {Card, Button} from 'react-bootstrap';

class App extends React.Component {
  
  render() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo-title">Mfunds <img className="logo-img" alt="logo" src={logo}/></h1>
        
        <div className="search-container">
           <Searchbar />
        </div>

        <h1 className="funds-title">Best 3 funds</h1>
      
       <div className="container">
        <Card className="card-container">
          <Card.Body>
           <Card.Title>Aditya Birla Sun Life Frontline Equity Fund - Direct Plan - Growth</Card.Title>
            <Button className="card-btn" variant="primary" size="lg" block>Choose fund</Button>
          </Card.Body>
        </Card>

        <Card className="card-container">
          <Card.Body>
           <Card.Title>DSP Tax Saver Equity Fund - Direct Plan - Growth</Card.Title>
            <Button className="card-btn" variant="primary" size="lg" block>Choose fund</Button>
          </Card.Body>
        </Card>

        <Card className="card-container">
          <Card.Body>
           <Card.Title>Nippon India Low Duration Fund - Direct Plan - Growth</Card.Title>
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
