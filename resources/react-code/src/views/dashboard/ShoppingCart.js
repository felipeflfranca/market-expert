// material-ui
import { Button, CardActions, Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductItem from '../../ui-component/products';
import Divider from '@mui/material/Divider';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const ShoppingCart = ({ bag }) => (
    <>
        {console.log(bag)}
        <MainCard content={false} sx={{ height: '80vh', position: 'relative' }}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between" />
                </Grid>
                <Grid item xs={12}>
                    {!Array.isArray(bag)
                        ? ''
                        : bag.map((product) => (
                              <ProductItem
                                  key={product.code}
                                  addProduct={undefined}
                                  code={product.code}
                                  description={product.description}
                                  value={product.value}
                              />
                          ))}
                    <Divider sx={{ my: 1.5 }} />
                </Grid>
                <Grid item xs={12}>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center', bottom: 0, position: 'absolute', width: '100%' }}>
                        <Button variant="contained" size="large" disableElevation sx={{ width: '100%' }}>
                            FINALIZAR COMPRA
                            <ShoppingCartIcon />
                        </Button>
                    </CardActions>
                </Grid>
            </Grid>
        </MainCard>
    </>
);

export default ShoppingCart;
