<template>
    <p>
        {{ diceSettings.getHeroDice }}
        {{ diceSettings.getNormalDice }}
    </p>
    <p> {{ totalPossibilities }} </p>
    <p> {{ getPossibleRangeValues }} </p>
    <table>
        <tr>
            <th>#</th>
            <th>Count</th>
            <th>%</th>
            <th class="tableBar">Bar</th>
        </tr>
        <tr v-for="targetValue of getPossibleRangeValues" :key="targetValue">
            <td>{{ targetValue }}</td>
            <td>{{ calculatePercentagePerNumber(targetValue) }}</td>
            <td>{{ calculatePercentagePerNumber(targetValue).value / totalPossibilities * 100 }}</td>
            <!-- <td>{{ Number(calculatePercentagePerNumber(targetValue).value /
                totalPossibilities).toLocaleString(undefined, { style: 'percent', minimumFractionDigits:2}) }}</td> -->
            <td>
                <div class="diceBar"
                    :style="{ width: calculatePercentagePerNumber(targetValue).value / totalPossibilities * 2000 + 'px' }">
                </div>
            </td>
        </tr>
    </table>
</template>


<script setup lang="ts">
import { computed } from "vue";
import { useDiceSettingsStore } from "@/stores/diceSettingsStore";
import { range } from "@/models/addedDice";

const diceSettings = useDiceSettingsStore()

const totalPossibilities = computed(() => {
    return diceSettings.getHeroDice.sides.length
        * Math.pow(diceSettings.getNormalDice.sides.length, diceSettings.d6Count)
})

const getPossibleRangeValues = computed<number[]>(() => {
    console.log({
        d6Count: diceSettings.d6Count,
        getMinHeroDice: diceSettings.getMinHeroDice,
        getMaxHeroDice: diceSettings.getMaxHeroDice,
        getMinNormalDice: diceSettings.getMinNormalDice,
        getMaxNormalDice: diceSettings.getMaxNormalDice,
    })

    const minimum = diceSettings.getMinHeroDice + (diceSettings.d6Count * diceSettings.getMinNormalDice)
    const maximum = diceSettings.getMaxHeroDice + (diceSettings.d6Count * diceSettings.getMaxNormalDice)

    console.log({
        minimum,
        maximum,
    })

    return range(maximum + 1 - minimum, minimum)
})

const getPossibilitiesReachValueNormalDice = computed(() => (target: number, diceCount: number) => {
    let possibilities = 0;

    if (diceCount === diceSettings.d6Count) {
        console.log(`Calculating ${target} for ${diceCount}`)
    }

    if (diceCount > 1) {
        for (let roll of diceSettings.getNormalDiceSides.values()) {
            if ((diceCount - 1) * diceSettings.getMinNormalDice <= (target - roll)
                && (target - roll) <= (diceCount - 1) * diceSettings.getMaxNormalDice
            ) {
                possibilities += getPossibilitiesReachValueNormalDice.value(target - roll, diceCount - 1)
            }
        }
    } else { // diceCount == 1
        if (diceSettings.getNormalDiceSides.includes(target)) {
            possibilities += 1
        }
    }

    return possibilities
})

const calculatePercentagePerNumber = (score: number) => computed<number>(() => {
    let possibilities = 0;

    // ToDo add (dis)advantage
    for (let heroValue of diceSettings.getHeroDice.sides) {
        if (diceSettings.d6Count > 0) {
            possibilities += getPossibilitiesReachValueNormalDice.value(score - heroValue, diceSettings.d6Count)
        } else if (heroValue == score) {
            possibilities += 1
        }
    }

    return possibilities
})
</script>

<style scoped>
th {
    background-color: #04AA6D;
    color: white;
}

th,
td {
    border-bottom: 1px solid #ddd;
}



tr:nth-child(even) {
    background-color: #4c4c4c;
}

tr:hover {
    background-color: coral;
}

.tableBar {
    min-width: 400px;
}

.diceBar {
    height: 0.75rem;
    background-color: #888888;
}
</style>