import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Grid, IconButton, InputBase, Paper, TextField, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Real from '../money/real';
import { ADD_PRODUCT_TO_BAG } from '../../store/actions';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MainCard from 'ui-component/cards/MainCard';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ProductItem = ({ sales, product, addToBagVisible, quantity, dispatch }) => {
    const [editOpen, handleEditOpen] = useState(false);
    const [removeOpen, handleRemoveOpen] = useState(false);
    const [productQuantity, addMoreProduct] = useState(1);

    let percentual = 0;
    let totalTaxes = 0;
    const taxes = JSON.parse(product.taxes);
    // eslint-disable-next-line array-callback-return
    taxes.map((tax) => {
        const keys = Object.keys(tax);
        totalTaxes += tax[keys[0]];
    });

    const total = quantity ? (quantity * product.value).toFixed(2) : product.value;

    if (totalTaxes > 0) {
        percentual = totalTaxes;
        totalTaxes = ((total * product.value) / 100).toFixed(2);
    }

    const handleCloseEdit = () => {
        handleEditOpen(false);
    };

    const handleCloseRemove = () => {
        handleRemoveOpen(false);
    };

    const removeProduct = (e) => {
        const productCode = `code-${e.currentTarget.getAttribute('data-product')}`;

        const keys = Object.keys(sales.bag);
        const newBag = [];
        // eslint-disable-next-line array-callback-return
        keys.map((key) => {
            if (key !== productCode) {
                newBag[key] = sales.bag[key];
            }
        });

        dispatch({ type: ADD_PRODUCT_TO_BAG, bag: newBag });
    };

    const addToBagButton = !addToBagVisible ? (
        <></>
    ) : (
        <>
            <div style={{ marginTop: '-5px' }}>
                <Grid style={{ textAlign: 'left', paddingLeft: '10px' }}>
                    <small>Quantidade:</small>
                </Grid>
                <Grid>
                    <Paper component="form" sx={{ display: 'flex', alignItems: 'center' }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            label="Quantidade"
                            placeholder="Quantidade"
                            inputProps={{ 'aria-label': 'Quantidade' }}
                            style={{
                                border: '1px solid #cecece',
                                borderRadius: '10px 1px 0px 10px',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                                paddingLeft: '10px',
                                height: '46px'
                            }}
                            type="number"
                            value={productQuantity}
                            onChange={(e) => {
                                const qtd = e.target.value ? parseInt(e.target.value, 10) : 1;
                                addMoreProduct(qtd < 1 ? 1 : qtd);
                            }}
                        />
                        <IconButton
                            color="primary"
                            sx={{ p: '10px', color: 'secondary.dark' }}
                            style={{
                                backgroundColor: '#2196f3',
                                color: '#ffffff',
                                borderRadius: '0px 10px 10px 0px',
                                border: '1px solid #2196f4'
                            }}
                            aria-label="directions"
                            onClick={() => {
                                let existingQuantity = productQuantity;
                                if (sales.bag[`code-${product.code}`]) {
                                    existingQuantity = sales.bag[`code-${product.code}`].quantity + productQuantity;
                                }

                                sales.bag[`code-${product.code}`] = {
                                    product,
                                    quantity: existingQuantity,
                                    total: (existingQuantity * parseFloat(product.value)).toFixed(2)
                                };

                                dispatch({ type: ADD_PRODUCT_TO_BAG, bag: sales.bag });
                            }}
                        >
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </div>
        </>
    );

    const productQuantityElement =
        !quantity && addToBagVisible ? (
            <></>
        ) : (
            <>
                <Grid item>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ textAlign: 'right' }}>
                        <small>Quantidade:</small> <strong>{quantity}</strong>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ textAlign: 'right', padding: '0px' }}>
                        <ButtonGroup size="small" aria-label="small button group">
                            <Button
                                endIcon={<DeleteOutlineIcon sx={{ margin: '3px 3px 3px -6px', color: 'error.dark' }} />}
                                style={{ border: '0px' }}
                                onClick={() => {
                                    handleRemoveOpen(true);
                                }}
                            />
                            <Button
                                endIcon={<EditIcon sx={{ margin: '3px 3px 3px -6px' }} />}
                                style={{ border: '0px' }}
                                onClick={() => {
                                    handleEditOpen(true);
                                }}
                            />
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Dialog
                    open={editOpen}
                    onClose={handleCloseEdit}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    id="dialog-edit"
                >
                    <MainCard content={false} style={{ padding: '20px' }}>
                        <DialogTitle style={{ textAlign: 'center' }}>
                            <Grid item xs={12} md={12}>
                                <Typography variant="h3" sx={{ color: '#707070', pb: 5 }}>
                                    EDITAR QUANTIDADE DO PRODUTO NA SACOLA
                                </Typography>

                                <Typography variant="h2">{`${product.code} - ${product.description}`}</Typography>
                            </Grid>
                        </DialogTitle>
                        <DialogContent style={{ padding: '0px', height: '100px' }}>
                            <Grid container spacing={0}>
                                <Grid item xs={8}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Quantidade"
                                        variant="outlined"
                                        type="number"
                                        minLength={1}
                                        sx={{ marginRight: '10px', maxWidth: '200px', marginTop: '20px' }}
                                        style={{ textAlign: 'left', width: '100%', float: 'left' }}
                                        value={sales.bag[`code-${product.code}`].quantity}
                                        onChange={(e) => {
                                            let qtd = e.target.value ? parseInt(e.target.value, 10) : 1;
                                            qtd = qtd < 1 ? 1 : qtd;

                                            if (qtd > 0) {
                                                sales.bag[`code-${product.code}`] = {
                                                    product,
                                                    quantity: qtd,
                                                    total: (qtd * parseFloat(product.value)).toFixed(2)
                                                };

                                                dispatch({ type: ADD_PRODUCT_TO_BAG, bag: sales.bag });
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4} style={{ padding: '0px' }}>
                                    <Typography
                                        variant="h1"
                                        sx={{ color: 'success.dark' }}
                                        style={{ textAlign: 'right', marginTop: '24px' }}
                                    >
                                        <Real>{total}</Real>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions style={{ borderTop: '1px solid #cecece', padding: '20px 0px 0px 0px' }}>
                            <Button variant="outlined" onClick={handleCloseEdit}>
                                Fechar
                            </Button>
                        </DialogActions>
                    </MainCard>
                </Dialog>
                <Dialog
                    open={removeOpen}
                    onClose={handleCloseRemove}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    id="dialog-remove"
                >
                    <MainCard content={false} style={{ padding: '20px' }}>
                        <DialogContent style={{ padding: '0px', minHeight: '120px', textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#707070', pb: 5 }}>
                                DESEJA REMOVER O PRODUTO DA SACOLA?
                            </Typography>

                            <Typography variant="h2" sx={{ pb: 5 }}>{`${product.code} - ${product.description}`}</Typography>
                        </DialogContent>
                        <DialogActions style={{ borderTop: '1px solid #cecece', padding: '20px 0px 0px 0px' }}>
                            <Button variant="outlined" onClick={handleCloseRemove}>
                                Não
                            </Button>
                            <Button variant="outlined" color="error" data-product={product.code} onClick={removeProduct}>
                                Sim
                            </Button>
                        </DialogActions>
                    </MainCard>
                </Dialog>
            </>
        );

    return (
        <>
            <Grid container key={product.code} spacing={{ xs: 2, sm: 0, md: 2, lg: 0 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant={addToBagVisible ? 'h3' : 'subtitle1'} color="inherit">
                                <strong>{product.code}</strong> - {product.description}
                            </Typography>
                            <Typography variant="subtitle2">
                                Impostos: <Real>{(percentual * total) / 100}</Real>
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
        </>
    );
};

ProductItem.propTypes = {
    sales: PropTypes.any,
    product: PropTypes.any,
    addToBagVisible: PropTypes.bool,
    quantity: PropTypes.number,
    dispatch: PropTypes.any
};

export default connect((state) => ({ sales: state.sales }))(ProductItem);
