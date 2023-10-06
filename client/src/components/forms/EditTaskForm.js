import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../common";

const EditTaskForm = props => {
    const [task, setTask] = useState(props.currentTask);

    useEffect(() => {
        setTask(props.currentTask);
    }, [props]);

    const handleInputChange = event => {
        const { name, value } = event.target;

        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!task.title || !task.body || !task.color) return;

        try {
            const data = await axios.put(
                `${baseUrl}/tasks/${task.id}`,
                task,
                { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } }
            );
            props.updateTask(data.data.data._id, data.data.data);

        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Title"
                required
            />
            <br />
            <label>Body</label>
            <input
                type="text"
                name="body"
                value={task.body}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Body"
                required
            />
            <br />
            <label htmlFor="Contact">Color:</label>
            <select onChange={handleInputChange} name="color" defaultValue={task.color} >
                <option value="">Select</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="yellow" >Yellow</option>
                <option value="black">Black</option>
                <option value="grey">Grey</option>
                <option value="green">Green</option>
            </select>
            <br />
            <br />
            <button className="button btn btn-primary">Update task</button>
            <button
                onClick={() => props.setEditing(false)}
                className="button btn btn-secondary"
            >
                Cancel
            </button>
        </form>
    );
};

export default EditTaskForm;
