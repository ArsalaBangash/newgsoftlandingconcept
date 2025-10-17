<!-- components/home/Hero.vue -->
<template>
  <div class="relative overflow-hidden bg-white dark:bg-black">
    <UContainer class="py-12 sm:py-16">
      <div class="max-w-4xl mx-auto text-center">

        <!-- Main Heading -->
        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6 animate-fade-in" style="animation-delay: 0.1s;">
          Open Software
          <br />
          <span class="text-accent">Open Education!</span>
        </h1>
        
        <!-- Description -->
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in" style="animation-delay: 0.2s;">
          No one has all the answers. Research, learn, and watch yourself transform.
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
      </div>
    </UContainer>
  </div>
</template>