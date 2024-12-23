import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import confetti from 'canvas-confetti';

import { withSetup } from '../../../utils/with-setup';
import { pokemonListFake } from '../../../mockData/fake-pokemons';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame.ts';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake,
});

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('usePokemonGame', () => {
  test('should initialize with the correct default values', async () => {
    const [results, app] = withSetup(usePokemonGame);

    expect(results.isLoading.value).toBe(true);
    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonsOptions.value).toEqual([]);
    expect(results.randomWinnerPokemon.value).toBeUndefined();

    await flushPromises();

    // console.log(results.pokemonsOptions.value);
    // expect(results.isLoading.value).toBe(false);
    expect(results.pokemonsOptions.value.length).toBe(4);
    expect(results.randomWinnerPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('should correctly handle getNextRound and change gameStatus', async () => {
    const [results, app] = withSetup(usePokemonGame);

    await flushPromises();

    results.gameStatus.value = GameStatus.Won;

    results.getNextRound();

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonsOptions.value.length).toBe(4);
  });

  test('should correctly handle getNextRound and return different pokemons', async () => {
    const [results, app] = withSetup(usePokemonGame);

    await flushPromises();
    const firstPokemons = [...results.pokemonsOptions.value];

    results.getNextRound();

    expect(results.pokemonsOptions.value.length).toBe(4);
    expect(results.pokemonsOptions.value).not.toEqual(firstPokemons);
  });

  test('should correctly handle a incorrect answer', async () => {
    const [results, app] = withSetup(usePokemonGame);

    const { gameStatus, checkAnswer } = results;

    await flushPromises();

    expect(gameStatus.value).toBe(GameStatus.Playing);
    checkAnswer(-1);
    expect(gameStatus.value).toBe(GameStatus.Lost);
  });

  test('should correctly handle a correct answer', async () => {
    const [results, app] = withSetup(usePokemonGame);

    const { gameStatus, randomWinnerPokemon, checkAnswer } = results;

    await flushPromises();

    expect(gameStatus.value).toBe(GameStatus.Playing);
    checkAnswer(randomWinnerPokemon.value.id);
    expect(confetti).toBeCalledWith({ particleCount: 300, spread: 150, origin: { y: 0.6 } });
    expect(gameStatus.value).toBe(GameStatus.Won);
  });
});
