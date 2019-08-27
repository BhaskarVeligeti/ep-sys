import React, { useReducer } from 'react';

/*  "createDataContext"  this file is very very important
Reusable Automatic Context creation and it is export a plane function from this file.
parameters :  reducer,actions,INITIAL_STATE
*/

export default (reducer, actions, INITIAL_STATE) => {
    // Step 1: create context object, it is a just like pipeline to send data to below levels from Provider
    const Context = React.createContext();

    // Step 2:  create helper Provider Component    : { children } === <App />
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, INITIAL_STATE);   // initial state
        // actions === { addBlogPost: (dispatch) => { return () => { } } }
        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch)
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        )
    }

/*
Provider :  provides data  available  inside of application.
Context : use to get access from one of our child components.

*/


    return { Context, Provider }
}

