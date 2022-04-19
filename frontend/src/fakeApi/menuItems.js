/* eslint-disable implicit-arrow-linebreak */
import { ADMIN, USER } from "./fakeUsers";

export const ALL = "ALL";
export const LOGGEDIN = "LOGGEDIN";
export const LOGGEDOUT = "LOGGEDOUT";

const menuItems = [
  { label: "Főoldal", target: "/", userLevels: [USER, ADMIN] },
  { label: "Belépés", target: "/login", userLevels: [USER, ADMIN] },
  { label: "Feladatok", target: "/tasks", userLevels: [USER, ADMIN] },
  { label: "Regisztráció", target: "/signup", userLevels: [USER, ADMIN] },
  { label: "Kijelentkezés", target: "/signout", userLevels: [USER, ADMIN] },
];

const adminMenuItems = [
  { label: "Admin", target: "/admin", userLevels: [ADMIN] },
];

const menuApi = {
  menuItems,
  adminMenuItems,
  allMenuItems: [...menuItems, ...adminMenuItems],
  getMenuItemsByUserLevelAndScope: (userLevel) =>
    [...menuItems, ...adminMenuItems].filter((menuItem) =>
      menuItem.userLevels.some((level) => level === userLevel),
    ),
};

export default menuApi;
