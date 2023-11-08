import { styled, alpha } from "@mui/material/styles";
import {
  InputBase,
  Select,
  Typography
} from "@mui/material";

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "50%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  export const StyledSelect = styled(Select)(({theme}) => ({
    color: "inherit",
    "& .MuiSelect-select":{
      padding: theme.spacing(1, 1, 1, 1),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      margin: '0',
        background: 'rgb(255 255 255 / 15%) !important',
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
        
        
      },
      "&:focus": {
        outline: 'none !important'
      },
      "&:hover": {
        outline: 'none !important'
      },
      "& ,MuiSelect-select-icon": {
        color: "white"
      }
    },
    
  }))

  export const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  export const AppHeading = styled(Typography)(({ theme }) => ({
    // width: "50%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  }));


  
  export const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));


  export const Style = {
    ViewButton: {
      background: 'linear-gradient(90deg, rgba(231,183,42,1) 0%, rgba(255,193,7,1) 100%)',
      width: '95%',
      margin: '0 auto',
      padding: '10px',
      borderRadius: '10px',
      fontSize: '16px',
      color: '#fff',
      marginBottom: '10px'
    },
    cardfooter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    priceText: {
      background: '#fff',
      border: '1px solid #e7b72a',
      color: '#e7b72a',
      padding: '8px',
      fontSize: '14px',
      width: 100,
      textAlign: 'center',
      fontWeight: 600,
      borderRadius: '20px'
    },
    footer: { fontSize: 16, color: "grey", marginBottom: "12px", marginTop: "12px" },
    subDEsc: { fontSize: 16, color: "grey", marginBottom: "15px" },
    descriptionText: { fontSize: 18, color: "black", marginBottom: "15px" },
    nameText: { fontWeight: 600, fontSize: 24, width: '100%', color: "red" },
    cardStyle: { maxWidth: '100%', borderRadius: '20px', boxShadow: '-2px 0px 29px -2px rgba(0,0,0,0.15)', position: "relative" },
    sizeAndPriceBox: { flexDirection: "row", display: "flex", justifyContent: "space-between", width: "100%", background: '#f9f7f7' },
    modalPriceText: { width: 100, textAlign: 'center', padding: '5px 10px' }
  }