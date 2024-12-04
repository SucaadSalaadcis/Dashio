import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Box } from "@mui/material";

export default function SignOut() {

    const navigate = useNavigate(); 

    const handleLogout = () => {
        // localStorage.clear();
        Cookies.remove('token');
        navigate('/signin');
        window.location.reload(1);
    };

    return handleLogout();
}
