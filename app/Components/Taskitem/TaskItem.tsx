"use client";

import { useGlobalState } from "@/app/Context/globalProviders";
import { edit, trash } from "@/app/utils/icons";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";
import { Task } from "@/types/types";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const { theme, deleteTask, updateTask, openEditModal, isGuestUser } = useGlobalState();

  const { id, title, description, date, isCompleted } = task;

  const editBtn = () => {
    if (!isGuestUser) {
      openEditModal(task);
    }
  };

  return (
    <TaskItemStyled key={id} theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="isCompleted"
            onClick={() => {
              if (!isGuestUser) {
                updateTask({
                  id,
                  isCompleted: !isCompleted,
                });
              }
            }}
            disabled={isGuestUser}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              if (!isGuestUser) {
                updateTask({
                  id,
                  isCompleted: !isCompleted,
                });
              }
            }}
            disabled={isGuestUser}
          >
            Incomplete
          </button>
        )}
        <button className="edit" onClick={editBtn} disabled={isGuestUser}>
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            if (!isGuestUser) {
              deleteTask(id);
            }
          }}
          disabled={isGuestUser}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div<{ theme: any }>`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .isCompleted,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      border-radius: 30px;
    }

    .isCompleted {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }

    .incomplete {
      background: ${(props) => props.theme.colorDanger};
    }
  }
`;

export default TaskItem;
