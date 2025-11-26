<!-- pages/stories.vue -->
<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: 'Success Stories - Real Developer Journeys | Grey Software',
  description: 'Real developers, real journeys, real results. See how others have used free resources to transform their careers.',
  ogTitle: 'Success Stories - Real Developer Journeys',
  ogDescription: 'Real developers, real journeys, real results. See how others have used free resources to transform their careers.',
})

// Fetch stories from content collection
const { data: stories } = await useAsyncData('stories', () =>
  queryContent('en/stories').find()
)

// Filter options
const backgrounds = [
  { value: 'all', label: 'All Stories' },
  { value: 'career-change', label: 'Career Changer' },
  { value: 'self-taught', label: 'Self-Taught' },
  { value: 'enterprise', label: 'Enterprise Background' },
  { value: 'open-source', label: 'Open Source' },
]

const selectedBackground = ref('all')

// Filtered stories based on selected background
const filteredStories = computed(() => {
  if (!stories.value) return []
  if (selectedBackground.value === 'all') return stories.value
  return stories.value.filter(story => 
    story.tags?.includes(selectedBackground.value)
  )
})

// Helper function to get color classes based on tags
const getStoryColorClasses = (tags: string[]) => {
  if (tags?.includes('career-change')) {
    return {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600',
      accent: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    }
  }
  if (tags?.includes('open-source')) {
    return {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600',
      accent: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    }
  }
  if (tags?.includes('enterprise')) {
    return {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600',
      accent: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    }
  }
  if (tags?.includes('privacy') || tags?.includes('security')) {
    return {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600',
      accent: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    }
  }
  return {
    bg: 'bg-gray-50 dark:bg-gray-900/20',
    border: 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600',
    accent: 'text-gray-600 dark:text-gray-400',
    badge: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
  }
}

// Get primary tag for display
const getPrimaryTag = (tags: string[]) => {
  if (!tags || tags.length === 0) return null
  const priorityTags = ['career-change', 'self-taught', 'enterprise', 'open-source', 'privacy', 'security']
  for (const tag of priorityTags) {
    if (tags.includes(tag)) return tag
  }
  return tags[0]
}

// Format tag for display
const formatTag = (tag: string) => {
  return tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-white dark:bg-black">
      <UContainer class="py-16 sm:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <UIcon name="i-heroicons-star" class="w-4 h-4" />
            Real Stories, Real Impact
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Success Stories
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Real developers, real journeys, real results. See how others have used free resources to transform their careers.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <UButton 
              to="#stories" 
              size="lg" 
              class="bg-accent hover:bg-accent/90 text-white px-6"
            >
              Read Stories
            </UButton>
            <UButton 
              to="https://github.com/grey-software/grey-software.github.io" 
              target="_blank"
              size="lg" 
              variant="outline"
              class="border-gray-300 dark:border-gray-700"
            >
              <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
              Share Your Story
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Filter Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-8">
        <div class="flex flex-wrap items-center justify-center gap-3">
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">Filter by background:</span>
          <button
            v-for="bg in backgrounds"
            :key="bg.value"
            @click="selectedBackground = bg.value"
            class="px-4 py-2 text-sm rounded-full transition-all"
            :class="selectedBackground === bg.value 
              ? 'bg-accent text-white' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-accent'"
          >
            {{ bg.label }}
          </button>
        </div>
      </UContainer>
    </div>

    <!-- Stories Grid Section -->
    <div id="stories" class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Developer Journeys
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every journey is unique. Find inspiration from developers who've walked similar paths.
          </p>
        </div>

        <!-- Stories Grid -->
        <div v-if="filteredStories && filteredStories.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="story in filteredStories" 
            :key="story._path"
            class="group rounded-xl border p-6 sm:p-8 transition-all hover:shadow-lg"
            :class="[
              getStoryColorClasses(story.tags).bg,
              getStoryColorClasses(story.tags).border
            ]"
          >
            <!-- Story Header -->
            <div class="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {{ story.developerName }}
                </h3>
                <p class="text-sm font-medium" :class="getStoryColorClasses(story.tags).accent">
                  {{ story.title }}
                </p>
              </div>
              <span 
                v-if="getPrimaryTag(story.tags)"
                class="flex-shrink-0 px-3 py-1 text-xs font-medium rounded-full"
                :class="getStoryColorClasses(story.tags).badge"
              >
                {{ formatTag(getPrimaryTag(story.tags)) }}
              </span>
            </div>

            <!-- Quote -->
            <div class="relative mb-6">
              <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="absolute -top-1 -left-1 w-6 h-6 text-gray-300 dark:text-gray-700" />
              <blockquote class="pl-6 text-gray-600 dark:text-gray-400 italic text-sm sm:text-base leading-relaxed">
                "{{ story.quote }}"
              </blockquote>
            </div>

            <!-- Resources Used -->
            <div class="mb-6">
              <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-2">
                Resources Used
              </h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="resource in story.resourcesUsed?.slice(0, 4)" 
                  :key="resource"
                  class="px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700"
                >
                  {{ resource }}
                </span>
                <span 
                  v-if="story.resourcesUsed?.length > 4"
                  class="px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-500 rounded border border-gray-200 dark:border-gray-700"
                >
                  +{{ story.resourcesUsed.length - 4 }} more
                </span>
              </div>
            </div>

            <!-- Outcome -->
            <div class="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
              <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-2">
                Outcome
              </h4>
              <p class="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {{ story.outcome }}
              </p>
            </div>

            <!-- Source Link -->
            <div class="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
              <span class="text-xs text-gray-500 dark:text-gray-500">
                Source: {{ story.source }}
              </span>
              <a 
                v-if="story.sourceUrl"
                :href="story.sourceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                Read Full Story
                <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <UIcon name="i-heroicons-document-magnifying-glass" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600 dark:text-gray-400">No stories found for this filter.</p>
          <button 
            @click="selectedBackground = 'all'"
            class="mt-4 text-accent hover:underline"
          >
            View all stories
          </button>
        </div>
      </UContainer>
    </div>

    <!-- Submit Your Story Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-16 sm:py-20">
        <div class="max-w-3xl mx-auto">
          <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 sm:p-10 text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <UIcon name="i-heroicons-pencil-square" class="w-8 h-8 text-accent" />
            </div>
            <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              Have a Success Story to Share?
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              We'd love to feature your journey and inspire others. Your story could help someone take their first step into tech.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <UButton 
                to="https://github.com/grey-software/grey-software.github.io/issues/new?template=success-story.md"
                target="_blank"
                size="lg" 
                class="bg-accent hover:bg-accent/90 text-white px-6"
              >
                <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
                Submit Your Story
              </UButton>
              <UButton 
                to="https://github.com/grey-software/grey-software.github.io"
                target="_blank"
                size="lg" 
                variant="outline"
                class="border-gray-300 dark:border-gray-700"
              >
                <UIcon name="lucide-github" class="w-4 h-4 mr-2" />
                Contribute on GitHub
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- CTA Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-20 sm:py-28">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Start Your Own Journey
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Every success story started with a first step. Find the resources and path that's right for you.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <UButton 
              to="/resources" 
              size="xl" 
              class="bg-accent hover:bg-accent/90 text-white px-8 py-3 font-medium"
            >
              Browse Resources
            </UButton>
            <UButton 
              to="/roadmaps" 
              size="xl" 
              variant="outline"
              class="border-gray-300 dark:border-gray-700 px-8 py-3"
            >
              View Learning Bundles
            </UButton>
          </div>

          <!-- Related Links -->
          <div class="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Explore more:</p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              <NuxtLink 
                to="/careers"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Career Paths
              </NuxtLink>
              <NuxtLink 
                to="/challenges"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                30-Day Challenges
              </NuxtLink>
              <NuxtLink 
                to="/compare"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Compare Platforms
              </NuxtLink>
              <NuxtLink 
                to="/roadmaps/web-fundamentals"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Web Fundamentals
              </NuxtLink>
            </div>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>