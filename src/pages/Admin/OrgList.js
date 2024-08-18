import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const OrgList = () => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      console.log(data);
      if (data?.success) {
        setData(data?.orgData);
      }
    } catch (error) {
      console.log (error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  const handelDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You Sure Want To Delete This Organization",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      // Make an API call to update the organization data
      // You should use the `updateData` state to send the updated data to the server
      const { data } = await API.put(`/admin/update-organization/${updateData._id}`, updateData);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = (record) => {
    setUpdateData(record);
    setIsUpdating(true);
  };

  return (
    <Layout>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.organisationName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handelDelete(record._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() => handleUpdateClick(record)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUpdating && (
        <div>
          <h2>Update Organization</h2>
          <form>
            <div className="form-group">
              <label htmlFor="organisationName">Organization Name</label>
              <input
                type="text"
                className="form-control"
                id="organisationName"
                value={updateData.organisationName}
                onChange={(e) =>
                  setUpdateData({ ...updateData, organisationName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={updateData.email}
                onChange={(e) =>
                  setUpdateData({ ...updateData, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={updateData.phone}
                onChange={(e) =>
                  setUpdateData({ ...updateData, phone: e.target.value })
                }
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default OrgList;
