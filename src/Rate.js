import React from "react";
import { checkStatus, json } from './utils';

let results = document.getElementById('results');


class RateFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      convertFrom: 'GBP',
    };

    this.handleAmountChange = this.handleAmountChange.bind(this);
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

    console.log(rates);



    let dataResults = [];
    


    // I am looping through the rates array and returning a converted rate each time. Resulting
    // in newData containing one converted rate.

    // I need to figure out a way to loop through after/during fetch so that new data contains all 
    // returned data -- so that I can build a table from the object.

    rates.forEach(rate =>
      fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${rate}`)
        .then(resp => resp.json())
        .then((data) => {
          dataResults.push(data.rates);

        
          

          let table = document.getElementById('table-body');
          let firstRate = rates[0];
          let secondRate = rates[1];
          let firstValue = Object.values(dataResults[0]);
          let secondValue = Object.values(dataResults[1])

          table.innerHTML = `
                          <tr>
                            <td>${firstRate}</td>
                            <td>${firstValue}</td>
                          <tr>
                          <tr>
                            <td>${secondRate}</td>
                            <td>${secondValue}</td>
                          </tr>`;

          // dataResults.forEach((item) => {
          //     if(Object.value(item) !== 'undefined') {
          //       table.innerHTML = `${table.innerHTML}<tr>
          //             <td>${Object.key(item)}</td>
          //             <td>${Object.value(item)}</td>
          //         </tr>`
          //       }
          //     }
             
            
          // );
            
      
        }).then(() => {

          dataResults.forEach(obj => {
            for (const [key, value] of Object.entries(obj)) {
              console.log(key, value);

            }
          })

        })
      

      
         

    );
    
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
          </div>

          <button className="btn btn-success" type="submit" value='submit'>Submit</button>


        </div>
      </form>


      
    )

  };





}

export default RateFinder;
