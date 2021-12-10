import { Button, Grid, TextField, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { connect } from 'react-redux';
import { ADD_PRODUCT_TO_BAG } from '../../store/actions/sales';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Real from '../money/real';

// ==============================|| PRODUCT ITEM ||============================== //

const ProductItem = ({ product, addToBagVisible, quantity, dispatch }) => {
    const [quantityInTheBag, increaseTheAmountInTheBag] = useState(1);

    const addToBagButton = !addToBagVisible ? (
        <></>
    ) : (
        <Grid item sx={{ marginBottom: '-20px' }}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
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
                </Grid>
            </Grid>
        </Grid>
    );

    const productQuantityElement =
        !quantity && addToBagVisible ? (
            <></>
        ) : (
            <Grid item>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>Quantidade: {quantity}</Grid>
                </Grid>
            </Grid>
        );

    const total = quantity ? (quantity * product.value).toFixed(2) : product.value;

    return (
        <Grid container direction="column" key={product.code}>
            <Grid item>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant={addToBagVisible ? 'h3' : 'subtitle1'} color="inherit">
                            <strong>{product.code}</strong> - {product.description}
                        </Typography>
                    </Grid>
                    {addToBagButton}
                    {productQuantityElement}
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant={addToBagVisible ? 'h4' : 'subtitle1'} sx={{ color: 'success.dark' }}>
                    <Real>{total}</Real>
                </Typography>
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
