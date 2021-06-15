import React, {PureComponent} from "react";
import Header from "../Header/Header";
import Task from "../Task/Task";
import Input from "../Input/Input";
import Footer from "../Footer/Footer";


const axios = require('axios').default;
let request

axios.interceptors.request.use(async req => {
    req.headers.authorization = await localStorage.getItem('token')
    if (req.url === "http://localhost:3000/refreshToken") return req
    request = req
    return req
})

axios.interceptors.response.use(res => {
    return res
}, async (err) => {
    console.log(err)
    if (err.response?.status === 401) {
        const refToken = {
            refToken: localStorage.getItem("refToken")
        }
        await axios.post('http://localhost:3000/refreshToken', refToken)
            .then((response) => {
                const token = response.data.token
                const refToken = response.data.refToken
                localStorage.setItem("token", token)
                localStorage.setItem("refToken", refToken)
            })
        console.log(23)
        request.authorization = localStorage.getItem("token")
        return axios.request(request)
    }

    if (err.response?.status === 403) {
        console.log("wda")
        localStorage.clear()
        window.location.href = '/login'
    }
})


class Todos extends PureComponent {
    state = {
        tasks: [],
        filterValue: "all",
    };
    request = null

    async componentDidMount() {
        await this.getTaskedWithServer()
    }

    getTaskedWithServer = async () => {
        await axios.get('http://localhost:3000/todos/getTasks',
        ).then((response) => {
            const upd = response.data
            this.setState({
                tasks: upd
            })
        }).catch(err => {
            console.log('eereeerr ', err)
        })


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
            const response = await this.taskCreatedSendServer(updated)
            if (response?.data !== undefined) {
                updated._id = response.data._id
                updated.userId = response.data.userId
                this.setState({
                    tasks: this.state.tasks.concat(updated),
                });
            }
        }
    };


    taskCreatedSendServer = async (updated) => {
        return axios.post('http://localhost:3000/todos/createTask', updated)
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
            return axios.put('http://localhost:3000/todos/updCheckbox', {
                id,
                checked
            })
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
        await this.noteAllServer(isChecked, tasks[0].userId)
    };
    noteAllServer = (checked, userId) => {

        try {
            return axios.put('http://localhost:3000/todos/all', {checked, userId})
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
        await this.clearDelServer(this.state.tasks[0].userId)
        const tasks = this.state.tasks.filter((item) => item.checked !== true);
        this.setState({
            tasks,
        });
    };

    clearDelServer = (userId) => {
        try {
            return axios.delete('http://localhost:3000/todos/deleteAll', {params: {userId: userId}})
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
            return axios.delete(`http://localhost:3000/todos/delete`, {params: {_id: task._id, text: task.text}})

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
                <button className="butPos" onClick={this.props.logout}>logout</button>
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
