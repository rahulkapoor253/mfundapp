import React from 'react';
import './Fund.css';
import CanvaJSReact from '../canvasjs.react';
import axios from 'axios';

class Fund extends React.Component {

constructor(props) {
    super(props);

    this.state = {
        schemeCode : props.location.state.schemeCode,
        dataPoints : []
    }
}

componentDidMount() {
    var chart = this.chart;
    //call api with schemecode
    axios.get(`https://api.mfapi.in/mf/${this.state.schemeCode}`)
    .then(response => {
        const fundDetails = response.data;
        console.log(fundDetails);
        const val = parseInt(fundDetails.data.length / 90);
        for (var i = 0; i < fundDetails.data.length; i=i+val) {
            this.state.dataPoints.push({
                x: new Date(fundDetails.data[i].date),
                y: parseFloat(fundDetails.data[i].nav)
            });
        }
        chart.render();
    })
    .catch(error => {
      console.log(error);
      alert("Unable to fetch fund details. Please Try again...");
    })

}

render() {

    const options = {
        theme: "light2",
        title: {
            text: "NAV Chart"
        },
        axisY: {
            title: "NAV Unit Price",
            includeZero: false,
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "###0.00",
            dataPoints: this.state.dataPoints
        }]
    }

    return (
        <div className="Fund">
             <header className="Fund-header">
                <CanvaJSReact.CanvasJSChart options = {options} 
                    onRef={ref => this.chart = ref}
                />
            </header>
        </div>
    )
}

}

export default Fund;