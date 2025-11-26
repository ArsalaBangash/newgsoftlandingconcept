<!-- pages/about.vue -->
<script setup lang="ts">
useSeoMeta({
  title: 'About Grey Software | Open Software, Open Education',
  description: 'Learn about Grey Software\'s mission to democratize education through curating the world\'s best free and open source resources for developers.',
  ogTitle: 'About Grey Software',
  ogDescription: 'Open Software, Open Education - Curated free resources for developers worldwide',
  ogImage: '/og-about.png',
  twitterCard: 'summary_large_image'
})

// Fetch all resources for statistics
const { data: allResources } = await useAsyncData('about-resources', () =>
  queryCollection('resources').all()
)

const stats = computed(() => {
  if (!allResources.value) return null
  
  const resources = allResources.value
  
  return {
    totalResources: resources.length,
    freeResources: resources.filter(r => r.isFree).length,
    openSourceResources: resources.filter(r => r.isOpenSource).length,
    topics: new Set(resources.map(r => r.topic)).size,
    formats: {
      videos: resources.filter(r => r.format === 'video').length,
      articles: resources.filter(r => r.format === 'article').length,
      courses: resources.filter(r => r.format === 'course').length,
      tools: resources.filter(r => r.format === 'tool').length,
      books: resources.filter(r => r.format === 'book').length,
      documentation: resources.filter(r => r.format === 'documentation').length
    }
  }
})

// Why Grey Software features
const whyGreySoftware = [
  {
    title: 'Community-Driven Curation',
    description: 'Resources are vetted and recommended by real developers, not algorithms.',
    benefit: 'Quality over quantity',
    icon: 'i-heroicons-users'
  },
  {
    title: '100% Free Resources',
    description: 'Every resource we feature is completely free to access.',
    benefit: 'No paywalls, no hidden costs',
    icon: 'i-heroicons-gift'
  },
  {
    title: 'Open Source Philosophy',
    description: 'Our platform is open source - contribute, fork, or learn from our code.',
    benefit: 'Transparency and community ownership',
    icon: 'i-heroicons-code-bracket'
  },
  {
    title: 'Structured Learning Paths',
    description: 'Not just random resources - curated bundles and roadmaps for guided learning.',
    benefit: 'Clear direction for your learning journey',
    icon: 'i-heroicons-map'
  },
  {
    title: 'Quality Standards',
    description: 'Every resource meets our quality criteria before being added.',
    benefit: 'No wasted time on outdated or low-quality content',
    icon: 'i-heroicons-shield-check'
  },
  {
    title: 'Regular Updates',
    description: 'We continuously add new resources and remove outdated ones.',
    benefit: 'Always current and relevant',
    icon: 'i-heroicons-arrow-path'
  }
]

// Core values
const values = [
  {
    title: 'Free & Open Source First',
    description: 'We prioritize resources that are freely available and open source, ensuring accessibility for everyone.',
    icon: 'i-heroicons-heart'
  },
  {
    title: 'Quality Over Quantity',
    description: 'Every resource is carefully vetted for quality, relevance, and educational value before being added.',
    icon: 'i-heroicons-check-badge'
  },
  {
    title: 'Community Driven',
    description: 'Our curation is powered by developer contributions and feedback from the global tech community.',
    icon: 'i-heroicons-user-group'
  },
  {
    title: 'Transparency',
    description: 'Open about our curation process and criteria. All resources are clearly categorized and described.',
    icon: 'i-heroicons-eye'
  }
]

// Curation process steps
const curationSteps = [
  {
    step: 1,
    title: 'Community Submissions',
    description: 'Developers from around the world submit resources via GitHub pull requests with detailed information.'
  },
  {
    step: 2,
    title: 'Quality Review',
    description: 'Each submission is reviewed for quality, accuracy, and educational value against our strict criteria.'
  },
  {
    step: 3,
    title: 'Metadata Enrichment',
    description: 'We add comprehensive metadata including difficulty levels, time estimates, licenses, and learning path connections.'
  },
  {
    step: 4,
    title: 'Continuous Updates',
    description: 'Resources are regularly reviewed and updated to ensure they remain relevant and maintain high quality.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <!-- Hero Section -->
    <section class="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Open Software, Open Education
          </h1>
          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8">
            Our mission is to democratize education by curating the world's best free and open source resources,
            making quality learning accessible to developers everywhere.
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <NuxtLink to="/resources">
              <UButton size="lg" color="primary">
                <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 mr-2" />
                Explore Resources
              </UButton>
            </NuxtLink>
            <NuxtLink to="/resources/contribute">
              <UButton size="lg" variant="outline">
                <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
                Contribute
              </UButton>
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </section>

    <UContainer class="py-12">
      <!-- Stats -->
      <div v-if="stats" class="mb-20">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
            <div class="text-3xl sm:text-4xl font-bold text-accent mb-2">
              {{ stats.totalResources }}+
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Curated Resources
            </div>
          </div>

          <div class="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
            <div class="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {{ Math.round((stats.freeResources / stats.totalResources) * 100) }}%
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Free Resources
            </div>
          </div>

          <div class="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
            <div class="text-3xl sm:text-4xl font-bold text-accent mb-2">
              {{ stats.openSourceResources }}+
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Open Source
            </div>
          </div>

          <div class="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
            <div class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {{ stats.topics }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Topics Covered
            </div>
          </div>
        </div>
      </div>

      <!-- Why Grey Software Section -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Grey Software?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're not just another resource aggregator. Here's what makes Grey Software different.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in whyGreySoftware"
            :key="feature.title"
            class="group p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl hover:border-accent dark:hover:border-accent transition-all duration-300"
          >
            <div class="w-12 h-12 mb-4 flex items-center justify-center bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
              <UIcon :name="feature.icon" class="w-6 h-6 text-accent" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {{ feature.description }}
            </p>
            <div class="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
              <UIcon name="i-heroicons-check-circle" class="w-4 h-4" />
              {{ feature.benefit }}
            </div>
          </div>
        </div>
      </section>

      <!-- Our Story Section -->
      <section class="mb-20">
        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div class="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Grey Software started with a simple observation: the best learning resources are often scattered across the internet,
                  buried under paywalls, or lost in the noise of low-quality content.
                </p>
                <p>
                  We believed that quality education should be accessible to everyone, regardless of their financial situation or location.
                  So we set out to build a curated collection of the world's best free and open source developer resources.
                </p>
                <p>
                  Today, Grey Software is a community-driven platform where developers help developers. Every resource is vetted by real
                  people who care about quality, and our entire platform is open source—because we practice what we preach.
                </p>
              </div>
            </div>
            <div class="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/5 rounded-2xl p-8">
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-accent/20 rounded-lg">
                    <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">The Problem</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Quality resources are hard to find and often expensive</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-accent/20 rounded-lg">
                    <UIcon name="i-heroicons-rocket-launch" class="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">Our Solution</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Community-curated, 100% free, always accessible</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-accent/20 rounded-lg">
                    <UIcon name="i-heroicons-heart" class="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">Our Mission</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Democratize education for developers worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Values -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Core Values
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            These principles guide everything we do at Grey Software.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div
            v-for="value in values"
            :key="value.title"
            class="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl"
          >
            <div class="w-12 h-12 mb-4 flex items-center justify-center bg-accent/10 rounded-xl">
              <UIcon :name="value.icon" class="w-6 h-6 text-accent" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ value.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ value.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Curation Process -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How We Curate
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every resource goes through our rigorous curation process to ensure quality.
          </p>
        </div>
        <div class="max-w-3xl mx-auto">
          <div class="relative">
            <!-- Vertical line -->
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
            
            <div class="space-y-8">
              <div
                v-for="step in curationSteps"
                :key="step.step"
                class="relative flex gap-6"
              >
                <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent text-white rounded-full font-semibold text-sm z-10">
                  {{ step.step }}
                </div>
                <div class="flex-1 pb-8">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {{ step.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contributors Section -->
      <section class="mb-20">
        <div class="max-w-4xl mx-auto text-center">
          <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
            <UIcon name="i-heroicons-user-group" class="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Built by the Community
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Grey Software is made possible by developers from around the world who contribute their time and expertise
              to curate, review, and improve our resource collection. Every contribution matters.
            </p>
            <div class="flex flex-wrap gap-3 justify-center">
              <a
                href="https://github.com/grey-software/grey-software/graphs/contributors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <UButton variant="soft" color="primary">
                  <UIcon name="i-heroicons-users" class="w-4 h-4 mr-2" />
                  View Contributors
                </UButton>
              </a>
              <NuxtLink to="/resources/contribute">
                <UButton variant="outline">
                  <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
                  Become a Contributor
                </UButton>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Get Involved CTA -->
      <section class="mb-12">
        <div class="max-w-4xl mx-auto">
          <div class="p-8 sm:p-12 bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl text-center">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get Involved
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Help us build the world's most comprehensive library of free and open source developer resources.
              There are many ways to contribute!
            </p>
            <div class="grid sm:grid-cols-3 gap-4 mb-8">
              <div class="p-4 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800">
                <UIcon name="i-heroicons-document-plus" class="w-8 h-8 text-accent mx-auto mb-2" />
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Submit Resources</h4>
                <p class="text-xs text-gray-600 dark:text-gray-400">Share your favorite learning materials</p>
              </div>
              <div class="p-4 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800">
                <UIcon name="i-heroicons-code-bracket" class="w-8 h-8 text-accent mx-auto mb-2" />
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Contribute Code</h4>
                <p class="text-xs text-gray-600 dark:text-gray-400">Help improve our open source platform</p>
              </div>
              <div class="p-4 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800">
                <UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8 text-accent mx-auto mb-2" />
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Spread the Word</h4>
                <p class="text-xs text-gray-600 dark:text-gray-400">Tell others about Grey Software</p>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <NuxtLink to="/resources/contribute">
                <UButton size="lg" color="primary">
                  <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
                  Submit a Resource
                </UButton>
              </NuxtLink>
              <a
                href="https://github.com/grey-software"
                target="_blank"
                rel="noopener noreferrer"
              >
                <UButton size="lg" variant="outline">
                  <UIcon name="i-simple-icons-github" class="w-5 h-5 mr-2" />
                  View on GitHub
                </UButton>
              </a>
            </div>
          </div>
        </div>
      </section>
    </UContainer>
  </div>
</template>
