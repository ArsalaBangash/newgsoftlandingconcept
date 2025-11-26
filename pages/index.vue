<!-- pages/index.vue -->
<script setup lang="ts">
// Fetch only the data needed for the streamlined homepage
const { data: allResources } = await useAsyncData('all-resources', () =>
  queryCollection('resources').all()
)

const { data: partners } = await useAsyncData('partners', () =>
  queryCollection('partners').all()
)

const { data: bundles } = await useAsyncData('learning-bundles', () =>
  queryCollection('bundles').all()
)

// Featured resources for the Featured Resources section
const featuredResources = computed(() => {
  return (allResources.value || []).filter(r => r.featured).slice(0, 6)
})

// Top 3 bundles for the Learning Bundles section
const topBundles = computed(() => {
  return (bundles.value || []).slice(0, 3)
})

// Total resource count for stats
const totalResources = computed(() => {
  return (allResources.value || []).length
})
</script>

<template>
  <div>
    <!-- Section 1: Hero -->
    <HomeHero />

    <!-- Section 2: Quick Decision Tool -->
    <div class="bg-white dark:bg-black">
      <UContainer class="py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Not sure where to start?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pick your situation and we'll point you to the right resources.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <!-- Career Change -->
          <NuxtLink 
            to="/resources?difficulty=beginner&category=course" 
            class="group block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-accent dark:hover:border-accent hover:shadow-lg transition-all"
          >
            <div class="mb-4">
              <UIcon name="lucide-refresh-ccw" class="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Career Change</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Switching to tech? Start with structured beginner courses.
            </p>
            <span class="inline-flex items-center gap-1 text-sm font-medium text-accent">
              Find Courses
              <UIcon name="lucide-arrow-right" class="w-4 h-4" />
            </span>
          </NuxtLink>

          <!-- Interview Prep -->
          <NuxtLink 
            to="/resources?tags=interview-prep&category=practice" 
            class="group block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-accent dark:hover:border-accent hover:shadow-lg transition-all"
          >
            <div class="mb-4">
              <UIcon name="lucide-briefcase" class="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Interview Prep</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Landing interviews? Practice with coding challenges.
            </p>
            <span class="inline-flex items-center gap-1 text-sm font-medium text-accent">
              Start Practicing
              <UIcon name="lucide-arrow-right" class="w-4 h-4" />
            </span>
          </NuxtLink>

          <!-- Level Up Skills -->
          <NuxtLink 
            to="/resources?difficulty=advanced" 
            class="group block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-accent dark:hover:border-accent hover:shadow-lg transition-all"
          >
            <div class="mb-4">
              <UIcon name="lucide-rocket" class="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Level Up Skills</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Know the basics? Master advanced concepts and patterns.
            </p>
            <span class="inline-flex items-center gap-1 text-sm font-medium text-accent">
              Go Advanced
              <UIcon name="lucide-arrow-right" class="w-4 h-4" />
            </span>
          </NuxtLink>

          <!-- Quick Wins -->
          <NuxtLink 
            to="/resources?time=short" 
            class="group block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-accent dark:hover:border-accent hover:shadow-lg transition-all"
          >
            <div class="mb-4">
              <UIcon name="lucide-zap" class="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Quick Wins</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Short on time? Learn something valuable in under 2 hours.
            </p>
            <span class="inline-flex items-center gap-1 text-sm font-medium text-accent">
              Quick Resources
              <UIcon name="lucide-arrow-right" class="w-4 h-4" />
            </span>
          </NuxtLink>
        </div>
      </UContainer>
    </div>

    <!-- Section 3: Featured Resources -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-16 sm:py-20">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
              Hand-picked by our community
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              The best resources, curated and verified by developers like you.
            </p>
          </div>
          <NuxtLink 
            to="/resources?featured=true" 
            class="inline-flex items-center gap-1 text-accent hover:underline font-medium whitespace-nowrap"
          >
            See all featured
            <UIcon name="lucide-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div v-if="featuredResources.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard
            v-for="resource in featuredResources"
            :key="resource.path"
            :title="resource.title"
            :description="resource.description"
            :url="resource.url"
            :difficulty="resource.difficulty"
            :format="resource.format"
            :estimated-time="resource.estimatedTime"
            :license="resource.license"
            :is-free="resource.isFree"
            :is-open-source="resource.isOpenSource"
            :github-stars="resource.githubStars"
            :tags="resource.tags"
            :featured="resource.featured"
          />
        </div>
        <div v-else class="text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">Loading featured resources...</p>
        </div>
      </UContainer>
    </div>

    <!-- Section 4: Learning Bundles -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-16 sm:py-20">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
              Structured paths from zero to hero
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Stop jumping between resources. Follow curated learning bundles.
            </p>
          </div>
          <NuxtLink 
            to="/roadmaps" 
            class="inline-flex items-center gap-1 text-accent hover:underline font-medium whitespace-nowrap"
          >
            Browse all bundles
            <UIcon name="lucide-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="bundle in topBundles" 
            :key="bundle.id" 
            class="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-accent dark:hover:border-accent hover:shadow-lg transition-all"
          >
            <!-- Bundle Header -->
            <div class="flex items-start gap-3 mb-4">
              <UIcon 
                v-if="bundle.icon" 
                :name="bundle.icon" 
                class="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" 
              />
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {{ bundle.title }}
                </h3>
                <span 
                  class="inline-block px-2 py-0.5 text-xs font-medium rounded-full"
                  :class="bundle.difficulty === 'beginner' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : bundle.difficulty === 'intermediate' 
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'"
                >
                  {{ bundle.difficulty }}
                </span>
              </div>
            </div>

            <!-- Bundle Description -->
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {{ bundle.description }}
            </p>

            <!-- Bundle Meta -->
            <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-4">
              <span class="flex items-center gap-1">
                <UIcon name="lucide-clock" class="w-4 h-4" />
                {{ bundle.duration }}
              </span>
              <span class="flex items-center gap-1">
                <UIcon name="lucide-package" class="w-4 h-4" />
                {{ (bundle.resources || []).length }} resources
              </span>
            </div>

            <!-- Bundle Outcomes Preview -->
            <div v-if="bundle.outcomes && bundle.outcomes.length > 0" class="mb-4">
              <p class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">You'll learn:</p>
              <ul class="space-y-1">
                <li 
                  v-for="(outcome, idx) in bundle.outcomes.slice(0, 2)" 
                  :key="idx"
                  class="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2"
                >
                  <UIcon name="lucide-check" class="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                  <span class="line-clamp-1">{{ outcome }}</span>
                </li>
              </ul>
            </div>

            <!-- Bundle CTA -->
            <NuxtLink 
              :to="`/roadmaps/${bundle.id}`"
              class="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline"
            >
              Start this path
              <UIcon name="lucide-arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Section 5: Trusted Platforms/Partners -->
    <div class="border-t border-gray-200 dark:border-gray-800">
      <HomePartners :partners="partners" />
    </div>

    <!-- Section 6: Final CTA -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-20 sm:py-28">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to start learning?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Browse our complete collection of free, high-quality resources—filtered by topic, difficulty, format, and more.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <UButton 
              to="/resources" 
              size="xl" 
              class="bg-accent hover:bg-accent/90 text-white px-8 py-3 font-medium"
            >
              Browse All Resources
            </UButton>
            <div class="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-700 dark:text-gray-300">
              <span>Press</span>
              <kbd class="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 font-mono">⌘K</kbd>
              <span>to Search</span>
            </div>
          </div>

          <!-- Stats -->
          <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="flex items-center gap-1">
              <UIcon name="lucide-library" class="w-4 h-4" />
              {{ totalResources }}+ free resources
            </span>
            <span class="hidden sm:inline">•</span>
            <span class="flex items-center gap-1">
              <UIcon name="lucide-github" class="w-4 h-4" />
              100% open source
            </span>
            <span class="hidden sm:inline">•</span>
            <span class="flex items-center gap-1">
              <UIcon name="lucide-users" class="w-4 h-4" />
              Community-driven
            </span>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>
