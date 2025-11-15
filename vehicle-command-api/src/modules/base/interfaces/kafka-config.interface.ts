export interface KafkaRetryConfig {
  initialRetryTime: number;
  retries: number;
}

export interface KafkaTopicsConfig {
  vehicleEvents: string;
}

export interface KafkaConfig {
  clientId: string;
  brokers: string[];
  connectionTimeout: number;
  requestTimeout: number;
  topics: KafkaTopicsConfig;
  retry: KafkaRetryConfig;
}

export interface KafkaModuleConfig {
  kafka: KafkaConfig;
}
