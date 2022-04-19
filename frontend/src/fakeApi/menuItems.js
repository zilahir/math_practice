/* eslint-disable implicit-arrow-linebreak */
import { ADMIN, USER } from "./fakeUsers";

export const ALL = "ALL";
export const LOGGEDIN = "LOGGEDIN";
export const LOGGEDOUT = "LOGGEDOUT";

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
    target: "/admin",
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
