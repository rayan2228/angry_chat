import React, { useState } from "react";
import Flex from "../components/layouts/Flex";
import Input from "../components/layouts/Input";
import Button from "../components/layouts/Button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  // auth
  const auth = getAuth();
  // navigate
  const navigate = useNavigate();
  // values state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  //  errors state
  const [emailError, setEmailError] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handleSubmit = () => {
    if (!email) {
      setEmailError("email is required");
    }
    if (email) {
      setLoading(true);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setEmail("");
          setLoading(false);
          toast.success("password reset link sent successfully ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/invalid-email")) {
            setEmailError("invalid email");
          }
          if (errorCode.includes("auth/user-not-found")) {
            setEmailError("email not matched");
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
          <div
            className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 w-full "
            role="alert"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
            </svg>
            <p>enter your email,we'll send you a reset link</p>
          </div>
          <Input
            type="email"
            placeholder="Enter your mail"
            handle={handleEmail}
            value={email}
          />
          <p className="text-sm font-medium text-red-500 font-inter">
            {emailError ? emailError : ""}
          </p>
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
            <Button text={"Send Link"} onClick={handleSubmit} />
          )}
          <Button
            text={"Back To Home"}
            onClick={() => {
              navigate("/singin");
            }}
          />
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

export default ForgetPassword;
