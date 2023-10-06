import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../common";

const AddTaskForm = props => {
    const initialFormState = { id: null, title: "", body: "", color: "" };
    const [task, setTask] = useState(initialFormState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!task.title || !task.body || !task.color) return;

        try {
            const data = await axios.post(
                `${baseUrl}/tasks`,
                task,
                { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } }
            );

            props.addTask(data.data.data);
            setTask(initialFormState);
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="needs-validation"
            >
                <label htmlFor="Title">Title:</label>
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
                <label htmlFor="Body">Body:</label>
                <input
                    type="body"
                    name="body"
                    value={task.body}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Body"
                    required
                />
                <br />
                <label htmlFor="Color">Color:</label>
                <select onChange={handleInputChange} name="color" >
                    {/* {task.color} */}
                    <option value="">Select</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="yellow">Yellow</option>
                    <option value="black">Black</option>
                    <option value="grey">Grey</option>
                    <option value="green">Green</option>
                </select>
                <br />
                <br />
                <button className="btn btn-primary">Add new task</button>
            </form>
        </div>
    );
};

export default AddTaskForm;
