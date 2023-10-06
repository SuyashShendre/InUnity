import React from "react";

const UserTable = props => (
    <table className="table table-striped ">
        <thead>
            <tr>
                <th>Title</th>
                <th>Body</th>
                <th>Color</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {props.tasks.length > 0 ? (
                props.tasks.map(task => (
                    <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.body}</td>
                        <td><div style={{ "backgroundColor": task.color, "height": "30px", "width": "50px" }}></div></td>
                        <td>{new Date(task.createdAt).toString().split(" ", 4).join(" ")}</td>
                        <td>
                            <button
                                onClick={() => {
                                    props.editRow(task);
                                }}
                                className="button btn btn-primary"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => props.deleteTask(task._id)}
                                className="button btn btn-danger"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5}>No tasks</td>
                </tr>
            )}
        </tbody>
    </table>
);

export default UserTable;
