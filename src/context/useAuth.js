import { useContext } from "react";
import { AuthContext } from "./auth-context-object";

export const useAuth = () => useContext(AuthContext);
