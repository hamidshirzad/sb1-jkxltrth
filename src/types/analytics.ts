export interface InventoryPrediction {
    predictedDemand: number;
    confidence: number;
    timestamp: string;
}

export interface AnalyticsConfig {
    modelType: 'lstm' | 'prophet' | 'arima';
    seasonalityPeriod: number;
    confidenceInterval: number;
    minimumHistoricalDataPoints: number;
}