import type { Pokemon } from '@/modules/pokemon/interfaces';

describe('Pokemon Interface', () => {
  const pokemon: Pokemon = {
    id: 1,
    name: 'pikachu',
  };

  test('should have an id property of type number', () => {
    expect(pokemon.id).toEqual(expect.any(Number));
  });

  test('should have a name property of type string', () => {
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
