import React, { useState } from "react";
import Flex from "../components/layouts/Flex";
import Input from "../components/layouts/Input";
import Checkbox from "../components/layouts/Checkbox";
import Button from "../components/layouts/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/userSlice";

const SingIn = () => {
  // dispatch
  const dispatch = useDispatch();
  // auth
  const auth = getAuth();
  // navigate
  const navigate = useNavigate();
  // values state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);
  //  errors state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const handleSubmit = () => {
    if (!email) {
      setEmailError("email is required");
    } else {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        setEmailError("invalid email");
      }
    }
    if (!password) {
      setPasswordError("password is required");
    }
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user.emailVerified) {
            dispatch(userLoginInfo(user));
            localStorage.setItem("userLoginInfo", JSON.stringify(user));
            setEmail("");
            setPassword("");
            setLoading(false);
            toast.success("login successfully ", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          } else {
            setTimeout(() => {
              navigate("/emailVerified");
            }, 2000);
          }
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/user-not-found")) {
            setEmailError("email not matched");
          }
          if (errorCode.includes("auth/wrong-password")) {
            setPasswordError("incorrect password");
          }
        });
    }
  };
  return (
    <>
      <ToastContainer />
      <Flex className="h-screen">
        <Flex
          className={"w-full lg:w-1/2 flex-col justify-center xl:pl-7 p-7  "}
        >
          <div>
            <h1 className="text-3xl font-bold font-inter text-primary">
              Welcome To <span>Chatt</span>
            </h1>
            <h2 className="mt-4 mb-6 text-2xl font-bold font-inter">Log In</h2>
            <Input
              type="email"
              placeholder="Enter your mail"
              label="email"
              handle={handleEmail}
              value={email}
            />
            <p className="text-sm font-medium text-red-500 font-inter">
              {emailError ? emailError : ""}
            </p>
            <div className="relative xl:w-[492px] w-full">
              <Input
                type={eye ? "password" : "text"}
                placeholder="Password"
                label="Password"
                handle={handlePassword}
                value={password}
              />

              <p className="text-sm font-medium text-red-500 font-inter">
                {passwordError ? passwordError : ""}
              </p>

              {eye ? (
                <FiEyeOff
                  className="absolute inline-block cursor-pointer right-4 top-14"
                  onClick={() => setEye(false)}
                />
              ) : (
                <FiEye
                  className="absolute inline-block cursor-pointer right-4 top-14"
                  onClick={() => setEye(true)}
                />
              )}
            </div>
            <Flex className="items-center justify-between xl:w-[492px] w-full mt-4">
              <Checkbox label="Remember Me" className="flex items-center" />
              <Link
                className="text-base font-normal font-inter"
                to="/forgetpassword"
              >
                Forgot Password?
              </Link>
            </Flex>
            {loading ? (
              <div className="w-full xl:w-[492px] bg-primary py-3 text-white font-inter font-semibold text-xl rounded-md flex justify-center items-center mt-6">
                <ThreeDots
                  height=""
                  width="80"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              <Button text={"Log In"} onClick={handleSubmit} />
            )}
            <p className="mt-6 text-base font-normal font-inter">
              Have an account?
              <Link
                to="/"
                className="ml-2 text-base font-semibold font-inter text-primary"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </Flex>
        <div
          className="hidden w-1/2 h-screen bg-no-repeat bg-cover lg:block"
          style={{
            backgroundImage: `url(../assets/singupbg.webp)`,
          }}
        ></div>
      </Flex>
    </>
  );
};

export default SingIn;
