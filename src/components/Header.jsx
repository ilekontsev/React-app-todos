import { PureComponent } from "react";


class Header extends PureComponent{

    render(){
        return(
            <div className="header">
                <h1 className="h1"><a href="/">todos</a></h1>
            </div>
        )
    }
}
export default Header