import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { AppHeading } from "../styledComponents/customStyles.tsx";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const user_type = localStorage.getItem("user-type");
  const auth_token = localStorage.getItem("auth-token");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "grey", padding: "10px" }}>
        <Box
          sx={{
            maxWidth: "1600px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Toolbar sx={{ width: "100%" }}>
            <AppHeading
              variant="h6"
              noWrap
              sx={{
                display: {
                  sm: "none",
                  md: "block",
                  xs: "none",
                  fontSize: "28px",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/")}
            >
              Rentals Prop
            </AppHeading>
            {auth_token && (
              <Link
                to={"/favourites"}
                style={{ marginLeft: "30px", fontSize: "20px" }}
              >
                Favourites
              </Link>
            )}
          </Toolbar>
          {auth_token ? (
            <>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  height: "50px",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  navigate("/login");
                }}
              >
                Logout
              </Button>
              {user_type === "admin" && (
                <Button
                  onClick={() => navigate("/add-property")}
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    marginLeft: "10px",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                >
                  Add Property
                </Button>
              )}
            </>
          ) : (
            <Button
              sx={{
                backgroundColor: "white",
                color: "black",
                height: "50px",
                borderRadius: "5px",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </AppBar>
    </Box>
  );
};
