import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import { processData, handleLogin } from "./utils/utils";
import { useSnackbar } from 'notistack';
import "./AuthenticateSpotify.css";

;export const AuthenticateSpotify = () => { 
  const [storageAccessTokenLoaded, setStorageAccessTokenLoaded] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const makeSpotifyRequest = async (token) => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
        headers: {
          "Authorization": `Bearer ${token}a`,
          "Content-Type": "application/json"
        }
      });
      console.log(processData(data.items))
      localStorage.setItem('accessTokenSpotify', null);
      enqueueSnackbar('Success', { 
        variant: 'success',
      });

    } catch (e) {
      enqueueSnackbar('Error', { 
        variant: 'error' 
      });
    }
}

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessTokenSpotify')

    if (window.location.href.includes("access_token")) {
        const accessToken = window.location.href.match(/(?<=access_token=)(.*)(?=&token_type)/ig)[0];
        localStorage.setItem('accessTokenSpotify', accessToken);
        setStorageAccessTokenLoaded(true)
    }

    if (storedAccessToken !== null && storageAccessTokenLoaded) {
        makeSpotifyRequest(storedAccessToken)
    }

  }, [storageAccessTokenLoaded]);

  return (
    <>
      <div className="formContainer">
          <Button
            variant="outlined"
            type="submit"
            className="formItem"
            onClick={handleLogin}
            style={{
              color: "white",
              borderColor: "white"
            }}
          >
              Get your data
          </Button>
      </div>
    </>
  );
};
export default AuthenticateSpotify;
