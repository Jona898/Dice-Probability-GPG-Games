<template>
    <div class="chip">
        <slot>default slot</slot>
        <CloseCircle v-if="closable" class="closeCircle" @click="emit('close')"></CloseCircle>
    </div>
</template>

<script setup lang="ts">
import CloseCircle from "@/components/icons/close-circle.vue";

defineProps<{ closable: boolean }>()

const emit = defineEmits<{
    close: []
}>()


</script>

<style scoped>
.chip {
    display: inline-block;
    padding: 3px 10px;
    margin: 5px;
    border-radius: 20px;
    background-color: #88888880;
}

.closeCircle {
    color: var(--color-text);
    height: 1rem;
    vertical-align: middle;
    cursor: pointer;
    margin-left: 4px;
}
</style>