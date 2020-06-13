import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import isConnected from "../../utils/isConnected";

import * as S from "./styles";
import logo from "../../assets/logo.png";
import bell from "../../assets/bell.png";

function Header({ clickNotification }) {
  const [lateCount, setLateCount] = useState();

  async function lateVerify() {
    await api.get(`/task/filter/dones`).then((response) => {
      setLateCount(response.data.length);
    });
  }

  async function Logout() {
    localStorage.removeItem("@todo/macaddress");
    window.location.reload();
  }

  useEffect(() => {
    lateVerify();
  });

  return (
    <S.Container>
      <S.LefSide>
        <img src={logo} alt="Logo" />
      </S.LefSide>
      <S.RightSide>
        <Link to="/">INICIO</Link>
        <span className="divisor" />
        <Link to="/task">NUEVA TAREFA</Link>
        <span className="divisor" />
        {!isConnected ? (
          <Link to="/qrcode">SICRONIZAR</Link>
        ) : (
          <button type="button" onClick={Logout}>
            SALIR
          </button>
        )}
        {lateCount && (
          <>
            <button onClick={clickNotification} id="notification">
              <img src={bell} alt="Notificacion" />
              <span>{lateCount}</span>
            </button>
          </>
        )}
      </S.RightSide>
    </S.Container>
  );
}

export default Header;
