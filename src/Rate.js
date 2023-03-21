import React from "react";
import { checkStatus, json } from './utils';

let results = document.getElementById('results');
let rateTable = document.getElementById('table');
let acronyms = ['USD', 'GBP', 'EUR', 'JPY'];

class RateFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      convertTo: 'USD',
      convertFrom: 'GBP',
    };

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleConvertToChange = this.handleConvertToChange.bind(this);
    this.handleConvertFromChange = this.handleConvertFromChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAmountChange(event) {
    this.setState({
      amount: event.target.value,
    });
  }

  handleConvertFromChange(event) {
    this.setState({
      convertFrom: event.target.value,
    });
  }

  handleConvertToChange(event) {
    this.setState({
      convertTo: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { amount, convertTo, convertFrom } = this.state;

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${convertTo}`)
    .then(resp => resp.json())
    .then((data) => {
      // console.log(data);
      for (const [key, value] of Object.entries(data.rates)) {
        results.innerText = `${key}: ${value}`;
      }
      

    
      // console.log(convertTo);
      // console.log(convertFrom);
      // console.log(amount);
    });

    acronyms.map(a => {
      if (convertFrom != a) {
        fetch(`https://api.frankfurter.app/latest?amount=1&from=${convertFrom}&to=${a}`)
        .then(resp => resp.json())
        .then((data) => {
          let rates = data.rates;
          console.log(rates);

          
            for (let x = 0; data.rates.length; x++) {
              rateTable.innerHTML = `${x}:  ${data.rates[x]}`;
              console.log(x + " " + data.rates[x])
            }
            

  
          
          
          // for (const key of Object.entries(data.rates)) {
          //   console.log(Object.keys);
          //   console.log(data.rates[key]);
          //   
          // }
          
        })
      } 
      
    })
    
    
  }


    render () {
      const { amount, convertTo, convertFrom } = this.state;
      return(
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className='container'>
              <label>Amount
                <input type="text" name="amount" value={this.state.amount} onChange={this.handleAmountChange}/>
              </label>
            </div>
            <div className='container'>
              <label>From:
                <select name="convertFrom" value={this.state.convertFrom} onChange={this.handleConvertFromChange}>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                </select>
              </label>
                <label>To:
                <select name="convertTo" value={this.state.convertTo} onChange={this.handleConvertToChange}>
                  <option value="GBP">GBP</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </label>
            </div>
            <button className="btn btn-success" type="submit" value='submit'>Submit</button>
          </div>
        </form>
      )
    }



}

export default RateFinder;
