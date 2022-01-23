import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useMutation, gql } from "@apollo/client";
import { handleLogin } from "./utils/utils";
import { useSnackbar } from 'notistack';
import "./AuthenticateSpotify.css";

const CREATE_ACCESS_TOKEN = gql`
  mutation createSpotifyAccessToken($token: String!, $name: String) {
    createSpotifyAccessToken(input: {token: $token, name: $name}) {
      success
    }
  }
`;

export const AuthenticateSpotify = () => { 
  const [storageAccessTokenLoaded, setStorageAccessTokenLoaded] = useState(false);
  const [createAccessToken] = useMutation(CREATE_ACCESS_TOKEN);
  const { enqueueSnackbar } = useSnackbar();

  const requestAccessToken = async (token) => {
    try {
      console.log(token)
      const { data } = await createAccessToken({
        variables: {
          token
        }
      });
      if (data.createSpotifyAccessToken.success === false) {
        enqueueSnackbar('Error', { 
          variant: 'error' 
        });
      } else {
        localStorage.setItem('accessTokenSpotify', null);
        enqueueSnackbar('Successfully authenticated in Spotify', { 
          variant: 'success',
        });
      }
    } catch (e) {
      enqueueSnackbar('Error', { 
        variant: 'error' 
      });
    }
  };

  useEffect(async () => {
    const storedAccessToken = localStorage.getItem('requestUserAuthentication')
    if (window.location.href.includes("code=")) {
        const accessToken = window.location.href.match(/(?<=code=)(.*)/ig)[0];
        console.log(accessToken)
        localStorage.setItem('requestUserAuthentication', accessToken);
        setStorageAccessTokenLoaded(true)
    }

    if (storedAccessToken !== null && storageAccessTokenLoaded) {
      console.log("here 2")
        requestAccessToken(storedAccessToken)
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
              Authenticate
          </Button>
      </div>
    </>
  );
};
export default AuthenticateSpotify;
