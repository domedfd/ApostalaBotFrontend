import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Qr from "qrcode.react";

import * as S from "./styles";

//Nuestros componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function QrCode() {
  const [mac, setMac] = useState();
  const [redirect, setRedirect] = useState(false);

  async function SaveMac() {
    if (!mac)
      alert("Tienes que informar el numero de sincronizacion del celular");
    else {
      await localStorage.setItem("@todo/macaddress", mac);
      setRedirect(true);
      window.location.reload();
    }
  }

  return (
    <S.Container>
      {redirect && <Redirect to="/" />}
      <Header />
      <S.Content>
        <h1>CAPTURE EL QRCODE POR EL APP</h1>
        <S.QrCodeArea>
          <Qr value="getmacaddress" size={350} />
        </S.QrCodeArea>

        <S.ValidationCode>
          <span>Digite la numeracion que salio en tu celular.</span>
          <input
            type="text"
            onChange={(e) => setMac(e.target.value)}
            value={mac}
          />
          <button type="button" onClick={SaveMac}>
            SINCRONIZAR
          </button>
        </S.ValidationCode>

        <p>sus actividades seran sincronizadas con el de tu celular.</p>
      </S.Content>
      <Footer />
    </S.Container>
  );
}

export default QrCode;
