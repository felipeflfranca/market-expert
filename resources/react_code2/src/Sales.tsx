import React from 'react';
import {AppProvider} from "./contexts/AppContext";
import {Button, Grid, Stack, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {DataGrid, GridApi, GridCellValue, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

const useStyles: any = makeStyles((theme?: any) => ({
    gridDash: {
        backgroundColor: '#FFFFFF',
        padding: '15px',
        borderRadius: '6px',
        height: '88vh'
    },
    products: {
        borderCollapse: 'collapse',
        width: '100%',
        marginTop: '10px',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
    },
    trNth: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#04AA6D',
        color: 'white',
        paddingTop: '12px',
        paddingBottom: '20px',
    },
    productCode: {
        hight: '20px'
    }
}));

const columns: GridColDef[] = [
    {field: 'code', headerName: 'Código', width: 100},
    {
        field: 'firstName',
        headerName: 'First name',
        editable: true,
        renderCell: (params) => {
            const onClick = (e: any) => {
                e.stopPropagation(); // don't select this row after clicking

                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue> = {};

                api
                    .getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach(
                        (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                    );

                return alert(JSON.stringify(thisRow, null, 4));
            };

            return <Button onClick={onClick} style={{'width': '100%'}}>Adicionar</Button>;
        }
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Ações',
        width: 100,
        cellClassName: 'actions',
        renderCell: (params) => {
            const onClick = (e: any) => {
                e.stopPropagation(); // don't select this row after clicking

                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue> = {};

                api
                    .getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach(
                        (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                    );

                return alert(JSON.stringify(thisRow, null, 4));
            };

            return <Button onClick={onClick}>Adicionar</Button>;
        }
    },
];

const rows = [
    {id: 1, code: 24234, lastName: 'Snow', firstName: 'Jon', age: 35},
    {id: 2, code: 24233, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    {id: 3, code: 242345, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    {id: 4, code: 24236, lastName: 'Stark', firstName: 'Arya', age: 16},
    {id: 5, code: 24237, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 6, code: 24238, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 7, code: 24239, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 8, code: 241234, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 9, code: 242363, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

function Sales() {
    const classes = useStyles();

    return (
        <AppProvider>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem/>}
                spacing={2}
            >
                <Grid container>
                    <Grid xs={6} md={7}>
                        <item
                        <div className={classes.gridDash}>
                            <Typography variant="h4" gutterBottom component="div">
                                Lista de compra
                            </Typography>
                        </div>
                    </Grid>
                    <Grid xs={6} md={5}>
                        <div className={classes.gridDash}>
                            <Typography variant="h4" gutterBottom component="div">
                                Produtos
                            </Typography>

                            <Paper
                                component="form"
                                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%'}}
                            >
                                <InputBase
                                    sx={{ml: 1, flex: 1}}
                                    placeholder="Buscar produto"
                                    inputProps={{'aria-label': 'search google maps'}}
                                />
                                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                                <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
                                    <SearchIcon/>
                                </IconButton>
                            </Paper>


                            <table className={classes.products}>
                                <thead>
                                    <tr className={classes.trNth}>
                                        <th className={classes.productCode}>Company</th>
                                        <th>Contact</th>
                                        <th>Country</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </Grid>
                </Grid>
            </Stack>
        </AppProvider>
    );


}

export default Sales;
