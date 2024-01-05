import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
  return (
    <div>
        <h1>Register to post</h1>
        <p>Register as a user and share your stories</p>
        <form>
          <label>
            <span>Name:</span>
            <input type="text" name="displayName" required placeholder="User full name" />
          </label>
          <label>
            <span>E-mail:</span>
            <input type="email" name="email" required placeholder="User e-mail" />
          </label>
          <label>
            <span>Password:</span>
            <input type="password" name="password" required placeholder="Type your password" />
          </label>
          <label>
            <span>Password confirmation:</span>
            <input type="password" name="confirmPassword" required placeholder="Confirm your password" />
          </label>
          <button className="btn">Register</button>
        </form>
    </div>
  )
}

export default Register