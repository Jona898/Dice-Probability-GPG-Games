<template>
  <DiceSettings></DiceSettings>
  {{ diceSettings.dices }}
  <CalculateProbability></CalculateProbability>
</template>

<script setup lang="ts">
import DiceSettings from "./DiceSettings.vue";
import CalculateProbability from "./CalculateProbability.vue";
import { useDiceSettingsStore } from "@/stores/diceSettingsStore";

const diceSettings = useDiceSettingsStore()


</script>


<style scoped></style>
