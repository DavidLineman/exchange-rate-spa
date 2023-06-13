import React from "react";
import { checkStatus, json } from './utils';

let results = document.getElementById('results');


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
    let rates = ["USD", "GBP", "EUR"]

    for (let i = 0; i < rates.length; i++) {
      if (rates[i] === convertFrom) {
        let index = rates.indexOf(rates[i])
        rates.splice(index, 1);
      }
    }

    let dataResults = [];
    let keys = [];
    let values = [];
    let newData;


    // I am looping through the rates array and returning a converted rate each time. Resulting
    // in newData containing one converted rate.

    // I need to figure out a way to loop through after/during fetch so that new data contains all 
    // returned data -- so that I can build a table from the object.

    rates.forEach(rate =>
      fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${rate}`)
        .then(resp => resp.json())
        .then((data) => {
          newData = data.rates;
          // console.log(data);
          // let dataRates = data.rates;
          // console.log(dataRates);
          
          
          // console.log(Object.keys(data.rates));
          // console.log(Object.values(data.rates));
          // // keys.push(Object.keys(data.rates));
          // // values.push(Object.values(data.rates));
          // dataResults.push(data.rates);
          
          // for (let i = 0; i < dataResults.length; i++) {
          //   console.log(dataResults[i])
          // }

          // for (const [key, value] of Object.entries(dataResults)) {
          //   results.innerText = "Ba-Boom!";
            
          // }


        })
        .then(() => {
          dataResults.push(newData);
          let dataKeys = [];
          let dataValues = [];
          for (let i = 0; i < dataResults.length; i++) {
            dataKeys.push(Object.keys(dataResults[i]));
            dataValues.push(Object.values(dataResults[i]));
            dataKeys = dataKeys.flat();
            dataValues = dataValues.flat();

            
          }

          let makeTable = (arr) => {
            let table = document.createElement('table');
            for (let key of arr) {
              let row = document.createElement('tr');
              Object.keys(key).forEach(key => {
                let keys = document.createElement('td');
                keys.appendChild(document.createTextNode(key));
                row.appendChild(keys)
              })
              table.appendChild(row);
            }
            for (let entry of arr) {
              let row = document.createElement('tr');
              Object.values(entry).forEach(value => {
                let data = document.createElement('td');
                data.appendChild(document.createTextNode(value));
                row.appendChild(data);
              });
              table.appendChild(row);
            }
            document.body.appendChild(table);
            return table;
          }

          results.innerHTML = makeTable(dataResults);
        })

      
        

    );


    // let dataObj = Object.assign({}, ...dataResults)
    // console.log(dataObj);
    console.log(dataResults);
    // console.log(keys);
    // console.log(values);

  
    
  };

  


  render() {
    const { amount, convertTo, convertFrom } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div className='container'>
            <label>Amount
              <input type="text" name="amount" value={this.state.amount} onChange={this.handleAmountChange} />
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

  };





}

export default RateFinder;
