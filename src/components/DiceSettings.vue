<template>
    <div>
        <fieldset>
            <legend>Hero Dice</legend>
            <div>
                <label for="heroDiceKind">Type of Hero Dice</label>
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
                    <label for="advantage">advantage</label>
                </div>

                <div>
                    <input type="radio" id="normal" name="drone" value="NORMAL"
                        v-model="diceSettings.dis_advantageRoll" />
                    <label for="normal">normal</label>
                </div>

                <div>
                    <input type="radio" id="disadvantage" name="drone" value="DISADVANTAGE"
                        v-model="diceSettings.dis_advantageRoll" />
                    <label for="disadvantage">disadvantage</label>
                </div>
            </fieldset>
        </fieldset>

        <fieldset>
            <legend>Normal Dice</legend>
            <div>
                <label for="normalDiceKind">Type of Normal Dice</label>
                <select name="normalDiceKind" id="normalDiceKind" v-model="diceSettings.normalDiceKind">
                    <option v-for="diceName in Object.keys(diceSettings.dices)" :key="diceName" :value="diceName">
                        {{ diceName }}
                    </option>
                </select>
            </div>

            <div>
                <label for="D6Count">Number Normal Dice</label>
                <input type="range" name="D6CountRange" id="D6CountRange" min="0" max="6"
                    v-model="diceSettings.d6Count">
                <input type="number" name="D6Count" id="D6Count" v-model="diceSettings.d6Count">
            </div>
        </fieldset>

        <fieldset>
            <legend>Exact / At least Number</legend>
            To Implement
        </fieldset>
    </div>
</template>

<script setup lang="ts">

import { useDiceSettingsStore } from "@/stores/diceSettingsStore";

const diceSettings = useDiceSettingsStore()

</script>


<style scoped></style>