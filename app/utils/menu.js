import { list, check, todo, home, gear, bell } from "./icons";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Do It Now",
    icon: todo,
    link: "/Do-It-Now",
  },
  {
    id: 3,
    title: "Urgent!",
    icon: bell,
    link: "/Urgent",
  },
  {
    id: 4,
    title: "Important!",
    icon: gear,
    link: "/Important",
  },
  {
    id: 5,
    title: "Backlog",
    icon: list,
    link: "/Backlog",
  },
  {
    id: 5,
    title: "Completed",
    icon: check,
    link: "/Completed",
  },
];

export default menu;
