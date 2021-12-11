import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';

import Real from '../money/real';
import { ADD_PRODUCT_TO_BAG, PRODUCTS_INTO_BAG } from '../../store/actions';

// ==============================|| PRODUCT ITEM ||============================== //

const ProductItem = ({ product, addToBagVisible, quantity, dispatch }) => {
    const [quantityInTheBag, increaseTheAmountInTheBag] = useState(1);

    const productRemove = (product, quantity) => {
        console.log(quantity);
        dispatch({ type: PRODUCTS_INTO_BAG, product, quantity, opened: true });
    };

    const addToBagButton = !addToBagVisible ? (
        <></>
    ) : (
        <>
            <TextField
                id="outlined-basic"
                label="Quantidade"
                variant="outlined"
                type="number"
                InputLabelProps={{
                    shrink: true
                }}
                minLength={1}
                sx={{ marginRight: '10px', maxWidth: '100px' }}
                value={quantityInTheBag}
                onChange={(e) => {
                    const value = e.target.value ? parseInt(e.target.value, 10) : 1;
                    increaseTheAmountInTheBag(value < 1 ? 1 : value);
                }}
            />
            <Button
                type="button"
                variant="contained"
                endIcon={<AddShoppingCartIcon sx={{ marginRight: '11px', marginTop: '10px', marginBottom: '10px' }} />}
                onClick={() => {
                    dispatch({ type: ADD_PRODUCT_TO_BAG, product, quantityInTheBag });
                }}
            />
        </>
    );

    const productQuantityElement =
        !quantity && addToBagVisible ? (
            <></>
        ) : (
            <Grid item>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ textAlign: 'right' }}>
                    <small>Quantidade:</small> <strong>{quantity}</strong>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ textAlign: 'right' }}>
                    <IconButton
                        sx={{ p: '10px', color: 'error.dark' }}
                        aria-label="directions"
                        type="button"
                        data-product={product.code}
                        onClick={() => {
                            productRemove(product, quantity);
                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </Grid>
            </Grid>
        );

    const total = quantity ? (quantity * product.value).toFixed(2) : product.value;

    return (
        <Grid container key={product.code} spacing={{ xs: 2, sm: 0, md: 2, lg: 0 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant={addToBagVisible ? 'h3' : 'subtitle1'} color="inherit">
                            <strong>{product.code}</strong> - {product.description}
                        </Typography>
                        <Typography variant={addToBagVisible ? 'h4' : 'subtitle1'} sx={{ color: 'success.dark' }}>
                            <Real>{total}</Real>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={3} sx={{ textAlign: 'right' }}>
                {addToBagButton}
                {productQuantityElement}
            </Grid>
        </Grid>
    );
};

ProductItem.propTypes = {
    product: PropTypes.any,
    addToBagVisible: PropTypes.bool,
    quantity: PropTypes.number,
    dispatch: PropTypes.any
};

export default connect((state) => ({ sales: state.sales }))(ProductItem);
