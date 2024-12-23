import { mount } from '@vue/test-utils';
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';

describe('<PokemonPicture />', () => {
  test('should render the hidden image when showPokemon props is false', () => {
    const pokemonId = 1;
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
    const imageClasses = 'filter brightness-0 h-[200px]';

    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: false,
      },
    });

    const image = wrapper.find('img');

    expect(image.exists()).toBeTruthy();
    expect(image.attributes('src')).toBe(pokemonImageUrl);
    expect(image.attributes('class')).toBe(imageClasses);

    // Otra forma
    const attributes = image.attributes();
    expect(attributes).toEqual(
      expect.objectContaining({
        src: pokemonImageUrl,
        class: imageClasses,
      }),
    );
  });

  test('should render the pokemon image when showPokemon props is true', () => {
    const pokemonId = 1;
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
    const imageClasses = 'fade-in h-[200px]';

    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: true,
      },
    });

    const image = wrapper.find('img');

    expect(image.exists()).toBeTruthy();
    expect(image.attributes('src')).toBe(pokemonImageUrl);
    expect(image.attributes('class')).toBe(imageClasses);

    // Otra forma
    const attributes = image.attributes();
    expect(attributes).toEqual(
      expect.objectContaining({
        src: pokemonImageUrl,
        class: imageClasses,
      }),
    );
  });
});
