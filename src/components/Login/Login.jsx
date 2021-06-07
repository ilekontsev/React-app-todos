import {PureComponent} from "react";

const axios = require('axios').default;

class Login extends PureComponent{
    state = {
        valueLogin: "",
        valuePass: "",
    }

    writeInpLogin(e) {
        this.setState({
            valueLogin: e.target.value
        })
    }

    writeInpPass(e) {
        this.setState({
            valuePass: e.target.value
        })
    }

    CBSendOnServer = async () => {

        if (this.state.valueLogin.trim().length && this.state.valuePass.trim().length) {
            const Login = this.state.valueLogin;
            const Password = this.state.valuePass;

            const response = await this.CheckUserAuth(Login, Password)
            this.setState({
                valueLogin: "",
                valuePass: "",
            })
            this.props.setToken(response.data)

        }

    }


    CheckUserAuth = (login, password) => {

        try {
            return  axios.post('http://localhost:3000/createUser', {login, password})

        } catch (err) {
            console.log("ERROr ", err)
        }
    }

    render() {
        return (
            <div className={"wrap"}>
                <input type="text" placeholder='Login'
                       onChange={e => this.writeInpLogin(e)}
                       value={this.state.valueLogin}/>
                <input type="text" placeholder='Password'
                       onChange={e => this.writeInpPass(e)}
                       value={this.state.valuePass}/>
                <button onClick={this.CBSendOnServer}>Login</button>
            </div>
        )
    }

    }

    export default Login
