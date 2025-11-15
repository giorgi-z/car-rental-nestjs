export const KAFKA_ACTIONS = {
  VEHICLE_CREATED: 'create',
  VEHICLE_UPDATED: 'update',
  VEHICLE_DELETED: 'delete', 
} as const;

export type KafkaTopicType = (typeof KAFKA_ACTIONS)[keyof typeof KAFKA_ACTIONS];
