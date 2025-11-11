import * as migration_20251028_185708 from './20251028_185708'

export const migrations = [
  {
    up: migration_20251028_185708.up,
    down: migration_20251028_185708.down,
    name: '20251028_185708',
  },
]
