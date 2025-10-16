<!-- pages/about.vue -->
<script setup lang="ts">
useSeoMeta({
  title: 'About Grey Software | Open Products, Open Education',
  description: 'Learn about Grey Software\'s mission to democratize education through curating the world\'s best free and open source resources for developers.',
  ogTitle: 'About Grey Software',
  ogDescription: 'Open Products, Open Education'
})

// Fetch all resources for statistics
const { data: allResources } = await useAsyncData('about-resources', () =>
  queryCollection('resources').all()
)

const stats = computed(() => {
  if (!allResources.value) return null
  
  const resources = allResources.value
  
  return {
    totalResources: resources.length,
    freeResources: resources.filter(r => r.isFree).length,
    openSourceResources: resources.filter(r => r.isOpenSource).length,
    topics: new Set(resources.map(r => r.topic)).size,
    formats: {
      videos: resources.filter(r => r.format === 'video').length,
      articles: resources.filter(r => r.format === 'article').length,
      courses: resources.filter(r => r.format === 'course').length,
      tools: resources.filter(r => r.format === 'tool').length,
      books: resources.filter(r => r.format === 'book').length,
      documentation: resources.filter(r => r.format === 'documentation').length
    }
  }
})

const values = [
  {
    title: 'Free & Open Source First',
    description: 'We prioritize resources that are freely available and open source, ensuring accessibility for everyone.',
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Quality Over Quantity',
    description: 'Every resource is carefully vetted for quality, relevance, and educational value before being added.',
    icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Community Driven',
    description: 'Our curation is powered by developer contributions and feedback from the global tech community.',
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
  },
  {
    title: 'Transparency',
    description: 'Open about our curation process and criteria. All resources are clearly categorized and described.',
    icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
  }
]
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <UContainer class="py-12">
      <!-- Header -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-6">
          About Grey Software
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-4">
          Open Products, Open Education
        </p>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Our mission is to democratize education by curating the world's best free and open source resources,
          making quality learning accessible to developers everywhere.
        </p>
      </div>

      <!-- Stats -->
      <div v-if="stats" class="mb-16">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg text-center">
            <div class="text-3xl sm:text-4xl font-bold text-accent mb-2">
              {{ stats.totalResources }}+
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Curated Resources
            </div>
          </div>

          <div class="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg text-center">
            <div class="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {{ Math.round((stats.freeResources / stats.totalResources) * 100) }}%
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Free Resources
            </div>
          </div>

          <div class="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg text-center">
            <div class="text-3xl sm:text-4xl font-bold text-accent mb-2">
              {{ stats.openSourceResources }}+
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Open Source
            </div>
          </div>

          <div class="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg text-center">
            <div class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {{ stats.topics }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Topics Covered
            </div>
          </div>
        </div>
      </div>

      <!-- Our Values -->
      <div class="mb-16">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Our Core Values
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="value in values"
            :key="value.title"
            class="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg"
          >
            <div class="w-12 h-12 mb-4 flex items-center justify-center bg-accent/10 rounded-lg">
              <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" :d="value.icon" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ value.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Curation Process -->
      <div class="mb-16">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Our Curation Process
        </h2>
        <div class="max-w-3xl mx-auto space-y-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent text-white rounded-full font-semibold text-sm">
              1
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Community Submissions
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Developers from around the world submit resources via GitHub pull requests with detailed information.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent text-white rounded-full font-semibold text-sm">
              2
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Quality Review
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Each submission is reviewed for quality, accuracy, and educational value against our strict criteria.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent text-white rounded-full font-semibold text-sm">
              3
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Metadata Enrichment
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                We add comprehensive metadata including difficulty levels, time estimates, licenses, and learning path connections.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent text-white rounded-full font-semibold text-sm">
              4
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Continuous Updates
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Resources are regularly reviewed and updated to ensure they remain relevant and maintain high quality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="max-w-2xl mx-auto text-center p-8 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Join Our Mission
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Help us build the world's most comprehensive library of free and open source developer resources.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink
            to="/resources/contribute"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors"
          >
            Submit a Resource
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </NuxtLink>
          <a
            href="https://github.com/grey-software"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:border-accent transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </UContainer>
  </div>
</template>
