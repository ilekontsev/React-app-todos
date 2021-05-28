import React, { PureComponent } from "react";

import Header from "./Header";
import Task from "./Task";
import Input from "./Input";
import Footer from "./Footer"

class App extends PureComponent {
  state = {
    tasks: [],
  };

  //создание элемента
  add = (value, id) => {
    const updated = {
      id: id,
      text: value,
      checked: false,
    };
    this.setState({
      tasks: this.state.tasks.concat(updated),
    });
  };

  checkBox = (e) =>{
    
  }

  //удаление элемента 
  delete = (element) => {
    this.setState({
      tasks: this.state.tasks.filter((item) => {
        return item !== element;
      }),
    });
    console.log(this.state.tasks);
  };

  render() {
    return (
      <div className="contain">
        <Header />
        <div className="main">
          <Input onEnter={this.add} />
          <Task
            tasks={this.state.tasks}
            checkBox={this.checkBox}
            delete={this.delete}
          />
          <Footer />
        </div>
      </div>
    );
  }
}
export default App;
