"use client";
import axios from "axios";
import { useState } from "react";

export const getToken = async () => {
  // const [token, setToken] = useState(null)

  let tokenData;

  await axios({
    method: "post",
    url: "https://admin-api.pwskills.com/backend/login?jwtLogin=true",
    data: {
      email: "prince.paswan@pw.live",
      password: "kgvf514c0i",
    },
  })
    .then((response) => {
      const tok = response.data;
      const finalToken = tok.token;
      // console.log(tokenData);
      // setToken(finalToken)
      tokenData = finalToken;
    })
    .catch((error) => console.log(error));

  return JSON.stringify(tokenData);
};
