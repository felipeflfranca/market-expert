import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import {
    ButtonGroup,
    FormControl,
    Grid,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import {styled} from '@mui/material/styles';
import {tableCellClasses} from '@mui/material/TableCell';
import React, {useContext} from 'react';
import {usePagination, useSortBy, useTable} from 'react-table';
import {AppContext} from "../../contexts/AppContext";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#273a4a', //theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface Props {
    columns: any,
    data: any,
    clickEvent?: any
}

export function DataTable({columns, data, clickEvent}: Props) {
    const {classes} = useContext(AppContext)

    const instance: any = useTable(
        {
            columns,
            data,
        },
        useSortBy,
        usePagination
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = instance;

    const tableRows = page.map((row: any, i: any) => {
        prepareRow(row)

        let accessorKey = undefined;

        const keys = Object.keys(row.cells);
        for (let i = 0; i < keys.length; i++) {
            const cell = row.cells[keys[i]];

            if (cell.column.accessorKey) {
                accessorKey = cell
                break
            }
        }

        return (
            <StyledTableRow  {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                    return <StyledTableCell   {...cell.getCellProps()}>{cell.render('Cell')}</StyledTableCell>
                })}

                <StyledTableCell>
                    <Button variant="outlined" data-accessorkey={accessorKey.value} onClick={clickEvent}>Abrir</Button>
                </StyledTableCell>
            </StyledTableRow>
        )
    })

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="normal" aria-label="Table" {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map((headerGroup: any) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <StyledTableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <ArrowDownwardIcon/>
                                                    : <ArrowUpwardIcon/>
                                                : ''}
                                        </span>
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell>Ação</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {tableRows}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center">
                <Grid item xs={8}>
                    <div className={classes.totalPages}>
                        Página <strong>{pageIndex + 1} de {pageOptions.length}</strong>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.paginationsBtn}>
                        <div className={classes.pageNumber}>
                            <FormControl variant="outlined" size="small">
                                <InputLabel id="select-page-number">Exibir</InputLabel>
                                <Select
                                    labelId="select-page-number"
                                    id="input-page-number"
                                    value={pageSize}
                                    onChange={e => {
                                        setPageSize(Number(e.target.value))
                                    }}
                                    label="Exibir"
                                    size="small"
                                    className={classes.pageNumber}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                    <MenuItem value={100}>100</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button variant="outlined" size="medium" onClick={() => gotoPage(0)}>
                                <FirstPageIcon/>
                            </Button>
                            <Button variant="outlined" size="medium" onClick={() => previousPage()}>
                                <ArrowLeftIcon/>
                            </Button>
                            <Button variant="outlined" size="medium" onClick={() => nextPage()}>
                                <ArrowRightIcon/>
                            </Button>
                            <Button variant="outlined" size="medium" onClick={() => gotoPage(pageCount - 1)}
                                    disabled={!canNextPage}>
                                <LastPageIcon/>
                            </Button>
                        </ButtonGroup>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}