import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { text: "", users: [] };
  }

  componentDidMount() {
    //despues que carge el componente
    //this.getUsers();
    this.getTodo();
  }

  getTodo() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/ricardo")
      .then(resp => {
        console.log(resp.status);
        if (resp.status == 500) {
          fetch("https://assets.breatheco.de/apis/fake/todos/user/ricardo", {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
              "Content-Type": "application/json"
            }
          });
        } else {
          return resp.json();
        }
      })
      .then(data => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch(error => {
        //error handling
        //console.log(error);
      });
  }

  postUsers() {
    fetch("https://jsonplaceholder.typicode.com/users", {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify({
        name: this.state.text
      })
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        this.setState({
          users: this.state.users.concat(data)
        });
        console.log(this.state.users);
      });
  }

  handleInput(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit(e) {
    alert(this.state.text);
    e.preventDefault();

    this.postUsers();
  }

  removeItem(i, e) {
    const el = this.state.users;
    el.splice(i, 1);
    this.setState({
      el
    });
  }

  render() {
    const lista = this.state.users.map((u, i) => {
      return (
        <li key={u.id} onClick={e => this.removeItem(i, e)}>
          {u.name}
        </li>
      );
    });

    return (
      <div>
        <h1>App</h1>
        <ul>{lista}</ul>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>Usuarios:</label>
          <input
            value={this.state.text}
            onChange={e => this.handleInput(e)}
            placeholder="agrega users"
          />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
