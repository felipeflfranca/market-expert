import {Link, List, ListItem, ListItemIcon, ListItemText, Tooltip} from '@mui/material'
import React, {useState} from 'react'
import {useNavigate} from "react-router"
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Menu() {
    const history = useNavigate();

    const [anchorElPopover, setAnchorEl] = useState<boolean | null>(null)

    const onLinkNavigation = (link = '/') => {
        history(link)
    }

    const handlePopoverOpen = (event: any) => {
        setAnchorEl(event.currentTarget)
    };

    const handlePopoverClose = () => {
        setAnchorEl(null)
    };

    const open = Boolean(anchorElPopover);

    return (
        <>
            <List dense={true}>
                <ListItem
                    button
                    key={'menu-dashboard'}
                    component={Link}
                    onClick={() => {
                        onLinkNavigation('/dashboard')
                    }}
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}>
                    <ListItemIcon>
                        <Tooltip title="Ponto de venda" placement="right">
                            <PointOfSaleIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Ponto de venda"/>
                </ListItem>

                <ListItem
                    button
                    key={'menu-products'}
                    component={Link}
                    onClick={() => {
                        onLinkNavigation('/products')
                    }}
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}>
                    <ListItemIcon>
                        <Tooltip title="Produtos" placement="right">
                            <KeyboardArrowRightIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Produtos"/>
                </ListItem>

                <ListItem
                    button
                    key={'menu-product-types'}
                    component={Link}
                    onClick={() => {
                        onLinkNavigation('/product-types')
                    }}
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}>
                    <ListItemIcon>
                        <Tooltip title="Tipos de produto" placement="right">
                            <KeyboardArrowRightIcon/>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Tipos de produto"/>
                </ListItem>

            </List>
        </>
    );
}
