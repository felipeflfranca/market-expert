import { connect, useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { SET_MENU } from './store/actions';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

// ==============================|| APP ||============================== //

const App = ({ dispatch }) => {
    const customization = useSelector((state) => state.customization);

    useEffect(() => {
        dispatch({ type: SET_MENU, opened: false });
    }, [dispatch]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

App.propTypes = {
    dispatch: PropTypes.any
};

export default connect((state) => ({ custom: state.opened }))(App);
