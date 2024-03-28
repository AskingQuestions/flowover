<script setup>
import { FlowSlot } from '@flowover/vue';
</script>

<template>
  <main
    style="
      padding-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
  >
    <img src="/logo.svg" alt="logo" style="max-width: 48px" />

    <FlowSlot> </FlowSlot>
  </main>
</template>

<style>
html,
body {
  background-color: #131313;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
</style>
