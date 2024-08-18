import React, { useEffect, useState } from 'react';
import Layout from './../../components/shared/Layout/Layout';
import moment from 'moment';
import API from '../../services/API';
import UpdateDonarForm from '../../components/shared/Form/UpdateDonarForm';

const DonarList = () => {
  const [data, setData] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedDonar, setSelectedDonar] = useState(null);

  const getDonars = async () => {
    try {
      const { data } = await API.get('/admin/donar-list');
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  const handleUpdate = (id) => {
    const donarToUpdate = data.find((donar) => donar._id === id);
    setSelectedDonar(donarToUpdate);
    setShowUpdateForm(true);
  };

  const handleCancelUpdate = () => {
    setShowUpdateForm(false);
    setSelectedDonar(null);
  };

  const handleDonarUpdate = (updatedDonar) => {
    API.put(`/admin/update-donar/${updatedDonar._id}`, updatedDonar)
    .then((response) => {
      // Handle successful update (e.g., show a success message, hide the update form, and refresh the data)
      alert('Donar updated successfully');
      setShowUpdateForm(false);
      setSelectedDonar(null);
      getDonars(); // Refresh Donar data
    })
    .catch((error) => {
      // Handle errors (e.g., display an error message)
      console.error('Error updating Donar:', error);
    });
  };

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt('Are You Sure You Want To Delete This Donar', 'Sure');
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      // After successful deletion, you can refresh the Donar data.
      getDonars();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {showUpdateForm ? (
        <UpdateDonarForm donar={selectedDonar} onUpdate={handleDonarUpdate} onCancel={handleCancelUpdate} />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.name || record.organisationName + ' (ORG)'}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(record._id)}>
                    Delete
                  </button>
                  <button className="btn btn-primary" onClick={() => handleUpdate(record._id)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default DonarList;
