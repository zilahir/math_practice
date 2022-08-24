import { ADMIN, USER } from "./fakeUsers";

export const ALL = "ALL";
export const LOGGEDIN = "LOGGEDIN";
export const LOGGEDOUT = "LOGGEDOUT";

export const adminRoutes = [
  {
    path: "/admin",
    name: "adminRoot",
    PageComponent: "AdminRoot",
    isMenu: false,
  },
  {
    path: "/admin/task/new",
    name: "newTask",
    PageComponent: "NewTaskPage",
    isMenu: true,
    menuLabel: "Új feladat",
  },
  {
    path: "/admin/task",
    name: "allTask",
    PageComponent: "AllTaskPage",
    isMenu: true,
    menuLabel: "Összes feladat",
  },
];

const menuItems = [
  {
    label: "Főoldal",
    target: "/",
    userLevels: [USER, ADMIN],
    scopes: [LOGGEDIN, LOGGEDOUT],
  },
  {
    label: "Belépés",
    target: "/login",
    userLevels: [USER, ADMIN],
    scopes: [LOGGEDOUT],
  },
  {
    label: "Feladatok",
    target: "/tasks",
    userLevels: [USER, ADMIN],
    scopes: [LOGGEDIN, LOGGEDOUT],
  },
  {
    label: "Regisztráció",
    target: "/signup",
    userLevels: [USER, ADMIN],
    scopes: [LOGGEDOUT],
  },
  {
    label: "Kijelentkezés",
    target: "/signout",
    userLevels: [USER, ADMIN],
    scopes: [LOGGEDIN],
  },
];

const adminMenuItems = [
  {
    label: "Admin",
    target: adminRoutes.find((route) => route.isMenu === false).path,
    userLevels: [ADMIN],
    scopes: [LOGGEDIN],
  },
];

const menuApi = {
  menuItems,
  adminMenuItems,
  allMenuItems: [...menuItems, ...adminMenuItems],
  getMenuItemsByUserLevelAndScope: (userLevel, scope) =>
    [...menuItems, ...adminMenuItems]
      .filter((menuItem) => menuItem.userLevels.includes(userLevel))
      .filter((menuItem) => menuItem.scopes.includes(scope)),
};

export default menuApi;
