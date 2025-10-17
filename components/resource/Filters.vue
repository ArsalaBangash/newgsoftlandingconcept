<!-- components/resource/Filters.vue -->
<script setup lang="ts">
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

interface Props {
  modelValue: FilterOptions
  resultCount?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: FilterOptions]
}>()

const filters = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const topics = [
  'Web Development',
  'AI & Machine Learning',
  'Cloud & DevOps',
  'Developer Tools',
  'Community & Career',
  'Emerging Tech'
]

const difficulties = ['beginner', 'intermediate', 'advanced']

const formats = [
  { value: 'video', label: 'Video', icon: 'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z' },
  { value: 'article', label: 'Article', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
  { value: 'course', label: 'Course', icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5' },
  { value: 'tool', label: 'Tool', icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z' },
  { value: 'book', label: 'Book', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
  { value: 'documentation', label: 'Docs', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
  { value: 'interactive', label: 'Interactive', icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25' }
]

const licenses = ['MIT', 'GPL-2.0', 'GPL-3.0', 'Apache-2.0', 'BSD-3-Clause', 'CC BY-NC', 'Free']

function toggleArrayValue(array: string[] | undefined, value: string): string[] {
  const arr = array || []
  if (arr.includes(value)) {
    return arr.filter(v => v !== value)
  }
  return [...arr, value]
}

function toggleTopic(topic: string) {
  filters.value = { ...filters.value, topics: toggleArrayValue(filters.value.topics, topic) }
}

function toggleDifficulty(difficulty: string) {
  filters.value = { ...filters.value, difficulties: toggleArrayValue(filters.value.difficulties, difficulty) }
}

function toggleFormat(format: string) {
  filters.value = { ...filters.value, formats: toggleArrayValue(filters.value.formats, format) }
}

function toggleLicense(license: string) {
  filters.value = { ...filters.value, licenses: toggleArrayValue(filters.value.licenses, license) }
}

function toggleFree() {
  filters.value = { ...filters.value, isFree: filters.value.isFree ? undefined : true }
}

function toggleOpenSource() {
  filters.value = { ...filters.value, isOpenSource: filters.value.isOpenSource ? undefined : true }
}

function clearAllFilters() {
  filters.value = {}
}

const hasActiveFilters = computed(() => {
  return (filters.value.topics?.length ?? 0) > 0 ||
    (filters.value.difficulties?.length ?? 0) > 0 ||
    (filters.value.formats?.length ?? 0) > 0 ||
    (filters.value.licenses?.length ?? 0) > 0 ||
    (filters.value.tags?.length ?? 0) > 0 ||
    !!filters.value.category ||
    !!filters.value.featured ||
    filters.value.isFree ||
    filters.value.isOpenSource
})

const activeFilterCount = computed(() => {
  return (filters.value.topics?.length ?? 0) +
    (filters.value.difficulties?.length ?? 0) +
    (filters.value.formats?.length ?? 0) +
    (filters.value.licenses?.length ?? 0) +
    (filters.value.tags?.length ?? 0) +
    (filters.value.category ? 1 : 0) +
    (filters.value.featured ? 1 : 0) +
    (filters.value.isFree ? 1 : 0) +
    (filters.value.isOpenSource ? 1 : 0)
})
</script>

<template>
  <aside 
    class="space-y-6"
    role="search"
    aria-label="Filter resources"
  >
    <!-- Header with Clear -->
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        Filters
        <span v-if="activeFilterCount > 0" class="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          ({{ activeFilterCount }})
        </span>
      </h2>
      <button
        v-if="hasActiveFilters"
        @click="clearAllFilters"
        class="text-sm text-accent hover:text-accent/80 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-2 py-1"
        aria-label="Clear all filters"
      >
        Clear all
      </button>
    </div>

    <!-- Results Count (ARIA Live Region) -->
    <div 
      v-if="resultCount !== undefined"
      class="text-sm text-gray-600 dark:text-gray-400"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ resultCount }} {{ resultCount === 1 ? 'resource' : 'resources' }} found
    </div>

    <!-- Quick Filters -->
    <div class="space-y-3">
      <h3 class="text-sm font-medium text-gray-900 dark:text-white">Quick Filters</h3>
      <div class="flex flex-wrap gap-2">
        <button
          @click="toggleFree"
          :class="[
            'px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
            filters.isFree
              ? 'bg-accent text-white border-accent'
              : 'bg-white dark:bg-black text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-accent'
          ]"
          :aria-pressed="filters.isFree"
        >
          Free Only
        </button>
        <button
          @click="toggleOpenSource"
          :class="[
            'px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
            filters.isOpenSource
              ? 'bg-accent text-white border-accent'
              : 'bg-white dark:bg-black text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-accent'
          ]"
          :aria-pressed="filters.isOpenSource"
        >
          Open Source
        </button>
      </div>
    </div>

    <!-- Topics -->
    <div class="space-y-3">
      <h3 class="text-sm font-medium text-gray-900 dark:text-white">Topics</h3>
      <div class="space-y-2">
        <label
          v-for="topic in topics"
          :key="topic"
          class="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="checkbox"
            :checked="filters.topics?.includes(topic)"
            @change="toggleTopic(topic)"
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-black cursor-pointer"
            :aria-label="`Filter by ${topic}`"
          >
          <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
            {{ topic }}
          </span>
        </label>
      </div>
    </div>

    <!-- Difficulty -->
    <div class="space-y-3">
      <h3 class="text-sm font-medium text-gray-900 dark:text-white">Difficulty</h3>
      <div class="space-y-2">
        <label
          v-for="difficulty in difficulties"
          :key="difficulty"
          class="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="checkbox"
            :checked="filters.difficulties?.includes(difficulty)"
            @change="toggleDifficulty(difficulty)"
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-black cursor-pointer"
            :aria-label="`Filter by ${difficulty} difficulty`"
          >
          <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white capitalize">
            {{ difficulty }}
          </span>
        </label>
      </div>
    </div>

    <!-- Format -->
    <div class="space-y-3">
      <h3 class="text-sm font-medium text-gray-900 dark:text-white">Format</h3>
      <div class="space-y-2">
        <label
          v-for="format in formats"
          :key="format.value"
          class="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="checkbox"
            :checked="filters.formats?.includes(format.value)"
            @change="toggleFormat(format.value)"
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-black cursor-pointer"
            :aria-label="`Filter by ${format.label} format`"
          >
          <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" :d="format.icon" />
          </svg>
          <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
            {{ format.label }}
          </span>
        </label>
      </div>
    </div>

    <!-- License -->
    <div class="space-y-3">
      <h3 class="text-sm font-medium text-gray-900 dark:text-white">License</h3>
      <div class="space-y-2">
        <label
          v-for="license in licenses"
          :key="license"
          class="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="checkbox"
            :checked="filters.licenses?.includes(license)"
            @change="toggleLicense(license)"
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-black cursor-pointer"
            :aria-label="`Filter by ${license} license`"
          >
          <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
            {{ license }}
          </span>
        </label>
      </div>
    </div>
  </aside>
</template>
