import { Button, CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import apiServices from "../../services/RequestHandler";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "number",
    width: 150,
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    type: "number",
    width: 170,
  },
] as any;

export const Users = () => {
  const [users, setUsers] = React.useState([]) as any;
  const [loader, setLoader] = React.useState(true) as any;
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const res = await apiServices.getFromApi("/users", "");

      console.log(res, "user res");
      if (res?.status === 200) {
        const roomsData = res?.data?.map((item: any) => {
          return {
            id: item?._id,
            name: item?.name,
            status: item?.isActive ? "Yes" : "No",
            email: item?.email,
            createdAt: item?.createdAt
              ? moment(item?.createdAt).format("DD.MM.YYYY")
              : "Not Available",
            updatedAt: item?.updatedAt
              ? moment(item?.updatedAt).format("DD.MM.YYYY")
              : "Not Available",
          };
        });
        setUsers(roomsData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <CardHeader
        title={"Users"}
        action={
          <Button
            variant="contained"
            style={{
              color: "#fff",
              border: "1px solid #fff",
              marginRight: 16,
              marginTop: 4,
            }}
            onClick={() => {
              navigate(`/user-details`);
            }}
          >
            Create User
          </Button>
        }
      />
      <DataGrid
        rows={users}
        columns={columns}
        onRowClick={(item) => {
          navigate(`/user-details/${item?.id}`);
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
      <Loader open={loader} />
    </Box>
  );
};
