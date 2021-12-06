import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import {AppProvider} from "../contexts/AppContext";
import {DashProvider} from "../contexts/DashContext";

export default function Dashboard() {
    return (
        <AppProvider>
            <DashProvider>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">Dashboard</Typography>
                </Breadcrumbs>
            </DashProvider>
        </AppProvider>
    );
}
