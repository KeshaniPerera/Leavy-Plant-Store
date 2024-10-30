import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }), 
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill all fields" };
        }
    
        const res = await fetch('/api/products', { // Add /api to the URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
    
        if (!res.ok) {
            const errorData = await res.text(); // Get the error message
            throw new Error(errorData); // Throw an error with the message
        }
    
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
    },
    fetchProducts: async () => {
        const res = await fetch('/api/products'); // Add /api to the URL
        const data = await res.json();
        set({ products: data.data });
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, { // Add /api to the URL
            method: 'DELETE',
        });
        const data = await res.json();
        if(!data.success) {
            return { success: false, message: data.message };
        }
        //to update ui immediately wihout need for refresh
        set((state) => ({ products: state.products.filter((p) => p._id !== pid) }));
        return { success: true, message: data.message };
  
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, { // Add /api to the URL
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message }; 
        }
        //to update ui immediately wihout need for refresh
        set((state) => ({
            products: state.products.map((p) => (p._id === pid ? data.data : p)),
        }));
        return { success: true, message: data.message };
    },
    
}));
 