export const CONFIG = {
  debug: false,
  world: { width: 2200, height: 2200, grid: 100 },
  player: {
    radius: 22, maxHp: 100, armor: 5, maxSpeed: 205, reverseSpeed: 105,
    acceleration: 410, friction: 2.4, rotationSpeed: 2.45, turretRotationSpeed: 4.8,
    damage: 34, fireRate: 0.48, projectileSpeed: 590, projectileLifetime: 2.2,
    ultimateDamage: 220, ultimateRadius: 115, ultimateSpeed: 820, ultimatePenetration: 99
  },
  enemy: { radius: 21, hp: 72, armor: 2, speed: 86, damage: 12, fireRate: 1.65, projectileSpeed: 300 },
  waves: [
    { count: 4, hp: 1, damage: 1, speed: 1 },
    { count: 7, hp: 1.25, damage: 1.15, speed: 1.05 },
    { count: 1, hp: 6.5, damage: 1.65, speed: 0.75, boss: true, escorts: 5 }
  ],
  ultimate: { killsRequired: 10 },
  graphics: { maxParticles: 260, maxProjectiles: 140 },
  difficulty: { spawnEvery: 0.65 }
};
