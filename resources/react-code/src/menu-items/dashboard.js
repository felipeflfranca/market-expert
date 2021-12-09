// Material UI
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// constant
const icons = { ShoppingCartIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Ponto de venda',
            type: 'item',
            url: '/',
            icon: icons.ShoppingCartIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
