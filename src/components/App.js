import {BrowserRouter, Route, Link, Redirect, Switch} from "react-router-dom";

import Todos from "./Todos/Todos";
import Login from "./Login/Login"
import {PureComponent} from "react";


class App extends PureComponent {
    state = {
        token: "",
    }
    componentDidMount() {
        const getToken = localStorage.getItem('token')
        this.setState({
            token: getToken
        })
    }

    setToken = (token) => {
        localStorage.setItem('token', token)
        this.setState({
            token
        })
    }


    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {!this.state.token && <Route path="/login" component={() => <Login setToken={this.setToken}/>} />}
                    {this.state.token && <Route path="/todos" component={() => <Todos token={this.state.token}/>} />}
                    <Redirect path="/" to="/todos"/>
                </Switch>
            </BrowserRouter>
        )

    }
}


export default App;
