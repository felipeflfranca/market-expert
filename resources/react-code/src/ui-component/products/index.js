import { Button, Grid, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { connect } from 'react-redux';
import { ADD_PRODUCT_TO_BAG } from '../../store/actions';

// ==============================|| PRODUCT ITEM ||============================== //

const ProductItem = ({ product, addVisible = true, amount = 0, dispatch }) => {
    const addToBagButton = !addVisible ? (
        <></>
    ) : (
        <Grid item>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Button
                        type="button"
                        variant="contained"
                        endIcon={<AddShoppingCartIcon sx={{ marginRight: '10px' }} />}
                        onClick={() => {
                            dispatch({ type: ADD_PRODUCT_TO_BAG, product });
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );

    const amountElement =
        !amount && addVisible ? (
            <></>
        ) : (
            <Grid item>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>Quantidade: {amount}</Grid>
                </Grid>
            </Grid>
        );

    const total = amount ? (amount * product.value).toFixed(2) : product.value;

    return (
        <Grid container direction="column" key={product.code}>
            <Grid item>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            <strong>{product.code}</strong> - {product.description}
                        </Typography>
                    </Grid>
                    {addToBagButton}
                    {amountElement}
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                    R$ {total}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default connect((state) => ({ sales: state.sales }))(ProductItem);
