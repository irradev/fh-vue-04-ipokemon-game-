import { mount } from '@vue/test-utils';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';

const options = [
  { id: 1, name: 'Pikachu' },
  { id: 2, name: 'Charmander' },
  { id: 3, name: 'Squirtle' },
];

describe('<PokemonOptions />', () => {
  test('should render buttons with correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: false,
        winnerPokemonId: 1,
      },
    });

    const buttons = wrapper.findAll('button');

    expect(buttons.length).toBe(options.length);

    buttons.forEach((button, index) => {
      expect(button.exists()).toBeTruthy();
      expect(button.text()).toBe(options[index].name);
      expect(button.attributes('class')).toBe(
        'capitalize disabled:shadow-none disabled:bg-gray-100 disabled:text-gray-400',
      );
    });
  });

  test('should emit "selectedOption" event when a button is clicked', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: false,
        winnerPokemonId: 1,
      },
    });

    const buttons = wrapper.findAll('button');

    await buttons[0].trigger('click');

    expect(wrapper.emitted().selectedOption).toBeTruthy();
    expect(wrapper.emitted().selectedOption[0]).toEqual([options[0].id]);
  });

  test('should disable buttons when blockSelection is true', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: true,
        winnerPokemonId: 1,
      },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach((button) => {
      const attributes = Object.keys(button.attributes());

      expect(attributes.includes('disabled')).toBeTruthy();

      // no funciona porque disables es igual a un string vacío
      // expect(button.attributes('disabled')).toBeTruthy();
    });
  });

  test('should apply styling to correct and incorrect answers', () => {
    const correctAnswer = 1;

    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: true,
        winnerPokemonId: correctAnswer,
      },
    });

    const buttons = wrapper.findAll('button');

    buttons.forEach((button, index) => {
      if (options[index].id === correctAnswer) {
        expect(button.classes()).toContain('correct');
      } else {
        expect(button.classes()).toContain('incorrect');
      }
    });
  });
});
