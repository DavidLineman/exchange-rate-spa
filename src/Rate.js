import React from "react";
import { checkStatus, json } from './utils';

const host = 'api.frankfurter.app';

class exchangeRate extends React.Component {
  constructor(props);
  super(props) {
  this.state = {
    startingRate: '',
    convertingRate: '',
    results: [],
    error: '',
  };
    

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  }




}