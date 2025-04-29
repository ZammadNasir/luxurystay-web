import { Dashboard, Person, Room } from "@mui/icons-material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { handleClose } from "../../../store/drawerReducer";

const drawerWidth = 240;

const navItems = [
  {
    title: "Dashborad",
    path: "/dashboard",
    icon: Dashboard,
  },
  {
    title: "Rooms",
    path: "/rooms",
    icon: Room,
  },
  {
    title: "Reservations",
    path: "/reservations",
    icon: BookmarkAddedIcon,
  },
  {
    title: "Users",
    path: "/users",
    icon: Person,
  },
  {
    title: "Customers",
    path: "/customers",
    icon: PersonAddAltIcon,
  },
];

export default function Sidebar() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const drawerOpened = useSelector((state: any) => state.drawer.opened);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    dispatch(handleClose(false as any));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpened}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            height: 60,
          }}
        >
          <p style={{ color: "white" }}>a</p>
          <div>
            <p
              style={{
                paddingBlock: 4,
                paddingInline: 12,
                border: `4px solid ${theme.palette.primary.main}`,
                fontSize: 18,
                fontStyle: "italic"
              }}
            >
              LUXURY STAY
            </p>
          </div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {navItems.map((item, index) => (
            <ListItem
              onClick={() => navigate(item.path)}
              key={index}
              disablePadding
              style={{
                background:
                  pathname === item.path ? theme.palette.primary.main : "#fff",
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <item.icon
                    style={{
                      color: pathname === item.path ? "#fff" : "#000",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  style={{
                    color: pathname === item.path ? "#fff" : "#000",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                  primary={item.title}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
