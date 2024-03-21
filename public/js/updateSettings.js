import axios from "axios";
import { showAlert } from "./alert";

// type is either password or data
export const updateSettings = async (data, type) => {
    try {
        const url = type === 'password' ?
            '/api/v1/users/updateMypassword'
            : '/api/v1/users/updateMe';
        const res = await axios({
            method: 'PATCH',
            url,
            data
        })
        if (res.data.status === 'success') {
            showAlert('success', `${type.toUpperCase()} updated successfully`)
            window.setTimeout(location.reload(true), 1500);

        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
}