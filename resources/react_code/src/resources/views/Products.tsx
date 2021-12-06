import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import {AppProvider} from "../contexts/AppContext";
import {DashProvider} from "../contexts/DashContext";

export default function Products() {
    return (
        <AppProvider>
            <DashProvider>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">Produtos</Typography>
                </Breadcrumbs>
            </DashProvider>
        </AppProvider>
    );
}
