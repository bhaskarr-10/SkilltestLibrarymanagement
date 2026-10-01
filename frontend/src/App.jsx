import { useState } from "react";
import axios from "axios";

function App() {

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publicationYear: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/books",
        formData
      );

      setMessage("Book added successfully!");

      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publicationYear: ""
      });

    } catch (error) {

      console.log(error);

      setMessage("Failed to add book.");

    }
  };

  return (
    <div>
      <h1>Library Book Management System</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="publicationYear"
          placeholder="Publication Year"
          value={formData.publicationYear}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Book
        </button>

      </form>

      <h3>{message}</h3>

    </div>
  );
}

export default App;