<!-- components/home/Partners.vue -->
<script setup lang="ts">
const props = defineProps<{
  partners?: any[]
}>()

const partnersList = computed(() => props.partners || [])
</script>

<template>
  <UContainer class="py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold">Featured Partners</h2>
      <p class="mt-4 text-lg text-gray-500">
        Trusted organizations that support our mission.
      </p>
    </div>
    <div class="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
      <UCard v-for="partner in partnersList" :key="partner.name">
        <template #header>
          <UIcon :name="`i-simple-icons-${partner.logo}`" class="w-12 h-12" />
        </template>
        <h3 class="text-lg font-bold">{{ partner.name }}</h3>
        <p class="mt-2 text-sm text-gray-500">{{ partner.description }}</p>
        <template #footer>
          <UButton :to="partner.url" target="_blank" block variant="outline">
            Visit
          </UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>