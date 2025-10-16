<!-- components/resource/Card.vue -->
<script setup lang="ts">
interface ResourceCardProps {
  title: string
  description: string
  url: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'all'
  format?: 'video' | 'article' | 'course' | 'tool' | 'book' | 'documentation' | 'interactive' | 'platform' | 'game' | 'event' | 'newsletter'
  estimatedTime?: string
  license?: string
  isFree?: boolean
  isOpenSource?: boolean
  githubStars?: number
  tags?: string[]
  featured?: boolean
}

const props = withDefaults(defineProps<ResourceCardProps>(), {
  isFree: true,
  isOpenSource: false,
  featured: false
})

const difficultyConfig = {
  beginner: { label: 'Beginner', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30' },
  intermediate: { label: 'Intermediate', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30' },
  advanced: { label: 'Advanced', color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30' },
  all: { label: 'All Levels', color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30' },
  'all-levels': { label: 'All Levels', color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30' }
}

const formatConfig = {
  video: { icon: 'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z', label: 'Video' },
  article: { icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z', label: 'Article' },
  course: { icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5', label: 'Course' },
  tool: { icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z', label: 'Tool' },
  book: { icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25', label: 'Book' },
  documentation: { icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z', label: 'Documentation' },
  interactive: { icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25', label: 'Interactive' },
  platform: { icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25', label: 'Platform' },
  game: { icon: 'M14.25 6.087c0-.355.144-.718.406-1.022C15.14 4.46 16.169 4.5 17.25 4.5c1.336 0 2.573-.82 3.33-1.671.365-.412.688-.722.927-.826.19-.08.346-.035.467.112.244.292.51.686.71 1.1.115.233.16.484.16.743 0 .828-.475 1.622-1.196 2.054-.805.568-1.993.95-3.196.95-1.336 0-2.573.82-3.33 1.671-.365.412-.688.722-.927.826-.19.08-.346.035-.467-.112-.244-.292-.51-.686-.71-1.1-.115-.233-.16-.484-.16-.743zm.966 6.479c.25.092.497.186.74.28.492.189.949.428 1.35.701a3.15 3.15 0 001.83 1.015c.982 0 1.822-.55 2.319-1.303.493-.752.69-1.634.69-2.49 0-.248-.033-.488-.096-.707-.147-.517-.467-.858-.91-1.105-.44-.245-.944-.383-1.436-.383-.982 0-1.822.55-2.319 1.303-.493.752-.69 1.634-.69 2.49 0 .248.033.488.096.707.147.517.467.858.91 1.105.44.245.944.383 1.436.383zm-3.5-6.771c0-.355-.144-.718-.406-1.022C10.86 4.46 9.831 4.5 8.75 4.5c-1.336 0-2.573-.82-3.33-1.671-.365-.412-.688-.722-.927-.826-.19-.08-.346-.035-.467.112-.244.292-.51.686-.71-1.1-.115-.233-.16-.484-.16.743 0 .828.475 1.622 1.196 2.054.805.568 1.993.95 3.196.95 1.336 0 2.573.82 3.33 1.671.365.412.688.722.927.826.19.08.346.035.467-.112.244-.292.51-.686.71-1.1.115-.233.16-.484.16-.743zm-.966 6.479c-.25.092-.497.186-.74.28-.492.189-.949.428-1.35.701a3.15 3.15 0 01-1.83 1.015c-.982 0-1.822-.55-2.319-1.303-.493-.752-.69-1.634-.69-2.49 0-.248.033-.488.096-.707.147-.517.467-.858.91-1.105.44-.245.944-.383 1.436-.383.982 0 1.822.55 2.319 1.303.493.752.69 1.634.69 2.49 0 .248-.033.488-.096.707-.147.517-.467.858-.91 1.105-.44.245-.944.383-1.436.383z', label: 'Game' },
  event: { icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5', label: 'Event' },
  newsletter: { icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75', label: 'Newsletter' }
}
</script>

<template>
  <a 
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="group block p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover-lift hover:border-accent dark:hover:border-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
    :aria-label="`${title} - ${description}`"
  >
    <!-- Header: Format Icon + External Link Icon -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-2">
        <!-- Format Icon -->
        <svg 
          v-if="format && formatConfig[format]"
          class="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors flex-shrink-0"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor"
          :aria-label="formatConfig[format].label"
        >
          <path stroke-linecap="round" stroke-linejoin="round" :d="formatConfig[format].icon" />
        </svg>
        
        <!-- Featured Badge -->
        <span 
          v-if="featured"
          class="text-xs font-medium text-yellow-600 dark:text-yellow-400 uppercase tracking-wide"
          aria-label="Featured resource"
        >
          Featured
        </span>
      </div>
      
      <!-- External Link Icon -->
      <svg 
        class="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors flex-shrink-0" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke-width="2" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-accent transition-colors">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
      {{ description }}
    </p>

    <!-- Metadata Badges -->
    <div class="flex flex-wrap items-center gap-2 text-xs">
      <!-- Difficulty Badge -->
      <span 
        v-if="difficulty && difficultyConfig[difficulty]"
        :class="['px-2 py-1 rounded-md font-medium', difficultyConfig[difficulty]?.color || 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950/30']"
        :aria-label="`Difficulty level: ${difficultyConfig[difficulty]?.label || difficulty}`"
      >
        {{ difficultyConfig[difficulty]?.label || difficulty }}
      </span>

      <!-- Estimated Time -->
      <span 
        v-if="estimatedTime"
        class="px-2 py-1 rounded-md font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900"
        :aria-label="`Estimated time: ${estimatedTime}`"
      >
        <svg class="w-3 h-3 inline-block mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ estimatedTime }}
      </span>

      <!-- Free Badge -->
      <span 
        v-if="isFree"
        class="px-2 py-1 rounded-md font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30"
        aria-label="Free resource"
      >
        Free
      </span>

      <!-- Open Source Badge -->
      <span 
        v-if="isOpenSource"
        class="px-2 py-1 rounded-md font-medium text-accent bg-green-50 dark:bg-green-950/30"
        aria-label="Open source"
      >
        <svg class="w-3 h-3 inline-block mr-1 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>
        Open Source
      </span>

      <!-- GitHub Stars -->
      <span 
        v-if="githubStars && githubStars > 0"
        class="px-2 py-1 rounded-md font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900"
        :aria-label="`${githubStars.toLocaleString()} GitHub stars`"
      >
        <svg class="w-3 h-3 inline-block mr-1 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
        </svg>
        {{ githubStars >= 1000 ? `${(githubStars / 1000).toFixed(1)}k` : githubStars }}
      </span>

      <!-- License -->
      <span 
        v-if="license"
        class="px-2 py-1 rounded-md font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900"
        :aria-label="`License: ${license}`"
      >
        {{ license }}
      </span>
    </div>

    <!-- Tags (if any) -->
    <div v-if="tags && tags.length > 0" class="mt-3 flex flex-wrap gap-1.5">
      <span 
        v-for="tag in tags.slice(0, 3)" 
        :key="tag"
        class="text-xs text-gray-500 dark:text-gray-500"
      >
        #{{ tag }}
      </span>
    </div>
  </a>
</template>
