import { connect } from 'react-redux';

// material-ui
import { Button, CardActions, CardContent, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductItem from '../../ui-component/products';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Real from '../../ui-component/money/real';

// ==============================|| SHOP CART ||============================== //

const ShoppingCart = ({ products }) => {
    const keys = products.bag ? Object.keys(products.bag) : [];

    const list = keys.map((key) => {
        const quantity = products.bag[key].quantity;
        const product = products.bag[key].product;

        return (
            <div key={`search-${product.code}`}>
                <ProductItem key={product.code} product={product} addToBagVisible={false} quantity={quantity} />
                <Divider sx={{ my: 1.5 }} />
            </div>
        );
    });

    const total = products.total ? parseFloat(products.total).toFixed(2) : '';

    return (
        <MainCard content={false} sx={{ height: '80vh', position: 'relative' }}>
            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <CardContent>{list}</CardContent>
            </Grid>
            <Grid item xs={12} sx={{ p: 1.25, pt: 0, justifyContent: 'center', bottom: 60, position: 'absolute', width: '100%' }}>
                <Typography variant="h1" color="inherit">
                    Total:
                    <span style={{ float: 'right' }}>
                        <Real>{total}</Real>
                    </span>
                </Typography>
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

ShoppingCart.propTypes = {
    products: PropTypes.any
};

export default connect((state) => ({ products: state.sales }))(ShoppingCart);
