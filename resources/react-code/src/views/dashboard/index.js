import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import ProductsSales from './ProductsSales';
import ShoppingCart from './ShoppingCart';
import { gridSpacing } from 'store/constant';
import ProductBag from 'ui-component/product-bag';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={8}>
                            <ProductsSales isLoading={isLoading} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ShoppingCart isLoading={isLoading} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ProductBag />
        </>
    );
};

export default Dashboard;
