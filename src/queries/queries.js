import { gql } from "@apollo/client";

export const CREATE_ACCESS_TOKEN = gql`
  mutation createSpotifyAccessToken($token: String!, $name: String) {
    createSpotifyAccessToken(input: { token: $token, name: $name }) {
      success
    }
  }
`;

export const UPSERT_ARTIST = gql`
  mutation upsertArtist($input: ArtistInput!) {
    upsertArtist(input: $input) {
      _id
    }
  }
`;
