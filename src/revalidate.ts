// only needed when running independently
// import * as dotenv from "dotenv";
// dotenv.config();

import axios from "axios";

interface RevalidationResponse {
  revalidated: boolean;
}

const requestRevalidation = async () => {
  const uri = `${process.env.FRONTEND_URL}/api/revalidate`;
  try {
    const response = await axios.get(uri, {
      params: { secret: process.env.REVALIDATION_SECRET },
    });
    return response.data as RevalidationResponse;
  } catch (error) {
    console.error(error);
  }
};

export default requestRevalidation;
