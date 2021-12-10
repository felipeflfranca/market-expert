import { useState } from 'react';

// project imports
import config from 'config';

// material-ui
import { CardContent, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ProductItem from '../../ui-component/products';

// ==============================|| PRODUCT SALES ||============================== //

const ProductsSales = () => {
    const [products, setProducts] = useState([]);

    async function searchProduct(search) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://${config.host}:${config.port}/services?api=product&search=${search}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);
                setProducts(data.data);
            })
            .catch((error) => console.log('error', error));
    }

    const clearSearch = () => {
        console.log('teste');
        setProducts([]);
    };

    const productSearch = (e) => {
        const value = e.target.value;

        if (value === '') {
            clearSearch();
        } else {
            searchProduct(value);
        }
    };

    return (
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
                                autoFocus
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" type="button" onClick={clearSearch}>
                                <ClearIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        {!Array.isArray(products)
                            ? products
                            : products.map((product) => (
                                  <div key={`search-${product.code}`}>
                                      <ProductItem key={product.code} product={product} addToBagVisible quantity={0} />
                                      <Divider sx={{ my: 1.5 }} />
                                  </div>
                              ))}
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

export default ProductsSales;
