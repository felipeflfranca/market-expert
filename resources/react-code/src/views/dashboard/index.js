import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';

// material-ui
import { Grid } from '@mui/material';

// project imports
import ProductsSales from './ProductsSales';
import ShoppingCart from './ShoppingCart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Provider store={store}>
                        <Grid item xs={12} md={8}>
                            <ProductsSales isLoading={isLoading} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ShoppingCart isLoading={isLoading} />
                        </Grid>
                    </Provider>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
