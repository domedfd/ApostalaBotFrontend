import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import * as S from "./styles";

import api from "../../services/api";
import isConnected from "../../utils/isConnected";

//Nuestros componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilterCard from "../../components/FilterCard";
import TaskCard from "../../components/TaskCard";

function Home() {
  const [filterActived, setFilterActived] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [redirect, setRedirect] = useState(false);

  async function loadTasks() {
    await api.get(`/task/filter/${filterActived}`).then((response) => {
      setTasks(response.data);
    });
  }

  function Notification() {
    setFilterActived("dones");
  }

  useEffect(() => {
    console.log("------------------------");
    console.log(process.env.URLAPI)
    console.log("------------------------");
    loadTasks();
    if (!isConnected) setRedirect(true);
  }, [filterActived]);

  return (
    <S.Container>
      {redirect && <Redirect to="/qrcode" />}
      <Header clickNotification={Notification} />
      <S.FilterArea>
        <button type="button" onClick={() => setFilterActived("all")}>
          <FilterCard title="Todos" actived={filterActived === "all"} />
        </button>
        <button type="button" onClick={() => setFilterActived("unlock")}>
          <FilterCard
            title="Desbloquear"
            actived={filterActived === "unlock"}
          />
        </button>
        <button type="button" onClick={() => setFilterActived("validate")}>
          <FilterCard title="Validar" actived={filterActived === "validate"} />
        </button>
        <button type="button" onClick={() => setFilterActived("activate")}>
          <FilterCard title="Activar" actived={filterActived === "activate"} />
        </button>
        <button type="button" onClick={() => setFilterActived("authorize")}>
          <FilterCard
            title="Autorizar"
            actived={filterActived === "authorize"}
          />
        </button>
      </S.FilterArea>

      <S.Title>
        <h3>{filterActived === "late" ? "TAREAS ATRASADA" : "TAREAS"}</h3>
      </S.Title>

      <S.Content>
        {tasks.map((t) => (
          <Link to={`/task/${t._id}`}>
            <TaskCard
              key={t._id}
              type={t.type}
              id_task={t.id_task}
              created={t.created}
              done={t.done}
            />
          </Link>
        ))}
      </S.Content>

      <Footer />
    </S.Container>
  );
}

export default Home;
