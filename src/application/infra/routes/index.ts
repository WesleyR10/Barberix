import { auth } from "./auth";
// IMPORT MODULE FILES
import { health } from "./health";
import { user } from "./user";

const routes = [
  health,
  user,
  auth
  // ADD FUNCTION IMPORTS
];

export { routes };