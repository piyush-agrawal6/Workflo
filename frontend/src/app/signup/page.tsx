"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import "./page.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { registerUser, resetError } from "@/redux/auth/action";
import { showError, showSuccess } from "@/utils/notification";
import { Dispatch } from "redux";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const { loading, error, token, errorMessage } = useSelector(
    (store: RootState) => store.auth
  );
  const dispatch: Dispatch<any> = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = {
      name: username,
      email,
      password,
    };
    dispatch(
      registerUser(data, () => {
        showSuccess("Signup Successful");
      })
    );
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const navigateToLogin = (): void => {
    router.push("/login");
  };

  useEffect(() => {
    setIsFormValid(
      username.trim() !== "" && email.trim() !== "" && password.trim() !== ""
    );
  }, [username, email, password]);

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  useEffect(() => {
    if (error && errorMessage === "Something went wrong") {
      showError("Something went wrong, Please try again later");
    }
  }, [error, errorMessage]);

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <p className="loginWelcomeText">
          Welcome to <span>Workflo!</span>
        </p>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="loginFormUsername">
            <input
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              required
              placeholder="Full name"
            />
          </div>
          <div className="loginFormEmail">
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (error || errorMessage) {
                  dispatch(resetError());
                }
                setEmail(e.target.value);
              }}
              required
              placeholder="Your email"
            />
          </div>
          {error && errorMessage === "User already registered" ? (
            <p>User with the same email already exists. Please Login!</p>
          ) : null}
          <div className="loginFormPassword">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              placeholder="Password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="loginFormEyeIcon"
            >
              {showPassword ? <VscEye /> : <VscEyeClosed />}
            </span>
          </div>
          <input
            className={!isFormValid ? "disabled" : ""}
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!isFormValid}
          />
        </form>
        <p className="loginEndText">
          Already have an account?{" "}
          <span onClick={navigateToLogin} className="signupLink">
            Log in.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
