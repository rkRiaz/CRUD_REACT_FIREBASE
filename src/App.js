import "./App.css";
import { db } from "./firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState("");
  const [editButton, setEditButton] = useState(false);
  const [reload, setReload] = useState(false)

  const [values, setValues] = useState({
    user_id: "",
    name: "",
    email: "",
    age: "",
  });
console.log(values)
  const contactsCollectionRef = collection(db, "contacts");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(contactsCollectionRef);
      setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setContacts(data.docs.map((doc) => ({ ...doc.data() })));
    };
    fetchData();
  }, [reload]);

  const changeValue = (event, type) => {
    setValues({
      ...values,
      [type]: event.target.value,
    });
  };

  const submitHandler = async(event) => {
    event.preventDefault()
    await addDoc(contactsCollectionRef, values)
    alert("Saved!")
    setReload(prev => !prev)
  }

  const editHandler = (id) => async(event) => {
    event.preventDefault()
    setEditButton(true)
    let findContact = contacts.find(c => c.id == id)
    setValues(findContact)
  }
  const editContactSubmit = async(event) => {
    event.preventDefault()
    const contactDoc = doc(db, "contacts", values.id)
    await updateDoc(contactDoc, values)
    alert("Updated!")
    setReload(prev => !prev)
  }

  const deleteHandler = (id) => async(event) => {
    event.preventDefault()
    let confirmed = window.confirm("Do you want to delete?")
    if(confirmed) {
      const contactDoc = doc(db, "contacts", id)
      await deleteDoc(contactDoc)
      alert("Deleted!")
      setReload(prev => !prev)
    }
  }

  return (
    <div className="container">
      <h1>Simple CRUD App with Firebase database</h1>
      <form onSubmit={submitHandler} className="inputSection">
        <input value={values.user_id}
          onChange={(event) => changeValue(event, "user_id")}
          type="number"
          placeholder="Enter User Id"
        />
        <input value={values.name}
          onChange={(event) => changeValue(event, "name")}
          type="text"
          placeholder="Enter Name"
        />
        <input value={values.email}
          onChange={(event) => changeValue(event, "email")}
          type="text"
          placeholder="Enter Email"
        />
        <input value={values.age}
          onChange={(event) => changeValue(event, "age")}
          type="number"
          placeholder="Enter Age"
        />
        {editButton ? "" : <button type="submit">Save</button>}
        {editButton ? <button onClick={editContactSubmit}>Edit data</button> : ""}

        
      </form>

      {contacts ? (
        contacts.length === 0 ? (
          <p>No data</p>
        ) : (
          <div className="table">
            <table id="table">
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.user_id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.age}</td>
                  <td><button onClick={editHandler(contact.id)} style={{backgroundColor: "#008CBA", padding: "5px", margin: 0}}>Edit</button></td>
                  <td><button onClick={deleteHandler(contact.id)} style={{backgroundColor: "#f44336", padding: "5px", margin: 0}}>Delete</button></td>
                </tr>
              ))}
            </table>
          </div>
        )
      ) : (
        <div className="loading">
          <img src="loading.svg" alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
