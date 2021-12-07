import {Box, Breadcrumbs, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {AppProvider} from "../contexts/AppContext";
import {DashProvider} from "../contexts/DashContext";
import {DataTable} from "../components/DataTable";
import appConfig from '../config';
import {useNavigate} from "react-router";

export default function ProductTypes() {

    const navigate = useNavigate()

    const [productTypes, setProductTypes] = useState<Array<object>>([])

    useEffect(() => {
        getAllProductTypes()
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
                accessorKey: true,
            },
            {
                Header: 'Nome',
                accessor: 'name',
            },
        ],
        []
    )

    async function getAllProductTypes() {
        fetch(appConfig.apiServer + '?api=productType', {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.text())
            .then((result) => {
                const productTypes = JSON.parse(result)
                setProductTypes(productTypes.data)
            })
            .catch((error) => console.log('error', error))
    }

    function openProduct(e: any) {
        const accessorKey = e.target.getAttribute('data-accessorkey')
        navigate('/product-type?id=' + accessorKey)
    }

    return (
        <AppProvider>
            <DashProvider>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">Tipos de produto</Typography>
                </Breadcrumbs>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}>
                    <DataTable columns={columns} data={productTypes} clickEvent={openProduct}/>
                </Box>
            </DashProvider>
        </AppProvider>
    );
}
