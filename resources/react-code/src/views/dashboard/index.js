import { Grid } from '@mui/material';
import ProductsSales from './ProductsSales';
import ShoppingCart from './ShoppingCart';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => (
    <Grid container>
        <Grid item xs={12} md={8}>
            <ProductsSales />
        </Grid>
        <Grid item xs={12} md={4}>
            <ShoppingCart />
        </Grid>
    </Grid>
);

export default Dashboard;
