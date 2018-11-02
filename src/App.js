import React, { Component } from 'react';
import './App.css';
import Formulario from './components/Formulario'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
window.jQuery = window.$ = $;

class App extends Component {

  state ={
    result : ''
  }

  showResult = (form, value) => {
    this.setState({result: `Formulario: '${form}', perguntas: ${JSON.stringify(value, null,2 )}`})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            Formulário
        </header>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-6">
              <Formulario showResult={this.showResult} />
          </div>
          <div className="col-md-5">
          <div className="card" style={{width: '40rem'}}>
            <div className="card-body">
              <h5 className="card-title">Result</h5>
              <p className="card-text">
                {this.state.result}
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
