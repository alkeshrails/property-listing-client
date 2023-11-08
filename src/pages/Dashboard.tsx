import { Box, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import PropertyCard from "../components/PropertyCard.tsx"
import { Navbar } from "../components/Navbar.tsx"
import { FilterBar } from "../components/FiltersBar.tsx"
import apiCall from "../services/useApi.tsx"
import { WithAuth } from "../components/Authentication.tsx"
import axios from "axios"

export const properties = [
    {
        id: 6,
        title: "Xinyi nidfsdvsdng",
        address: "Songshou y",
        net_size: 100000,
        rent: 10,
        property_type: "residential",
        country: "Taipei City",
        area: "taipei_city",
        number_of_living_rooms: 0,
        number_of_bathrooms: 1,
        created_at: "2023-11-07T11:20:22.721Z",
        updated_at: "2023-11-07T12:43:44.761Z",
        is_favorite: false
    },
    {
        id: 6,
        title: "Xinyi nidfsdvsdng",
        address: "Songshou y",
        net_size: 100000,
        rent: 10,
        property_type: "residential",
        country: "Taipei City",
        area: "taipei_city",
        number_of_living_rooms: 0,
        number_of_bathrooms: 1,
        created_at: "2023-11-07T11:20:22.721Z",
        updated_at: "2023-11-07T12:43:44.761Z",
        is_favorite: true
    }, {
        id: 6,
        title: "Xinyi nidfsdvsdng",
        address: "Songshou y",
        net_size: 100000,
        rent: 10,
        property_type: "residential",
        country: "Taipei City",
        area: "taipei_city",
        number_of_living_rooms: 0,
        number_of_bathrooms: 1,
        created_at: "2023-11-07T11:20:22.721Z",
        updated_at: "2023-11-07T12:43:44.761Z",
        is_favorite: false
    }
]

const Dashboard = () => {

    const [property, setProperties] = useState<any>([]);
    const [error,setError] = useState("")

    const handleData = async () => {
        const baseUrl = process.env.REACT_APP_API_URL;
        const {data,error} = await apiCall(`${baseUrl}/properties`, [])
        setProperties(data)
        setError(error)
    }
    useEffect(() => {
        handleData()
    }, [])


    async function handleDelete(id: number) {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/properties/${id}`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'Authorization': `${localStorage.getItem("auth-token")}`
                }
            })
            handleData()
        } catch (err) {
            alert("property deleted")
        }
    }

    if (error) return <h1 style={{ textAlign: "center" }}>Error occoured........</h1>


    return (
        <>
            <Navbar />
            <FilterBar setProperties={setProperties} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ maxWidth: '1440px', margin: '0 auto' }}>
                    {property && property.map((data: any) => {
                        return (
                            <Grid item md={4} key={data.id} sm={6} xs={12} >
                                <PropertyCard
                                    city={data.area}
                                    title={data.title}
                                    rent={data.rent}
                                    address={data.address}
                                    ping={data.net_size}
                                    id={data.id}
                                    isFavourite={data.is_favorite}
                                    handleDelete={() => {
                                        handleDelete(data.id)
                                    }}
                                    handleData={handleData}
                                />
                            </Grid>
                        );
                    }
                    )}
                </Grid>
            </Box>
        </>
    )
}

export default WithAuth(Dashboard)