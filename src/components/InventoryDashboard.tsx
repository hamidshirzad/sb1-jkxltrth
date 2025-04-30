import React from 'react';
import { useInventory } from '../hooks/useInventory';
import { InventoryList } from './InventoryList';
import { ProductForm } from './ProductForm';

export function InventoryDashboard() {
  const { products, loading, error } = useInventory();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <ProductForm />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Current Inventory</h2>
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          </div>
        ) : (
          <InventoryList products={products} />
        )}
      </div>
    </div>
  );
}