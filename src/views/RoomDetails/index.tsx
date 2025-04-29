import { Button, Card, CardContent, CardMedia, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";
import apiServices from "../../services/RequestHandler";
import { getDataFromLocalStorage } from "../../utils/localStore";

export default function RoomDetails() {
  const { id } = useParams();
  const user = getDataFromLocalStorage("user") as any;
  const theme = useTheme();
  const navigate = useNavigate();
  const [state, setState] = React.useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      room: {},
      loader: id ? true : false,
      comments: "",
      imagesLoader: [false, false, false, false],
      disabled: id ? true : false,
    }
  );

  const getRooms = async () => {
    try {
      setState({ loader: true });
      const res = await apiServices.getFromApi(`/rooms/${id}`, "");

      console.log(res);
      if (res?.status === 200) {
        setState({ room: res?.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setState({ loader: false });
    }
  };

  const handleReservation = async () => {
    const data = {
      guestName: user?.name,
      guestContact: user?.email,
      room: id,
      checkInDate: state?.start_date,
      checkOutDate: state?.end_date,
      additionalServices: ["breakfast", "airport shuttle"],
      totalBill: state?.price,
    };

    const res = await apiServices.postFromApi("/reservations", data, "");
    console.log(res, "resresres");
    if (res?.status === 201) {
      toast.success("Room booked successfully.");
      navigate("/my-reservations");
    } else {
      toast.error(res?.error);
    }

    console.log(data, "data");
  };

  React.useEffect(() => {
    if (id) {
      getRooms();
    }
  }, []);

  React.useEffect(() => {
    const room = state?.room;
    if (id) {
      setState({
        roomNo: room?.number,
        status: room?.status,
        type: room?.type,
        price: String(room?.price),
        globalImage: room?.globalImage,
        detailImages: room?.detailImages?.filter((item: any) => item),
        activeImg: room?.detailImages?.filter((item: any) => item)?.[0],
      });
    }
  }, [JSON.stringify(state?.room)]);

  const { room } = state;

  if (!room) return <div>Room not found</div>;
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "90%",
        margin: "0 auto",
        marginBottom: 500,
      }}
    >
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={state?.activeImg || state?.detailImages?.[0]}
          alt={room?.type}
        />
        <div style={{ display: "flex", gap: 6, marginTop: 12, width: 600 }}>
          {state?.detailImages?.map((item: any, index: number) => (
            <CardMedia
              key={index}
              style={{
                cursor: "pointer",

                border:
                  item === state?.activeImg
                    ? `4px solid ${theme.palette.primary.main}`
                    : "none",
              }}
              onClick={() => {
                setState({
                  activeImg: item,
                });
              }}
              component="img"
              height={200}
              width={200}
              image={item}
              alt={room?.type}
            />
          ))}
        </div>
        <CardContent>
          <h2>{room.name}</h2>
          <p>
            <strong>Price:</strong> {room.price}PKR per night
          </p>
          <p>{room.description}</p>

          <div style={{ marginTop: "20px" }}>
            <DatePicker
              label="Start Date"
              value={state?.start_date}
              onChange={(newValue) => {
                setState({
                  start_date: moment(newValue).format("YYYY-MM-DD"),
                });
              }}
            />
            &nbsp; &nbsp; &nbsp;
            <DatePicker
              label="End Date"
              value={state?.end_date}
              onChange={(newValue) => {
                setState({
                  end_date: moment(newValue).format("YYYY-MM-DD"),
                });
              }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
              fullWidth
              onClick={handleReservation}
            >
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <Loader open={state?.loader} />
    </div>
  );
}
