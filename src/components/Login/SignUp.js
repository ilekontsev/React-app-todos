import {PureComponent} from "react";

const axios = require('axios').default;
class SignUp extends PureComponent {

    state = {
        valueLogin: "",
        valuePass: "",
    }

    writeInpLogin(e) {
        this.setState({
            valueLogin: e.target.value
        })
    }
    writeInpPass (e)  {
        this.setState({
            valuePass: e.target.value
        })
    }
    CBSendOnServer = async() => {
        if (this.state.valueLogin.trim().length  && this.state.valuePass.trim().length ) {
            if (this.state.valueLogin.length >= 4 && this.state.valuePass.length >= 4) {
                const Login = this.state.valueLogin;
                const Password = this.state.valuePass;

                await this.createUserServer(Login, Password)
                this.setState({
                    valueLogin: "",
                    valuePass: "",
                })
            }else{alert("User or pass length < 4")}
        }
    }
    createUserServer = (login, password) => {

        try{
            return axios.post('http://localhost:3000/createUser', {login, password})
        }catch(err){
            console.log("ERROR", err)
        }
    }

    render() {
        return (
            <div className={"wrap"}>
                <input type="text" placeholder={"login"}
                       onChange={e => this.writeInpLogin(e)}
                       value={this.state.valueLogin}

                />
                <input type="text" placeholder={"password"}
                       onChange={e => this.writeInpPass(e)}
                       value={this.state.valuePass}

                />
                <button onClick={this.CBSendOnServer}>отправить</button>
            </div>
        )
    }
}

export default SignUp