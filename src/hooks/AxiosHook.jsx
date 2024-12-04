import axios from "axios";

const axiosPublicURL = axios.create({
    baseURL: 'https://spiky-crater-dep2vxlep8.ploi.online/',
});

export default function AxiosHook() {
    return axiosPublicURL;
}
