import { useReducer } from "react";
import { User } from "./user";

export type Action = {
  type: string;
  data: Partial<User>;
};
export default () => {
  
  const initialState: User = {
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
          ...state,
          email: action.data.email || '',
          password: action.data.password || '',
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

