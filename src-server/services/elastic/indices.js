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
    }
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
    // this has to be restructured - use type property
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

export const matchesIndex = {
  mappings: {
    matches: {
      properties: {
        accountId: { type: 'integer' },
        matches: {
          type: 'nested',
          properties: {
            lane: { type: 'text' },
            gameId: { type: 'long' },
            champion: { type: 'integer' },
            platformId: { type: 'text' },
            timestamp: { type: 'date', format: 'epoch_millis' },
            queue: { type: 'integer' },
            role: { type: 'text' },
            season: { type: 'integer' },
          },
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
