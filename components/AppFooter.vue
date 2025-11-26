<!-- components/AppFooter.vue -->
<script setup lang="ts">
const appConfig = useAppConfig()

// Resources column links
const resourceLinks = [
  { label: 'Browse All', to: '/resources' },
  { label: 'Featured', to: '/resources?featured=true' },
  { label: 'Books', to: '/resources?format=book' },
  { label: 'Compare', to: '/compare' },
  { label: 'Tech Stacks', to: '/careers' }
]

// Learn column links
const learnLinks = [
  { label: 'Learning Bundles', to: '/roadmaps' },
  { label: 'Roadmaps', to: '/roadmaps' },
  { label: 'Challenges', to: '/challenges' },
  { label: 'Digital Freedom', to: '/digital-freedom' },
  { label: 'Guides', to: '/blog' }
]

// Community column links
const communityLinks = [
  { label: 'Success Stories', to: '/stories' },
  { label: 'Blog', to: '/blog' },
  { label: 'Newsletter', to: '/blog', external: false }
]

// Community external links
const communityExternalLinks = [
  { label: 'GitHub', to: 'https://github.com/grey-software' },
  { label: 'Discord', to: 'https://discord.gg/grey-software' }
]

// Company column links
const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Contribute', to: '/resources/contribute' },
  { label: 'Contact', to: '/about' }
]

// Company legal links
const legalLinks = [
  { label: 'Privacy', to: '/about' },
  { label: 'Terms', to: '/about' }
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
        <!-- Brand Section -->
        <div class="mb-10">
          <NuxtLink to="/" class="inline-block mb-4">
            <div class="flex items-center gap-2">
              <img
                src="/images/logo-black-unpadded.png"
                alt="Grey Software Logo"
                class="h-6 w-auto dark:hidden"
              />
              <img
                src="/images/logo-white-unpadded.png"
                alt="Grey Software Logo"
                class="h-6 w-auto hidden dark:block"
              />
            </div>
          </NuxtLink>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md">
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

        <!-- 4-Column Navigation Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <!-- Resources Column -->
          <nav aria-labelledby="footer-resources">
            <h3 id="footer-resources" class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul class="space-y-3">
              <li v-for="link in resourceLinks" :key="link.to + link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Learn Column -->
          <nav aria-labelledby="footer-learn">
            <h3 id="footer-learn" class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Learn
            </h3>
            <ul class="space-y-3">
              <li v-for="link in learnLinks" :key="link.to + link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Community Column -->
          <nav aria-labelledby="footer-community">
            <h3 id="footer-community" class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Community
            </h3>
            <ul class="space-y-3">
              <li v-for="link in communityLinks" :key="link.to + link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
              <li v-for="link in communityExternalLinks" :key="link.to">
                <a
                  :href="link.to"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {{ link.label }}
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>

          <!-- Company Column -->
          <nav aria-labelledby="footer-company">
            <h3 id="footer-company" class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Company
            </h3>
            <ul class="space-y-3">
              <li v-for="link in companyLinks" :key="link.to + link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
              <li v-for="link in legalLinks" :key="link.to + link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
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