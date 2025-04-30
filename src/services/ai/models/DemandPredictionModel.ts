import * as tf from '@tensorflow/tfjs';
import { BaseModel } from '../core/BaseModel';
import type { InventoryPrediction } from '../../../types/analytics';

export class DemandPredictionModel extends BaseModel {
    async predictDemand(
        historicalData: number[],
        seasonalFactors: number[]
    ): Promise<InventoryPrediction> {
        const inputTensor = tf.tensor2d([historicalData.concat(seasonalFactors)]);
        const prediction = this.model.predict(inputTensor) as tf.Tensor;
        const predictedValue = await prediction.data();

        return {
            predictedDemand: predictedValue[0],
            confidence: this.calculateConfidence(historicalData, predictedValue[0]),
            timestamp: new Date().toISOString()
        };
    }
}