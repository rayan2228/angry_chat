import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.userLoginInfo.userLoginInfo);
  useEffect(() => {
    if (!data) {
      navigate("/singin");
    }
  }, [data]);

  return <div>Home</div>;
};

export default Home;
