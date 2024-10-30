import React, { useState } from 'react';
import { useProductStore } from '../store/product.js';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const ProductCard = ({ product }) => {
    const { deleteProduct, updateProduct } = useProductStore();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        image: product.image,
    });

    const handleDeleteProduct = async (pid) => {
        try {
            const { success, message } = await deleteProduct(pid);
            if (!success) {
                toast.error(`Error deleting product: ${message}`);
            } else {
                toast.success("Product deleted successfully");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the product.");
            console.error("Error in deleteProduct:", error);
        }
    };

    const handleUpdateProduct = async () => {
        const { success, message } = await updateProduct(product._id, updatedProduct);
        if (!success) {
            toast.error(`Error updating product: ${message}`);
        } else {
            toast.success("Product updated successfully");
            setIsPopupOpen(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const openPopup = () => {
        setUpdatedProduct({
            name: product.name,
            price: product.price,
            image: product.image,
        });
        setIsPopupOpen(true);
    };

    return (
        <div className="bg-black text-white p-4 rounded-lg shadow-md space-y-2 w-full md:w-1/3 lg:w-1/4 m-4 flex flex-col">
            <img src={product.image} alt={`${product.name}`} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-lg font-semibold">Product Name: <span className="text-green-500">{product.name}</span></h3>
            <h4 className="text-md font-medium">Price: <span className="text-green-400">Rs.{product.price}</span></h4>

            <div className="flex justify-between pt-4">
                <button 
                    onClick={() => handleDeleteProduct(product._id)} 
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                    Delete
                </button>
                <button 
                    onClick={openPopup} 
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                    Update
                </button>
            </div>

            {/* Popup content displayed conditionally */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-slate-950 text-white p-8 rounded-md shadow-lg w-80 mx-auto">
                        <h3 className="text-xl font-bold text-green-500 mb-4">Update Product Details</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdateProduct(); }} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-white">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={updatedProduct.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:border-green-500 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-semibold text-white">Price</label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={updatedProduct.price}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:border-green-500 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-semibold text-white">Image URL</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={updatedProduct.image}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:border-green-500 focus:ring-green-500"
                                />
                            </div>
                            <div className="flex justify-between pt-4">
                                <button 
                                    type="submit" 
                                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
                                >
                                    Update Product
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setIsPopupOpen(false)} 
                                    className="bg-red-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export const ProductList = ({ products }) => {
    return (
        <div className="min-h-screen bg-slate-900 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};
