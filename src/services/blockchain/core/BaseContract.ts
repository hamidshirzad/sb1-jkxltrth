import { ethers } from 'ethers';
import type { Provider, Contract } from 'ethers';

export abstract class BaseContract {
    protected provider: Provider;
    protected contract: Contract;

    constructor(
        contractAddress: string,
        abi: any,
        providerUrl: string
    ) {
        this.provider = new ethers.JsonRpcProvider(providerUrl);
        this.contract = new ethers.Contract(
            contractAddress,
            abi,
            this.provider
        );
    }

    protected async getSigner() {
        return await this.provider.getSigner();
    }
}