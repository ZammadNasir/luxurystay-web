import {
  Button,
  capitalize,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import apiServices from "../../services/RequestHandler";

export default function Home() {
  const [rooms, setRooms] = React.useState([]) as any;
  const [loader, setLoader] = React.useState(true) as any;
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
            globalImage: item?.globalImage,
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
    <div style={{ width: "90%", margin: "0 auto", marginBottom: 100 }}>
      <h2>Available Rooms</h2>
      <Grid container spacing={3}>
        {rooms.map((room: any) => (
          <Grid size={{ xs: 3 }} key={room.id}>
            <Card>
              <CardMedia
                component="img"
                image={room?.globalImage}
                alt={room?.type}
                style={{ objectFit: "contain" }}
              />
              <CardContent>
                <h3>{room?.type}</h3>
                <p>{room?.price} Rs per night</p>
                <Button
                  component={Link}
                  to={`/room-details/${room.id}`}
                  variant="contained"
                  color="primary"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Loader open={loader} />
    </div>
  );
}
