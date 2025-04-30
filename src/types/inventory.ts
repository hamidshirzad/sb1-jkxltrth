export interface InventoryRecord {
    productId: number;
    quantity: number;
    timestamp: string;
    transactionHash: string;
    supplier: string;
}

export interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    supplier: string;
    lastRestocked: Date;
    active: boolean;
}

export interface InventoryUpdate {
    productId: number;
    newQuantity: number;
    timestamp?: string;
}