import axios from "axios"

const axiosClient =  axios.create({
    // baseURL: 'http://localhost:5000',
     baseURL: "https://algojudge-backend.onrender.com",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

