"use client";

import React from 'react'
import styled from 'styled-components'
import { useGlobalState } from '../../Context/globalProviders';
import CreateTask from '../Modals/CreateTask';
import TaskItem from '../Taskitem/TaskItem';
import { Task } from '@prisma/client';
import { plus } from '../../utils/icons';
import Modal from "../Modals/Modal";
import EditTask from '../Modals/EditTask';
import Footer from '../Footer/Footer';


interface props {
  title: string;
  tasks: Task[]
}

function Tasks({ title, tasks }: props) {
  const { theme  } = useGlobalState();
  const { openModal, modal, editModal } = useGlobalState();

  return (
    <>
      <TasksStyled theme={theme}>
        <h1>{title}</h1>

        {modal && <Modal content={<CreateTask />} />}

        {editModal && <Modal content={<EditTask />} />}

        <div className="tasks grid">
          {tasks.map((task: any) => {
            return <TaskItem key={task.id} task={task} />;
          })}
          <button className="new-task" onClick={openModal}>
            {plus}
            Add New Task
          </button>
        </div>
      </TasksStyled>
    </>
  );
}


const TasksStyled = styled.main`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  overflow: auto;

  &::webkit-scrollbar {
    width: 0.5rem;
  }

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: var(--text-color); /* Adjust based on your theme */
  }

  .theme-toggle i {
    transition: color 0.3s ease;
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .new-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks
