import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Button, CardActions, CardContent, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import MainCard from 'ui-component/cards/MainCard';
import Real from '../../ui-component/money/real';
import ProductItem from '../../ui-component/products';
import { useEffect, useRef, useState } from 'react';

// ==============================|| SHOP CART ||============================== //

const ShoppingCart = ({ products }) => {
    const [total, setTotal] = useState(0);
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

    const didMountRef = useRef(false);
    useEffect(() => {
        if (didMountRef.current) {
            const keys = Object.keys(products.bag);

            let productTotal = 0;

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < keys.length; i++) {
                const product = products.bag[keys[i]];
                productTotal += parseFloat(product.total);
            }

            setTotal(productTotal);
        } else {
            didMountRef.current = true;
        }
    });

    return (
        <>
            <MainCard content={false} style={{ height: 'calc(100vh - 195px)', position: 'relative' }}>
                <Grid item xs={12}>
                    <Box style={{ maxHeight: 'calc(80vh - 110px)', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
                        <CardContent>{list}</CardContent>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ p: 1.25, pt: 0, justifyContent: 'center', bottom: 0, position: 'absolute', width: '100%' }}>
                    <Typography variant="h1" color="inherit">
                        {total > 0 ? 'Total:' : ''}
                        <span style={{ float: 'right' }}>
                            <Real>{total.toFixed(2)}</Real>
                        </span>
                    </Typography>
                </Grid>
            </MainCard>
            <MainCard content={false} sx={{ height: '65px', position: 'relative' }}>
                <Grid item xs={12}>
                    <CardActions
                        sx={{ p: 1.25, pt: 0 }}
                        style={{ justifyContent: 'center', bottom: 0, position: 'absolute', width: '100%' }}
                    >
                        <Button variant="contained" size="large" disableElevation sx={{ width: '100%' }} disabled={!total}>
                            FINALIZAR COMPRA
                            <ShoppingCartIcon />
                        </Button>
                    </CardActions>
                </Grid>
            </MainCard>
        </>
    );
};

ShoppingCart.propTypes = {
    products: PropTypes.any
};

export default connect((state) => ({ products: state.sales }))(ShoppingCart);
