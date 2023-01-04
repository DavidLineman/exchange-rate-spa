import React from "react";
import { checkStatus, json } from './utils';

const host = 'api.frankfurter.app';


class RateFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      convertTo: 'USD',
      convertFrom: 'GBP',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let { amount, convertTo, convertFrom } = event.target;
    const value = event.target.value;
    this.setState({
      amount: value,
      convertTo: value,
      convertFrom: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { amount, convertTo, convertFrom } = this.state;
    alert(this.state.value)
  }
   
    render () {
      return(
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className='container'>
              <label>Amount</label>
              <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange}/>
            </div>
            <div className='container'>
              <label>From:</label>
              <select name="convertFrom" value={this.state.convertFrom} onChange={this.handleChange}>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
              <label>To:</label>
              <select name="convertTo" value={this.state.convertTo} onChange={this.handleChange}>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <button type='submit' value='submit'>Submit</button>
          </div>
          <div className="results"></div>
    
        </form>
      )
    }



 





  



}

export default RateFinder;
