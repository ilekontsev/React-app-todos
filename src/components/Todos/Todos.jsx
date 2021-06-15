import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Task from '../Task/Task';
import Footer from '../Footer/Footer';
import InputTask from '../InputTask/InputTask';

const axios = require('axios').default;

let request;

const Todos = (props) => {
  const [tasks, setTasks] = useState([]);
  const [filterValue, setFilterValue] = useState('all');

  axios.interceptors.request.use(async (req) => {
    req.headers.authorization = await localStorage.getItem('token');
    if (req.url === 'http://localhost:3000/refreshToken') return req;
    request = req;
    return req;
  });

  axios.interceptors.response.use((res) => res, async (err) => {
    if (err.response.status === 401) {
      const refTokenSend = {
        refToken: localStorage.getItem('refToken'),
      };
      await axios.post('http://localhost:3000/refreshToken', refTokenSend)
        .then((response) => {
          const { token, refToken } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('refToken', refToken);
          return 0;
        });

      request.authorization = localStorage.getItem('token');
      return axios.request(request);
    }

    if (err.response.status === 403) {
      localStorage.clear();
      window.location.href = '/login';
      return 0;
    }
    return 0;
  });

  const getTaskedWithServer = async () => {
    await axios.get('http://localhost:3000/todos/getTasks').then((response) => {
      const upd = response.data;
      setTasks(upd);
    }).catch((err) => {
      console.log('eereeerr ', err);
    });
  };

  useEffect(() => {
    getTaskedWithServer();
  }, []);

  // создание элемента
  const add = async (value) => {
    const updated = {
      text: value,
      checked: false,
    };

    const checkDublicate = tasks.some(
      (item) => item.text === updated.text,
    );
    if (!checkDublicate) {
      const response = await axios.post('http://localhost:3000/todos/createTask', updated);
      updated._id = response.data._id;
      updated.userId = response.data.userId;
      updated.date = response.data.dateInp;
      const taskUpd = tasks.concat(updated);
      setTasks(taskUpd);
    }
  };

  const updateCheckedServer = (id, checked) => {
    try {
      return axios.put('http://localhost:3000/todos/updCheckbox', { id, checked });
    } catch (err) {
      console.log('ERROr ', err);
      return 0;
    }
  };

  // ищем отмеченный checkbox
  const checkBox = async (id) => {
    const taskUpd = tasks.map((task) => {
      if (task._id === id) {
        task.checked = !task.checked;
        updateCheckedServer(task._id, task.checked);
      }
      return task;
    });
    setTasks(taskUpd);
  };

  const noteAllServer = (checked, userId) => {
    try {
      return axios.put('http://localhost:3000/todos/all', { checked, userId });
    } catch (err) {
      console.log('ERROr ', err);
      return 0;
    }
  };

  // отметить все
  const noteAll = async () => {
    const isChecked = tasks.some((item) => !item.checked);
    const tasksUpd = tasks.map((item) => {
      item.checked = isChecked;
      return item;
    });
    setTasks(tasksUpd);
    await noteAllServer(isChecked, tasks[0].userId);
  };

  const applyFilter = (filter) => {
    setFilterValue(filter);
  };

  const clearDelServer = (userId) => {
    try {
      return axios.delete('http://localhost:3000/todos/deleteAll', { params: { userId } });
    } catch (err) {
      console.log('ERROr ', err);
      return 0;
    }
  };

  // clear completed
  const clearDel = async () => {
    await clearDelServer(tasks[0].userId);
    const tasksUpd = tasks.filter((item) => item.checked !== true);
    setTasks(tasksUpd);
  };

  // счетчик элементов
  const countItems = () => {
    const lengthItems = tasks.filter((item) => item.checked !== true);
    return lengthItems.length;
  };

  const delItemServer = async (task) => {
    console.log(task);
    try {
      return axios.delete('http://localhost:3000/todos/delete', { params: { _id: task._id, text: task.text } });
    } catch (err) {
      console.log('ERRO ', err);
      return 0;
    }
  };

  // удаление элемента
  const deleteTask = async (element) => {
    const tasksUpd = tasks.filter((item) => item !== element);
    setTasks(tasksUpd);
    await delItemServer(element);
  };

  const getTasks = () => {
    if (filterValue === 'all') {
      return tasks;
    }
    if (filterValue === 'active') {
      return tasks.filter((task) => !task.checked);
    }
    if (filterValue === 'completed') {
      return tasks.filter((task) => task.checked);
    }
    return 0;
  };

  const arrowConfig = () => {
    let config = 'invisible';

    if (!getTasks().length) {
      return config;
    }
    const isChecked = tasks.every((item) => item.checked);
    config = isChecked ? 'solid' : 'arrow';
    return config;
  };

  const sendDateTaskOnServer = async (date, id) => {
    console.log(date, id);
    try {
      await axios.put('http://localhost:3000/todos/date', { date, id });
    } catch (err) {
      console.log('ERRO ', err);
    }
  };

  const dateInpTask = (date, id) => {
    const tasksUpd = tasks.map((task) => {
      if (task._id === id) {
        task.date = date;
      }
      return task;
    });
    setTasks(tasksUpd);
    sendDateTaskOnServer(date, id);
  };

  // if (!props.token) {
  //   return <Redirect to="/login" />;
  // }
  return (
    <div className="contain">
      <Header />
      <button type="button" className="butPos" onClick={props.logout}>logout</button>
      <div className="main">
        <InputTask
          onEnter={add}
          noteAll={noteAll}
          arrowConfig={arrowConfig()}
        />
        <Task
          tasks={getTasks()}
          checkBox={checkBox}
          deleteTask={deleteTask}
          dateInpTask={dateInpTask}
        />
        <Footer
          tasks={tasks}
          items={countItems()}
          clearDel={clearDel}
          applyFilter={applyFilter}
          filterValue={filterValue}
        />
      </div>
    </div>
  );
};

Todos.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Todos;
