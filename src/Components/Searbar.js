import React from 'react';
import FontAwesome from 'react-fontawesome';
import './Searchbar.css';

class Searchbar extends React.Component {
  
  render() {

  return (
    <div>
        <FontAwesome
        name='search'
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
        <input type="text" placeholder="Choose a Mutual fund and see how much wealth you can accumulate over a long period of time"></input>
    </div>
  );

  }

}
export default Searchbar;
