<script setup lang="ts">
export interface Props {
  is?: keyof HTMLElementTagNameMap;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  is: 'div',
});
</script>

<template>
  <component :is="is" :name="name">
    FlowOver
    <slot></slot>
  </component>
</template>
