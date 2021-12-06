import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import {AppProvider} from "../contexts/AppContext";
import {DashProvider} from "../contexts/DashContext";

export default function ProductTypes() {
    return (
        <AppProvider>
            <DashProvider>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">Tipos de produto</Typography>
                </Breadcrumbs>
            </DashProvider>
        </AppProvider>
    );
}
