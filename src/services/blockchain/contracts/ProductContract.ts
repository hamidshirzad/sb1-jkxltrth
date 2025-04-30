import { BaseContract } from '../core/BaseContract';
import type { Product } from '../../../types/inventory';

export class ProductContract extends BaseContract {
    async addProduct(product: Product) {
        const tx = await this.contract.addProduct(
            product.id,
            product.name,
            product.quantity,
            product.price,
            product.supplier
        );
        return await tx.wait();
    }

    async deactivateProduct(productId: number) {
        const tx = await this.contract.deactivateProduct(productId);
        return await tx.wait();
    }
}