import { 
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    QueryCommand
} from '@aws-sdk/client-dynamodb';
import type { InventoryRecord } from '../../types/inventory';

export class CloudStorage {
    private client: DynamoDBClient;

    constructor(region: string) {
        this.client = new DynamoDBClient({ region });
    }

    async storeInventoryRecord(record: InventoryRecord) {
        const command = new PutItemCommand({
            TableName: 'InventoryRecords',
            Item: {
                productId: { N: record.productId.toString() },
                timestamp: { S: new Date().toISOString() },
                quantity: { N: record.quantity.toString() },
                transactionHash: { S: record.transactionHash },
                supplier: { S: record.supplier }
            }
        });

        return await this.client.send(command);
    }

    async getInventoryHistory(productId: number, startDate: Date, endDate: Date) {
        const command = new QueryCommand({
            TableName: 'InventoryRecords',
            KeyConditionExpression: 
                'productId = :pid AND #ts BETWEEN :start AND :end',
            ExpressionAttributeNames: {
                '#ts': 'timestamp'
            },
            ExpressionAttributeValues: {
                ':pid': { N: productId.toString() },
                ':start': { S: startDate.toISOString() },
                ':end': { S: endDate.toISOString() }
            }
        });

        return await this.client.send(command);
    }
}