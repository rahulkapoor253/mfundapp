import React from 'react';
import './Fund.css';
import CanvaJSReact from '../canvasjs.react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Home from './Home';

class Fund extends React.Component {

constructor(props) {
    super(props);
    console.log(props);
    this.state = {
        schemeCode : props.location.state === undefined ? null : props.location.state,
        dataPoints : [],
        navBeg : 0,
        navEnd : 0,
        annualGrowthRate : null,
        investYears : 5,
        investAmount : 100000,
        netAmount : null
    }
}

calculateNetAmount() {
    const interestVal = 1 + ( this.state.annualGrowthRate / 100 );
    const finalAmount = this.state.investAmount * (Math.pow(interestVal, this.state.investYears));
    console.log(this.state.investYears);
    console.log(this.state.investAmount);
    this.setState({
        netAmount : finalAmount.toFixed(2)
    })

}

calcTotalYears(dt2, dt1) {
    console.log(dt2);
    console.log(dt1);
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60 * 24);
  
  const totalYears = Math.abs(Math.round(diff/365.25)); 
  console.log(totalYears);
  //calculate CAGR
    const val = this.state.navBeg/this.state.navEnd;
    console.log(val);
    const powerVal = (1 / totalYears);
    const CAGR = Math.pow(val, powerVal) - 1;

    console.log(CAGR * 100);
    this.setState({
        annualGrowthRate : CAGR * 100
    })

    //calculate totalamount
    this.calculateNetAmount();

 }

 handleAmountChange = (event) => {
     console.log(event.target.value);
        const amount = event.target.value;
        this.setState({
            investAmount : amount
        })
 }

 handleYearChange = (event) => {
        console.log(event.target.value);
        const years = event.target.value;
        this.setState({
            investYears : years
        })

 }

 handleNetAmountCalculation = () => {
     this.calculateNetAmount();
 }

componentDidMount() {
    var chart = this.chart;
    //call api with schemecode
if(this.state.schemeCode != null) {
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
        //make calculations based on total years
        this.setState({
            navBeg : parseInt(fundDetails.data[0].nav),
            navEnd : parseInt(fundDetails.data[fundDetails.data.length - 1].nav)
        })
        const fundBeg = fundDetails.data[0].date.split('-');
        const fundEnd = fundDetails.data[fundDetails.data.length - 1].date.split('-');
        this.calcTotalYears(new Date(fundBeg[2], fundBeg[1], fundBeg[0]), new Date(fundEnd[2], fundEnd[1], fundEnd[0]));

    })
    .catch(error => {
      console.log(error);
      //alert("Unable to fetch fund details. Please Try again...");
    })
}

}

render() {

    if (this.state.schemeCode == null) {
        return <Redirect
        from={{
            pathname : '/fund'
        }}
        to={{
          pathname: '/'
      }} />
      }

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
                 <Home page="fund"/>

                <CanvaJSReact.CanvasJSChart options = {options} 
                    onRef={ref => this.chart = ref}
                />
                { this.state.annualGrowthRate && <div>
                    <h2 className="cagr-title">annual growth rate - {this.state.annualGrowthRate.toFixed(2)} %</h2>
                    <input className="input-years" type="number" value={this.state.investYears} placeholder="Years" onChange={this.handleYearChange}/> Years <br></br>
                    <input className="input-amount" type="number" value={this.state.investAmount} placeholder="Amount invested as Lumpsum" onChange={this.handleAmountChange}/> INR as Lumpsum<br></br>
                    <button className="calc-btn" onClick={this.handleNetAmountCalculation}>Calculate</button>
                    { this.state.netAmount && <h2 className="net-value">Total expected amount (investment + gains) - {this.state.netAmount} INR</h2> }
                </div> }
            </header>
        </div>
    )
}

}

export default Fund;