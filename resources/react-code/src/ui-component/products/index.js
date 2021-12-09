import { Button, Grid, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// ==============================|| PRODUCT ITEM ||============================== //

const ProductItem = ({ code, description, value, addProduct }) => (
    <>
        <Grid container direction="column" key={code}>
            <Grid item>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                            <strong>{code}</strong> - {description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Button
                                    type="button"
                                    variant="contained"
                                    endIcon={<AddShoppingCartIcon sx={{ marginRight: '10px' }} />}
                                    onClick={() => {
                                        addProduct({ code, description, value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                    R$ {value}
                </Typography>
            </Grid>
        </Grid>
    </>
);

export default ProductItem;
