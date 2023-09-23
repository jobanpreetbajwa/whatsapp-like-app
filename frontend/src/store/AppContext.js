import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();


const AppProvider = ({ children }) => {

  const initialState = {

    isLoggedIn: localStorage.getItem('isLoggedIn'),
    friends: [],
    currentOpen: ''

  };

  const reducer = (state, action) => {
  
    switch (action.type) {
        

      case 'ADD_FRIENDS':
        return { ...state, friends: action.friends,currentOpen:action.friends && action.friends.length>0 ? action.friends[0].friendId:''};

      case 'SET_CURRENT_OPEN':
        return { ...state, currentOpen: action.userId};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Step 4: Create custom hooks to access the context
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };
