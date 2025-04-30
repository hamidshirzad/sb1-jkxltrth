import * as tf from '@tensorflow/tfjs';

export abstract class BaseModel {
    protected model: tf.LayersModel;

    constructor() {
        this.initializeModel();
    }

    protected async initializeModel() {
        this.model = tf.sequential({
            layers: [
                tf.layers.dense({ inputShape: [10], units: 64, activation: 'relu' }),
                tf.layers.dense({ units: 32, activation: 'relu' }),
                tf.layers.dense({ units: 1, activation: 'linear' })
            ]
        });

        this.model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'meanSquaredError'
        });
    }

    protected calculateConfidence(historicalData: number[], prediction: number): number {
        const mean = historicalData.reduce((a, b) => a + b) / historicalData.length;
        const variance = historicalData.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / historicalData.length;
        const stdDev = Math.sqrt(variance);
        
        return 1 - (Math.abs(prediction - mean) / (3 * stdDev));
    }
}