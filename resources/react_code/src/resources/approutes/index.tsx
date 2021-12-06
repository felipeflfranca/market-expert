import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from "../views/Dashboard";
import Products from "../views/Products";
import ProductTypes from "../views/ProductTypes";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/product-types" element={<ProductTypes/>}/>
            </Routes>
        </BrowserRouter>
    );
}