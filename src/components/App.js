import React, { PureComponent } from "react";
import Header from "./Header";
import Task from "./Task";
import Input from "./Input";
import Footer from "./Footer/Footer";

class App extends PureComponent {
  state = {
    tasks: [],
    filterValue: "all",
  };

  //создание элемента
  add = (value) => {
    const updated = {
      id: `${value}_${this.state.tasks.length}`,
      text: value,
      checked: false,
    };
    const checkdubl = this.state.tasks.some(
      (item) => item.text === updated.text
    );
    if (!checkdubl) {
      this.dropNote();
      this.setState({
        tasks: this.state.tasks.concat(updated),
      });
      console.log(this.state.tasks)
    }
  };
  dropNote = () => {
    this.state.tasks.map((item) => 
      item.checked = false
      
    )
  };

  //ищем отмеченный checkbox
  checkBox = (id) => {
    const tasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        task.checked = !task.checked;
      }
      return task;
    });
    this.setState({
      tasks,
    });
  };

  noteAll = () => {
    const isChecked = this.state.tasks.some((item) => !item.checked);
    const tasks = this.state.tasks.map((item) => {
      item.checked = isChecked;
      return item;
    });
    this.setState({
      tasks,
    });
  };

  applyFilter = (filterValue) => {
    this.setState({
      filterValue,
    });
  };

  //clear completed
  clearDel = () => {
    const tasks = this.state.tasks.filter((item) => item.checked !== true);
    this.setState({
      tasks,
    });
  };

  //счетчик элементов
  countItems = () => {
    let lenghtItems = this.state.tasks.filter((item) => item.checked !== true);
    return lenghtItems.length;
  };

  //удаление элемента
  delete = (element) => {
    this.setState({
      tasks: this.state.tasks.filter((item) => {
        return item !== element;
      }),
    });
  };

  getTasks = () => {
    if (this.state.filterValue === "all") {
      return this.state.tasks;
    }
    if (this.state.filterValue === "active") {
      return this.state.tasks.filter((task) => !task.checked);
    }
    if (this.state.filterValue === "completed") {
      return this.state.tasks.filter((task) => task.checked);
    }
  };
  arrowConfig = () => {
    let config = "invisible";

    if (!this.getTasks().length) {
      return config;
    }

    const isChecked = this.state.tasks.every((item) => item.checked);

    config = isChecked ? "solid" : "arrow";
    return config;
  };

  render() {
    return (
      <div className="contain">
        <Header />
        <div className="main">
          <Input
            onEnter={this.add}
            noteAll={this.noteAll}
            arrowConfig={this.arrowConfig()}
          />

          <Task
            dblclick={this.dblclick}
            tasks={this.getTasks()}
            checkBox={this.checkBox}
            delete={this.delete}
          />

          <Footer
            tasks={this.state.tasks}
            items={this.countItems()}
            clearDel={this.clearDel}
            applyFilter={this.applyFilter}
            filterValue={this.state.filterValue}
          />
        </div>
      </div>
    );
  }
}
export default App;
