import React from "react";

let rateTable = document.getElementById('table');

let acronyms = ['USD', 'GBP', 'EUR', 'JPY'];

class table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acronyms: ['USD', 'GBP', 'EUR', 'JPY']
    }
  }
}