<!-- components/SearchModal.vue -->
<script setup lang="ts">
const isOpen = ref(false)
const searchQuery = ref('')
const selectedIndex = ref(0)
const searchInput = ref<HTMLInputElement>()

const { data: allResources } = await useAsyncData('search-resources', () =>
  queryCollection('resources').all()
)

// Fuzzy search implementation
function fuzzyMatch(text: string, query: string): boolean {
  const textLower = text.toLowerCase()
  const queryLower = query.toLowerCase()
  
  // Exact match
  if (textLower.includes(queryLower)) return true
  
  // Fuzzy match - all query characters must appear in order
  let textIndex = 0
  for (const char of queryLower) {
    textIndex = textLower.indexOf(char, textIndex)
    if (textIndex === -1) return false
    textIndex++
  }
  return true
}

const searchResults = computed(() => {
  if (!searchQuery.value || !allResources.value) return []
  
  const query = searchQuery.value.trim()
  if (query.length < 2) return []
  
  return allResources.value
    .filter(resource => {
      return fuzzyMatch(resource.title, query) ||
        fuzzyMatch(resource.description, query) ||
        resource.tags.some(tag => fuzzyMatch(tag, query))
    })
    .slice(0, 8) // Limit to 8 results
})

// Keyboard shortcuts
function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    isOpen.value = true
  }
  
  if (!isOpen.value) return
  
  if (e.key === 'Escape') {
    isOpen.value = false
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, searchResults.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const selected = searchResults.value[selectedIndex.value]
    if (selected) {
      window.open(selected.url, '_blank')
      isOpen.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

watch(isOpen, (value) => {
  if (value) {
    searchQuery.value = ''
    selectedIndex.value = 0
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

watch(searchQuery, () => {
  selectedIndex.value = 0
})

defineExpose({
  open: () => { isOpen.value = true }
})
</script>

<template>
  <!-- Trigger Button (in header) -->
  <button
    @click="isOpen = true"
    class="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    aria-label="Search resources (Cmd+K)"
    aria-keyshortcuts="Meta+K"
  >
    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
    <span>Search</span>
    <kbd class="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-500 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded">
      <span class="text-xs">⌘</span>K
    </kbd>
  </button>

  <!-- Mobile Search Button -->
  <button
    @click="isOpen = true"
    class="sm:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
    aria-label="Search resources"
  >
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  </button>

  <!-- Modal Overlay -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        @click="isOpen = false"
        aria-hidden="true"
      />
    </Transition>

    <!-- Modal Content -->
    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed inset-x-4 top-20 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl z-50"
        role="dialog"
        aria-modal="true"
        aria-label="Search resources"
      >
        <div class="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-2xl overflow-hidden">
          <!-- Search Input -->
          <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Search resources..."
              class="flex-1 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 bg-transparent border-none outline-none text-base"
              aria-label="Search input"
              aria-autocomplete="list"
              aria-controls="search-results"
              :aria-activedescendant="searchResults[selectedIndex] ? `result-${selectedIndex}` : undefined"
            >
            <kbd class="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded">
              ESC
            </kbd>
          </div>

          <!-- Results -->
          <div 
            id="search-results"
            class="max-h-96 overflow-y-auto"
            role="listbox"
            :aria-label="`${searchResults.length} search results`"
          >
            <div v-if="searchQuery && searchResults.length === 0" class="px-4 py-8 text-center">
              <p class="text-sm text-gray-500 dark:text-gray-500">No resources found</p>
            </div>

            <div v-else-if="!searchQuery" class="px-4 py-8 text-center">
              <p class="text-sm text-gray-500 dark:text-gray-500">
                Start typing to search resources...
              </p>
            </div>

            <a
              v-for="(resource, index) in searchResults"
              :key="resource.path"
              :id="`result-${index}`"
              :href="resource.url"
              target="_blank"
              rel="noopener noreferrer"
              :class="[
                'block px-4 py-3 border-b border-gray-100 dark:border-gray-900 last:border-0 transition-colors',
                index === selectedIndex
                  ? 'bg-gray-50 dark:bg-gray-950'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-950'
              ]"
              role="option"
              :aria-selected="index === selectedIndex"
              @click="isOpen = false"
              @mouseenter="selectedIndex = index"
            >
              <div class="flex items-start gap-3">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {{ resource.title }}
                    </h3>
                    <span 
                      v-if="resource.isFree"
                      class="flex-shrink-0 px-1.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 rounded"
                    >
                      Free
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                    {{ resource.description }}
                  </p>
                  <div class="flex items-center gap-2 mt-1.5">
                    <span class="text-xs text-gray-500 dark:text-gray-500 capitalize">
                      {{ resource.difficulty }}
                    </span>
                    <span class="text-gray-300 dark:text-gray-700">•</span>
                    <span class="text-xs text-gray-500 dark:text-gray-500">
                      {{ resource.topic }}
                    </span>
                  </div>
                </div>
                <svg class="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </a>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-500">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded">↑↓</kbd>
                Navigate
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded">↵</kbd>
                Open
              </span>
            </div>
            <NuxtLink 
              to="/resources"
              class="text-accent hover:text-accent/80 font-medium"
              @click="isOpen = false"
            >
              View all →
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
