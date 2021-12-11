import { Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ADD_PRODUCT_TO_BAG, PRODUCTS_INTO_BAG } from 'store/actions';
import Real from 'ui-component/money/real';

const ProductBag = ({ bag, dispatch }) => {
    const open = !bag.productBag.opened ? false : bag.productBag.opened;
    const productQuantity = open ? bag.productBag.quantity : 0;
    const productTitle = open ? `${bag.productBag.product.code} - ${bag.productBag.product.description}` : '';
    const productValue = open ? <Real>{bag.productBag.quantity * bag.productBag.product.value}</Real> : '';

    const handleClose = () => {
        dispatch({ type: PRODUCTS_INTO_BAG, product: bag.productBag.product, opened: false });
    };

    const handleTotal = () => {
        dispatch({ type: ADD_PRODUCT_TO_BAG, product: bag.productBag.product, quantityInTheBag: productQuantity });
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <h1>{productTitle}</h1>
                <DialogContent>
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
                        value={productQuantity}
                        onChange={(e) => {
                            let value = e.target.value ? parseInt(e.target.value, 10) : 1;
                            value = value < 0 ? 0 : value;
                            dispatch({ type: PRODUCTS_INTO_BAG, product: bag.productBag.product, quantity: value, opened: true });
                        }}
                    />
                    <h1>Valor: {productValue}</h1>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleTotal} autoFocus>
                        Aplicar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

ProductBag.propTypes = {
    dispatch: PropTypes.any,
    bag: PropTypes.any
};

export default connect((state) => ({ bag: state.sales }))(ProductBag);
