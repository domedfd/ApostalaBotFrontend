import React, { useMemo } from "react";
import { format } from "date-fns";

import * as S from "./styles";
import typeIcons from "../../utils/typeIcons";
import nameIcons from "../../utils/nameIcons";

function TaskCard({ type, id_task, created, done }) {
  const date = useMemo(() => format(new Date(created), "dd/MM/yyyy"));
  const hour = useMemo(() => format(new Date(created), "HH:mm"));

  return (
    <S.Container done={done}>
      <S.TopCard>
        <img src={typeIcons[type]} alt="Icone de tarea" />
        <span style={{ marginTop: "10px", fontWeight: "bold" }}>
          {nameIcons[type]}
        </span>
        <span style={{ marginTop: "10px", marginBottom: "25px" }}>
          {id_task}
        </span>
      </S.TopCard>
      <S.BottomCard>
        <strong>{date}</strong>
        <span>{hour}</span>
      </S.BottomCard>
    </S.Container>
  );
}

export default TaskCard;
