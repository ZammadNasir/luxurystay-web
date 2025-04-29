import { Button, capitalize, CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import apiServices from "../../services/RequestHandler";

const columns = [
  {
    field: "roomnumber",
    headerName: "Room Number",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
  {
    field: "type",
    headerName: "Room Type",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "number",
    width: 170,
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    type: "number",
    width: 170,
  },
] as any;

export const Rooms = () => {
  const [rooms, setRooms] = React.useState([]) as any;
  const [loader, setLoader] = React.useState(true) as any;
  const navigate = useNavigate();
  const getRooms = async () => {
    try {
      const res = await apiServices.getFromApi("/rooms", "");

      console.log(res);
      if (res?.status === 200) {
        const roomsData = res?.data?.map((item: any) => {
          return {
            id: item?._id,
            roomnumber: item.number,
            status: capitalize(item?.status),
            type: capitalize(item?.type),
            price: item?.price,
            createdAt: item?.createdAt
              ? moment(item?.createdAt).format("DD.MM.YYYY HH:mm")
              : "Not Available",
            updatedAt: item?.updatedAt
              ? moment(item?.updatedAt).format("DD.MM.YYYY HH:mm")
              : "Not Available",
          };
        });
        setRooms(roomsData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    getRooms();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <CardHeader
        title={"Rooms"}
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
              navigate(`/room-details`);
            }}
          >
            Create Room
          </Button>
        }
      />
      <DataGrid
        rows={rooms}
        columns={columns}
        onRowClick={(item) => {
          navigate(`/room-details/${item?.id}`);
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
