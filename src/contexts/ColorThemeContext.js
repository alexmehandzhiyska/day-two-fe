import { createContext, useReducer } from "react";

export const ColorThemeContext = createContext();

const initialState = { darkMode: false };

const colorThemeReducer = (state, action) => {
    switch (action.type) {
        case 'LIGHT_MODE':
            localStorage.setItem('darkMode', false);
            return { darkMode: false };
        case 'DARK_MODE':
            localStorage.setItem('darkMode', true);
            return { darkMode: true };
        default:
            return state;
    }
};

export const ColorThemeProvider = (props) => {
    const [state, dispatch] = useReducer(colorThemeReducer, initialState);
    return <ColorThemeContext.Provider value={{ state, dispatch }}>{props.children}</ColorThemeContext.Provider>
}