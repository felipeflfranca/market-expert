import { GridColumnHeaderParams, GridRenderEditCellParams } from "@mui/x-data-grid";
import { ReactNode } from "react";

export type ColumnType = {
    accessor: string;
    Header: string;
    open?: boolean | undefined;
    disablePadding?: boolean;
    numeric?: boolean;
    width?: number;
    editable?: boolean;
    disableColumnMenu?: boolean;
    renderCell?: (params: GridRenderEditCellParams) => ReactNode;
    renderHeader?: (params: GridColumnHeaderParams) => any;
    filterable?: boolean;
    sortable?: boolean;
}
