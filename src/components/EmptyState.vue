<script setup>
import Button from 'primevue/button'

defineProps({
  icon: {
    type: String,
    default: 'pi pi-search',
  },
  eyebrow: {
    type: String,
    default: 'Nothing here yet',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actionLabel: {
    type: String,
    default: '',
  },
})

defineEmits(['action'])
</script>

<template>
  <section class="empty-state">
    <div class="empty-state__icon"><i :class="icon"></i></div>
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <Button
      v-if="actionLabel"
      :label="actionLabel"
      @click="$emit('action')"
    />
  </section>
</template>
