// UpdateDonarForm.js
import React, { useState } from 'react';

const UpdateDonarForm = ({ donar, onUpdate, onCancel }) => {
  const [updatedDonar, setUpdatedDonar] = useState({ ...donar });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDonar({ ...updatedDonar, [name]: value });
  };

  const handleSubmit = () => {
    // Call an API or update function to save the changes to the Donar record
    onUpdate(updatedDonar);
  };

  return (
    <div>
      <h2>Update Donar Information</h2>
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={updatedDonar.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={updatedDonar.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={updatedDonar.phone}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSubmit}>Update</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateDonarForm;
