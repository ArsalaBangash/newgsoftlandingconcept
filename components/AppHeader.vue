<!-- components/AppHeader.vue -->
<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 font-semibold text-lg text-gray-900 dark:text-white hover:text-accent transition-colors">
          <NuxtImg 
            src="/images/logo-black-unpadded.png" 
            alt="Grey Software Logo" 
            class="h-6 w-auto dark:hidden"
            preload
            format="png"
          />
          <NuxtImg 
            src="/images/logo-white-unpadded.png" 
            alt="Grey Software Logo" 
            class="h-8 w-auto hidden dark:block"
            preload
            format="png"
          />
          <span class="sr-only">Grey Software</span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink 
            v-for="link in appConfig.header.links" 
            :key="link.to"
            :to="link.to"
            class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">
          <!-- Search Modal -->
          <SearchModal />
        </div>
      </div>
    </UContainer>
  </header>
</template>