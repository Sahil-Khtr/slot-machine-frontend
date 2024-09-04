import React, { useState } from "react";
import { setItemToStorage } from "../../utils/Helper";
import { StorageConstant } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!fullName) errors.fullName = "Full name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid.";
    if (!password) errors.password = "Password is required.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
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
      const response = await axiosClient.post("user/register", {
        name: fullName,
        email,
        password,
      });
      console.log(response.data);

      const { user, tokens } = response.data;

      setItemToStorage(StorageConstant.info, user);
      setItemToStorage(StorageConstant.is_login_token, tokens);

      navigate("/"); // Redirect to the login page or another page after successful registration
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
        {/* Full Name */}
        <div className="form-outline mb-4">
          <input
            type="text"
            id="fullName"
            className={`form-control form-control-sm ${
              errors.fullName ? "is-invalid" : ""
            }`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label className="form-label" htmlFor="fullName">
            Full Name
          </label>
          {errors.fullName && (
            <div className="invalid-feedback">{errors.fullName}</div>
          )}
        </div>
        {/* Email input */}
        <div className="form-outline mb-4">
          <input
            type="email"
            id="email"
            className={`form-control form-control-sm ${
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
            className={`form-control form-control-sm ${
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
        {/* Confirm Password input */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="confirmPassword"
            className={`form-control form-control-sm ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Checkbox */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-dark w-100 btn-block"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Sign Up"}
        </button>
        {apiError && <div className="alert alert-danger mt-3">{apiError}</div>}
      </form>
      <div className="text-secondary my-3 py-2 float-right">
        Already have an account? <a href="login">Login</a>
      </div>
    </>
  );
}

export default Register;
