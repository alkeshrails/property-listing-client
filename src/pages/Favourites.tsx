import { Box, Grid } from "@mui/material"
import { Navbar } from "../components/Navbar.tsx"
import React, { useEffect ,useState} from "react"
import PropertyCard from "../components/PropertyCard.tsx"
import { properties } from "./Dashboard.tsx"
import apiCall from "../services/useApi.tsx"
import axios from "axios"

export const Favourites = () => {
const [data,setData]=useState<any>([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async() => {
        try {

        const response = await apiCall(`${process.env.REACT_APP_API_URL}/favorites`,[]);
        setData(response)

        }catch(error){
            throw new Error(`error found ${error}`)
        }
    }

    if (data?.message) return <h3>No item is present in favourite , Please Add</h3>
  

    return (
        <>
            <Navbar />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ maxWidth: '1440px', margin: '0 auto' }}>
                    {data &&
                        data.map((data: any) => {
                            return (
                                <Grid item md={4} sm={6} xs={12} >
                                    <PropertyCard
                                        city={data.area}
                                        title={data.title}
                                        rent={data.rent}
                                        address={data.address}
                                        ping={data.net_size}
                                        id={data.id}
                                        isFavourite={data.is_favorite}
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