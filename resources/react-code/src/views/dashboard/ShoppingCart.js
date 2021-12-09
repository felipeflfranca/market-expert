import React from 'react';
import { connect } from 'react-redux';

// material-ui
import { Button, CardActions, CardContent, Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductItem from '../../ui-component/products';
import Divider from '@mui/material/Divider';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const ShoppingCart = ({ products }) => {
    const keys = Object.keys(products.bag);

    const list = keys.map((key) => {
        const amount = products.bag[key].amount;
        const product = products.bag[key].product;
        return (
            <div key={`search-${product.code}`}>
                <ProductItem key={product.code} product={product} addVisible={false} amount={amount} />
                <Divider sx={{ my: 1.5 }} />
            </div>
        );
    });

    return (
        <MainCard content={false} sx={{ height: '80vh', position: 'relative' }}>
            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <CardContent>{list}</CardContent>
            </Grid>
            <Grid item xs={12}>
                <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center', bottom: 0, position: 'absolute', width: '100%' }}>
                    <Button variant="contained" size="large" disableElevation sx={{ width: '100%' }}>
                        FINALIZAR COMPRA
                        <ShoppingCartIcon />
                    </Button>
                </CardActions>
            </Grid>
        </MainCard>
    );
};

export default connect((state) => ({ products: state.sales }))(ShoppingCart);
