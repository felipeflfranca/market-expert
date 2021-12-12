// material-ui
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { ptBR as ptBRCore } from '@mui/material/locale';
import config from 'config';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

// project imports
import MainCard from 'ui-component/cards/MainCard';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'name',
        headerName: 'Nome',
        width: 150,
        editable: false
    },
    {
        field: 'value',
        headerName: 'Valor',
        width: 150,
        editable: false
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
                    endIcon={<DeleteOutlineIcon sx={{ margin: '3px 3px 3px -6px', color: 'error.dark' }} />}
                    style={{ border: '0px' }}
                    onClick={() => {
                        console.log(id);
                    }}
                />
                <Button
                    endIcon={<EditIcon sx={{ margin: '3px 3px 3px -6px' }} />}
                    style={{ border: '0px' }}
                    onClick={() => {
                        console.log(id);
                    }}
                />
            </ButtonGroup>
        ]
    }
];

const Taxes = () => {
    const [rows, setRows] = useState([]);

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    useEffect(() => {
        if (!rows.length) {
            fetch(`http://${config.host}:${config.port}/services?api=tax`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    const data = JSON.parse(result);
                    setRows(data.data);
                    console.log('teste');
                })
                .catch((error) => console.log('error', error));
        }
    });

    const localizedTextsMap = {
        columnMenuUnsort: 'não classificado',
        columnMenuSortAsc: 'Classificar por ordem crescente',
        columnMenuSortDesc: 'Classificar por ordem decrescente',
        columnMenuFilter: 'Filtro',
        columnMenuHideColumn: 'Ocultar',
        columnMenuShowColumns: 'Mostrar colunas'
    };

    return (
        <MainCard title="Taxas de impostos">
            <div style={{ height: 'calc(100vh - 252px)', width: '100%', position: 'relative' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    localeText={ptBR.props.MuiDataGrid.localeText}
                />
            </div>
        </MainCard>
    );
};

export default Taxes;
