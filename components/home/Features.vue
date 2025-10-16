<!-- components/home/Features.vue -->
<template>
  <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
    <UContainer class="py-24">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
          Why Grey Software Works
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Our approach to developer education is different.
        </p>
      </div>
      
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Feature 1 -->
        <div class="group p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover-lift hover:border-accent dark:hover:border-accent transition-colors">
          <div class="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900 group-hover:bg-accent/10 transition-colors">
            <svg class="w-6 h-6 text-gray-900 dark:text-white group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Curated Quality
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Every resource is hand-picked and reviewed by experts to ensure high quality.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="group p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover-lift hover:border-accent dark:hover:border-accent transition-colors">
          <div class="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900 group-hover:bg-accent/10 transition-colors">
            <svg class="w-6 h-6 text-gray-900 dark:text-white group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Community Driven
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Built by developers, for developers. Contributions from the community keep it fresh.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="group p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover-lift hover:border-accent dark:hover:border-accent transition-colors">
          <div class="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900 group-hover:bg-accent/10 transition-colors">
            <svg class="w-6 h-6 text-gray-900 dark:text-white group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Open Education
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Free access to the best resources, promoting open knowledge and learning.
          </p>
        </div>
      </div>
    </UContainer>
  </div>
</template>