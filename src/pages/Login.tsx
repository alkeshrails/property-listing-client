import React, { BaseSyntheticEvent, useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import '../styles/filters.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const LoginForm = ({ handleFormChange }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("")

  const navigate = useNavigate()

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading,setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`,
        formValue
      );
      let data = await response.headers.get("Authorization");
      setIsLoading(false)
      localStorage.setItem("auth-token", data);
      console.log(response.data, "fchsfkucsdghfkdsgfv")
      localStorage.setItem("user-type", response.data.data.user_type)
      navigate("/")
    } catch (error) {
      setIsLoading(false)
      setError("Please enter valid credentials")
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { email: "", password: "" };

    if (!formValue.email) {
      formIsValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValue.email)) {
      formIsValid = false;
      newErrors.email = "Email is not valid";
    }

    if (!formValue.password) {
      formIsValid = false;
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (validateForm()) {
      console.log("Form submitted with data:", formValue);
      setIsSubmitted(true);
      handleLogin()
    }
  };

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;

    let error = '';
    if (name === 'email' && !value.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      error = 'Invalid email format';
    }
    if (name === 'password' && value.length < 6) {
      error = 'Password must be at least 6 characters';
    }

    setErrors({
      ...errors,
      [name]: error,
    });

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <div data-testid="login-wrapper" className='flex h-[100vh] bg-gradient-to-r from-blue-300 to-cyan-700'>
      <div className="md:w-[500px] w-[85%] mx-auto flex items-center">
        <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-full">
          <h2 className="text-2xl text-cyan-800 font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className='mb-3'>

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formValue.email}
                  onChange={handleChange}
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}

              </div>
              <div className='mb-3'>

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formValue.password}
                  onChange={handleChange}
                  className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
                />
                {errors.password && <span className="text-red-500">{errors.password}</span>}

              </div>
            </div>
            <button
              name="Login"
              type="submit"
              className="w-full bg-gradient-to-r from-blue-300 to-cyan-700 text-white p-2 rounded shadow-md hover:shadow-lg flex justify-center items-center"
            >
             { isLoading ? "signing in..." : "Sign In"}
            </button>
            <Typography style={{textAlign: "center"}}>Don't have account ? <Link to="/register">Register</Link></Typography>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
