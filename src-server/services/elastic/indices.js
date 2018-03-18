export const summonerIndex = {
  mappings: {
    profiles: {
      properties: {
        accountId: { type: 'integer' },
        id: { type: 'integer' },
        name: { type: 'text' },
        profileUrl: { type: 'text' },
        revisionDate: { type: 'date', format: 'epoch_millis' },
        summonerLevel: { type: 'integer' },
        validUntil: {
          type: 'date',
          format: 'epoch_millis',
        },
      },
    },
  },
  settings: {
    index: {
      'mapping.total_fields.limit': 1000,
      number_of_shards: 3,
      number_of_replicas: 2,
    },
  },
};

export const staticIndex = {
  mappings: {
    'profile-icons': {
      properties: {
        imgData: { type: 'text' },
        validUntil: {
          type: 'date',
          format: 'epoch_millis',
        },
        version: { type: 'text' },
      },
    },
  },
  settings: {
    index: {
      'mapping.total_fields.limit': 1000,
      number_of_shards: 3,
      number_of_replicas: 2,
    },
  },
};
