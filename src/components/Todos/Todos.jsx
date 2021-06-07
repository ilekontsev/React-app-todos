import React, {PureComponent} from "react";
import Header from "../Header/Header";
import Task from "../Task/Task";
import Input from "../Input/Input";
import Footer from "../Footer/Footer";

const axios = require('axios').default;

class Todos extends PureComponent {
    state = {
        tasks: [],
        filterValue: "all",
    };

   async componentDidMount() {
        await this.Init()
    }

    Init = async () => {

        try {
            const response = await axios.get('http://localhost:3000', {
                headers: { 'Authorization': this.props.token}
            })
            const upd = response.data
            this.setState({
                tasks: upd
            })
        } catch (err) {
            console.log("ERRO ", err)
        }
    }

    //создание элемента
    add = async (value) => {
        const updated = {
            text: value,
            checked: false,
        };

        const checkDublicate = this.state.tasks.some(
            (item) => item.text === updated.text
        );
        if (!checkDublicate) {
            const response = await this.sendServer(updated)
            updated._id = response.data

            this.setState({
                tasks: this.state.tasks.concat(updated),
            });
        }
    };


    sendServer = (updated) => {

        try {
            return axios.post('http://localhost:3000', updated, { headers: { 'Authorization': this.props.token}})
        } catch (err) {
            console.log("ERROr", err)
        }
    }


    //ищем отмеченный checkbox
    checkBox = async (id) => {
        const tasks = this.state.tasks.map((task) => {
            if (task._id === id) {
                task.checked = !task.checked;
                this.updateCheckedServer(task._id, task.checked)
            }
            return task;
        });
        this.setState({
            tasks,
        });
    };

    updateCheckedServer = (id, checked) => {
        try {
            return axios.put('http://localhost:3000', {id, checked})
        } catch (err) {
            console.log("ERROr ", err)
        }
    }
    //отметить все
    noteAll = async () => {
        const isChecked = this.state.tasks.some((item) => !item.checked);
        const tasks = this.state.tasks.map((item) => {
            item.checked = isChecked;
            return item;
        });

        this.setState({
            tasks,
        });
        await this.noteAllServer(isChecked)
    };
    noteAllServer = (checked) => {
        try {
            return axios.put('http://localhost:3000/all', {checked})
        } catch (err) {
            console.log("ERROr ", err)
        }
    }
    applyFilter = (filterValue) => {
        this.setState({
            filterValue,
        });
    };

    //clear completed
    clearDel = async () => {
        const tasks = this.state.tasks.filter((item) => item.checked !== true);
        this.setState({
            tasks,
        });
        await this.clearDelServer()
    };

    clearDelServer = () => {
        try {
            return axios.delete('http://localhost:3000/deleteAll')
        } catch (err) {
            console.log("ERROr ", err)
        }
    }

    //счетчик элементов
    countItems = () => {
        let lengthItems = this.state.tasks.filter((item) => item.checked !== true);
        return lengthItems.length;
    };

    //удаление элемента
    delete = async (element) => {

        this.setState({
            tasks: this.state.tasks.filter(item => {
                return item !== element
            }),
        });
        await this.delItemServer(element)
    };

    delItemServer = async (task) => {
        console.log(task)
        try {
            return axios.delete(`http://localhost:3000/delete`, {params: {_id: task._id, text: task.text}})

        } catch (err) {
            console.log("ERRO ", err)
        }
    }

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
                <Header/>
                <div className="main">
                    <Input
                        onEnter={this.add}
                        noteAll={this.noteAll}
                        arrowConfig={this.arrowConfig()}
                    />

                    <Task

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

export default Todos;
