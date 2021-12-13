import config from 'config';
import { useState } from 'react';
import { Button, Fab, FormControl, Grid, Stack, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';

const ProductType = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [allTaxes, setAllTaxes] = useState([]);
    const [selectedTax, selectTax] = useState([]);

    const navigate = useNavigate();

    const getAllTaxes = () => {
        if (allTaxes.length === 0) {
            fetch(`http://${config.host}:${config.port}/services?api=tax`, {
                method: 'GET',
                redirect: 'follow'
            })
                .then((response) => response.text())
                .then((result) => {
                    const data = JSON.parse(result);
                    setAllTaxes(data.data);
                })
                .catch((error) => console.log('error', error));
        }
    };

    const getProductType = () => {
        fetch(`http://${config.host}:${config.port}/services?api=productType&id=${id}`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);
                const taxes = JSON.parse(data.data.taxes);

                setData(data.data);

                const selected = [];
                allTaxes.forEach((alltax) => {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < taxes.length; i++) {
                        if (parseInt(taxes[i], 10) === parseInt(alltax.id, 10)) {
                            selected.push(`${alltax.name} (${alltax.value}%)`);
                        }
                    }
                });

                selectTax(selected);
            })
            .catch((error) => console.log('error', error));
    };

    getAllTaxes();
    if (data.length === 0 && id) {
        getProductType();
    }

    const name = data.name ? data.name : '';

    const save = () => {
        let productTypeTax = '';
        // eslint-disable-next-line array-callback-return
        allTaxes.map((tax) => {
            const text = `${tax.name} (${tax.value}%)`;

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < selectedTax.length; i++) {
                const selected = selectedTax[i];

                if (text === selected) {
                    productTypeTax += productTypeTax !== '' ? `,${tax.id}` : tax.id;
                    break;
                }
            }
        });
        data.taxes = productTypeTax;

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        const urlencoded = new URLSearchParams(data);
        const requestOptions = {
            method: id ? 'PUT' : 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`http://${config.host}:${config.port}/services?api=productType`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);

                navigate(`/product/type/${data.data.id}`);

                Swal.fire({
                    icon: data.status,
                    text: data.status === 'success' ? data.data.message : data.data,
                    showConfirmButton: false,
                    timer: 1800
                });
            })
            .catch((error) => console.log('error', error));
    };

    const TitleCard = (
        <Grid container>
            <Grid item xs={8} sm={8} md={8} lg={8} xl={9} sx={{ pt: 1 }}>
                {id ? 'Alterar tipo de produto' : 'Cadastrar tipo de produto'}
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={3} sx={{ textAlign: 'right' }}>
                {id ? (
                    <Fab
                        color="primary"
                        aria-label="add"
                        size="small"
                        title="Adicionar novo tipo de produto"
                        onClick={() => {
                            setData([]);
                            selectTax([]);
                            navigate(`/product/type`);
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

    // ---------------------------------------------
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    const handleChange = (event) => {
        const {
            target: { value }
        } = event;

        selectTax(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };
    // ---------------------------------------------

    // eslint-disable-next-line array-callback-return
    const options = allTaxes.map((tax) => {
        const text = `${tax.name} (${tax.value}%)`;

        return (
            <MenuItem key={text} value={text}>
                <Checkbox checked={selectedTax.indexOf(text) > -1} />
                <ListItemText primary={text} />
            </MenuItem>
        );
    });

    return (
        <>
            <MainCard title={TitleCard}>
                <div style={{ height: 'calc(100vh - 305px)', width: '100%', position: 'relative', borderBottom: '1px solid #cecece' }}>
                    <Grid container key="tax" spacing={{ xs: 2, sm: 0, md: 2, lg: 0 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <TextField
                                fullWidth
                                label="Nome"
                                id="name"
                                value={name}
                                InputLabelProps={{ shrink: true }}
                                onChangeCapture={(e) => {
                                    setData({ ...data, name: e.target.value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                            <FormControl style={{ width: '100%' }}>
                                <InputLabel id="demo-multiple-checkbox-label">Impostos</InputLabel>
                                <Select
                                    style={{ width: '100%' }}
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={selectedTax}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Impostos" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {options}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                <div style={{ float: 'right' }}>
                    <Stack direction="row" spacing={2} sx={{ pt: 2, pb: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                navigate(`/list/product/types`);
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

export default ProductType;
