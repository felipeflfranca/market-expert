import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createTheme} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'


const theme = createTheme({
    palette: {
        primary: {
            main: '#003c6c',
        },
        secondary: {
            main: '#1c54b2',
        },
    },
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>,
    document.getElementById('root')
);
