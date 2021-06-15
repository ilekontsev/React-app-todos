

const Task = (props) => {
    const checkTF = (id) => {
        props.checkBox(id);
    };

    const dateInp = (e, id) => {

        props.dateInpTask(e.target.value, id)
    }

    return (
        <div className="task-contain">
            {props.tasks.map((item) => (
                <div className="task" key={item._id}>
                    <div className="cont-checkbox-p">
                        <input
                            className="checkbox"
                            onChange={() => checkTF(item._id)}
                            type="checkbox"
                            checked={item.checked}
                            id={item._id}
                        />
                        <label htmlFor={item._id} className="label"/>
                        <p>{item.text}</p>
                    </div>

                    <div className={'cont-date-cross'}>
                        <input className={'inp-date'} type={'datetime-local'}
                               onChange={(e) => dateInp(e, item._id) }
                               defaultValue={item.date && item.date.split('.')[0]}
                        />
                        <div className="cross" onClick={() => props.deleteTask(item)}>
                            <div className="fas fa-times"/>
                        </div>
                    </div>


                </div>
            ))}
        </div>
    );
}
export default Task;
