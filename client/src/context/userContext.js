import { createContext, useReducer } from "react";

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

const initialUserState = {
  emailId: null,
  imageUrl: null,
  loggedIn: false,
}

function authReducer(user,action){
  switch(action.type){
    case 'logout':
      return initialUserState
    case 'login':
      return {
        emailId: action.emailId,
        imageUrl: action.imageUrl,
        loggedIn: true,
      }
  }
}

export function UserProvider({children}){
  const [currentUser,dispatchUser] = useReducer(authReducer,initialUserState);
  return (
  <UserContext.Provider value={currentUser}>
    <UserDispatchContext.Provider value={dispatchUser}>
      {children}
    </UserDispatchContext.Provider>
  </UserContext.Provider>
  );
}