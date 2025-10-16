<!-- pages/resources/[topic].vue -->
<script setup lang="ts">
const route = useRoute()
const topicSlug = route.params.topic as string

// A helper to convert a slug like 'ai-ml' to 'AI & Machine Learning'
const formatTopic = (slug: string) => {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace('Ai', 'AI')
    .replace('Ml', 'ML')
}

const topicName = computed(() => formatTopic(topicSlug))
const { data: resources } = await useAsyncData(`resources-${topicSlug}`, () =>
  queryCollection('resources')
    .where('topic', '=', topicName.value)
    .order('publishedAt', 'DESC')
    .all()
)
</script>

<template>
  <UContainer class="py-12">
    <!-- Header -->
    <div class="max-w-2xl mx-auto mb-12 text-center">
      <h1 class="text-4xl font-bold">{{ topicName }} Resources</h1>
      <p class="mt-4 text-lg text-gray-500">
        A curated collection of tutorials, tools, and articles for {{ topicName }}.
      </p>
    </div>

    <!-- Resources Grid -->
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <UCard v-for="resource in resources" :key="resource.path">
        <template #header>
          <UBadge :label="resource.category" variant="subtle" />
        </template>
        <h3 class="text-lg font-bold truncate">{{ resource.title }}</h3>
        <p class="mt-1 text-sm text-gray-500 line-clamp-3">{{ resource.description }}</p>
        <template #footer>
          <UButton :to="resource.url" target="_blank" block>View Resource</UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>