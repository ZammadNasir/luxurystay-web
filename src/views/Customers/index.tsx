import { capitalize, CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import * as React from "react";
import { Loader } from "../../components/Loader";
import apiServices from "../../services/RequestHandler";

const columns = [
  {
    field: "name",
    headerName: "Name",
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

export const Customers = () => {
  const [customers, setCustomers] = React.useState([]) as any;
  const [loader, setLoader] = React.useState(true) as any;

  const getCustomers = async () => {
    try {
      const res = await apiServices.getFromApi("/customers", "");

      console.log(res, "customer res");
      if (res?.status === 200) {
        const roomsData = res?.data?.map((item: any) => {
          return {
            id: item?._id,
            name: capitalize(item?.name),
            email: item?.email,
            createdAt: item?.createdAt
              ? moment(item?.createdAt).format("DD.MM.YYYY HH:mm")
              : "Not Available",
            updatedAt: item?.updatedAt
              ? moment(item?.updatedAt).format("DD.MM.YYYY HH:mm")
              : "Not Available",
          };
        });
        setCustomers(roomsData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    getCustomers();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <CardHeader title={"Customers"} />
      <DataGrid
        rows={customers}
        columns={columns}
        // onRowClick={(item) => {
        //   navigate(`/customer-details/${item?.id}`);
        // }}
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
