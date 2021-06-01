import { PureComponent } from "react";

class Task extends PureComponent {
 
  checkTF = (id) => {
    this.props.checkBox( id);
  };

  render() {
    return (
      <div className="task-contain">
        {this.props.tasks.map((item) => (
          <div className="task" key={item.id}>
            <input
              className="checkbox"
              onChange={() => this.checkTF(item.id)}
              type="checkbox"
              checked={item.checked}
              id={item.id}
            />
            <label htmlFor={item.id} className="label"></label>
            <p>{item.text}</p>
            <div className="cross" onClick={() => this.props.delete(item)}>
              <div className="fas fa-times"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Task;
