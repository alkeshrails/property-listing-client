import { Box, Button, Checkbox, FormControl, Grid, InputLabel, Menu, MenuItem, Select, TextField, Typography } from "@mui/material"
import React, { BaseSyntheticEvent, useState } from "react"
import { Dropdown } from "./Dropdown.tsx"
import Autocomplete from "@mui/material/Autocomplete";
import "../styles/filters.css"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useApiCall from "../services/useApi.tsx";
import axios from "axios";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const FilterBar = ({ setProperties }) => {

    const [type, setType] = useState("");
    const [city, setCity] = useState("");
    const [maxNetSize, setMaxNetSize] = useState(0);
    const [minNetSize, setMinNetSize] = useState(0);
    const [minRent, setMinRent] = useState(0);
    const [maxRent, setMaxRent] = useState(0);
    const [district, setDistrict] = useState<any>([]);



    const handleSearch = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/properties/search?city=${city}&min_net_size=${minNetSize}&max_net_size=${maxNetSize}&min_rent=${minRent}&max_rent=${maxRent}&property_type=${type}`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Authorization': `${localStorage.getItem("auth-token")}`
            }
        })
        setProperties(response.data)
    }

    return (
        <>
            <Box className="filter_container">
                <Box className="inner_box">
                    <label className="inner_box_label">Type</label>
                    <div>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">--select-type--</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="filter-back-white"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"residential"}>Residential</MenuItem>
                                <MenuItem value={"office"}>Office</MenuItem>
                                <MenuItem value={"retail"}>Retail</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Box>
                <Box className="inner_box">
                    <label className="inner_box_label">City</label>
                    <div>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">--select-city--</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Taipei City"}>Taipei city</MenuItem>
                                <MenuItem value={"New Taipei City"}>New Taipei city</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Box>
                <Box className="inner_box">
                    <label style={{ margin: "5px", marginLeft: "7px", marginTop: "12px", padding: "10px" }}>District</label>
                    <Autocomplete
                        multiple
                        className="dropdown"
                        id="checkboxes-tags-demo"
                        options={city1}
                        disableCloseOnSelect
                        getOptionLabel={(option: any) => option.district}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.district}
                            </li>
                        )}
                        value={district}
                        onChange={(e: any, value: any) => setDistrict(value)}
                        style={{ width: 200 }}
                        renderInput={(params) => (
                            <TextField {...params} label="--select-district--" placeholder="District" />
                        )}
                    />
                </Box>

                <Box className="inner_box net-size-width">
                    <label className="inner_box_label">Net-size</label>
                    <Box sx={{ display: "flex", flexDirection: "row", width: '100%', gap: '10px', alignItems: 'center' }}>
                        <div className="input-group-box">
                            <input style={{ width: "60px" }} value={minNetSize} type="number" onChange={(e: BaseSyntheticEvent) => setMinNetSize(e.target.value)} />
                            <div className="input-label">
                                ping
                            </div>
                        </div>
                        <span className="bar-line">~</span>
                        <div className="input-group-box">
                            <input style={{ width: "60px" }} value={maxNetSize} onChange={(e: BaseSyntheticEvent) => setMaxNetSize(e.target.value)} />
                            <div className="input-label">
                                ping
                            </div>
                        </div>
                    </Box>
                </Box>

                <Box className="inner_box net-size-iiner">
                    <label className="inner_box_label">Rent-per-month</label>
                    <Box sx={{ display: "flex", flexDirection: "row", width: '100%', gap: '10px', alignItems: 'center' }}>
                        <div className="input-group-box">
                            <div className="input-label">
                                NT$
                            </div>
                            <input style={{ width: "92px" }} value={minRent} type="number" onChange={(e: BaseSyntheticEvent) => setMinRent(e.target.value)} />
                        </div>
                        <span className="bar-line">~</span>
                        <div className="input-group-box">
                            <div className="input-label">
                                NT$
                            </div>
                            <input style={{ width: "92px" }} type="number" value={maxRent} onChange={(e: BaseSyntheticEvent) => setMaxRent(e.target.value)} />
                        </div>
                    </Box>
                </Box>
                <Button onClick={handleSearch} style={{ marginLeft: '15px', marginTop: '30px', backgroundColor: 'skyblue' }}>Search</Button>
            </Box>

        </>
    )
}


const city1 = [
    { district: "banquio" },
    { district: "sanchung" },
    { district: "Tamchui" },
    { district: "Xindian" },
    { district: "Xihi" },
    { district: "Yonghe" },
    { district: "Xhinge" },
];

const city2 = [
    { district: "choingui" },
    { district: "hakimichi" },
    { district: "Shingjo" },
    { district: "QHJabc" },
    { district: "Uiui" },
    { district: "Makate" },
    { district: "Abtyiwe" },
];


