import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { handleLogin } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { CREATE_ACCESS_TOKEN } from "../../queries/queries";
import { createSpotifyAccessToken } from "../../types/types"
import "./AuthenticateSpotify.css";

export const AuthenticateSpotify = () => {
  const [storageAccessTokenLoaded, setStorageAccessTokenLoaded] =
    useState(false);
  const [createAccessToken] = useMutation(CREATE_ACCESS_TOKEN);
  const { enqueueSnackbar } = useSnackbar();

  const requestAccessToken = async (token: string) => {
    try {
      const { data }: { data?: createSpotifyAccessToken } = await createAccessToken({
        variables: {
          token,
        },
      });

      if (data?.createSpotifyAccessToken.success === false) {
        enqueueSnackbar("Error", {
          variant: "error",
        });
      } else {
        // @ts-ignore
        localStorage.setItem("accessTokenSpotify", null);
        enqueueSnackbar("Successfully authenticated in Spotify", {
          variant: "success",
        });
      }
    } catch (e) {
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const getAccessToken = async () => {
      const storedAccessToken = localStorage.getItem("requestUserAuthentication");

      if (window.location.href.includes("code=")) {
        const accessToken = window.location.href.match(/(?<=code=)(.*)/gi) || [];
        localStorage.setItem("requestUserAuthentication", accessToken[0] || '');
        setStorageAccessTokenLoaded(true);
      }
      // @ts-ignore
      if (storedAccessToken !== null && storageAccessTokenLoaded) {
        requestAccessToken(storedAccessToken || '');
      }
    };
    getAccessToken();
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
            borderColor: "white",
          }}
        >
          Authenticate
        </Button>
      </div>
    </>
  );
};
export default AuthenticateSpotify;
