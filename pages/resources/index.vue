<!-- pages/resources/index.vue -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearch } from '~/composables/useSearch'

interface FilterOptions {
  topics?: string[]
  difficulties?: string[]
  formats?: string[]
  licenses?: string[]
  tags?: string[]
  category?: string
  featured?: boolean
  isFree?: boolean
  isOpenSource?: boolean
}

useSeoMeta({
  title: 'Free & Open Source Developer Resources | Grey Software',
  description: 'Discover curated free and open source resources for developers. Learn web development, AI, DevOps, and more with tutorials, tools, courses, and books.',
  ogTitle: 'Free & Open Source Developer Resources',
  ogDescription: 'Curated resources for developers to learn and grow',
  ogImage: '/og-resources.png',
  twitterCard: 'summary_large_image'
})

const route = useRoute()
const router = useRouter()

// Initialize filters from URL query params
// Note: category is converted to formats array for UI sync
// Note: difficulty (singular) is converted to difficulties array for UI sync
const initialFormats = route.query.formats ? (Array.isArray(route.query.formats) ? route.query.formats as string[] : [route.query.formats as string]) : []
const categoryParam = route.query.category as string | undefined
if (categoryParam && !initialFormats.includes(categoryParam)) {
  initialFormats.push(categoryParam)
}

const initialDifficulties = route.query.difficulties ? (Array.isArray(route.query.difficulties) ? route.query.difficulties as string[] : [route.query.difficulties as string]) : []
const difficultyParam = route.query.difficulty as string | undefined
if (difficultyParam && !initialDifficulties.includes(difficultyParam)) {
  initialDifficulties.push(difficultyParam)
}

const filters = ref<FilterOptions>({
  topics: route.query.topics ? (Array.isArray(route.query.topics) ? route.query.topics as string[] : [route.query.topics as string]) : undefined,
  difficulties: initialDifficulties.length > 0 ? initialDifficulties : undefined,
  formats: initialFormats.length > 0 ? initialFormats : undefined,
  licenses: route.query.licenses ? (Array.isArray(route.query.licenses) ? route.query.licenses as string[] : [route.query.licenses as string]) : undefined,
  tags: route.query.tags ? (typeof route.query.tags === 'string' ? route.query.tags.split(',').map(t => t.trim()) : (Array.isArray(route.query.tags) ? route.query.tags as string[] : [])) : undefined,
  category: categoryParam,
  featured: route.query.featured === 'true',
  isFree: route.query.isFree === 'true',
  isOpenSource: route.query.isOpenSource === 'true'
})

const sortBy = ref((route.query.sort as string) || 'newest')
const showFilters = ref(true)

const options = {
  keys: [
    { name: 'title', weight: 10 },        // Most important
    { name: 'author', weight: 8 },        // Author searches matter
    { name: 'description', weight: 7 },
    { name: 'tags', weight: 6 },
    { name: 'topic', weight: 5 },         // Category searches
    { name: 'format', weight: 4 },        // Format searches
  ],
  includeScore: true,
  threshold: 0.35,  // Lower threshold for better matching
}
const { searchQuery, searchResults, resources } = useSearch('resources', options)
searchQuery.value = (route.query.search as string) || ''


// Sync filters with URL
watch([filters, searchQuery, sortBy], () => {
  const query: Record<string, any> = {}

  if (filters.value.topics?.length) query.topics = filters.value.topics
  if (filters.value.difficulties?.length) query.difficulties = filters.value.difficulties
  if (filters.value.formats?.length) query.formats = filters.value.formats
  if (filters.value.licenses?.length) query.licenses = filters.value.licenses
  if (filters.value.tags?.length) query.tags = filters.value.tags.join(',')
  if (filters.value.category) query.category = filters.value.category
  if (filters.value.featured) query.featured = 'true'
  if (filters.value.isFree) query.isFree = 'true'
  if (filters.value.isOpenSource) query.isOpenSource = 'true'
  if (searchQuery.value) query.search = searchQuery.value
  if (sortBy.value !== 'newest') query.sort = sortBy.value

  router.replace({ query })
}, { deep: true })


const filteredResources = computed(() => {
  if (!resources.value) return []

  let filtered = searchQuery.value ? searchResults.value : resources.value

  filtered = filtered.filter(resource => {
    // Topic filter
    if (filters.value.topics?.length && !filters.value.topics.includes(resource.topic)) {
      return false
    }
    // Difficulty filter
    if (filters.value.difficulties?.length && !filters.value.difficulties.includes(resource.difficulty)) {
      return false
    }
    // Format filter
    if (filters.value.formats?.length && resource.format && !filters.value.formats.includes(resource.format)) {
      return false
    }
    // Category filter (category is a synonym for format)
    if (filters.value.category && resource.format && resource.format.toLowerCase() !== filters.value.category.toLowerCase()) {
      return false
    }
    // License filter
    if (filters.value.licenses?.length && resource.license && !filters.value.licenses.includes(resource.license)) {
      return false
    }
    // Tags filter
    if (filters.value.tags?.length) {
      const resourceTags = resource.tags || []
      const hasMatchingTag = filters.value.tags.some(filterTag => 
        resourceTags.some((resourceTag: string) => 
          resourceTag.toLowerCase() === filterTag.toLowerCase()
        )
      )
      if (!hasMatchingTag) {
        return false
      }
    }
    // Featured filter
    if (filters.value.featured && !resource.featured) {
      return false
    }
    // Free filter
    if (filters.value.isFree && !resource.isFree) {
      return false
    }
    // Open Source filter
    if (filters.value.isOpenSource && !resource.isOpenSource) {
      return false
    }
    return true
  })

  // Sorting
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      case 'title-asc':
        return a.title.localeCompare(b.title)
      case 'title-desc':
        return b.title.localeCompare(a.title)
      case 'popular':
        return (b.githubStars || 0) - (a.githubStars || 0)
      default:
        return 0
    }
  })

  return filtered
})

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' },
  { value: 'popular', label: 'Most Popular' }
]
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <UContainer class="py-12">
      <!-- Header -->
      <div class="max-w-3xl mb-12">
        <h1 class="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
          Free & Open Source Resources
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Discover high-quality, community-curated resources for developers.
          All free, most open source. Learn, build, and grow.
        </p>
      </div>

      <!-- Mobile Filter Toggle -->
      <button
        @click="showFilters = !showFilters"
        class="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        :aria-expanded="showFilters"
        aria-controls="resource-filters"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
        {{ showFilters ? 'Hide' : 'Show' }} Filters
      </button>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div 
          v-show="showFilters"
          id="resource-filters"
          class="lg:w-64 flex-shrink-0"
        >
          <div class="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2">
            <ResourceFilters 
              v-model="filters"
              :result-count="filteredResources.length"
            />
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 min-w-0 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2">
          <!-- Search and Sort Bar -->
          <div class="flex flex-col sm:flex-row gap-3 mb-6">
            <div class="relative flex-1">
              <input
                v-model="searchQuery"
                type="search"
                placeholder="Search resources..."
                class="w-full px-4 py-2.5 pl-10 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                aria-label="Search resources"
              >
              <svg class="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            
            <select
              v-model="sortBy"
              class="px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer"
              aria-label="Sort resources"
            >
              <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Active Filter Chips (Tags & Featured) -->
          <div v-if="filters.tags?.length || filters.featured" class="flex flex-wrap gap-2 mb-6">
            <!-- Featured Chip -->
            <div
              v-if="filters.featured"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-lg text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>Featured Only</span>
              <button
                @click="filters.featured = false"
                class="ml-1 hover:text-amber-900 dark:hover:text-amber-100 focus:outline-none"
                aria-label="Remove featured filter"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Tag Chips -->
            <div
              v-for="tag in filters.tags"
              :key="tag"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              <span>{{ tag }}</span>
              <button
                @click="filters.tags = filters.tags?.filter(t => t !== tag)"
                class="ml-1 hover:text-blue-900 dark:hover:text-blue-100 focus:outline-none"
                :aria-label="`Remove ${tag} tag filter`"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Resources Grid -->
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ResourceCard
              v-for="resource in filteredResources"
              :key="resource.path"
              :title="resource.title"
              :description="resource.description"
              :url="resource.url"
              :difficulty="resource.difficulty"
              :format="resource.format"
              :estimated-time="resource.estimatedTime"
              :license="resource.license"
              :is-free="resource.isFree"
              :is-open-source="resource.isOpenSource"
              :github-stars="resource.githubStars"
              :tags="resource.tags"
              :featured="resource.featured"
            />
          </div>
          
          <!-- Empty State -->
          <div 
            v-if="filteredResources.length === 0" 
            class="py-16 text-center"
            role="status"
            aria-live="polite"
          >
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your filters or search query
            </p>
            <button
              @click="filters = {}; searchQuery = ''"
              class="text-sm text-accent hover:text-accent/80 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-4 py-2"
            >
              Clear all filters
            </button>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>