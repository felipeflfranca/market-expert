import PropTypes from 'prop-types';

// material-ui
import { Button, CardContent, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ProductsSales = ({ isLoading, addToBag }) => (
    <>
        {isLoading ? (
            <SkeletonPopularCard />
        ) : (
            <MainCard content={false} sx={{ height: '80vh' }}>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sx={{ pt: '16px !important' }}>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', border: '1px solid #c7c7c7' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1, width: '100%' }}
                                    placeholder="Buscar produto"
                                    inputProps={{ 'aria-label': 'Buscar Produto' }}
                                />
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                Vinagre
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        endIcon={<AddShoppingCartIcon sx={{ marginRight: '10px' }} />}
                                                        onClick={(e) => {
                                                            console.log(e);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                        R$ 5,00
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        )}
    </>
);

ProductsSales.propTypes = {
    isLoading: PropTypes.bool
};

export default ProductsSales;
