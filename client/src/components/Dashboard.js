import React, { useState } from 'react';

const Dashboard = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [color, setColor] = useState('');
    const [items, setItems] = useState([]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    const handleSubmit = () => {
        if (title && body && color) {
            const newItem = {
                title,
                body,
                color,
                id: Date.now(),
            };
            setItems([...items, newItem]);
            setTitle('');
            setBody('');
            setColor('');
        } else {
            alert('Please fill in all fields.');
        }
    };

    const handleDelete = (id) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                <h3>Add Item</h3>
                <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
                <input type="text" placeholder="Body" value={body} onChange={handleBodyChange} />
                <input type="color" value={color} onChange={handleColorChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div>
                <h3>Items</h3>
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <span style={{ color: item.color }}>{item.title}</span>
                            <span>{item.body}</span>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
