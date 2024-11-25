import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    department: "",
    profileimg: "",
  });

  const [file, setFile] = useState("");
  const formRef = useRef(null);

  /* File Reference for Storage */
  const folderName = "userImages";
  const timestamp = new Date().getTime();
  const newFileName = `${folderName}/${timestamp}-${file.name}`;
  const storageRef = ref(storage, newFileName);

  const studentCollectionRef = doc(collection(db, "students"));

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addDataToFirebase = async () => {
    await setDoc(studentCollectionRef, formData)
      .then(() => {
        toast.success("Student Added successfully");
      })
      .catch((err) => console.log(err));
  };

  /* Uploading Image to Storage */
  useEffect(() => {
    const uploadImageToStorage = () => {
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setFormData((prev) => ({ ...prev, profileimg: downloadURL }));
          });
        }
      );
    };

    file && uploadImageToStorage();
  }, [file]);

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Database */
    addDataToFirebase();

    setFormData({});

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <section className="addStd">
      <Link to={"/home"} className="back_arrow">
        <ion-icon name="arrow-back-sharp"></ion-icon>
      </Link>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input
          type="file"
          name="profileimg"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          name="fullname"
          placeholder="Student Full Name..."
          required
          onChange={handleInput}
        />
        <input
          type="email"
          name="email"
          placeholder="Student Email..."
          required
          onChange={handleInput}
        />
        <input
          type="text"
          name="department"
          placeholder="Student Department..."
          required
          onChange={handleInput}
        />

        <button type="submit">Add Student</button>
      </form>
    </section>
  );
};

export default AddStudent;
