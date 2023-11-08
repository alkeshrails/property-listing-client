import axios from "axios";
export const removeFavourite = async (id, handleData=() => {}) => {
    console.log(id, "...................")
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/favorites/remove_favorite?property_id=${id}`,
            {
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