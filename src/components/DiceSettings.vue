<template>
    <div>
        <fieldset>
            <legend>Hero Dice</legend>
            <div>
                <label for="heroDiceKind">Type of Hero Dice </label>
                <select name="heroDiceKind" id="heroDiceKind" v-model="diceSettings.heroDiceKind">
                    <option v-for="diceName in Object.keys(diceSettings.dices)" :key="diceName" :value="diceName">
                        {{ diceName }}
                    </option>
                </select>
            </div>

            <fieldset>
                <legend>Select Advantage / Disadvantage:</legend>

                <div>
                    <input type="radio" id="advantage" name="drone" value="ADVANTAGE"
                        v-model="diceSettings.dis_advantageRoll" />
                    <label for="advantage"> Advantage</label>
                </div>

                <div>
                    <input type="radio" id="normal" name="drone" value="NORMAL"
                        v-model="diceSettings.dis_advantageRoll" />
                    <label for="normal"> Normal</label>
                </div>

                <div>
                    <input type="radio" id="disadvantage" name="drone" value="DISADVANTAGE"
                        v-model="diceSettings.dis_advantageRoll" />
                    <label for="disadvantage"> Disadvantage</label>
                </div>
            </fieldset>
        </fieldset>

        <fieldset>
            <legend>Normal Dice</legend>
            <div>
                <label for="normalDiceKind">Type of Normal Dice </label>
                <select name="normalDiceKind" id="normalDiceKind" v-model="diceSettings.normalDiceKind">
                    <option v-for="diceName in Object.keys(diceSettings.dices)" :key="diceName" :value="diceName">
                        {{ diceName }}
                    </option>
                </select>
            </div>

            <div>
                <label for="NormalDiceCount">Number Normal Dice </label>
                <input type="range" name="normalDiceCountRange" id="normalDiceCountRange" min="0" max="6"
                    v-model="diceSettings.normalDiceCount">
                <input type="number" name="NormalDiceCount" id="NormalDiceCount" v-model="diceSettings.normalDiceCount">
            </div>
        </fieldset>

        <fieldset>
            <legend>Target Value</legend>
            <div>
                <label for="selectedTargetValue">Target Number to Highlight </label>
                <input type="range" name="selectedTargetValueRange" id="selectedTargetValueRange" min="0" max="30"
                    v-model="diceSettings.selectedTargetValue">
                <input type="number" name="selectedTargetValue" id="selectedTargetValue"
                    v-model="diceSettings.selectedTargetValue">
            </div>
        </fieldset>
    </div>
</template>

<script setup lang="ts">

import { useDiceSettingsStore } from "@/stores/diceSettingsStore";

const diceSettings = useDiceSettingsStore()

</script>


<style scoped></style>