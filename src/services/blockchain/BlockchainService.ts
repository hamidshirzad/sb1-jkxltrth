import { ethers } from 'ethers';
import type { InventoryManagement } from '../../types/contracts';
import { INVENTORY_CONTRACT_ABI } from './constants';

export class BlockchainService {
    private provider: ethers.Provider;
    private contract: InventoryManagement;

    constructor(
        private readonly contractAddress: string,
        providerUrl: string
    ) {
        this.provider = new ethers.JsonRpcProvider(providerUrl);
        this.contract = new ethers.Contract(
            contractAddress,
            INVENTORY_CONTRACT_ABI,
            this.provider
        ) as unknown as InventoryManagement;
    }

    async getProduct(id: number) {
        return await this.contract.products(id);
    }

    async updateInventory(id: number, newQuantity: number) {
        const signer = await this.provider.getSigner();
        const tx = await this.contract.connect(signer).updateInventory(id, newQuantity);
        return await tx.wait();
    }

    async addProduct(
        id: number,
        name: string,
        quantity: number,
        price: number,
        supplier: string
    ) {
        const signer = await this.provider.getSigner();
        const tx = await this.contract
            .connect(signer)
            .addProduct(id, name, quantity, price, supplier);
        return await tx.wait();
    }
}