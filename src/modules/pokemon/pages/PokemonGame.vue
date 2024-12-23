<template>
  <section
    v-if="isLoading || !randomWinnerPokemon"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este Pokémon?</h1>
    <div class="flex items-center gap-4 mb-4">
      <h3 class="capitalize">{{ gameStatus }}</h3>
      <button
        v-show="gameStatus !== GameStatus.Playing"
        class="btn-new-game"
        @click="getNextRound()"
      >
        ¿Nuevo juego?
      </button>
    </div>

    <PokemonPicture
      :pokemon-id="randomWinnerPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <PokemonOptions
      :pokemon-options="pokemonsOptions"
      :block-selection="gameStatus !== GameStatus.Playing"
      :winner-pokemon-id="randomWinnerPokemon.id"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { isLoading, gameStatus, pokemonsOptions, randomWinnerPokemon, checkAnswer, getNextRound } =
  usePokemonGame();
</script>

<style scoped>
.btn-new-game {
  @apply text-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all bg-green-600 hover:bg-green-500 transition-colors;
}
</style>
