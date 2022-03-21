import { ADMIN, USER } from "./fakeUsers";

export const ALL = "ALL";
export const LOGGEDIN = "LOGGEDIN";
export const LOGGEDOUT = "LOGGEDOUT";

const menuItems = [
  { label: "Főoldal", target: "/", scopes: [USER, ADMIN] },
  { label: "Belépés", target: "/login", scopes: [LOGGEDOUT] },
  { label: "Feladatok", target: "/tasks", scopes: [USER, ADMIN] },
];

const adminMenuItems = [
  { label: "Admin", target: "/admin", scopes: [ADMIN] },
];

const menuApi = {
  menuItems,
  adminMenuItems,
  allMenuItems: [...menuItems, ...adminMenuItems],
  getMenuItemsForScope:
    (desiredScope, userLevel) => [
      ...menuItems, ...adminMenuItems,
    ].filter((menuItem) => menuItem.scopes.some(
      (scope) => scope === userLevel,
    )),
};

export default menuApi;
