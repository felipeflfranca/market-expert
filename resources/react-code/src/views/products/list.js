import { DataGrid, ptBR } from '@mui/x-data-grid';
import { ptBR as corePtBr } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import config from 'config';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Fab, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import AddIcon from '@mui/icons-material/Add';
import Real from 'ui-component/money/real';

const Products = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100, renderCell: (params) => parseInt(params.value, 10) },
        {
            field: 'code',
            headerName: 'Código',
            width: 150,
            editable: false
        },
        {
            field: 'description',
            headerName: 'Descrição',
            width: 600,
            editable: false
        },
        {
            field: 'value',
            headerName: 'Valor  ',
            width: 150,
            editable: false,
            renderCell: (params) => <Real>{params.value}</Real>
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Ações',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => [
                <ButtonGroup size="small" aria-label="small button group">
                    <Button
                        endIcon={<EditIcon sx={{ margin: '3px 3px 3px -6px' }} />}
                        style={{ border: '0px' }}
                        onClick={() => {
                            navigate(`/product/${id}`);
                        }}
                        title="Editar"
                    />
                </ButtonGroup>
            ]
        }
    ];

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    useEffect(() => {
        if (!rows.length) {
            fetch(`http://${config.host}:${config.port}/services?api=product    `, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    const data = JSON.parse(result);
                    setRows(data.data);
                })
                .catch((error) => console.log('error', error));
        }
    });

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976d2' }
            }
        },
        ptBR,
        corePtBr
    );

    const TitleCard = (
        <Grid container>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={9} sx={{ pt: 1 }}>
                Produtos
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={3} sx={{ textAlign: 'right' }}>
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    title="Adicionar nova taxa de imposto"
                    onClick={() => {
                        navigate(`/product`);
                    }}
                >
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
    );

    return (
        <MainCard title={TitleCard}>
            <div style={{ height: 'calc(100vh - 270px)', width: '100%', position: 'relative' }}>
                <ThemeProvider theme={theme}>
                    <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
                </ThemeProvider>
            </div>
        </MainCard>
    );
};

export default Products;
