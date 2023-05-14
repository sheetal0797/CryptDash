import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { Box, Button, TextField } from "@material-ui/core";

function Login({ handleClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAlert, setUser} = CryptoState();
    const handleSubmit = async (e) => {
        if (!email || !password) {
            setAlert({
                open: true,
                message: "Please fill all the Fields",
                type: "error",
            });
            return;
        }

        e.preventDefault();
        console.log(email, password);
        fetch("http://localhost:5000/login-user", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if (data.status == "ok") {
              setUser(email);
              setAlert({
                open: true,
                message: `Login Successful. Welcome ${email}`,
                type: "success",
              });
              window.localStorage.setItem("token", data.data);
              window.localStorage.setItem("loggedIn", true);
              window.localStorage.setItem("umail", email);
              handleClose();
            } else {
              setAlert({
                open: true,
                message: data.error,
                type: "error",
              });
              return;
            }
        });

    };
    return (
        <Box
            p={3}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <TextField
                variant="outlined"
                type="email"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                variant="outlined"
                label="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                style={{ backgroundColor: "#9df9ef" }}
            >
                Login
            </Button>

        </Box>
    );
};

export default Login
