import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useMutation, gql } from "@apollo/client";
import { processData, handleLogin } from "./utils/utils";
import { useSnackbar } from 'notistack';
import "./AuthenticateSpotify.css";

const ADD_ARTIST = gql`
  mutation upsertArtist($name: String!, $id: String!, $link: String!, $genres: [String]!, $image: ImageInput!) {
    upsertArtist(input: {name: $name, id: $id, link: $link, genres: $genres, image: $image}) {
      id
    }
  }
`;

export const AuthenticateSpotify = () => { 
  const [storageAccessTokenLoaded, setStorageAccessTokenLoaded] = useState(false);
  const [stateData, setStateData] = useState(null);
  const [upsertArtist] = useMutation(ADD_ARTIST);
  const { enqueueSnackbar } = useSnackbar();
  
  const makeSpotifyRequest = async (token) => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const processedData = processData(data.items);
      setStateData(processedData);
      localStorage.setItem('accessTokenSpotify', null);
      enqueueSnackbar('Successfully retrieved data', { 
        variant: 'success',
      });

      return data.items;

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

  useEffect(() => {
    if (stateData) {
      try {
      stateData.forEach(async d => {
        await upsertArtist({
          variables: {
            name: d.name,
            id: d.id,
            link: d.link,
            genres: d.genres,
            image: {
              height: d.image.height,
              width: d.image.width,
              link: d.image.url
            }
          }
        });
      });
      enqueueSnackbar('Successfully sent data to db', { 
        variant: 'success',
      });
    } catch (e) {
      enqueueSnackbar('Error sending data to db', { 
        variant: 'error',
      });
      }
    }

  }, [stateData]);

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
