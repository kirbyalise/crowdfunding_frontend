// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';  // Make sure this import is present

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            
            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />  {/* Make sure Footer is added here */}
        </div>
    );
};

export default Layout;