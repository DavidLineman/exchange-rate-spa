import React from "react";
import { checkStatus, json } from './utils';

class exchangeRate extends React.Component {
  constructor(props);
  super(props) {
  this.state = {
    searchTerm: '',
    results: [],
    error: '',
  };
    

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  }
}