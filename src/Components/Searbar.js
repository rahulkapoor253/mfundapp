import React from 'react';
import FontAwesome from 'react-fontawesome';
import './Searchbar.css';
import axios from 'axios';
import {ListGroup} from 'react-bootstrap';

class Searchbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fundsData : props.data,
      searchInput : props.searchTerm
    }
  }
  
  handleInputFund = (event) => {
    //console.log(event.target.value);
    this.setState({
      searchInput : event.target.value
    })
    if(event.target.value.length >= 3) {
      axios.get(`https://api.mfapi.in/mf/search?q=${this.state.searchInput}`)
      .then(response => {
        this.setState({
          fundsData : response.data
        })
      })
      .catch(error => {
        console.log(error);
        alert("Unable to fetch fund. Please Try again...");
      })
  }

  }

  render() {

    const fundSearch = this.state.fundsData.map(fund => {
     return <ListGroup.Item className="results-container-item" key={fund.schemeCode} onClick={this.props.handleFundDropddown.bind(this, fund.schemeCode)}>{fund.schemeName}</ListGroup.Item>
    })

  return (
    <div>
        <FontAwesome
        name='search'
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
        <input type="text" onChange={this.handleInputFund} value={this.state.searchInput} placeholder="Choose a Mutual fund and see how much wealth you can accumulate over a long period of time"></input>
        
        {this.state.fundsData.length > 0 &&<ListGroup className="results-container">{fundSearch}</ListGroup>}
    </div>
  );

  }

}
export default Searchbar;
