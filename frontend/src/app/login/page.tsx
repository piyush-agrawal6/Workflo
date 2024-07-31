"use client";

import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import "./page.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetError } from "@/redux/auth/action";
import { RootState } from "@/redux/store";
import { Dispatch } from "redux";
import { showError, showSuccess } from "@/utils/notification";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { error, errorMessage, token, loading } = useSelector(
    (store: RootState) => store.auth
  );
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const data: LoginData = {
      email,
      password,
    };
    dispatch(
      loginUser(data, () => {
        showSuccess("Login Successful");
      })
    );
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const navigateToSignup = (): void => {
    router.push("/signup");
  };

  useEffect(() => {
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

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

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error || errorMessage) {
      dispatch(resetError());
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error || errorMessage) {
      dispatch(resetError());
    }
    setPassword(e.target.value);
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <p className="loginWelcomeText">
          Welcome to <span>Workflo!</span>
        </p>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="loginFormEMail">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Your email"
            />
          </div>
          {error && errorMessage === "User not found" && (
            <p className="">User doesn't exist. Please signup!</p>
          )}
          <div className="loginFormPassword">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
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
          {error && errorMessage === "Invalid credentials" && (
            <p className="">Invalid credentials!</p>
          )}
          <input
            className={!isFormValid ? "disabled" : ""}
            type="submit"
            value={loading ? "Loading..." : "Login"}
            disabled={!isFormValid}
          />
        </form>
        <p className="loginEndText">
          Don’t have an account? Create a{" "}
          <span onClick={navigateToSignup} className="signupLink">
            new account.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
