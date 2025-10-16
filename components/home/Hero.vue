<!-- components/home/Hero.vue -->
<template>
  <div class="relative overflow-hidden bg-white dark:bg-black">
    <UContainer class="py-24 sm:py-32">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-sm border border-gray-200 dark:border-gray-800 rounded-full animate-fade-in">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span class="text-gray-600 dark:text-gray-400">Curated by developers, for developers</span>
        </div>

        <!-- Main Heading -->
        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6 animate-fade-in" style="animation-delay: 0.1s;">
          Open Products,
          <br />
          <span class="text-accent">Open Education!</span>
        </h1>
        
        <!-- Description -->
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in" style="animation-delay: 0.2s;">
          We don't have all the answers, but we'll do a damn good job of making sure that anybody that visits our website gets their mind opened to the numerous possibilities that are out there.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in" style="animation-delay: 0.3s;">
          <UButton 
            to="/resources" 
            size="xl" 
            class="bg-accent hover:bg-accent/90 text-white px-6 py-3 font-medium"
          >
            Start Your Journey →
          </UButton>
          <UButton 
            to="/resources/contribute" 
            size="xl" 
            variant="outline"
            class="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 px-6 py-3 font-medium"
          >
            Contribute Resources
          </UButton>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-gray-500 dark:text-gray-500 animate-fade-in" style="animation-delay: 0.4s;">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
            <span>24+ Resources</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
            </svg>
            <span>Open Source</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
            </svg>
            <span>Curated Weekly</span>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>