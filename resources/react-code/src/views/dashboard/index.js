import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import ProductsSales from './ProductsSales';
import ShoppingCart from './ShoppingCart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [bag, addToBag] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    console.log(bag);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <ProductsSales isLoading={isLoading} addToBag={addToBag} bag={bag} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ShoppingCart isLoading={isLoading} bag={bag} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
