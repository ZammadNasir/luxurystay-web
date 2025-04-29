import { Button, capitalize, Card, CardContent } from "@mui/material";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import apiServices from "../../services/RequestHandler";
import { toast } from "react-toastify";

export default function MyReservation() {
  const [reservations, setReservations] = React.useState([]) as any;
  const [loader, setLoader] = React.useState(true) as any;

  const getReservations = async () => {
    try {
      setLoader(true);

      const res = await apiServices.getFromApi(
        "/reservations/my-reservations",
        ""
      );

      console.log(res, "reervationres");
      if (res?.status === 200) {
        const roomsData = res?.data?.map((item: any) => {
          return {
            id: item?._id,
            roomnumber: item?.room?.number,
            status: capitalize(item?.status),
            guestName: item?.guestName,
            guestContact: item?.guestContact,
            room: item?.room,
            checkInDate: item?.checkInDate,
            checkOutDate: item?.checkOutDate,
            totalBill: item?.totalBill,
            reservedAt: item?.reservedAt
              ? moment(item?.reservedAt).format("DD.MM.YYYY HH:mm")
              : "Not Available",
            additionalServices: item?.additionalServices
              ?.map((item: any) => capitalize(item))
              .join(" | "),
          };
        });
        console.log(roomsData, "roomsData");

        setReservations(roomsData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const cancelReservation = async (id: string) => {
    try {
      const res = (await apiServices.patchFromApi(
        `/reservations/cancel-reservations/${id}`,
        {},
        ""
      )) as any;

      if (res?.status === 200) {
        toast.success(res?.data?.message);
        getReservations();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getReservations();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "90%", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>My Reservations</h2>

      {reservations?.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>You have no reservations yet.</p>
          <Button component={Link} to="/" variant="contained" color="primary">
            Browse Rooms
          </Button>
        </div>
      ) : (
        reservations?.map((reservation: any) => (
          <Card key={reservation?.id} style={{ marginBottom: "20px" }}>
            <CardContent style={{ padding: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ marginTop: -20 }}>
                  <h1>{reservation?.room?.type}</h1>
                  <p>
                    <strong>Date: </strong>
                    {moment(reservation?.checkInDate).format("DD.MM.YYYY")}
                    {" - "}
                    {moment(reservation?.checkOutDate).format("DD.MM.YYYY")}
                  </p>
                  <p>
                    <strong>Price:</strong> ${reservation?.totalBill}
                  </p>
                  <Button
                    onClick={() => cancelReservation(reservation?.id)}
                    variant="outlined"
                    color="error"
                  >
                    Cancel Reservation
                  </Button>
                </div>
                <div>
                  <img src={reservation?.room?.globalImage} width={300} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
      <Loader open={loader} />
    </div>
  );
}
