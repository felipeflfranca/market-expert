// eslint-disable-next-line react/prop-types
const Real = ({ children }) => <>{children ? parseFloat(children).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}</>;
export default Real;
