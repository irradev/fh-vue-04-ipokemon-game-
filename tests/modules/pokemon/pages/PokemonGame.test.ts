import { mount } from '@vue/test-utils';

import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import type { Mock } from 'vitest';
import { GameStatus } from '@/modules/pokemon/interfaces';
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const pokemonsOptions = [
  { id: 1, name: 'pikachu' },
  { id: 2, name: 'charmander' },
  { id: 3, name: 'squirtle' },
  { id: 4, name: 'bulbasaur' },
];

describe('<PokemonGame />', () => {
  test('should initialize with default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      isLoading: true,
      gameStatus: GameStatus.Playing,
      pokemonsOptions: [],
      randomWinnerPokemon: undefined,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    expect(wrapper.get('h1').text()).toBe('Espere por favor');
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);
    expect(wrapper.get('h3').text()).toBe('Cargando Pokémons');
    expect(wrapper.get('h3').classes()).toEqual(['animate-pulse']);
  });

  test('should render <PokemonPicture /> and <PokemonOptions />', () => {
    (usePokemonGame as Mock).mockReturnValue({
      isLoading: false,
      gameStatus: GameStatus.Playing,
      pokemonsOptions: pokemonsOptions,
      randomWinnerPokemon: pokemonsOptions[0],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);

    expect(wrapper.findComponent(PokemonPicture).exists()).toBeTruthy();
    expect(wrapper.findComponent(PokemonOptions).exists()).toBeTruthy();
  });

  test('should render button for a new game', async () => {
    (usePokemonGame as Mock).mockReturnValue({
      isLoading: false,
      gameStatus: GameStatus.Won,
      pokemonsOptions: pokemonsOptions,
      randomWinnerPokemon: pokemonsOptions[0],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const buttonNewGame = wrapper.find('.btn-new-game');

    expect(buttonNewGame.exists()).toBeTruthy();
    expect(buttonNewGame.attributes('style')).toBeUndefined();
  });

  test('should call the getNextRound function when the button new game is clicked', async () => {
    const spyNextRoundFn = vi.fn();

    (usePokemonGame as Mock).mockReturnValue({
      isLoading: false,
      gameStatus: GameStatus.Won,
      pokemonsOptions: pokemonsOptions,
      randomWinnerPokemon: pokemonsOptions[0],
      checkAnswer: vi.fn(),
      getNextRound: spyNextRoundFn,
    });

    const wrapper = mount(PokemonGame);
    const buttonNewGame = wrapper.find('.btn-new-game');

    await buttonNewGame.trigger('click');

    expect(spyNextRoundFn).toHaveBeenCalled();

    // Otra forma
    expect(usePokemonGame().getNextRound).toHaveBeenCalled();
  });
});
