import { ADMIN, USER } from "./fakeUsers";

export const ALL = "ALL";
export const LOGGEDIN = "LOGGEDIN";
export const LOGGEDOUT = "LOGGEDOUT";

const menuItems = [
  { label: "Főoldal", target: "/", scopes: [USER, ADMIN] },
  { label: "Belépés", target: "/login", scopes: [LOGGEDOUT] },
  { label: "Feladatok", target: "/tasks", scopes: [USER, ADMIN] },
  { label: "Regisztráció", target: "/signup", scopes: [LOGGEDOUT] },
  { label: "Kijelentkezés", target: "/signout", scopes: [LOGGEDIN] },
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
      (scope) => scope === userLevel || scope === desiredScope,
    )),
};

export default menuApi;
