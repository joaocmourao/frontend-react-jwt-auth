import React, { Component } from "react";

import UserService from "../services/user.service";


export default class StockList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getAvailableStocks().then(
      response => {
        this.setState({
          content: response.data
        });
      }, error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );    
  }

  
  render() {
    const listItems = this.state.content.map((d,index) =>
        <a href={"stocksummary?"+d}> 
           <li 
                key={index}
            >
                {d}
            </li>
        </a>
        );

    return (
      <div className="container">
        <header className="jumbotron">
        <h3>Stock List</h3>
          <h3>{listItems}</h3>
          
       </header>
      </div>
    );
  }
  
}