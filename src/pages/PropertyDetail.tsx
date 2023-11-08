import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import flatImage from "../property.jpg";
import "../styles/filters.css";
import { Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {

    const [detail, setDetail] = useState<any>({
        id: 1,
        title: "MRT city government/newly completed top-level pure office",
        address: "Songgao Road, Xinyi District, Taipei City",
        net_size: 3642,
        rent: 17481600,
        property_type: "residential",
        country: "Taipei City",
        area: "Taipei City",
        number_of_living_rooms: 1,
        number_of_bathrooms: 1,
        created_at: "2023-11-06T08:46:41.398Z",
        updated_at: "2023-11-06T12:18:49.330Z",
        city: null
    })

    const { id } = useParams();


    useEffect(() => {
        fetchDetail()
    }, [id])

    const fetchDetail = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/properties/${id}`,{
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Authorization': `${localStorage.getItem("auth-token")}`
            }
        })
        setDetail(response.data)
    }
    const {
        title,
        rent,
        country,
        area,
        number_of_living_rooms,
        property_type
    } = detail

    return (
        <div data-testid="login-wrapper" className='flex h-[100vh] bg-gradient-to-r from-blue-300 to-cyan-700'>
        <Container maxWidth="md">
            <Box className="loginContainer">
                <Box display="flex">
                    <Box
                        component="img"
                        sx={{
                            height: 300,
                            width: 450,
                        }}
                        alt="Flat Image"
                        src={flatImage}
                    />
                    <Box textAlign="left" margin={4}>
                        <Typography>Title : {title}</Typography>
                        <Typography>Rent per month : {rent} $</Typography>
                        <Typography>City : {country}</Typography>
                        <Typography>Property Type : {property_type}</Typography>
                        <Typography>District : {area}</Typography>
                        <Typography>Number of Bedrooms : {number_of_living_rooms}</Typography>
                    </Box>
                </Box>

                <Box textAlign="left" marginTop={5}>
                    <Typography>Please note:</Typography>
                    <Typography>
                        {" "}
                        1: If there is a street view in the photo of the object above, it is
                        an introduction to the environment near the object, not the object
                        itself. If there is a public photo, it is a public property of the
                        community, not the object itself.
                    </Typography>
                    <Typography>
                        2: There may be some changes to some of the equipment that are
                        temporarily placed. Please confirm during your visit.
                    </Typography>
                </Box>
            </Box>
        </Container>
        </div>
    );
};

export default PropertyDetails;
