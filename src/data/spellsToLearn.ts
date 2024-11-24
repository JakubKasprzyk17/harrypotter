import { spellType } from '@src/types/spellType';

export interface SpellToLearn {
  id: string;
  name: string;
  description: string;
  type: spellType;
  image: string;
  pattern: SpellPattern[];
}

export interface SpellPattern {
  x: number;
  y: number;
}

export const spellsToLearn: SpellToLearn[] = [
  {
    id: '1',
    name: 'Levioso',
    description:
      'Levitates objects and enemies. Useful for solving puzzles and surprising enemies alike',
    type: spellType.Control,
    image: 'levioso',
    pattern: [
      { x: -50, y: 200 },
      { x: 125, y: 200 },
      { x: 125, y: 150 },
      { x: -25, y: 50 },
      { x: -50, y: -50 },
      { x: 0, y: -150 }
    ]
  },
  {
    id: '2',
    name: 'Transformation',
    description:
      'Transforms objects and enemies into alternate forms, whether puzzle solutions or harmless knickknacks',
    type: spellType.Control,
    image: 'transformation',
    pattern: [
      { x: 150, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 150 },
      { x: -100, y: 100 },
      { x: -150, y: 0 }
    ]
  },
  {
    id: '3',
    name: 'Glacius',
    description:
      'Freezes enemies, increasing the damage they take from follow-up attacks',
    type: spellType.Control,
    image: 'glacius',
    pattern: [
      { x: -150, y: 150 },
      { x: -100, y: 50 },
      { x: -25, y: 100 },
      { x: 25, y: -200 },
      { x: 150, y: 100 },
      { x: 100, y: 175 },
      { x: -150, y: 200 }
    ]
  },
  {
    id: '4',
    name: 'Arresto Momentum',
    description:
      'Slows both objects and enemies, giving you extra time to plan your next move',
    type: spellType.Control,
    image: 'arresto_momentum',
    pattern: [
      { x: -150, y: 150 },
      { x: -75, y: -200 },
      { x: 0, y: 150 },
      { x: 75, y: -200 },
      { x: 150, y: 150 }
    ]
  },
  {
    id: '5',
    name: 'Incendio',
    description:
      'Its range is short and requires you to be close to the target. This spell deals significant damage and lights certain objects on fire. Enemies hit with fire-based attacks will continue to take damage for a few seconds, during which time collisions will result in incendiary bursts.',
    type: spellType.Damage,
    image: 'incendio',
    pattern: [
      { x: -150, y: 150 },
      { x: -75, y: -50 },
      { x: 0, y: -200 },
      { x: 75, y: -50 },
      { x: 150, y: 150 },
      { x: -50, y: 125 }
    ]
  },
  {
    id: '6',
    name: 'Bombarda',
    description:
      'Deals heavy damage on impact, accompanied by an explosion that can destroy heavy obstacles and hit surrounding enemies.',
    type: spellType.Damage,
    image: 'bombarda',
    pattern: [
      { x: 100, y: -200 },
      { x: 25, y: -100 },
      { x: 150, y: 100 },
      { x: -125, y: 100 },
      { x: -25, y: 25 }
    ]
  },
  {
    id: '7',
    name: 'Expelliarmus',
    description:
      'Disarms wands and weapons from most enemies who wield them. Also deals damage to all enemies, even if they do not carry a weapon.',
    type: spellType.Damage,
    image: 'expelliarmus',
    pattern: [
      { x: -100, y: -200 },
      { x: 100, y: -200 },
      { x: 100, y: -25 },
      { x: 100, y: 150 }
    ]
  },
  {
    id: '8',
    name: 'Confringo',
    description:
      'A long-range bolt that deals damage on impact. Enemies hit with fire-based attacks will continue to take damage for a few seconds, during which time collisions will result in incendiary bursts.',
    type: spellType.Damage,
    image: 'confringo',
    pattern: [
      { x: -100, y: -200 },
      { x: 100, y: -200 },
      { x: 0, y: 0 },
      { x: -100, y: 200 },
      { x: 100, y: 200 }
    ]
  },
  {
    id: '9',
    name: 'Diffindo',
    description:
      'Slashes objects and enemies from afar dealing considerable damage',
    type: spellType.Damage,
    image: 'diffindo',
    pattern: [
      { x: -125, y: -100 },
      { x: 0, y: -200 },
      { x: 0, y: 0 },
      { x: 0, y: 200 },
      { x: 125, y: 100 }
    ]
  },
  {
    id: '10',
    name: 'Accio',
    description:
      'Summons a variety of objects and enemies to close range. Certain magical and heavy objects require sustained effort to pull close. When a summoned object reaches you, you will automatically cast Wingardium Leviosa to continue levitating and controlling it without the need for additional button inputs.',
    type: spellType.Force,
    image: 'accio',
    pattern: [
      { x: 150, y: 50 },
      { x: 100, y: -50 },
      { x: 0, y: -100 },
      { x: -100, y: -50 },
      { x: -150, y: 50 }
    ]
  },
  {
    id: '11',
    name: 'Depulso',
    description:
      'Repels many types of objects and enemies with considerable force. Although it deals no direct damage to foes, enemies and objects alike can be launched into each other with destructive results. Also useful for pushing and spinning objects for a variety of purposes.',
    type: spellType.Force,
    image: 'depulso',
    pattern: [
      { x: 150, y: -50 },
      { x: 100, y: 50 },
      { x: 0, y: 100 },
      { x: -100, y: 50 },
      { x: -150, y: -50 }
    ]
  },
  {
    id: '12',
    name: 'Descendo',
    description:
      'Deals no direct damage, but objects and enemies that are slammed to the ground will suffer considerable impact damage. Airborne enemies will take even greater damage upon hitting the ground.',
    type: spellType.Force,
    image: 'descendo',
    pattern: [
      { x: -75, y: 150 },
      { x: -75, y: 0 },
      { x: -75, y: -150 },
      { x: 0, y: -200 },
      { x: 75, y: -165 },
      { x: 100, y: -100 },
      { x: 50, y: -35 },
      { x: -25, y: 0 }
    ]
  },
  {
    id: '13',
    name: 'Flipendo',
    description:
      "Flips objects and enemies upwards and backwards. With its short cooldown, it is excellent for setting up and extending juggles. Its ability to flip objects instantly is useful for solving puzzles and exploiting certain enemies' weaknesses.",
    type: spellType.Force,
    image: 'flipendo',
    pattern: [
      { x: -125, y: 100 },
      { x: -50, y: 200 },
      { x: -15, y: 75 },
      { x: 20, y: -25 },
      { x: 50, y: -100 },
      { x: 100, y: 0 },
      { x: 125, y: -125 }
    ]
  },
  {
    id: '14',
    name: 'Imperio',
    description:
      'Temporarily forces enemies to fight as if they were your companion. While under your control, they take reduced damage from other enemies to prolong their allegiance to you. Also curses the victim – and cursed enemies take extra damage.',
    type: spellType.UnforgivableCurse,
    image: 'imperio',
    pattern: [
      { x: 125, y: 200 },
      { x: 125, y: 50 },
      { x: -125, y: 50 },
      { x: 0, y: -200 },
      { x: 0, y: -25 },
      { x: 0, y: 200 }
    ]
  },
  {
    id: '15',
    name: 'Avada Kedavra',
    description: 'Kills enemies instantly.',
    type: spellType.UnforgivableCurse,
    image: 'avada_kedavra',
    pattern: [
      { x: 0, y: -200 },
      { x: -100, y: 25 },
      { x: 100, y: -50 },
      { x: 0, y: 200 }
    ]
  },
  {
    id: '16',
    name: 'Crucio',
    description:
      'Damage most enemies to writhe in pain as they take damage over time. Also curses the victim – and cursed enemies take extra damage.',
    type: spellType.UnforgivableCurse,
    image: 'crucio',
    pattern: [
      { x: 125, y: -200 },
      { x: -125, y: -100 },
      { x: 125, y: 0 },
      { x: -125, y: 100 },
      { x: 100, y: 200 }
    ]
  }
];
