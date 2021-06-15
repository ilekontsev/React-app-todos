import { PureComponent } from "react";

class Task extends PureComponent {
 
  checkTF = (id) => {
    this.props.checkBox(id);
  };

  render() {
    return (
      <div className="task-contain">
        {this.props.tasks.map((item) => (
          <div className="task" key={item._id}>
            <input
              className="checkbox"
              onChange={() => this.checkTF(item._id)}
              type="checkbox"
              checked={item.checked}
              id={item._id}
            />
            <label htmlFor={item._id} className="label"/>
            <p>{item.text}</p>
            <div className="cross" onClick={() => this.props.delete(item)}>
              <div className="fas fa-times"/>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Task;
