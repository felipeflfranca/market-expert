// material-ui
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import config from 'config';
import { useState } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Real from 'ui-component/money/real';

const Report = () => {
    const [sales, setSales] = useState([]);

    const getAllSales = () => {
        if (sales.length === 0) {
            fetch(`http://${config.host}:${config.port}/services?api=sales`, {
                method: 'GET',
                redirect: 'follow'
            })
                .then((response) => response.text())
                .then((result) => {
                    const data = JSON.parse(result);
                    setSales(data.data);
                })
                .catch((error) => console.log('error', error));
        }
    };

    getAllSales();

    const salesElements = sales.map((s) => {
        const saleData = JSON.parse(s.data);
        console.log(saleData);
        return (
            <div key={s.id}>
                <Typography variant="h2" style={{ paddingTop: '30px', paddingBottom: '10px' }}>
                    {s.date}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Valor Un.</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {saleData.map((sd) => (
                                <TableRow
                                    key={`${sd.product.id}-${sd.product.code}`}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {sd.product.code}
                                    </TableCell>
                                    <TableCell>{sd.product.description}</TableCell>
                                    <TableCell>
                                        <Real>{sd.product.value}</Real>
                                    </TableCell>
                                    <TableCell>
                                        <Real>{sd.total}</Real>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider />
            </div>
        );
    });

    return <MainCard title="Relatório de vendas">{salesElements}</MainCard>;
};

export default Report;
