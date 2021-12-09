// assets
import NoFoodIcon from '@mui/icons-material/NoFood';
import CategoryIcon from '@mui/icons-material/Category';

// constant
const icons = { NoFoodIcon, CategoryIcon };

// ==============================|| PRODUCTS MENU ITEMS ||============================== //

const products = {
    id: 'products',
    title: 'Cadastros',
    type: 'group',
    children: [
        {
            id: 'product',
            title: 'Produtos',
            type: 'item',
            url: '/list/products',
            icon: icons.NoFoodIcon,
            breadcrumbs: false
        },
        {
            id: 'product-type',
            title: 'Tipo de produto',
            type: 'item',
            url: '/list/product/types',
            icon: icons.CategoryIcon,
            breadcrumbs: false
        }
    ]
};

export default products;
