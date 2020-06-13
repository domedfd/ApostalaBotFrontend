import React, {  useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { format } from "date-fns";

import * as S from "./styles";

import api from "../../services/api";
import isConnected from "../../utils/isConnected";

//Nuestros componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TypeIcons from "../../utils/typeIcons";
import nameIcons from "../../utils/nameIcons";

import iconCalendar from "../../assets/calendar.png";
import iconClock from "../../assets/clock.png";

function Task({ match }) {
  const [redirect, setRedirect] = useState(false);

  const [type, setType] = useState();
  const [user_name, setUser_name] = useState('', "dome");
  const [id_user, setId_user] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [id_task, setId_task] = useState();
  const [chat_id, setChat_id] = useState();
  const [message_id, setMessage_id] = useState();
  const [message, setMessage] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();

  async function LoadTaskDetails() {
    await api.get(`/task/${match.params.id}`).then((response) => {
      setType(response.data.type);
      setUser_name(response.data.user_name);
      setId_user(response.data.id_user);
      setId_task(response.data.id_task);
      setChat_id(response.data.chat_id);
      setMessage_id(response.data.message_id);
      setMessage(response.data.message);
      setDate(format(new Date(response.data.created), "yyyy-MM-dd"));
      setHour(format(new Date(response.data.created), "HH:mm"));
      setDone(response.data.done);
    });
  }
  async function Save() {
    //Validacion de los datos
    if (!type) return alert("Tienes que selecionar un icone de tipo de tarea");
    else if (!user_name) return alert("Tienes que informar el usuario");
    else if (!id_user) return alert("Tienes que informar el usuario");
    else if (!id_task) return alert("Tienes que informar un id del trabajo");
    else if (!chat_id) return alert("Tienes que informar un id del chat");
    else if (!message_id) return alert("Tienes que informar un id de la mensage");
    else if (!message) return alert("Tienes que informar una descripcion");
    else if (!date) return alert("Tienes que informar una fecha");
    else if (!hour) return alert("Tienes que informar una hora");

    if (match.params.id) {
      await api
        .put(`/task/${match.params.id}`, {
          macaddress: isConnected,
          done,
          type,
          user_name,
          id_user,
          id_task,
          chat_id,
          message_id,
          message,
        })
        .then(() => {
          setRedirect(true);
          console.log("atualizo.....");
        });
    } else {
      await api
        .post("/task", {
          macaddress: isConnected,
          type,
          user_name,
          id_user,
          id_task,
          message,
        })
        .then(() => {
          setRedirect(true);
          console.log("criou.....");
        });
    }
  }

  async function Remove() {
    const res = window.confirm("Desea realmente eliminar la tarea?");
    if (res == true) {
      await api.delete(`/task/${match.params.id}`).then((response) => {
        setRedirect(true);
      });
    }
  }

  useEffect(() => {
    if (!isConnected) setRedirect(true);
    LoadTaskDetails();
  }, []);

  return (
    <S.Container>
      {redirect && <Redirect to="/" />}
      <Header />
      <S.Form>
        <S.TypeIcons>
          {TypeIcons.map(
            (icon, index) =>
              index > 0 && (
                // <button type="button" onClick={() => setType(index)}>
                <button type="button">
                  <img
                    src={icon}
                    alt="tipo de la tarea"
                    className={type && type != index && "inative"}
                  />
                </button>
              )
          )}
        </S.TypeIcons>

        <S.Options> <span>{nameIcons[type]}</span>
       
        </S.Options>

        <S.Input>
              <span>Usuario: {user_name}</span>
          <input
            type="text"
            placeholder="Titulo da tarefa..."
            //onChange={(e) => setId_task(e.target.value)}
            value={id_task}
          />
        </S.Input>

        <S.TextArea>
          <span>Descripcion</span>
          <textarea
            rows={5}
            placeholder="Detalhes de la tarea..."
            //onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </S.TextArea>

        <S.Input>
          <span>Data</span>
          <input
            type="date"
            placeholder="Titulo da tarefa..."
            //onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          <img src={iconCalendar} alt="icon calendario" />
        </S.Input>

        <S.Input>
          <span>Hora</span>
          <input
            type="time"
            placeholder="Titulo da tarefa..."
            //onChange={(e) => setHour(e.target.value)}
            value={hour}
          />
          <img src={iconClock} alt="icon relog" />
        </S.Input>

        <S.Options>
          <div>
            <input
              type="checkbox"
              checked={done}
              onChange={() => setDone(!done)}
            />
            <span>CONCLUIDO</span>
          </div>
          {/* {match.params.id && (
            <button type="button" onClick={Remove}>
              ELIMINAR
            </button>
          )} */}
        </S.Options>

        <S.Save>
          <button type="button" onClick={Save}>
            GUARDAR
          </button>
        </S.Save>
      </S.Form>
      <Footer />
    </S.Container>
  );
}

export default Task;
