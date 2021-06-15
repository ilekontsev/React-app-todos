import {
  BrowserRouter, Route, Redirect, Switch,
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
          <Switch>
            {!this.state.token
                    && (
                    <div>
                      <Route path="/login" component={() => <Login setToken={this.setToken} />} />
                      <Redirect to="/login" />
                    </div>
                    )}
            {this.state.token
                    && (
                    <div>
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
                      <Redirect path="/" to="/todos" />
                    </div>
                    )}
          </Switch>
        </BrowserRouter>
      );
    }
}

export default App;
