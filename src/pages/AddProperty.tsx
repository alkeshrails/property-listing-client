import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  PortalProps,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container, margin, width } from "@mui/system";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import "../styles/filters.css";
import { WidthFull } from "@mui/icons-material";
import { WithAuth } from "../components/Authentication.tsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ApiCall from "../services/useApi.tsx";
import { Navbar } from "../components/Navbar.tsx";

interface formDataType {
  title: string;
  address: string;
  net_size: number | any;
  rent: number | any;
  property_type: string;
  country: string;
  area: string;
  number_of_living_rooms: number | any;
  number_of_bathrooms: number | any;
}
interface formErrorDataType {
  title: string;
  address: string;
  net_size: string;
  rent: string;
  property_type: string;
  country: string;
  area: string;
  number_of_living_rooms: string;
  number_of_bathrooms: string;
}

interface PropertyPorps {
  type?: string;
}

const PropertyForm: React.FC<PropertyPorps> = ({ type }) => {
  const [formData, setFormData] = useState<formDataType>({
    title: "",
    address: "",
    net_size: "",
    rent: "",
    property_type: "",
    country: "",
    area: "",
    number_of_living_rooms: "",
    number_of_bathrooms: "",
  });

  const [errors, setErrors] = useState<formErrorDataType>({
    title: "",
    address: "",
    net_size: "",
    rent: "",
    property_type: "",
    country: "",
    area: "",
    number_of_living_rooms: "",
    number_of_bathrooms: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
let data;
  const { id } = useParams();
  const navigate = useNavigate()

  const fetchData = async () => {
    const response=await ApiCall(`${process.env.REACT_APP_API_URL}/properties/${id}`,[])
  
     data=response
    if (type === "edit") {
      setFormData({
        title: data.title,
        address: data.address,
        net_size: data.net_size,
        rent: data.rent,
        property_type: data.property_type,
        country: data.country,
        area: data.area,
        number_of_living_rooms: data.number_of_living_rooms,
        number_of_bathrooms: data.number_of_bathrooms,
      })
    }
  }


  useEffect(() => {
    fetchData()

  }, [type, data])

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {
      title: "",
      address: "",
      net_size: "",
      rent: "",
      property_type: "",
      country: "",
      area: "",
      number_of_living_rooms: "",
      number_of_bathrooms: "",
    };

    if (!formData.title) {
      formIsValid = false;
      newErrors.title = "Required field";
    }

    if (!formData.address) {
      formIsValid = false;
      newErrors.address = "Required field";
    }

    if (!formData.area) {
      formIsValid = false;
      newErrors.area = "Required field";
    }

    if (!formData.rent) {
      formIsValid = false;
      newErrors.rent = "Required field";
    }

    if (!formData.property_type) {
      formIsValid = false;
      newErrors.property_type = "Required field";
    }

    if (!formData.country) {
      formIsValid = false;
      newErrors.country = "Required field";
    }

    if (!formData.number_of_living_rooms) {
      formIsValid = false;
      newErrors.number_of_living_rooms = "Required field";
    }
    if (!formData.number_of_bathrooms) {
      formIsValid = false;
      newErrors.number_of_bathrooms = "Required field";
    }

    setErrors(newErrors);
    console.log("Setting", formIsValid);

    return formIsValid;
  };

  const updateProperty = () => {
    console.log("update")
    axios.patch(`https://property-zone.onrender.com/properties/${id}`, formData, {
      headers: {
        'Authorization': `${localStorage.getItem("auth-token")}`
      }
    }).then(res => navigate("/")).catch(err => console.log(err))
  }

  const addProperty = () => {
    console.log("add")
    axios.post(`https://property-zone.onrender.com/properties`, formData, {
      headers: {
        'Authorization': `${localStorage.getItem("auth-token")}`
      }
    }).then(res => navigate("/")).catch(err => console.log(err))
  }

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log(type)
    if (validateForm()) {
      if (type) {
        updateProperty()
        setIsSubmitted(true);
      } else {
        addProperty()
      }
    }
  };
  return (<>
    <Navbar />
    <div data-testid="login-wrapper" className='flex h-[100vh] bg-gradient-to-r from-blue-300 to-cyan-700'>
      <Container maxWidth="sm">
        <Box className={"loginContainer"}>
          <div className={"flexGrow: 1 bgcolor: cyan"}>
            <Typography sx={{ marginBottom: "10px" }} variant="h5">
              {!type ? "Add Property" : "Edit Property"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
                fullWidth
                margin="normal"
                //@ts-ignore
                error={errors.title && !isSubmitted}
                helperText={errors.title}
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={(e: BaseSyntheticEvent) => {
                  setFormData({ ...formData, address: e.target.value });
                }}
                fullWidth
                margin="normal"
                //@ts-ignore
                error={errors.address && !isSubmitted}
                helperText={errors.address}
              />
              <TextField
                label="Net Size"
                style={{ marginRight: 10 }}
                name="net_size"
                type="number"
                value={formData.net_size}
                onChange={(e: BaseSyntheticEvent) => {
                  setFormData({ ...formData, net_size: e.target.value });
                }}
                margin="normal"
                //@ts-ignore
                error={errors.net_size && !isSubmitted}
                helperText={errors.net_size}
              />
              <TextField
                label="Rent"
                name="rent"
                type="number"
                style={{ marginLeft: 10 }}
                value={formData.rent}
                onChange={(e: BaseSyntheticEvent) => {
                  setFormData({ ...formData, rent: e.target.value });
                }}
                margin="normal"
                //@ts-ignore
                error={errors.title && !isSubmitted}
                helperText={errors.title}
              />
              <FormControl
                style={{ width: "240px", marginRight: 10, marginTop: 10 }}
              >
                <InputLabel>Property Type</InputLabel>
                <Select
                  name="property_type"
                  value={formData.property_type}
                  onChange={(e) => {
                    setFormData({ ...formData, property_type: e.target.value });
                  }}
                //   error={errors.property_type && !isSubmitted}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="residential">Residential</MenuItem>
                  <MenuItem value="office">Office</MenuItem>
                  <MenuItem value="retail">Retail</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                style={{ width: "240px", marginLeft: 10, marginTop: 10 }}
              >
                <InputLabel>Area</InputLabel>
                <Select
                  name="area"
                  value={formData.area}
                  onChange={(e) => {
                    setFormData({ ...formData, area: e.target.value });
                  }}
                //   error={errors.area && !isSubmitted}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="taipei_city">Taipei City</MenuItem>
                  <MenuItem value="new_taipei_city">New Taipei City</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={(e) => {
                  setFormData({ ...formData, country: e.target.value });
                }}
                fullWidth
                margin="normal"
                // error={errors.title && !isSubmitted}
                helperText={errors.title}
              />
              <TextField
                label="Number of Living Rooms"
                name="number_of_living_rooms"
                style={{ marginRight: 10 }}
                value={formData.number_of_living_rooms}
                onChange={(e: BaseSyntheticEvent) => {
                  setFormData({
                    ...formData,
                    number_of_living_rooms: e.target.value,
                  });
                }}
                margin="normal"
                // error={errors.number_of_living_rooms && !isSubmitted}
                helperText={errors.number_of_living_rooms}
              />
              <TextField
                label="Number of Bathrooms"
                name="number_of_bathrooms"
                style={{ marginLeft: 10 }}
                value={formData.number_of_bathrooms}
                onChange={(e: BaseSyntheticEvent) => {
                  setFormData({
                    ...formData,
                    number_of_bathrooms: e.target.value,
                  });
                }}
                margin="normal"
                // error={errors.number_of_bathrooms && !isSubmitted}
                helperText={errors.number_of_bathrooms}
              />
              <Button type="submit" variant="contained" color="primary" style={{ width: "100%", marginTop: "10px" }}>
                {!type ? "Add Property" : "Update Property"}
              </Button>
            </form>
          </div>
        </Box>
      </Container>
    </div>
  </>
  );
};

export default WithAuth(PropertyForm);


const Porpert = {
  "id": 6,
  "title": "Xinyi nidfsdvsdng",
  "address": "Songshou y",
  "net_size": 100000,
  "rent": 10,
  "property_type": "residential",
  "country": "Taipei City",
  "area": "taipei_city",
  "number_of_living_rooms": 0,
  "number_of_bathrooms": 1,
  "created_at": "2023-11-07T11:20:22.721Z",
  "updated_at": "2023-11-07T12:43:44.761Z",
  "is_favorite": false
}
