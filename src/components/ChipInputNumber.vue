<template>
    <ChipInputChip v-for=" value, index in modelValue" :key="value" :closable="true" @close="() => remove(index)">
        {{ value }}
    </ChipInputChip>
    <input type="number" v-bind="$attrs" v-model="newValue" @keyup.space="addNewValue" @keyup.enter="addNewValue"
        @submit.prevent="addNewValue">
</template>

<script setup lang="ts">
import ChipInputChip from "@/components/ChipInputChip.vue";
import { ref } from "vue";

const modelValue = defineModel<number[]>({ required: true })

const newValue = ref<number>(0)

const addNewValue = () => {
    modelValue.value.push(newValue.value)
    newValue.value = 0
}

const remove = (index: number) => {
    modelValue.value.splice(index, 1)
}


</script>

<style scoped></style>