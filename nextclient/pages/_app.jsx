import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import UserState from "../hooks/useUser";
import ToastMessageState from "../hooks/useToastMessage";
import CentroState from "../hooks/useCentro";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/siscon_ico.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
        />
        <title>SISCON | UAC</title>
      </Head>
      <UserState>
        <ToastMessageState>
          <CentroState>
            <Component {...pageProps} />
          </CentroState>
        </ToastMessageState>
      </UserState>
    </>
  );
}
