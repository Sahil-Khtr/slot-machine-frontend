import React, { useState } from "react";
import { setItemToStorage } from "../../utils/Helper";
import { StorageConstant } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid.";
    if (!password) errors.password = "Password is required.";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setApiError(null);

    try {
      const response = await axiosClient.post("user/login", {
        email,
        password,
      });

      const { user, tokens } = response.data.data;

      setItemToStorage(StorageConstant.info, user);

      setItemToStorage(StorageConstant?.balance, user.amount);

      setItemToStorage(StorageConstant.is_login_token, tokens);

      navigate("/"); // Redirect to the home page or dashboard after successful login
    } catch (error) {
      setApiError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="text-light">
        {/* Email input */}
        <div className="form-outline mb-4">
          <input
            type="email"
            id="email"
            className={`form-control form-control-lg ${
              errors.email ? "is-invalid" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        {/* Password input */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="password"
            className={`form-control form-control-lg ${
              errors.password ? "is-invalid" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* Checkbox */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label className="form-check-label p-1" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          {/* <a href="#!">Forgot password?</a> */}
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-dark btn-block w-100"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {apiError && <div className="alert alert-danger mt-3">{apiError}</div>}
      </form>
      <div className="text-secondary my-3 py-3 float-right">
        Don't have an account? <a href="register">Register</a>
      </div>
    </>
  );
}

export default Login;
