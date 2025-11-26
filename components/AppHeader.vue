<!-- components/AppHeader.vue -->
<script setup lang="ts">
const route = useRoute()
const isMobileMenuOpen = ref(false)

// Dropdown states
const activeDropdown = ref<string | null>(null)
let closeTimeout: ReturnType<typeof setTimeout> | null = null

// Navigation structure with dropdowns
const resourcesDropdown = [
  { label: 'Browse All', to: '/resources', icon: 'i-lucide-layout-grid' },
  { label: 'By Topic', to: '/resources?filter=topic', icon: 'i-lucide-tag' },
  { label: 'By Format', to: '/resources?filter=format', icon: 'i-lucide-file-text' },
  { label: 'Featured', to: '/resources?featured=true', icon: 'i-lucide-star' },
  { label: 'Compare', to: '/compare', icon: 'i-lucide-scale' },
  { label: 'Tech Stacks', to: '/careers', icon: 'i-lucide-cpu' },
]

const learnDropdown = [
  { label: 'Learning Bundles', to: '/roadmaps', icon: 'i-lucide-package' },
  { label: 'Roadmaps', to: '/roadmaps', icon: 'i-lucide-map' },
  { label: '30-Day Challenges', to: '/challenges', icon: 'i-lucide-flame' },
  { label: 'Digital Freedom', to: '/digital-freedom', icon: 'i-lucide-shield-check' },
  { label: 'How to Learn', to: '/blog', icon: 'i-lucide-lightbulb' },
]

const communityDropdown = [
  { label: 'Success Stories', to: '/stories', icon: 'i-lucide-trophy' },
  { label: 'Blog', to: '/blog', icon: 'i-lucide-newspaper' },
  { label: 'Contribute', to: '/resources/contribute', icon: 'i-lucide-hand' },
  { label: 'GitHub', to: 'https://github.com/grey-software', icon: 'i-simple-icons-github', external: true },
]

// Check if current route matches any dropdown item
function isDropdownActive(items: typeof resourcesDropdown) {
  return items.some(item => {
    if (item.to.includes('?')) {
      return route.path === item.to.split('?')[0]
    }
    return route.path === item.to || route.path.startsWith(item.to + '/')
  })
}

// Dropdown handlers
function openDropdown(name: string) {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  activeDropdown.value = name
}

function closeDropdown() {
  closeTimeout = setTimeout(() => {
    activeDropdown.value = null
  }, 150)
}

function closeDropdownImmediate() {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  activeDropdown.value = null
}

// Close mobile menu on route change
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
  closeDropdownImmediate()
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 font-semibold text-lg text-gray-900 dark:text-white hover:text-accent transition-colors">
          <img 
            src="/images/logo-black-unpadded.png" 
            alt="Grey Software Logo" 
            class="h-6 w-auto dark:hidden"
          />
          <img 
            src="/images/logo-white-unpadded.png" 
            alt="Grey Software Logo" 
            class="h-8 w-auto hidden dark:block"
          />
          <span class="sr-only">Grey Software</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <!-- Resources Dropdown -->
          <div 
            class="relative"
            @mouseenter="openDropdown('resources')"
            @mouseleave="closeDropdown"
          >
            <button
              :class="[
                'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isDropdownActive(resourcesDropdown) || activeDropdown === 'resources'
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
              @click="activeDropdown = activeDropdown === 'resources' ? null : 'resources'"
            >
              Resources
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeDropdown === 'resources' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div 
                v-if="activeDropdown === 'resources'"
                class="absolute left-0 top-full mt-1 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg py-1 z-50"
              >
                <NuxtLink
                  v-for="item in resourcesDropdown"
                  :key="item.to"
                  :to="item.to"
                  :target="item.external ? '_blank' : undefined"
                  :rel="item.external ? 'noopener noreferrer' : undefined"
                  class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  @click="closeDropdownImmediate"
                >
                  <span :class="[item.icon, 'w-4 h-4 text-gray-500 dark:text-gray-400']" />
                  <span>{{ item.label }}</span>
                  <svg v-if="item.external" class="w-3 h-3 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Learn Dropdown -->
          <div 
            class="relative"
            @mouseenter="openDropdown('learn')"
            @mouseleave="closeDropdown"
          >
            <button
              :class="[
                'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isDropdownActive(learnDropdown) || activeDropdown === 'learn'
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
              @click="activeDropdown = activeDropdown === 'learn' ? null : 'learn'"
            >
              Learn
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeDropdown === 'learn' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div 
                v-if="activeDropdown === 'learn'"
                class="absolute left-0 top-full mt-1 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg py-1 z-50"
              >
                <NuxtLink
                  v-for="item in learnDropdown"
                  :key="item.to"
                  :to="item.to"
                  class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  @click="closeDropdownImmediate"
                >
                  <span :class="[item.icon, 'w-4 h-4 text-gray-500 dark:text-gray-400']" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Community Dropdown -->
          <div 
            class="relative"
            @mouseenter="openDropdown('community')"
            @mouseleave="closeDropdown"
          >
            <button
              :class="[
                'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isDropdownActive(communityDropdown) || activeDropdown === 'community'
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
              @click="activeDropdown = activeDropdown === 'community' ? null : 'community'"
            >
              Community
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeDropdown === 'community' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div 
                v-if="activeDropdown === 'community'"
                class="absolute left-0 top-full mt-1 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg py-1 z-50"
              >
                <NuxtLink
                  v-for="item in communityDropdown"
                  :key="item.to"
                  :to="item.to"
                  :target="item.external ? '_blank' : undefined"
                  :rel="item.external ? 'noopener noreferrer' : undefined"
                  class="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  @click="closeDropdownImmediate"
                >
                  <span :class="[item.icon, 'w-4 h-4 text-gray-500 dark:text-gray-400']" />
                  <span>{{ item.label }}</span>
                  <svg v-if="item.external" class="w-3 h-3 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- About Link (no dropdown) -->
          <NuxtLink 
            to="/about"
            :class="[
              'px-3 py-2 text-sm font-medium rounded-md transition-colors',
              route.path === '/about' 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            ]"
          >
            About
          </NuxtLink>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-2">
          <!-- Search Modal -->
          <SearchModal />

          <!-- Contribute Button (Desktop) -->
          <NuxtLink 
            to="/resources/contribute"
            class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Contribute
          </NuxtLink>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-md"
            aria-label="Toggle mobile menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav 
          v-if="isMobileMenuOpen" 
          class="md:hidden py-4 border-t border-gray-200 dark:border-gray-800"
        >
          <!-- Resources Section -->
          <div class="mb-4">
            <h3 class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Resources
            </h3>
            <NuxtLink
              v-for="item in resourcesDropdown"
              :key="item.to"
              :to="item.to"
              :target="item.external ? '_blank' : undefined"
              :class="[
                'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
                route.path === item.to 
                  ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50'
              ]"
            >
              <span :class="[item.icon, 'w-4 h-4']" />
              <span>{{ item.label }}</span>
              <svg v-if="item.external" class="w-3 h-3 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Learn Section -->
          <div class="mb-4">
            <h3 class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Learn
            </h3>
            <NuxtLink
              v-for="item in learnDropdown"
              :key="item.to"
              :to="item.to"
              :class="[
                'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
                route.path === item.to 
                  ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50'
              ]"
            >
              <span :class="[item.icon, 'w-4 h-4']" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </div>

          <!-- Community Section -->
          <div class="mb-4">
            <h3 class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Community
            </h3>
            <NuxtLink
              v-for="item in communityDropdown"
              :key="item.to"
              :to="item.to"
              :target="item.external ? '_blank' : undefined"
              :class="[
                'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
                route.path === item.to 
                  ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50'
              ]"
            >
              <span :class="[item.icon, 'w-4 h-4']" />
              <span>{{ item.label }}</span>
              <svg v-if="item.external" class="w-3 h-3 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </NuxtLink>
          </div>

          <!-- About Link -->
          <div class="mb-4">
            <NuxtLink
              to="/about"
              :class="[
                'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
                route.path === '/about' 
                  ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50'
              ]"
            >
              <span class="i-lucide-info w-4 h-4" />
              <span>About</span>
            </NuxtLink>
          </div>

          <!-- Contribute Button (Mobile) -->
          <div class="px-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <NuxtLink 
              to="/resources/contribute" 
              class="flex items-center justify-center gap-1.5 w-full px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Contribute
            </NuxtLink>
          </div>
        </nav>
      </Transition>
    </UContainer>
  </header>
</template>