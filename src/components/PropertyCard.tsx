import { Box, CardActions, CardMedia, CardContent, Button, Typography, Card, Divider } from "@mui/material"
import React, { Dispatch } from "react"
import Porpertyimg from "../property.jpg"
import { Favorite, FavoriteBorder, Delete } from "@mui/icons-material"
import { Style } from "../styledComponents/customStyles.tsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { removeFavourite } from "../utils.tsx";



interface PropertyCardProps {
  rent: number;
  title: string;
  city: string;
  ping: number;
  address: string;
  id: number;
  isFavourite: boolean;
  handleDelete?: any;
  handleData?: any
}

const PropertyCard: React.FC<PropertyCardProps> = ({ rent, city, title, ping, address, id, isFavourite, handleDelete, handleData }) => {

  const user_type = localStorage.getItem("user-type")

  const EditDetailBtn = () => {
    if (user_type === "admin") {
      return <Button style={Style.ViewButton}>
        <Link style={{ textDecoration: "none", color: "black" }} to={`/edit-property/${id}`}  >Edit Property</Link>
      </Button>
    }
  }
  const handleFavourite = async (id: any) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/favorites/add_favorite?property_id=${id}`, {
      }, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `${localStorage.getItem("auth-token")}`
        }
      })
      handleData()
    }
    catch (err) {
      throw new Error("property not found")
    }
  }
 

  const AddRemoveFavourite = () => {
    if (isFavourite) {
      return <Favorite  onClick={() => removeFavourite(id,handleData)} style={{ height: "9%",color: "red" ,width: "9%", position: "absolute", right: 10 }} />
    }
    return <FavoriteBorder onClick={() => handleFavourite(id)} style={{height: "9%", width: "9%", position: "absolute", right: 10 }} />
  }

  return (
    <>
      <Box sx={{ margin: "30px", marginTop: "50px" }}>
        <Card sx={Style.cardStyle}>
          <AddRemoveFavourite />
          <CardMedia
            sx={{ height: 250 }}
            image={Porpertyimg}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={Style.nameText}>
              NT$ {rent}/Year
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={Style.descriptionText}>
              {title}
            </Typography>
            <Typography sx={Style.subDEsc}>
              {address}
            </Typography>
            <Divider />
            <Box sx={Style.cardfooter}>
              <Typography sx={Style.footer}>
                {ping + " "}Ping (129594.01 sq.ft)
              </Typography>
              <Typography sx={Style.footer}>
                MRT :{city}
              </Typography>
              {user_type === "admin" && <Delete style={{color: "red"}} onClick={() => {
                handleDelete()
              }} />}
            </Box>
          </CardContent>
          <CardActions>
            <Button style={Style.ViewButton} size="small">
              <Link style={{ textDecoration: "none", color: "black" }} to={`view-property/${id}`}>View</Link>
            </Button>
          </CardActions>
          <CardActions>
            <EditDetailBtn />
          </CardActions>
        </Card>
      </Box>
    </>
  )
}

export default PropertyCard