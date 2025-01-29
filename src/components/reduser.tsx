import { useReducer } from "react";
import { User } from "../types/user";

export type Action = {
  type: string;
  data: Partial<User>;
};
const Reduce = () => {
  const initialState: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
  };

  const userReducer = (state: User, action: Action): User => {
    switch (action.type) {
      case 'Login':
        return {
          ...state,...action.data
        };
      case 'Update':
        return { ...state, ...action.data };
      default:
        return state;
    }
  };

  const [user, userDispatch] = useReducer(userReducer, initialState);
  return { user, userDispatch };
}
export default Reduce;

