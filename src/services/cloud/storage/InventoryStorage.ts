import { BaseStorage } from '../core/BaseStorage';
import type { InventoryRecord } from '../../../types/inventory';

export class InventoryStorage extends BaseStorage {
    async storeInventoryRecord(record: InventoryRecord) {
        const command = this.createPutCommand('InventoryRecords', {
            productId: { N: record.productId.toString() },
            timestamp: { S: new Date().toISOString() },
            quantity: { N: record.quantity.toString() },
            transactionHash: { S: record.transactionHash },
            supplier: { S: record.supplier }
        });

        return await this.client.send(command);
    }

    async getInventoryHistory(productId: number, startDate: Date, endDate: Date) {
        const command = this.createQueryCommand(
            'InventoryRecords',
            'productId = :pid AND #ts BETWEEN :start AND :end',
            {
                '#ts': 'timestamp'
            },
            {
                ':pid': { N: productId.toString() },
                ':start': { S: startDate.toISOString() },
                ':end': { S: endDate.toISOString() }
            }
        );

        return await this.client.send(command);
    }
}