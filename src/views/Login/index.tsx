import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Modal,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import apiServices from "../../services/RequestHandler";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../../utils/localStore";
import SignUp from "../Signup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [register, setRegister] = useState(false);
  const user = getDataFromLocalStorage("user") as any;

  const loginUser = async () => {
    if (!email) {
      toast.error("Please enter email.");
    } else if (!password) {
      toast.error("Please enter password.");
    } else {
      if (email && password) {
        let data = {
          email: email,
          password: password,
        };
        setLoader(true);
        let response = await apiServices.postFromApi(
          "/customers/login",
          data,
          "customers"
        );
        console.log(response, "response");

        if (response?.message) {
          toast.error("Incorrect email or password.");
        } else {
          if (response.status == 200) {
            saveDataToLocalStorage("user", response?.data?.customer);
            saveDataToLocalStorage("token", response?.data?.token);
            toast.success("Login successfully.");
          } else {
            toast.error("Something went wrong");
          }
        }
        setLoader(false);
      }
    }
    setLoader(false);
  };

  return (
    <Modal
      open={user ? false : true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {!register ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Card style={{ width: "400px", padding: "20px" }}>
            <CardContent>
              <h2 style={{ textAlign: "center" }}>Login</h2>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button
                onClick={loginUser}
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
                startIcon={
                  loader && (
                    <CircularProgress
                      style={{ color: "#fff", width: 12 }}
                      size={"small"}
                    />
                  )
                }
              >
                Login
              </Button>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setRegister(true);
                  }}
                >
                  Register
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <SignUp
          onLoginClick={() => {
            setRegister(false);
          }}
        />
      )}
    </Modal>
  );
}
