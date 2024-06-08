<template>
    <!-- <p>
        {{ diceSettings.getHeroDice }}
        {{ diceSettings.getNormalDice }}
    </p>
    <p> {{ diceSettings.totalPossibilities }} </p>
    <p> {{ diceSettings.getPossibleRangeValues }} </p> -->
    <table>
        <tr>
            <th>#</th>
            <!-- <th>Count</th> -->
            <th>%</th>
            <th class="tableBar">Bar</th>
            <th>#</th>
            <th>acc %</th>
            <th class="tableBar">accumulated</th>
        </tr>
        <tr v-for="[targetValue, combinationsValue] of diceSettings.combinationsTargetValue" :key="targetValue">
            <td>{{ targetValue }}</td>
            <!-- <td>{{ combinationsValue }}</td> -->
            <td>{{ Number(combinationsValue / diceSettings.totalPossibilities).toLocaleString(undefined, {
                style:
                    'percent', minimumFractionDigits: 2
            }) }}</td>
            <td>
                <div class="diceBar"
                    :style="{ width: combinationsValue / diceSettings.totalPossibilities * 400 * 6 + 'px' }">
                </div>
            </td>
            <td>{{ targetValue }}</td>
            <td>{{ Number((diceSettings.getCombinedDiceCombinationsAccumulatedOver.get(targetValue) || 0) /
                diceSettings.totalPossibilities).toLocaleString(undefined, {
                    style: 'percent', minimumFractionDigits: 2
                })
                }}</td>
            <td>
                <div class="diceBar"
                    :style="{ width: (diceSettings.getCombinedDiceCombinationsAccumulatedOver.get(targetValue) || 0) / diceSettings.totalPossibilities * 400 + 'px' }">
                </div>
            </td>
        </tr>
    </table>
</template>


<script setup lang="ts">
import { useDiceSettingsStore } from "@/stores/diceSettingsStore";

const diceSettings = useDiceSettingsStore()

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
    background-color: #88888860;
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