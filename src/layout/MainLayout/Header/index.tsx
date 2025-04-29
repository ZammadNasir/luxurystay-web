import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  clearDataFromLocalStorage,
  getDataFromLocalStorage,
} from "../../../utils/localStore";

export default function Header() {
  const user = getDataFromLocalStorage("user") as any;
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <h1 style={{ flexGrow: 1 }}>Luxury Stay</h1>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/my-reservations">
          My Reservation
        </Button>
        {user ? (
          <Button
            onClick={() => {
              clearDataFromLocalStorage("user");
              clearDataFromLocalStorage("token");
              navigate("/");
            }}
            color="inherit"
          >
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
