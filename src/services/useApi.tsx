async function apiCall(apiUrl, initialData: any) {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Authorization': `${localStorage.getItem("auth-token")}`
            },
        });
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData
    } catch (error) {
        return error
    }
}

export default apiCall;
