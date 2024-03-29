import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { init } from "./features/token/tokenSlice";
import logo from "./assets/fplogo.png";
import overlay from "./assets/theatreoverlay.png";

function App() {
  const AppURI = process.env.REACT_APP_BACKEND_URI || "http://localhost:8080";

  // Redux Global State
  const dispatch = useDispatch();

  // React-Router Navigation
  const navigate = useNavigate();

  const [cookies] = useCookies(["access_token", "uid"]);

  const handleGoLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleGoSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  // Error check to see if backend is running
  useEffect(() => {
    axios.get(AppURI).catch((error) => {
      navigate("/error", { state: { error: error } });
    });
  }, [AppURI, navigate]);

  useEffect(() => {
    if (cookies.access_token && cookies.uid) {
      const headers = {
        "x-api-key": process.env.REACT_APP_BACKEND_KEY,
      };

      axios
        .get(`${AppURI}/api/user/get?uid=${cookies.uid}`, { headers })
        .then((res) => {
          const obj = {
            uid: cookies.uid,
            email: res.data.email,
            accessToken: cookies.access_token,
            // refreshToken: cookies.refresh_token,
            // expirationTime: cookies.expiration_time,
          };
          dispatch(init(obj));
          navigate("/home");
        })
        .catch((e) => console.log(e));
    }
  }, [AppURI, cookies.access_token, cookies.uid, dispatch, navigate]);

  return (
    <div
      style={{
        backgroundImage: `url(${overlay})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="2vh"
        minHeight="100vh"
      >
        <Box marginBottom={"4%"}>
          <Typography variant="h1">Flick Picker</Typography>
          <Typography align="center" width="500px" variant="h5">
            The one and only place to find the best things to watch.
          </Typography>
        </Box>
        <Button
          onClick={handleGoLogin}
          variant="outlined"
          sx={{ width: "25ch " }}
        >
          Log In
        </Button>
        <Button
          onClick={handleGoSignup}
          variant="outlined"
          sx={{ width: "25ch ", mb: 35 }}
        >
          Sign Up
        </Button>
      </Box>
      <img
        src={logo}
        style={{
          width: 100,
          zIndex: "100",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      />
    </div>
  );
}

export default App;
