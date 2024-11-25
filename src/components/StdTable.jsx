import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const StdTable = () => {
  const stdCollectionRef = collection(db, "students");
  const [data, setData] = useState([]);
  const [isPopupEnable, setIsPopupEnable] = useState(false);
  const [stdID, setStdID] = useState("");

  const [updateData, setUpdateData] = useState({
    fullname: "",
    email: "",
    department: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "students", id))
      .then(() => toast.success("Student deleted Successfully"))
      .catch((err) => console.log(err));

    getDataFromDB();
  };

  /* Update Student */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "students", stdID);

    await updateDoc(docRef, updateData)
      .then(() => {
        toast.success("Student Record updated");
        setIsPopupEnable(false);
      })
      .catch((err) => console.log(err));
    getDataFromDB();
  };

  const getDataFromDB = async () => {
    const snapShot = await getDocs(stdCollectionRef);
    const studentData = snapShot.docs.map((doc) => ({
      id: doc.id,
      fullname: doc.data().fullname,
      email: doc.data().email,
      department: doc.data().department,
      profileimg: doc.data().profileimg,
    }));
    setData(studentData);
  };

  useEffect(() => {
    getDataFromDB();
  }, []);

  return (
    <section className="stdTable">
      <div className="stdInfo">
        {/* Header */}
        <div className="stdTable_header">
          <strong>Sr:</strong>
          <strong>Profile:</strong>
          <strong>Name:</strong>
          <strong>Email:</strong>
          <strong>Department:</strong>
          <strong>Actions:</strong>
        </div>

        <div className="stdTable_body">
          {data.map((std, index) => (
            <div className="stdData" key={std.id}>
              <p>{index + 1}</p>
              <p>
                <img
                  className="profileimg"
                  src={std.profileimg}
                  alt={std.fullname}
                />
              </p>
              <p>{std.fullname}</p>
              <p>{std.email}</p>
              <p>{std.department}</p>
              <p className="actions">
                <span
                  onClick={() => {
                    setIsPopupEnable(true);
                    setStdID(std.id);
                  }}
                >
                  <ion-icon name="create-outline"></ion-icon>
                </span>
                <span
                  onClick={() => handleDelete(std.id)}
                  style={{ color: "red" }}
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* PopUp */}
        {isPopupEnable && (
          <section className="popUp_wrapper">
            <div className="popUp_content">
              <p onClick={() => setIsPopupEnable(false)}>X</p>

              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Student Full Name..."
                  onChange={handleInput}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Student Email..."
                  onChange={handleInput}
                />
                <input
                  type="text"
                  name="department"
                  placeholder="Student Department..."
                  onChange={handleInput}
                />

                <button type="submit">Update</button>
              </form>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default StdTable;
