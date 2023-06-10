import React, { useEffect, useState } from "react";
import Flex from "../components/layouts/Flex";
import Input from "../components/layouts/Input";
import Checkbox from "../components/layouts/Checkbox";
import Button from "../components/layouts/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SingUp = () => {
  // auth
  const auth = getAuth();
  // navigate
  const navigate = useNavigate();
  // values state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);
  // errors state
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
    setNameError("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    if (password) {
      if (!/^(?=.*[a-z])/.test(password)) {
        setPasswordError("The password must contain at least one lowercase");
      } else if (!/^(?=.*[A-Z])/.test(password)) {
        setPasswordError("The password must contain at least one uppercase");
      } else if (!/^(?=.*[0-9])/.test(password)) {
        setPasswordError(
          "The password must contain at least one numeric character"
        );
      } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
        setPasswordError(
          "The password must contain at least one special character"
        );
      } else if (!/^(?=.{8,})/.test(password)) {
        setPasswordError("The password must be eight characters or longer");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  }, [password]);

  const handleSubmit = () => {
    if (!name) {
      setNameError("name is required");
    }
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
    if (name && email && password) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "../../public/assets/default.png",
          })
            .then(() => {
              toast.success("singing up successfully ", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              sendEmailVerification(auth.currentUser).then(() => {
                setName("");
                setEmail("");
                setPassword("");
                setLoading(false);
                toast.info("verify your email,verify mail sended", {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              });
              setTimeout(() => {
                navigate("/singin");
              }, 5000);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setEmailError("email already exits");
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
            <h2 className="mt-4 mb-6 text-2xl font-bold font-inter">Sign Up</h2>
            <Input
              type="text"
              placeholder="Name here"
              label="Full Name"
              handle={handleName}
              value={name}
            />
            <p className="text-sm font-medium text-red-500 font-inter">
              {nameError ? nameError : ""}
            </p>

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
            <div className="relative  w-full">
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
            <Checkbox label="Remember Me" className="flex items-center mt-4" />
            {loading ? (
              <div className="w-full  bg-primary py-3 text-white font-inter font-semibold text-xl rounded-md flex justify-center items-center mt-6">
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
              <Button text={"Sign Up"} onClick={handleSubmit} />
            )}
            <p className="mt-6 text-base font-normal font-inter">
              Have an account?
              <Link
                to="/singin"
                className="ml-2 text-base font-semibold font-inter text-primary"
              >
                Sign in
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

export default SingUp;
