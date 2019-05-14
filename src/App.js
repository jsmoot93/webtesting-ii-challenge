import React, { Component } from "react";

class App extends Component {
  state = {
    balls: 0,
    strikes: 0,
    fouls: 0
  };

  render() {
    return (
      <div className="App">
        <div>
          <div>Balls: {this.state.balls}</div>
          <div>Strikes: {this.state.strikes}</div>
        </div>
        <div className="controls">
          <button
            data-testid="strike-button"
            type="button"
            onClick={this.strike}
          >
            Strike
          </button>
          &nbsp;
          <button data-testid="ball-button" type="button" onClick={this.ball}>
            Ball
          </button>
          &nbsp;
          <button data-testid="foul-button" type="button" onClick={this.foul}>
            Foul
          </button>
          &nbsp;
          <button data-testid="hit-button" type="button" onClick={this.hit}>
            Hit
          </button>
        </div>
      </div>
    );
  }

  hit = () => {
    this.setState({
      balls: 0,
      strikes: 0,
      fouls: 0
    });
  };

  strike = () => {
    if (this.state.strikes >= 2) {
      this.setState({
        strikes: 0,
        balls: 0,
        fouls: 0
      });
    } else {
      this.setState(prevState => {
        return {
          strikes: prevState.strikes + 1
        };
      });
    }
  };

  foul = () => {
    if (this.state.strikes < 2) {
      this.setState(prevState => {
        return {
          strikes: prevState.strikes + 1
        };
      });
    }
  };

  ball = () => {
    if (this.state.balls >= 3) {
      this.setState({
        strikes: 0,
        balls: 0,
        fouls: 0
      });
    } else {
      this.setState(prevState => {
        return {
          balls: prevState.balls + 1
        };
      });
    }
  };
}

export default App;
