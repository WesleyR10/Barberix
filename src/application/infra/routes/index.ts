import { account } from "./account";
import { auth } from "./auth";
import { health } from "./health";
import { user } from "./user";
// IMPORT MODULE FILES

const routes = [
  health,
  user,
  auth,
  account
  // ADD FUNCTION IMPORTS
];

export { routes };