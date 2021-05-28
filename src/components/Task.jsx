import { PureComponent } from "react";


class Task extends PureComponent {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div className ="task-contain">
        {this.props.tasks.map((item) => (

          <div className="task" key={item.id}>
            <input className="checkbox" onClick ={this.checkTF} type="checkbox"/>
            <label></label>
            <p>{item.text}</p>
            <div className="cross" onClick={() => this.props.delete(item)}></div>
          </div>

        ))}
      </div>
    );
  }
}
export default Task