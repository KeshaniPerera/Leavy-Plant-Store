import React, { useState } from 'react';
import { useProductStore } from '../store/product.js';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateProduct = () => {
    const { createProduct } = useProductStore();
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            console.log("All fields are required.");
            return;
        }

        try {
            const { success, message } = await createProduct(newProduct);
            if (success) {
                toast("Product created successfully");
            } else {
                toast("Error creating product");
            }
            setNewProduct({ name: '', price: '', image: '' });

        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <div className="min-h-screen bg-green-900 flex items-center justify-center p-1 ">
            <div className="w-full max-w-md bg-black rounded-lg shadow-xl p-8 -mt-36">
                <h1 className="text-3xl font-bold text-center text-green-500 mb-6">Create New Product</h1>
                <form onSubmit={handleAddProduct} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-white">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newProduct.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-3 bg-slate-800 text-white border border-slate-700 rounded-md focus:border-green-500 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-semibold text-white">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={newProduct.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-3 bg-slate-800 text-white border border-slate-700 rounded-md focus:border-green-500 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-white">Image URL</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={newProduct.image}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-3 bg-slate-800 text-white border border-slate-700 rounded-md focus:border-green-500 focus:ring-green-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
                    >
                        CREATE PRODUCT
                    </button>
                </form>
            </div>
        </div>
    );
};
