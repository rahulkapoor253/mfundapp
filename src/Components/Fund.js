import React from 'react';
import './Fund.css';

class Fund extends React.Component {

constructor(props) {
    super(props);

    this.state = {
        schemeCode : ''
    }
}

render() {
    return (
        <div>
            {this.props.location.state.schemeCode}
        </div>
    )
}

}

export default Fund;