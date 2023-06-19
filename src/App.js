import React, { useState } from "react";
import { Formik } from "formik";
import "./App.css";

export default function App() {
  const [form, setForm] = useState({});
  const [library, setLibrary] = useState([
    {
      id: "0",
      title: "book 1",
      quantity: 1
    },
    {
      id: "1",
      title: "book 2",
      quantity: 2
    },
    {
      id: "2",
      title: "book 3",
      quantity: "2"
    }
  ]);
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleValidate() {
    const errors = {};
    if (!form.title) {
      errors.title = "Required";
    }
    if (!form.quantity) {
      errors.quantity = "Required";
    } else if (!Number(form.quantity)) {
      errors.quantity = "Must have only numberic chacracters in this field";
    }
    return errors;
  }

  function handleSubmit() {
    alert("Add book successfully!!!");
    if (form.id==undefined){
      setLibrary([...library,{id:Math.floor(Math.random()*100),title:form.title,quantity:form.quantity}])
    }
    else{
      const clone = library.filter(item=>item.id!=form.id )
      const [index] = library.filter(item=>item.id==form.id )
      clone.splice(index.id,0,form)
      setLibrary(clone)
    }
  }
  function deletebook(id){
    setLibrary(library.filter(item=>item.id!=id))
  }
  function editbook(item){
    setForm(item)
  }
  return (
    <div>
      <h1>Library</h1>
      <Formik
        initialValues={form}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {({ errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div
              className={`custom-input ${
                errors.title ? "custom-input-error" : ""
              }`}
            >
              <label>Tiêu đề</label>
              <input
                type="text"
                name="title"
                value={form.title || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.title}</p>
            </div>
            <div
              className={`custom-input ${
                errors.quantity ? "custom-input-error" : ""
              }`}
            >
              <label>Số lượng</label>
              <input
                type="text"
                name="quantity"
                value={form.quantity || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.quantity}</p>
            </div>

            <button type="submit" style={{ marginTop: 10 }}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <table>
        <tr>
          <th>Title</th>
          <th>Number</th>
          <th>Action</th>
        </tr>
        {library &&
          library.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={()=>editbook(item)}>Edit</button>
                <button onClick={()=>deletebook(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}
