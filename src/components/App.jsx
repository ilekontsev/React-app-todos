import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import React, { PureComponent } from 'react';
import Todos from './Todos/Todos';
import Login from './Login/Login';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      refToken: '',
    };
  }

  componentDidMount() {
    const getToken = localStorage.getItem('token');
    const getRefToken = localStorage.getItem('refToken');
    this.setState({
      token: getToken,
      refToken: getRefToken,
    });
  }

    setToken = (token) => {
      localStorage.setItem('token', token.token);
      localStorage.setItem('refToken', token.refToken);

      this.setState({
        token: token.token,
        refToken: token.refToken,
      });
    }

    logout = () => {
      localStorage.clear();
      this.setState({
        token: '',
        refToken: '',
      });
    }

    render() {
      return (
        <BrowserRouter>
          {!this.state.token
            ? (
              <Switch>
                <Route path="/login" component={() => <Login setToken={this.setToken} />} />
                <Redirect from="/" exect to="/login" />
              </Switch>
            )
            : (
              <Switch>
                <Route
                  path="/todos"
                  component={() => (
                    <Todos
                      token={this.state.token}
                      refToken={this.state.refToken}
                      setToken={this.setToken}
                      logout={this.logout}
                    />
                  )}
                />
                <Redirect from="/" to="/todos" />
              </Switch>
            )}
        </BrowserRouter>
      );
    }
}

export default App;
