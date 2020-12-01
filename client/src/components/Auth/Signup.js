import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth-service";

const initialState = { username: "", password: "" };

const Signup = () => {
  const [regForm, setRegForm] = useState(initialState);

  const service = new AuthService();

  // Form submission handler
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password } = regForm;

    service
      .signup(username, password)
      .then((response) => {
        setRegForm(initialState);
        // this.props.getUser(response)
      })
      .catch((error) => console.log(error));
  };

  // Change handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegForm({ ...regForm, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={regForm.username}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          name="password"
          value={regForm.password}
          onChange={handleChange}
        />

        <input type="submit" value="Signup" />
      </form>

      <p>
        Already have account?
        <Link to={"/"}> Login</Link>
      </p>
    </div>
  );
};

export default Signup;
