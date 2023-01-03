import React from "react";
import { checkStatus, json } from './utils';


class Rate extends React.Component {
  
  const host = 'api.frankfurter.app';
  fetch(`https://${host}/latest?amount=10&from=GBP&to=USD`)
    .then(resp => resp.json())
    .then((data) => {
      alert(`10 GBP = ${data.rates.USD} USD`);
    });
}
