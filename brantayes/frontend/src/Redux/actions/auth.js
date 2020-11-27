import * as CONSTANTS from "../Constants"
import Api from "../../Api"

export const register = (data) => (dispatch) => {
    return Api.register(data).then(
        (response) => {
            dispatch({
                type: CONSTANTS.REGISTER_SUCCESS,
            });

            dispatch({
                type: CONSTANTS.SET_MESSAGE,
                payload: response.data.message
            });

            return Promise.resolve();
        },
        (error) => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            dispatch({
                type: CONSTANTS.REGISTER_FAIL,
            });

            dispatch({
                type: CONSTANTS.SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const login = (data) => (dispatch) => {
    return Api.login(data).then(
        (response) => {
            dispatch({
                type: CONSTANTS.LOGIN_SUCCESS,
                payload: { user: response },
            });
            return Promise.resolve();
        },
        (error) => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            dispatch({
                type: CONSTANTS.LOGIN_FAIL,
            });

            dispatch({
                type: CONSTANTS.SET_MESSAGE,
                payload: message
            });
            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    Api.logout();

    dispatch({
        type: CONSTANTS.LOGOUT,
    });
};
