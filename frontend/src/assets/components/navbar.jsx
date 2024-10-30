import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="shadow-lg">
      
            <div className="bg-black p-6 flex items-center justify-between shadow-md lg:px-52">
           
                <Link to="/">
                    <img 
                        src="leavy_logo.png" 
                        className="w-20 shadow-md hover:shadow-lg transition-shadow duration-300" 
                        alt="Leavy Logo"
                    />
                </Link>
                
                <div className="lg:hidden text-white text-2xl cursor-pointer" onClick={toggleMenu}>
                    <FaBars />
                </div>

                {/* Text with gradient */}
                <p className="bg-gradient-to-r from-green-600 to-green-400  bg-clip-text text-transparent font-title text-5xl">
                    Heal with a Plant
                </p>

                <div className={`flex-col font-serif lg:flex lg:flex-row border border-green-500 lg:space-x-6 items-center text-white w-auto bg-slate-800 p-5 rounded-md font-semibold ${isOpen ? 'flex' : 'hidden'} lg:block`}>
                    <Link 
                        to="/creatProduct" 
                        className="hover:text-green-400 transition-colors duration-300 mt-2 lg:mt-0 text-green-500"
                    >
                        Create Product
                    </Link>
                </div>
            </div>
        </div>
    );
};
