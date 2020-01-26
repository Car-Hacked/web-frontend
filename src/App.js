import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';

import './App.css';

class App extends React.Component {
  componentDidMount() {
    var socket = io('https://park-a-lot.herokuapp.com/');
    socket.on('updated', function (data, other) {
      $.get('http://park-a-lot.herokuapp.com/api/v1/garages').then(response => console.log(response));
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
                  JAAC Garage
              </h1>
                <h1 class="pill">
                  <span>
                    245/500
                </span>
                </h1>
                <div class="available-container">
                  <h1 class="available">
                    255 Available
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
