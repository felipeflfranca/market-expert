// assets
import AssessmentIcon from '@mui/icons-material/Assessment';

// constant
const icons = { AssessmentIcon };

// ==============================|| PRODUCTS MENU ITEMS ||============================== //

const reports = {
    id: 'reports',
    title: 'Relatórios',
    type: 'group',
    children: [
        {
            id: 'sale-report',
            title: 'Vendas',
            type: 'item',
            url: '/report',
            icon: icons.AssessmentIcon,
            breadcrumbs: false
        }
    ]
};

export default reports;
