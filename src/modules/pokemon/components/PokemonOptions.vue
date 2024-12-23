<template>
  <section class="mt-5 flex flex-col">
      <button
        v-for="pokemon in pokemonOptions"
        :key="pokemon.id"
        @click="$emit('selectedOption', pokemon.id)"
        :disabled="blockSelection"
        :class="[
          'capitalize disabled:shadow-none disabled:bg-gray-100 disabled:text-gray-400', {
            correct: pokemon.id === winnerPokemonId && blockSelection,
            incorrect: pokemon.id !== winnerPokemonId && blockSelection
          }
        ]"
      >
        {{ pokemon.name }}
      </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  pokemonOptions: Pokemon[];
  blockSelection: boolean;
  winnerPokemonId: number;
}

defineProps<Props>();

defineEmits<{
  selectedOption: [pokemonId: number];
}>();


</script>

<style scoped>
button {
  @apply bg-white text-black shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

.correct {
  @apply bg-blue-500 text-white hover:bg-blue-500 cursor-default;
}

.incorrect {
  @apply bg-red-400 opacity-70 text-black hover:bg-red-400 cursor-default;
}
</style>
