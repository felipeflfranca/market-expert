import config from 'config';
import { useState } from 'react';
import { Button, Fab, Grid, Stack, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';

const Tax = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    if (data.length === 0 && id) {
        fetch(`http://${config.host}:${config.port}/services?api=tax&id=${id}`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);
                setData(data.data);
            })
            .catch((error) => console.log('error', error));
    }

    const name = data.name ? data.name : '';
    const value = data.value ? data.value : '';

    const save = () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        const urlencoded = new URLSearchParams(data);
        const requestOptions = {
            method: id ? 'PUT' : 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`http://${config.host}:${config.port}/services?api=tax`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);

                navigate(`/tax/${data.data.id}`);

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
                {id ? 'Alterar taxa de imposto' : 'Cadastrar taxa de imposto'}
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={3} sx={{ textAlign: 'right' }}>
                {id ? (
                    <Fab
                        color="primary"
                        aria-label="add"
                        size="small"
                        title="Adicionar nova taxa de imposto"
                        onClick={() => {
                            setData([]);
                            navigate(`/tax`);
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

    return (
        <>
            <MainCard title={TitleCard}>
                <div style={{ height: 'calc(100vh - 305px)', width: '100%', position: 'relative', borderBottom: '1px solid #cecece' }}>
                    <Grid container key="tax" spacing={{ xs: 2, sm: 0, md: 2, lg: 0 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                        <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
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
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
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

export default Tax;
