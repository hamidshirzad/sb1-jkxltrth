import { ethers } from 'ethers';
import { BaseContract } from '../core/BaseContract';
import type { InventoryUpdate } from '../../../types/inventory';

export class InventoryContract extends BaseContract {
    async updateInventory(update: InventoryUpdate) {
        const tx = await this.contract.updateInventory(
            update.productId,
            update.newQuantity
        );
        return await tx.wait();
    }

    async getProduct(id: number) {
        return await this.contract.products(id);
    }
}