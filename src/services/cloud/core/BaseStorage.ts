import { 
    DynamoDBClient,
    PutItemCommand,
    QueryCommand,
    PutItemCommandInput,
    QueryCommandInput
} from '@aws-sdk/client-dynamodb';

export abstract class BaseStorage {
    protected client: DynamoDBClient;

    constructor(region: string) {
        this.client = new DynamoDBClient({ region });
    }

    protected createPutCommand(tableName: string, item: Record<string, any>) {
        return new PutItemCommand({
            TableName: tableName,
            Item: item
        });
    }

    protected createQueryCommand(
        tableName: string,
        keyConditionExpression: string,
        expressionAttributeNames: Record<string, string>,
        expressionAttributeValues: Record<string, any>
    ) {
        return new QueryCommand({
            TableName: tableName,
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues
        });
    }
}