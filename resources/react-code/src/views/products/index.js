import config from 'config';
import { useState } from 'react';
import { Button, Fab, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';

const Product = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [type, setType] = useState('');

    const navigate = useNavigate();

    const getAllProductTypes = () => {
        if (productTypes.length === 0) {
            fetch(`http://${config.host}:${config.port}/services?api=productType`, {
                method: 'GET',
                redirect: 'follow'
            })
                .then((response) => response.text())
                .then((result) => {
                    const data = JSON.parse(result);
                    setProductTypes(data.data);
                })
                .catch((error) => console.log('error', error));
        }
    };

    getAllProductTypes();
    if (data.length === 0 && id) {
        fetch(`http://${config.host}:${config.port}/services?api=product&id=${id}`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);
                setData(data.data);
                setType(data.data.type_id);
            })
            .catch((error) => console.log('error', error));
    }

    const save = () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        const urlencoded = new URLSearchParams(data);
        urlencoded.append('type_id', type);
        const requestOptions = {
            method: id ? 'PUT' : 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`http://${config.host}:${config.port}/services?api=product`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);

                navigate(`/product/${data.data.id}`);

                Swal.fire({
                    icon: data.status,
                    text: data.status === 'success' ? data.data.message : data.data,
                    showConfirmButton: false,
                    timer: 1800
                });
            })
            .catch((error) => console.log('error', error));
    };

    const code = data.code ? data.code : '';
    const description = data.description ? data.description : '';
    const value = data.value ? data.value : '';

    const TitleCard = (
        <Grid container>
            <Grid item xs={8} sm={8} md={8} lg={8} xl={9} sx={{ pt: 1 }}>
                {id ? 'Alterar produto' : 'Cadastrar produto'}
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={3} sx={{ textAlign: 'right' }}>
                {id ? (
                    <Fab
                        color="primary"
                        aria-label="add"
                        size="small"
                        title="Adicionar novo produto"
                        onClick={() => {
                            setData([]);
                            setType('');
                            navigate(`/product`);
                        }}
                    >
                        <AddIcon />
                    </Fab>
                ) : (
                    <></>
                )}
            </Grid>
        </Grid>
    );

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
        <>
            <MainCard title={TitleCard}>
                <div style={{ height: 'calc(100vh - 305px)', width: '100%', position: 'relative', borderBottom: '1px solid #cecece' }}>
                    <Grid container key="tax" spacing={{ xs: 2, sm: 0, md: 2, lg: 0 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                            <TextField
                                fullWidth
                                label="Código"
                                id="code"
                                value={code}
                                InputLabelProps={{ shrink: true }}
                                onChangeCapture={(e) => {
                                    setData({ ...data, code: e.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                            <TextField
                                fullWidth
                                label="Nome"
                                id="name"
                                value={description}
                                InputLabelProps={{ shrink: true }}
                                onChangeCapture={(e) => {
                                    setData({ ...data, description: e.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                            <FormControl style={{ width: '100%' }}>
                                <InputLabel id="demo-simple-select-helper-label">Tipo de produto</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={type}
                                    label="Tipo de produto"
                                    onChange={handleChange}
                                >
                                    {productTypes.map((productType) => (
                                        <MenuItem key={`${productType.id}-${productType.name}`} value={productType.id}>
                                            {productType.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                            <TextField
                                fullWidth
                                label="Valor"
                                id="value"
                                type="number"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChangeCapture={(e) => {
                                    setData({ ...data, value: e.target.value });
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div style={{ float: 'right' }}>
                    <Stack direction="row" spacing={2} sx={{ pt: 2, pb: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                navigate(`/list/taxes`);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={save}>
                            Salvar
                        </Button>
                    </Stack>
                </div>
            </MainCard>
        </>
    );
};

export default Product;
