import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      garageName: "",
      capacity: 0,
      carsInLot: 0
    };
  }
  componentDidMount() {
    const $this = this;
    var socket = io('https://park-a-lot.herokuapp.com/');
    socket.on('updated', function (data, other) {
      if (data === '5e2cf384da502e00178a746e'){
        $.get('http://park-a-lot.herokuapp.com/api/v1/garages/5e2cf384da502e00178a746e').then(response => {
          $this.setState({
            garageName: response.garageName,
            capacity: response.capacity,
            carsInLot: response.carsInLot
          });
        });
      }
    });
    $.get('http://park-a-lot.herokuapp.com/api/v1/garages/5e2cf384da502e00178a746e').then(response => {
        if(response instanceof Error){
          return;
        }
        this.setState({ 
          garageName: response.garageName,
          capacity: response.capacity,
          carsInLot: response.carsInLot
         });
    });
  }
  render(){
    return (
      <div class="app-background">
        <div className="app">
          <header className="app-header">
            <div class="parking-container">
              <div class="parking-app">
                <h1 class="garage">
                  {this.state.garageName}
              </h1>
                <h1 class="pill">
                  <span>
                    {this.state.carsInLot.toString()}/{this.state.capacity.toString()}
                </span>
                </h1>
                <div class="available-container">
                  <h1 class="available">
                    {(this.state.capacity - this.state.carsInLot).toString()} Available
              </h1>
                </div>
              </div>
              <div class="gh-container">
                <div class="ico-div">
                  <img class="gh-logo" src={require('./github.png')} />
                </div>
                <a href="https://github.com/Car-Hacked" target="_blank">
                  <h1 class="gh-link">Visit the GitHub repository</h1>
                </a>
              </div>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
