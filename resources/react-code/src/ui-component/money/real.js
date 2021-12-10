import { forwardRef } from 'react';

const Real = ({ children }) => <>{children ? parseFloat(children).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}</>;
export default Real;
