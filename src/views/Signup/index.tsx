import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import apiServices from "../../services/RequestHandler";

export default function SignUp({ onLoginClick }: any) {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createUser = async () => {
    try {
      const data = {
        name: formData?.name,
        email: formData?.email,
        password: formData?.password,
      };
      if (!formData?.name) {
        toast.error("Please enter name.");
      } else if (!formData?.email) {
        toast.error("Please enter email.");
      } else if (!formData?.password) {
        toast.error("Please enter password.");
      } else if (formData?.password !== formData?.confirmPassword) {
        toast.error("Passwords do not match.");
      } else {
        setLoader(true);
        const res = await apiServices.postFromApi(
          "/customers/register",
          data,
          ""
        );
        console.log(res, "res");

        if (res?.status === 200 || res?.status === 201) {
          toast.success(res?.data?.message);
          onLoginClick();
        } else {
          toast.error(res?.data?.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
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
          <h2 style={{ textAlign: "center" }}>Create Account</h2>

          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button
            onClick={createUser}
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
            Sign Up
          </Button>

          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Already have an account? <span onClick={onLoginClick}>Login</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
