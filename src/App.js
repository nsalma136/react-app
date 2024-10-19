import React, { useState } from 'react';
import './App.css';

function App() {
  // Form state for adding users
  const [userForm, setUserForm] = useState({
    name: '',
    age: '',
    sex: 'Male',  // Default to 'Male'
    city: '',
    state: ''
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://node-mysql-db.stacknow.dev/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userForm)
      });
      
      if (response.ok) {
        alert('User added successfully!');
        // Clear the form
        setUserForm({
          name: '',
          age: '',
          sex: 'Male',
          city: '',
          state: ''
        });
      } else {
        alert('Failed to add user.');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="App">
      {/* User form */}
      <div className="user-form">
        <h2>Add a User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={userForm.age}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Sex:
            <select name="sex" value={userForm.sex} onChange={handleInputChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={userForm.city}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={userForm.state}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
}

export default App;
