import { navigate } from "@reach/router"
import axios from 'axios';
import { useContext } from "react";
import SharedContext from "./context-store";


let backendUrl = "https://localhost:3000/";
let loginUrl = backendUrl + "/login";
let logoutUrl = backendUrl + "/logout";


export function login(user, pass) {
    return axios({
        method: 'post',
        url: loginUrl,
        data: {username: user, password: pass}
    });
}

export function logout() {
    return axios({
        method: 'post',
        url: logoutUrl,
        data: {token: sessionStorage.getItem('token')}
    });
}

export function httpget(url, params = {}) {
    return axios({
        method: 'get',
        url: backendUrl + url,
        params: params,
        headers: {authorization: getCookie('x-auth-token')}
    });
}

export function httppost(url, body = {}, params = {}) {
    return axios({
        method: 'post',
        url: backendUrl + url,
        params: params,
        headers: {authorization: getCookie('x-auth-token')},
        data: body,
    });
}

export function checkSession() {
    if (!getCookie('x-auth-token')) {
        console.log('nqma kuki')
        let user = localStorage.getItem('username');
        let pass = localStorage.getItem('password');
        if (user && pass) {
            login(user, pass, false)
              .then(res=> {console.log(res); handleSuccessLogin(user, pass, res.data.token, res.data.role, false); return true;})
              .catch(error => {console.log(error); return false;})
        } else {
            return false;
        }
    }
    return true;
}

export function handleSuccessLogin(user, pass, token, role, remember) {
    if (remember) {
        localStorage.setItem('username', user);
        localStorage.setItem('password', pass);
        localStorage.setItem('role', role);
    } else {
        sessionStorage.setItem('username', user);
        sessionStorage.setItem('role', role);
    }
    setCookie('x-auth-token', token, 0.5);
    navigate(`/home`);
}

export function getUserAndRole() {
    let user = localStorage.getItem('username');
    let pass = localStorage.getItem('password');
    let role = localStorage.getItem('role');
    if (user && pass && role) {
        return {user: user, role: role};
    } else {
        let user = sessionStorage.getItem('username');
        let role = sessionStorage.getItem('role');
        if (user && role) {
            return {user: user, role: role};
        }
        return null;
    }
}

export function isLoginIn() {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('role')) {
        return true;
    }
    return false;
}

export function handleLogout() {
    deleteCookie('x-auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    localStorage.removeItem('password');
    localStorage.removeItem('password');
    navigate(`/login`);
}


export function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

export function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
}

export function deleteCookie(name) { setCookie(name, '', -1); }

export function updateQueryParam(param, value, append) {
    let currentUrlParams = new URLSearchParams(window.location.search);
    if (append) {
        let paramForAppend = new URLSearchParams(window.location.search).get(param);
        let newParamValue = paramForAppend + ',' + value;
        currentUrlParams.set(param, newParamValue);
    } else {
        currentUrlParams.set(param, value);
    }

    window.history.pushState({}, '', window.location.pathname + "?" + currentUrlParams.toString());
}