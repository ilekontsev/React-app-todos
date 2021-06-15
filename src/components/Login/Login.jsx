import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const axios = require('axios').default;

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      valueLogin: '',
      valuePass: '',
    };
  }

  componentWillUnmount() {
    console.log(123123123123123123123);
  }

    writeInpLogin = (e) => {
      this.setState({
        valueLogin: e.target.value,
      });
    }

    writeInpPass = (e) => {
      this.setState({
        valuePass: e.target.value,
      });
    }

    regOrLogin = async (text) => {
      if (this.state.valueLogin.trim().length && this.state.valuePass.trim().length) {
        const Login = this.state.valueLogin;
        const Password = this.state.valuePass;
        if (text === 'registration') {
          await this.regitrationUserServer(Login, Password);
        }
        if (text === 'login') {
          await this.loginUserCheckServer(Login, Password);
        }
      }
    }

    regitrationUserServer = async (login, password) => {
      await axios.post('http://localhost:3000/createUser', { login, password })
        .then((response) => {
          this.props.setToken(response.data);
        })
        .catch((err) => {
          this.setState({
            valueLogin: '',
            valuePass: '',
          });
          console.log(err);
          alert('user exist');
        });
    }

    loginUserCheckServer = async (login, password) => {
      await axios.post('http://localhost:3000/auth', { login, password })
        .then((response) => {
          this.props.setToken(response.data);
        })
        .catch((err) => {
          this.setState({
            valueLogin: '',
            valuePass: '',
          });
          console.log(err);
          alert('wrong username or password ');
        });
    }

    render() {
      return (
        <div className="cont-login123">
          <input
            type="text"
            placeholder="Login"
            className="inp-login"
            onChange={(e) => this.writeInpLogin(e)}
            value={this.state.valueLogin}
          />
          <input
            type="text"
            placeholder="Password"
            className="inp-login"
            onChange={(e) => this.writeInpPass(e)}
            value={this.state.valuePass}
          />
          <div className="cont-but">
            <button
              type="button"
              className="but"
              onClick={() => {
                this.regOrLogin('registration');
              }}
            >
              Registration
            </button>
            <button
              type="button"
              className="but"
              onClick={() => {
                this.regOrLogin('login');
              }}
            >
              Login
            </button>
          </div>
        </div>
      );
    }
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginForm;
