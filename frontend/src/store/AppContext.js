import React, { createContext, useContext, useReducer } from 'react';

// Step 1: Create a context
const AppContext = createContext();

// Step 2: Create a provider component
const AppProvider = ({ children }) => {
  // Step 3: Create a reducer function to manage state updates
  const initialState = {
    // Define your initial state properties here
    count: 0,
    isLoggedIn: false
    // ...
  };

  const reducer = (state, action) => {
    console.log("action",action);
    switch (action.type) {
        
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'DECREMENT':
        return { ...state, count: state.count - 1 };
      // Add more cases for different actions
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
