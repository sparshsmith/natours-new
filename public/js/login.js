import axios from "axios";
import { showAlert } from "./alert";

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully!')
            window.setTimeout(() => {
                location.assign('/');
            }, 0);
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        });
        if (res.data.status === 'success') location.assign('/');
    } catch (err) {
        showAlert('error', "Error logging out. Try again!")
    }
}

export const signup = async (email, username, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name: username,
                email,
                password,
                passwordConfirm
            }
        });
        console.log(res)
        if (res.data.status === 'success') {
            showAlert('success', 'Created account successfully!')
            window.setTimeout(() => {
                location.assign('/');
            }, 0);
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

export const forgotPassword = async (email) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/forgotPassword',
            data: {
                email
            }
        });
        console.log(res)
        if (res.data.status === 'success') {
            showAlert('success', 'Email sent! Please check your inbox.')
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

export const resetPassword = async (email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'patch',
            url: '/api/v1/users/resetPassword',
            data: {
                email,
                password,
                passwordConfirm
            }
        });
        console.log(res)
        if (res.data.status === 'success') {
            showAlert('success', 'Email sent! Please check your inbox.');
            window.setTimeout(() => {
                location.assign('/');
            }, 0);
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}