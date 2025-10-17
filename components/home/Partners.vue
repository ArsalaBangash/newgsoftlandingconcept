<!-- components/home/Partners.vue -->
<script setup lang="ts">
const props = defineProps<{
  partners?: any[]
}>()

const partnersList = computed(() => props.partners || [])

// Map partner logos to correct icon names
const getPartnerIcon = (logo: string) => {
  const iconMap: Record<string, string> = {
    'freecodecamp': 'simple-icons:freecodecamp',
    'scrimba': 'simple-icons:scrimba'
  }
  return iconMap[logo] || `simple-icons:${logo}`
}
</script>

<template>
  <UContainer class="py-24">
    <div class="mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Featured Partners</h2>
      <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Trusted organizations that support our mission.
      </p>
    </div>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <UCard v-for="partner in partnersList" :key="partner.name">
        <template #header>
          <UIcon :name="getPartnerIcon(partner.logo)" class="w-12 h-12 text-gray-700 dark:text-gray-300" />
        </template>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ partner.name }}</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{{ partner.description }}</p>
        <template #footer>
          <UButton :to="partner.url" target="_blank" block variant="outline">
            Visit
          </UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>