import axios from 'axios'
import Config from './Config'
import { reactLocalStorage } from 'reactjs-localstorage'
class AuthHandeler {
    static login(username, password, callback) {
        axios.post(Config.loginUrl, { username: username, password: password })
            .then((response) => {
                if (response.status === 200) {
                    reactLocalStorage.set('token', response.data.access);
                    reactLocalStorage.set('refresh-token', response.data.refresh);
                    callback({ error: false, message: '** Login Successfull **' })
                }
            })
            .catch((error) => {
                callback({ error: true, message: " !!>> Invalid Login Credentials ..!!" })
            })


    }
    static loggedIn = () => {
        if (reactLocalStorage.get('token') && reactLocalStorage.get('refresh-token')) {
            return true;
        } else {
            return false;
        }
    }

    static getLoginToken() {
        return reactLocalStorage.get("token")
    }

    static getRefreshToken() {
        return reactLocalStorage.get("refresh-token")
    }

    static logoutUser() {
        reactLocalStorage.remove("token")
        reactLocalStorage.remove("refresh-token")
    }

    static checkTokenExpiry() {
        let expire = false;
        let token = this.getLoginToken();
        // let refresh_tokent = this.getRefreshToken();
        let tokenArray = token.split(".");
        let jwt = JSON.parse(atob(tokenArray[1]));
        if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
            expire = jwt.exp * 1000;
        } else {
            expire = false;
        }
        if (!expire) {
            return false;
        }
        return Date.now() > expire;
    }
}

export default AuthHandeler