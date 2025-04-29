import { Person } from "@mui/icons-material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Loader } from "../../components/Loader";

const cards = [
  {
    id: 1,
    title: "Customers",
    icon: Person,
  },
  {
    id: 2,
    title: "Reservations",
    icon: BookmarkAddedIcon,
  },
];

export const Dashboard = () => {
  const theme = useTheme();
  return (
    <>
      <div style={{ marginTop: -30 }}>
        <h1 style={{ color: theme.palette.primary.main }}>Dashboard</h1>
      </div>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
          gap: 2,
        }}
      >
        {cards.map((card, index) => (
          <Card
            style={{ border: `2px solid ${theme.palette.primary.main}` }}
            key={index}
          >
            <CardActionArea
              onClick={() => {}}
              sx={{
                height: "120px",
              }}
            >
              <CardContent sx={{ height: "100%" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>

                  <Typography variant="h5" component="div">
                    1
                  </Typography>
                </div>
                <div style={{ marginTop: 16 }}>
                  <card.icon style={{ color: theme.palette.primary.main }} />
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Loader open={false} />
    </>
  );
};
