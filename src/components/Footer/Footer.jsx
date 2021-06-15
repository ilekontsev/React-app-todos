import {PureComponent} from "react";
import "./Footer.css"

class Footer extends PureComponent {

    render() {
        return (
            <div className={this.props.tasks.length ? "footer" : "gone"}>
                <div className="items">{this.props.items} items left</div>
                <div className="box">
                    <div
                        className={
                            this.props.filterValue === "all"
                                ? "filter activeFilter"
                                : "filter"
                        }
                        onClick={() => this.props.applyFilter("all")}
                    >
                        All
                    </div>
                    <div
                        className={
                            this.props.filterValue === "active"
                                ? "filter activeFilter"
                                : "filter"
                        }
                        onClick={() => this.props.applyFilter("active")}
                    >
                        Active
                    </div>
                    <div
                        className={
                            this.props.filterValue === "completed"
                                ? "filter activeFilter"
                                : "filter"
                        }
                        onClick={() => this.props.applyFilter("completed")}
                    >
                        Completed
                    </div>
                </div>
                <div
                    className={this.props.items === this.props.tasks.length ? "hidden" : "clear"}
                    onClick={this.props.clearDel}

                >
                    Clear completed
                </div>
            </div>
        );
    }
}

export default Footer