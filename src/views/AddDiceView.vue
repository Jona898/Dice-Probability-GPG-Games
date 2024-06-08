<template>
  <fieldset>
    <legend>Add Dice</legend>
    <div>
      <label for="name">Dice Name </label>
      <input type="text" name="name" id="name" v-model="newName">
    </div>

    <div>
      <label for="diceSides">Sides of the Dice </label>
      <ChipInputNumber id="diceSides" v-model="diceSides"></ChipInputNumber>
    </div>

    <div>
      <button type="submit" @click="addNewDice" @submit.prevent="addNewDice">Add new Dice</button>
      <p v-if="addingSuccessful">Dice was added Successfully</p>
    </div>

  </fieldset>


</template>

<script setup lang="ts">
import { useDiceSettingsStore } from "@/stores/diceSettingsStore";
import ChipInputNumber from "@/components/ChipInputNumber.vue";
import { ref } from "vue";
import { Dice } from "@/models/addedDice";

const diceSettings = useDiceSettingsStore()

const newName = ref<string>("")
const diceSides = ref<number[]>([])

const addingSuccessful = ref<boolean>(false)


const addNewDice = () => {
  if (newName.value.length > 0 && diceSettings.doesDiceNameExists(newName.value)) {
    alert("Dice with that name already exists")
    return
  }

  if (diceSides.value.length == 0) {
    alert("Dice has to have at least one site")
    return
  }

  diceSettings.dices[newName.value] = new Dice(diceSides.value)

  newName.value = ""
  diceSides.value = []

  addingSuccessful.value = true
  setTimeout(() => {
    addingSuccessful.value = false
  }, 3000);
}
</script>


<style scoped>
a {
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 5px;

}

.githubLogo {
  color: var(--color-text);
}

button {
  margin: 10px;
}
</style>
