import React, { BaseSyntheticEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import '../styles/filters.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";


// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

interface formDataType {
    name: string;
    email: string;
    password: string;
    date_of_birth: string;
}

const RegistrationForm = ({ handleFormChange }: any) => {
    //   const classes = useStyles();

    const [formData, setFormData] = useState<formDataType>({
        name: "",
        email: "",
        password: "",
        date_of_birth: "",
    });

    const [errors, setErrors] = useState<formDataType>({
        name: "",
        email: "",
        password: "",
        date_of_birth: "",
    });

    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = { name: "", email: "", password: "", date_of_birth: "" };

        if (!formData.name) {
            formIsValid = false;
            newErrors.name = "Name is required";
        }

        if (!formData.email) {
            formIsValid = false;
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formIsValid = false;
            newErrors.email = "Email is not valid";
        }

        if (!formData.password) {
            formIsValid = false;
            newErrors.password = "Password is required";
        }

        if (!formData.date_of_birth) {
            formIsValid = false;
            newErrors.date_of_birth = "Date of Birth is required";
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleChange = (e: BaseSyntheticEvent) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const Register = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, { user: formData })
            navigate("/login")
        } catch (error) {
          new Error("could not register...")
        }
    }

    const handleSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted with data:", formData);
            setIsSubmitted(true);
            Register()
        }
    };

    return (
        <div data-testid="login-wrapper" className='flex h-[100vh] bg-gradient-to-r from-blue-300 to-cyan-700'>
        <Container maxWidth="sm">
            <Box className={"loginContainer"}>
                <div className={"flexGrow: 1 bgcolor: white"}>
                    <Typography sx={{ marginBottom: "10px" }} variant="h5">Register</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={handleChange}
                                    //@ts-ignore
                                    error={errors.name && !isSubmitted}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={handleChange}
                                    //@ts-ignore
                                    error={errors.email && !isSubmitted}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    name="password"
                                    variant="outlined"
                                    value={formData.password}
                                    onChange={handleChange}
                                    //@ts-ignore
                                    error={errors.password && !isSubmitted}
                                    helperText={errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Date of Birth"
                                    type="date"
                                    name="date_of_birth"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={formData.date_of_birth}
                                    //@ts-ignore
                                    error={errors.date_of_birth && !isSubmitted}
                                    helperText={errors.date_of_birth}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            sx={{
                                marginY: "20px",
                            }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Register
                        </Button>
                    </form>
                </div>
                <Box sx={{ margin: "20px" }}>
                    Already have an account?
                    <span
                        style={{ marginLeft: "5px", color: "blue", cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </Box>
            </Box>
        </Container>
        </div>
    );
};

export default RegistrationForm;
