<!-- pages/compare.vue -->
<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: 'Resource Showdowns - Head-to-Head Comparisons | Grey Software',
  description: 'Head-to-head comparisons to help you choose the right learning resource. We break down the pros and cons so you don\'t have to.',
  ogTitle: 'Resource Showdowns - Head-to-Head Comparisons',
  ogDescription: 'Head-to-head comparisons to help you choose the right learning resource. We break down the pros and cons so you don\'t have to.',
})

// Comparison Data
const comparisons = [
  {
    id: 'codewars-vs-leetcode',
    leftResource: {
      name: 'Codewars',
      icon: 'i-heroicons-puzzle-piece',
      color: 'red',
      pros: ['Fun kata system', 'Multiple languages', 'Community solutions']
    },
    rightResource: {
      name: 'LeetCode',
      icon: 'i-heroicons-code-bracket-square',
      color: 'yellow',
      pros: ['Interview-focused', 'Company-specific problems', 'Premium features']
    },
    pickLeft: 'You want to learn through fun challenges',
    pickRight: "You're preparing for FAANG interviews",
    verdict: 'Both are excellent - use Codewars for learning, LeetCode for interview prep'
  },
  {
    id: 'fullstackopen-vs-odinproject',
    leftResource: {
      name: 'Full Stack Open',
      icon: 'i-heroicons-academic-cap',
      color: 'blue',
      pros: ['University-backed', 'React/Node focus', 'Modern stack']
    },
    rightResource: {
      name: 'The Odin Project',
      icon: 'i-heroicons-fire',
      color: 'orange',
      pros: ['Community-driven', 'Full curriculum', 'Project-based']
    },
    pickLeft: 'You want a structured, academic approach',
    pickRight: 'You prefer learning by building real projects',
    verdict: 'Odin for beginners, Full Stack Open for those with some experience'
  },
  {
    id: 'systemdesign-vs-techinterview',
    leftResource: {
      name: 'System Design Primer',
      icon: 'i-heroicons-server-stack',
      color: 'purple',
      pros: ['Deep system design focus', 'Visual diagrams', 'Comprehensive coverage']
    },
    rightResource: {
      name: 'Tech Interview Handbook',
      icon: 'i-heroicons-book-open',
      color: 'green',
      pros: ['Comprehensive interview prep', 'All topics covered', 'Practical tips']
    },
    pickLeft: 'You need to ace system design rounds',
    pickRight: 'You want all-in-one interview prep',
    verdict: 'Use both - they complement each other perfectly'
  },
  {
    id: 'neetcode-vs-leetcode',
    leftResource: {
      name: 'NeetCode',
      icon: 'i-heroicons-play-circle',
      color: 'cyan',
      pros: ['Video explanations', 'Curated roadmap', 'Patterns-based learning']
    },
    rightResource: {
      name: 'LeetCode',
      icon: 'i-heroicons-code-bracket-square',
      color: 'yellow',
      pros: ['Massive problem set', 'Company tags', 'Contests']
    },
    pickLeft: 'You learn better with video explanations',
    pickRight: 'You want the most comprehensive problem set',
    verdict: 'NeetCode for learning patterns, LeetCode for practice volume'
  }
]

// How We Compare Points
const howWeCompare = [
  {
    icon: 'i-heroicons-check-badge',
    title: 'We actually use these resources',
    description: 'Our team has hands-on experience with every resource we compare'
  },
  {
    icon: 'i-heroicons-user-group',
    title: 'We consider learning style differences',
    description: 'Different people learn differently - we account for that'
  },
  {
    icon: 'i-heroicons-chat-bubble-left-right',
    title: 'We look at community feedback',
    description: 'Real user experiences inform our recommendations'
  },
  {
    icon: 'i-heroicons-arrow-path',
    title: 'We update comparisons regularly',
    description: 'Resources evolve, and so do our comparisons'
  }
]

// Helper function for resource colors
const getResourceColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: 'text-yellow-600 dark:text-yellow-400',
      badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-200 dark:border-orange-800',
      icon: 'text-orange-600 dark:text-orange-400',
      badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      icon: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: 'text-green-600 dark:text-green-400',
      badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    },
    cyan: {
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      border: 'border-cyan-200 dark:border-cyan-800',
      icon: 'text-cyan-600 dark:text-cyan-400',
      badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
    }
  }
  return colors[color] || colors.blue
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-white dark:bg-black">
      <UContainer class="py-16 sm:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <UIcon name="i-heroicons-scale" class="w-4 h-4" />
            Head-to-Head Comparisons
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Resource Showdowns
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Head-to-head comparisons to help you choose the right learning resource. We break down the pros and cons so you don't have to.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <UButton 
              to="#comparisons" 
              size="lg" 
              class="bg-accent hover:bg-accent/90 text-white px-6"
            >
              View Comparisons
            </UButton>
            <UButton 
              to="/resources" 
              size="lg" 
              variant="outline"
              class="border-gray-300 dark:border-gray-700"
            >
              Browse All Resources
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Comparison Cards Section -->
    <div id="comparisons" class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Popular Comparisons
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We've analyzed the most commonly compared learning resources to help you make informed decisions.
          </p>
        </div>

        <div class="space-y-8 max-w-5xl mx-auto">
          <div 
            v-for="comparison in comparisons" 
            :key="comparison.id"
            class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all"
          >
            <!-- VS Header -->
            <div class="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 p-6 border-b border-gray-200 dark:border-gray-800">
              <!-- Left Resource -->
              <div 
                class="flex items-center gap-3 p-4 rounded-lg border"
                :class="[
                  getResourceColorClasses(comparison.leftResource.color).bg,
                  getResourceColorClasses(comparison.leftResource.color).border
                ]"
              >
                <UIcon 
                  :name="comparison.leftResource.icon" 
                  class="w-10 h-10 flex-shrink-0"
                  :class="getResourceColorClasses(comparison.leftResource.color).icon"
                />
                <span class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ comparison.leftResource.name }}
                </span>
              </div>

              <!-- VS Badge -->
              <div class="flex items-center justify-center">
                <span class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold text-lg rounded-full">
                  VS
                </span>
              </div>

              <!-- Right Resource -->
              <div 
                class="flex items-center gap-3 p-4 rounded-lg border"
                :class="[
                  getResourceColorClasses(comparison.rightResource.color).bg,
                  getResourceColorClasses(comparison.rightResource.color).border
                ]"
              >
                <UIcon 
                  :name="comparison.rightResource.icon" 
                  class="w-10 h-10 flex-shrink-0"
                  :class="getResourceColorClasses(comparison.rightResource.color).icon"
                />
                <span class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ comparison.rightResource.name }}
                </span>
              </div>
            </div>

            <!-- Pros Comparison -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-gray-200 dark:border-gray-800">
              <!-- Left Pros -->
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  {{ comparison.leftResource.name }} Strengths
                </h4>
                <ul class="space-y-2">
                  <li 
                    v-for="pro in comparison.leftResource.pros" 
                    :key="pro"
                    class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <UIcon 
                      name="i-heroicons-check-circle" 
                      class="w-5 h-5 flex-shrink-0"
                      :class="getResourceColorClasses(comparison.leftResource.color).icon"
                    />
                    {{ pro }}
                  </li>
                </ul>
              </div>

              <!-- Right Pros -->
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  {{ comparison.rightResource.name }} Strengths
                </h4>
                <ul class="space-y-2">
                  <li 
                    v-for="pro in comparison.rightResource.pros" 
                    :key="pro"
                    class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <UIcon 
                      name="i-heroicons-check-circle" 
                      class="w-5 h-5 flex-shrink-0"
                      :class="getResourceColorClasses(comparison.rightResource.color).icon"
                    />
                    {{ pro }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Pick This If -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50">
              <!-- Pick Left -->
              <div 
                class="p-4 rounded-lg border-2 border-dashed"
                :class="getResourceColorClasses(comparison.leftResource.color).border"
              >
                <div class="flex items-center gap-2 mb-2">
                  <UIcon 
                    name="i-heroicons-hand-thumb-up" 
                    class="w-5 h-5"
                    :class="getResourceColorClasses(comparison.leftResource.color).icon"
                  />
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                    Pick {{ comparison.leftResource.name }} if:
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ comparison.pickLeft }}
                </p>
              </div>

              <!-- Pick Right -->
              <div 
                class="p-4 rounded-lg border-2 border-dashed"
                :class="getResourceColorClasses(comparison.rightResource.color).border"
              >
                <div class="flex items-center gap-2 mb-2">
                  <UIcon 
                    name="i-heroicons-hand-thumb-up" 
                    class="w-5 h-5"
                    :class="getResourceColorClasses(comparison.rightResource.color).icon"
                  />
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                    Pick {{ comparison.rightResource.name }} if:
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ comparison.pickRight }}
                </p>
              </div>
            </div>

            <!-- Verdict -->
            <div class="p-6 bg-accent/5">
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-light-bulb" class="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <span class="text-sm font-semibold text-accent uppercase tracking-wide">Our Verdict:</span>
                  <p class="text-gray-700 dark:text-gray-300 mt-1">
                    {{ comparison.verdict }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- How We Compare Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            How We Compare
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our comparison methodology ensures you get honest, practical recommendations.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div 
            v-for="point in howWeCompare" 
            :key="point.title"
            class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-accent dark:hover:border-accent hover:shadow-lg transition-all"
          >
            <div class="mb-4">
              <UIcon :name="point.icon" class="w-8 h-8 text-accent" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              {{ point.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ point.description }}
            </p>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Request a Comparison Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-16 sm:py-20">
        <div class="max-w-3xl mx-auto">
          <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 text-center">
            <div class="mb-6">
              <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="w-12 h-12 text-accent mx-auto" />
            </div>
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Don't See a Comparison You Need?
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              We're always looking to add more comparisons. Let us know which resources you'd like us to compare, and we'll add it to our list!
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <UButton 
                to="https://github.com/grey-software/grey-software/issues/new?labels=comparison-request&title=Comparison%20Request:"
                target="_blank"
                size="lg" 
                class="bg-accent hover:bg-accent/90 text-white px-6"
              >
                <UIcon name="i-heroicons-plus-circle" class="w-5 h-5 mr-2" />
                Request a Comparison
              </UButton>
              <UButton 
                to="https://github.com/grey-software/grey-software"
                target="_blank"
                size="lg" 
                variant="outline"
                class="border-gray-300 dark:border-gray-700"
              >
                <UIcon name="lucide-github" class="w-5 h-5 mr-2" />
                Contribute on GitHub
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- CTA Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-20 sm:py-28">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Now that you know which resources fit your needs, explore our curated bundles or browse all resources.
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
            <UButton 
              to="/roadmaps" 
              size="xl" 
              variant="outline"
              class="border-gray-300 dark:border-gray-700 px-8 py-3"
            >
              View Learning Bundles
            </UButton>
          </div>

          <!-- Related Links -->
          <div class="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Explore more:</p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              <NuxtLink 
                to="/roadmaps/interview-prep"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Interview Prep Bundle
              </NuxtLink>
              <NuxtLink 
                to="/roadmaps/web-fundamentals"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Web Fundamentals
              </NuxtLink>
              <NuxtLink 
                to="/challenges"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                30-Day Challenges
              </NuxtLink>
              <NuxtLink 
                to="/careers"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Career Paths
              </NuxtLink>
            </div>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>