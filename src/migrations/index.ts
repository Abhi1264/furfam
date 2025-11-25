import * as migration_20251125_165220_add_breeds_collection from './20251125_165220_add_breeds_collection';

export const migrations = [
  {
    up: migration_20251125_165220_add_breeds_collection.up,
    down: migration_20251125_165220_add_breeds_collection.down,
    name: '20251125_165220_add_breeds_collection'
  },
];
