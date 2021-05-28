import { PureComponent } from "react";


class Footer extends PureComponent{


    render(){
        return(
            <div className="footer">
                <div className="items">items</div>
                <div className="box">
                    <div className="all">all</div>
                    <div className="active">active</div>
                    <div className="completed">completed</div>
                </div>
                <div className="clear">clear completed</div>
            </div>
        )
    }
}

export default Footer