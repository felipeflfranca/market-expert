import PropTypes from 'prop-types';

// material-ui
import { Button, CardContent, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { useState } from 'react';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ProductsSales = ({ isLoading, addToBag, bag }) => {
    const [products, setProducts] = useState([]);

    async function searchProduct(search) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/services?api=product&search=${search}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);
                setProducts(data.data);
            })
            .catch((error) => console.log('error', error));
    }

    const productSearch = (e) => {
        const value = e.target.value;

        if (value === '') {
            setProducts([]);
        } else {
            searchProduct(value);
        }
    };

    function addProduct(code) {
        const newProduct = [];

        console.log(code);
        newProduct[code] = 1;
        if (bag[code]) {
            newProduct[code] = bag[code] + 1;
        }

        addToBag([...bag, newProduct]);

        console.log(bag);
    }

    return (
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
                                    sx={{
                                        p: '2px 4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        border: '1px solid #c7c7c7'
                                    }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1, width: '100%' }}
                                        placeholder="Buscar produto"
                                        inputProps={{ 'aria-label': 'Buscar Produto' }}
                                        onChange={productSearch}
                                    />
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" type="button">
                                        <ClearIcon />
                                    </IconButton>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                {!Array.isArray(products)
                                    ? products
                                    : products.map((product) => (
                                          <Grid container direction="column" key={product.code}>
                                              <Grid item>
                                                  <Grid container alignItems="center" justifyContent="space-between">
                                                      <Grid item>
                                                          <Typography variant="subtitle1" color="inherit">
                                                              <strong>{product.code}</strong> - {product.description}
                                                          </Typography>
                                                      </Grid>
                                                      <Grid item>
                                                          <Grid container alignItems="center" justifyContent="space-between">
                                                              <Grid item>
                                                                  <Button
                                                                      type="button"
                                                                      data-productcode={product.code}
                                                                      variant="contained"
                                                                      endIcon={<AddShoppingCartIcon sx={{ marginRight: '10px' }} />}
                                                                      onClick={() => {
                                                                          addProduct(product.code);
                                                                      }}
                                                                  />
                                                              </Grid>
                                                          </Grid>
                                                      </Grid>
                                                  </Grid>
                                              </Grid>
                                              <Grid item>
                                                  <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                                      R$ {product.value}
                                                  </Typography>
                                              </Grid>
                                          </Grid>
                                      ))}
                                <Divider sx={{ my: 1.5 }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

ProductsSales.propTypes = {
    isLoading: PropTypes.bool
};

export default ProductsSales;
