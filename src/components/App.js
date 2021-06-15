import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import Todos from "./Todos/Todos";
import Login from "./Login/Login"
import {PureComponent} from "react";


class App extends PureComponent {
    state = {
        token: "",
        refToken: ""
    }

    componentDidUpdate() {
        const getToken = localStorage.getItem('token')
        const getRefToken = localStorage.getItem('refToken')
        this.setState({
            token: getToken,
            refToken: getRefToken
        })
    }


    setToken = (token) => {
        localStorage.setItem('token', token.token)
        localStorage.setItem('refToken', token.refToken)

        this.setState({
            token: token.token,
            refToken: token.refToken
        })
    }

    logout = () => {
        localStorage.clear()
        this.setState({
            token: "",
            refToken: ""
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {!this.state.token && <>
                        <Route path="/login" component={() => <Login setToken={this.setToken}/>}/>
                        <Redirect to="/login"/>
                    </>}
                    {this.state.token && <>
                        <Route path="/todos" component={() =>
                            <Todos token={this.state.token}
                                   refToken={this.state.refToken}
                                   setToken={this.setToken}
                                   logout={this.logout}/>}
                        />
                        <Redirect path="/" to="/todos"/>
                    </>}
                </Switch>
            </BrowserRouter>
        )

    }
}


export default App;
