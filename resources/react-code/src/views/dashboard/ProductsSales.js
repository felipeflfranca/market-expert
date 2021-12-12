import { useState } from 'react';
import config from 'config';
import { Box, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import MainCard from 'ui-component/cards/MainCard';
import ProductItem from '../../ui-component/products';

const ProductsSales = () => {
    const [search, addSearch] = useState('');
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
        setProducts([]);
        addSearch('');
    };

    const productSearch = (e) => {
        const value = e.target.value;
        addSearch(value);

        if (value === '') {
            clearSearch();
        } else {
            searchProduct(value);
        }
    };

    return (
        <MainCard sx={{ height: 'calc(100vh - 131px)', position: 'relative' }}>
            <Grid item xs={12}>
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
                        value={search}
                        onChange={productSearch}
                        autoFocus
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" type="button" onClick={clearSearch}>
                        <ClearIcon />
                    </IconButton>
                </Paper>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '10px' }}>
                <Box
                    style={{
                        maxHeight: 'calc(80vh - 60px)',
                        overflow: 'auto',
                        marginTop: '10px 10px 10px 10px',
                        padding: '10px 10px 10px 10px'
                    }}
                >
                    {!Array.isArray(products) ? (
                        <Typography variant="h1">{products}</Typography>
                    ) : (
                        products.map((product) => (
                            <div key={`search-${product.code}`}>
                                <ProductItem key={product.code} product={product} addToBagVisible quantity={0} />
                                <Divider sx={{ my: 1.5 }} />
                            </div>
                        ))
                    )}
                </Box>
            </Grid>
        </MainCard>
    );
};

export default ProductsSales;
