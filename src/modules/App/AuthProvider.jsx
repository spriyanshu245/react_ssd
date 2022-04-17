import axios from "axios";
import { useState, createContext, useContext } from "react";
import { getItem, setItem } from "../Common/helpers/localStorageJSON";

let AuthContext = createContext(null);

export function AuthProvider({ children }) {
  let localStorageUser = getItem("user");
  let [user, _setUser] = useState(localStorageUser);

  let api = axios.create({
    baseURL: "https://ssddevapi.azurewebsites.net/api/",
  });

  api.interceptors.response.use(responseSuccess, responseError);
  setApiToken(user);

  let value = { api, user, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

  function setUser(user = null) {
    _setUser(user);
    setItem("user", user);
    setApiToken(user);
  }

  function setApiToken(user) {
    if (user) api.defaults.headers.Authorization = `Bearer ${user.token}`;
    else api.defaults.headers.Authorization = null;
  }

  function responseSuccess({ data }) {
    return data;
  }

  function responseError(error) {
    if (error.response) {
      let response = error.response;
      if (response.status == 401) setUser(user);
      return Promise.reject(response.data);
    } else {
      return Promise.reject(error);
    }
  }
}

export function useAuth() {
  return useContext(AuthContext);
}