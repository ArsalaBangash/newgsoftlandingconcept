<!-- pages/resources/index.vue -->
<script setup lang="ts">
interface FilterOptions {
  topics?: string[]
  difficulties?: string[]
  formats?: string[]
  licenses?: string[]
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
const filters = ref<FilterOptions>({
  topics: route.query.topics ? (Array.isArray(route.query.topics) ? route.query.topics as string[] : [route.query.topics as string]) : undefined,
  difficulties: route.query.difficulties ? (Array.isArray(route.query.difficulties) ? route.query.difficulties as string[] : [route.query.difficulties as string]) : undefined,
  formats: route.query.formats ? (Array.isArray(route.query.formats) ? route.query.formats as string[] : [route.query.formats as string]) : undefined,
  licenses: route.query.licenses ? (Array.isArray(route.query.licenses) ? route.query.licenses as string[] : [route.query.licenses as string]) : undefined,
  isFree: route.query.isFree === 'true',
  isOpenSource: route.query.isOpenSource === 'true'
})

const searchQuery = ref((route.query.search as string) || '')
const sortBy = ref((route.query.sort as string) || 'newest')
const showFilters = ref(true)

// Sync filters with URL
watch([filters, searchQuery, sortBy], () => {
  const query: Record<string, any> = {}
  
  if (filters.value.topics?.length) query.topics = filters.value.topics
  if (filters.value.difficulties?.length) query.difficulties = filters.value.difficulties
  if (filters.value.formats?.length) query.formats = filters.value.formats
  if (filters.value.licenses?.length) query.licenses = filters.value.licenses
  if (filters.value.isFree) query.isFree = 'true'
  if (filters.value.isOpenSource) query.isOpenSource = 'true'
  if (searchQuery.value) query.search = searchQuery.value
  if (sortBy.value !== 'newest') query.sort = sortBy.value
  
  router.replace({ query })
}, { deep: true })

const { data: resources } = await useAsyncData('all-resources', () =>
  queryCollection('resources').all()
)

const filteredResources = computed(() => {
  if (!resources.value) return []

  let filtered = resources.value.filter(resource => {
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
    
    // License filter
    if (filters.value.licenses?.length && resource.license && !filters.value.licenses.includes(resource.license)) {
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
    
    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const matchesTitle = resource.title.toLowerCase().includes(query)
      const matchesDescription = resource.description.toLowerCase().includes(query)
      const matchesTags = resource.tags.some(tag => tag.toLowerCase().includes(query))
      
      if (!matchesTitle && !matchesDescription && !matchesTags) {
        return false
      }
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
          <div class="sticky top-24">
            <ResourceFilters 
              v-model="filters"
              :result-count="filteredResources.length"
            />
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 min-w-0">
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