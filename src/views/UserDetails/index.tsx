import {
  Autocomplete,
  Button,
  capitalize,
  Card,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
import * as React from "react";
import apiServices from "../../services/RequestHandler";

import { Create, Update, Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";

export const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = React.useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      user: {},
      loader: id ? true : false,
      isActive: "Yes",
      comments: "",
      disabled: id ? true : false,
    }
  );

  const getUser = async () => {
    try {
      const res = await apiServices.getFromApi(`/users/${id}`, "");

      console.log(res);
      if (res?.status === 200) {
        setState({ user: res?.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setState({ loader: false });
    }
  };

  const createUser = async () => {
    try {
      const data = {
        name: state?.name,
        email: state?.email,
        password: state?.password,
        role: "admin",
        isActive: state?.isActive?.toLowerCase() === "yes" ? true : false,
      };

      let res;
      if (id) {
        res = await apiServices.patchFromApi(`/users/${id}`, data, "");
      } else {
        res = await apiServices.postFromApi("/users/register", data, "");
      }
      console.log(res, "res");

      if (res?.status === 200 || res?.status === 201) {
        toast.success(res?.data?.message);
        navigate("/users");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (id) {
      getUser();
    }
  }, []);

  React.useEffect(() => {
    const user = state?.user;
    if (id) {
      setState({
        name: user?.name,
        email: user?.email,
        role: user?.role,
        isActive: user?.isActive ? "Yes" : "No",
      });
    }
  }, [JSON.stringify(state?.user)]);

  return (
    <>
      <Card elevation={2} style={{ marginBottom: 20 }}>
        <CardHeader
          title={
            !id
              ? "Create user"
              : state?.user?.type
                ? capitalize(state?.user?.type)
                : ""
          }
          action={
            id ? (
              <Switch
                checked={!state.disabled}
                onChange={() => {
                  setState({
                    disabled: !state.disabled,
                  });
                }}
              />
            ) : null
          }
        />

        <div style={{ padding: 30 }}>
          <Grid container spacing={4}>
            <Grid
              size={{
                xs: 4,
              }}
            >
              <TextField
                value={state?.name}
                onChange={(e) => {
                  setState({ name: e.target.value });
                }}
                disabled={state.disabled}
                label={"Name"}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid
              size={{
                xs: 4,
              }}
            >
              <TextField
                value={state?.email}
                onChange={(e) => {
                  setState({ email: e.target.value });
                }}
                disabled={state.disabled}
                label={"Email"}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid
              size={{
                xs: 4,
              }}
            >
              <Autocomplete
                disablePortal
                value={state?.isActive}
                options={["Yes", "No"]}
                size="small"
                disabled={state.disabled}
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
                onChange={(_, value) => {
                  setState({ isActive: value });
                }}
              />
            </Grid>
            {!id && (
              <Grid
                size={{
                  xs: 4,
                }}
              >
                <TextField
                  label="Password"
                  type={!state?.showPassword ? "password" : "text"}
                  fullWidth
                  value={state?.password}
                  size={"small"}
                  disabled={state.disabled || id}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setState({ showPassword: !state.showPassword });
                          }}
                          edge="end"
                        >
                          {state?.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e: any) => {
                    const { value } = e.target;
                    setState({ password: value });
                  }}
                />
              </Grid>
            )}

            <Grid
              size={{
                xs: 12,
              }}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <Button
                  startIcon={<ArrowBackIosIcon />}
                  variant="outlined"
                  onClick={() => {
                    navigate("/users");
                  }}
                >
                  Back To All
                </Button>
                {id ? (
                  <Button
                    onClick={createUser}
                    startIcon={<Update />}
                    variant="outlined"
                  >
                    Update user
                  </Button>
                ) : (
                  <Button
                    onClick={createUser}
                    startIcon={<Create />}
                    variant="outlined"
                  >
                    Create user
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
        <Loader open={state?.loader} />
      </Card>
    </>
  );
};
