<!-- components/AppFooter.vue -->
<script setup lang="ts">
const appConfig = useAppConfig()

const resourceCategories = [
  { label: 'Web Development', to: '/resources?topics=Web+Development' },
  { label: 'AI & Machine Learning', to: '/resources?topics=AI+%26+Machine+Learning' },
  { label: 'Cloud & DevOps', to: '/resources?topics=Cloud+%26+DevOps' },
  { label: 'Developer Tools', to: '/resources?topics=Developer+Tools' }
]

const quickLinks = [
  { label: 'All Resources', to: '/resources' },
  { label: 'Learning Roadmaps', to: '/roadmaps' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' }
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer 
    class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
    role="contentinfo"
  >
    <UContainer>
      <div class="py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <!-- Brand & Mission -->
          <div class="lg:col-span-1">
            <NuxtLink to="/" class="inline-block mb-4">
              <div class="flex items-center gap-2">
                <img 
                  src="/assets/images/logo-black-unpadded.png" 
                  alt="Grey Software Logo" 
                  class="h-6 w-auto dark:hidden"
                  loading="lazy"
                />
                <img 
                  src="/assets/images/logo-white-unpadded.png" 
                  alt="Grey Software Logo" 
                  class="h-6 w-auto hidden dark:block"
                  loading="lazy"
                />
              </div>
            </NuxtLink>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Curating the world's best free and open source resources for developers.
              Open Products, Open Education.
            </p>
            <div class="flex items-center gap-3">
              <a
                v-for="social in appConfig.footer.socials"
                :key="social.label"
                :href="social.to"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                :aria-label="social.label"
              >
                <UIcon :name="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Resources by Category -->
          <nav class="lg:col-span-1" aria-labelledby="footer-resources">
            <h3 id="footer-resources" class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Resources by Topic
            </h3>
            <ul class="space-y-3">
              <li v-for="category in resourceCategories" :key="category.to">
                <NuxtLink 
                  :to="category.to"
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {{ category.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Quick Links -->
          <nav class="lg:col-span-1" aria-labelledby="footer-quicklinks">
            <h3 id="footer-quicklinks" class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul class="space-y-3">
              <li v-for="link in quickLinks" :key="link.to">
                <NuxtLink 
                  :to="link.to"
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
              <li>
                <a
                  href="https://github.com/grey-software"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  GitHub
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>

          <!-- Newsletter / CTA -->
          <div class="lg:col-span-1">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Contribute
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Help us curate the best resources for developers worldwide.
            </p>
            <NuxtLink
              to="/resources/contribute"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
            >
              Submit Resource
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            © {{ new Date().getFullYear() }} Grey Software. Open Products, Open Education.
          </p>
          
          <button
            @click="scrollToTop"
            class="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-3 py-1.5"
            aria-label="Back to top"
          >
            Back to top
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </UContainer>
  </footer>
</template>