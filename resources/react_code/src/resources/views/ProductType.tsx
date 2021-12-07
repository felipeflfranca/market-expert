import {Box, Breadcrumbs, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {AppProvider} from "../contexts/AppContext";
import {DashProvider} from "../contexts/DashContext";
import {useParams} from "react-router";
import appConfig from "../config";

export default function ProductType() {
    const {id} = useParams();

    useEffect(() => {
        getProductType()
    }, [])

    const [productType, setProductType] = useState<Array<object>>([])

    async function getProductType() {
        fetch(appConfig.apiServer + '?api=productType&id=' + id, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.text())
            .then((result) => {
                const productTypes = JSON.parse(result)
                setProductType(productTypes.data)
            })
            .catch((error) => console.log('error', error))
    }

    console.log(productType)

    return (
        <AppProvider>
            <DashProvider>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">Tipo de produto</Typography>
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
                </Box>
            </DashProvider>
        </AppProvider>
    );
}
