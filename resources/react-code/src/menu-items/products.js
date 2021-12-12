// assets
import NoFoodIcon from '@mui/icons-material/NoFood';
import CategoryIcon from '@mui/icons-material/Category';
import CalculateIcon from '@mui/icons-material/Calculate';

// constant
const icons = { NoFoodIcon, CategoryIcon, CalculateIcon };

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
        },
        {
            id: 'taxes',
            title: 'Taxas de imposto',
            type: 'item',
            url: '/list/taxes',
            icon: icons.CalculateIcon,
            breadcrumbs: false
        }
    ]
};

export default products;
