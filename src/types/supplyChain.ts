export interface Supplier {
    address: string;
    name: string;
    verified: boolean;
    products: number[];
    rating: number;
}

export interface ShipmentStatus {
    shipmentId: string;
    status: 'pending' | 'in_transit' | 'delivered' | 'delayed';
    currentLocation: string;
    estimatedDelivery: Date;
    actualDelivery?: Date;
}