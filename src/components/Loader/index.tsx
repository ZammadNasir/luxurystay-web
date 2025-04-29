import { Backdrop, CircularProgress } from "@mui/material";

export const Loader = (props: any) => {
  const { open } = props;
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
