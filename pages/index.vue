<!-- pages/index.vue -->
<script setup lang="ts">

// Fetch all collections
const { data: allResources } = await useAsyncData('all-resources', () =>
  queryCollection('resources').all()
)

const { data: partners } = await useAsyncData('partners', () =>
  queryCollection('partners').all()
)

const { data: bundles } = await useAsyncData('learning-bundles', () =>
  queryCollection('bundles').all()
)

const { data: successStories } = await useAsyncData('success-stories', () =>
  queryCollection('successStories').all()
)

// Featured resources for Expert Essentials and Master's Collection sections
const featuredResources = computed(() => {
  return (allResources.value || []).filter(r => r.featured)
})

// Documentation resources for Hidden Gems section
const documentation = computed(() => {
  return (allResources.value || []).filter((r: any) => r.format === 'documentation')
})

const latestResources = computed(() => {
  return (allResources.value || []).slice(0, 6) // Show first 6 resources as latest
})

const newThisMonth = computed(() => {
  const now = new Date()
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
  return (allResources.value || [])
    .filter((r: any) => {
      if (!r.publishedAt) return false
      const publishedDate = new Date(r.publishedAt)
      return publishedDate >= oneMonthAgo
    })
    .slice(0, 6) // Show up to 6 newest resources
})

// Filter state
const selectedDifficulty = ref('')
const selectedTime = ref('')
const selectedCategory = ref('')

// Filtered resources
const filteredResources = computed(() => {
  let resources = allResources.value || []
  
  if (selectedDifficulty.value) {
    resources = resources.filter((r: any) => r.difficulty === selectedDifficulty.value)
  }
  
  if (selectedCategory.value) {
    resources = resources.filter((r: any) => r.category === selectedCategory.value)
  }
  
  return resources.slice(0, 12) // Show first 12 filtered results
})

// Quick wins - resources under 2 hours
const quickWins = computed(() => {
  return (allResources.value || [])
    .filter((r: any) => {
      if (!r.estimatedTime) return false
      // Parse time estimates like "30 minutes", "2 hours", "1 hour"
      const timeStr = r.estimatedTime.toLowerCase()
      if (timeStr.includes('hour') && timeStr.includes('2')) return false // Exclude 2+ hours
      if (timeStr.includes('hour')) return true // Include 1 hour
      if (timeStr.includes('minute')) {
        const minutes = parseInt(timeStr.match(/\d+/)?.[0] || '0')
        return minutes <= 120 // Include up to 2 hours in minutes
      }
      return false
    })
    .slice(0, 6)
})

// Trending this week - recently updated or featured resources
const trendingThisWeek = computed(() => {
  const now = new Date()
  const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
  
  return (allResources.value || [])
    .filter((r: any) => {
      // Include recently updated resources or those marked as featured
      if (r.featured) return true
      if (!r.lastUpdated) return r.featured || false
      const updatedDate = new Date(r.lastUpdated)
      return updatedDate >= oneWeekAgo
    })
    .sort((a: any, b: any) => {
      // Sort by featured first, then by date
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime()
    })
    .slice(0, 6)
})

// Books - Filter all book resources
const allBooks = computed(() => {
  return (allResources.value || []).filter((r: any) => r.category === 'book' || r.format === 'book')
})

// Open Source Books - Free books on GitHub
const openSourceBooks = computed(() => {
  return allBooks.value.filter((r: any) => r.isOpenSource && r.isFree)
})

// Featured Books
const featuredBooks = computed(() => {
  return allBooks.value.filter((r: any) => r.featured)
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeFeatures />
    <!-- Quick Decision Tool - Find Your Path -->
    <div class="bg-white dark:bg-black">
      <UContainer class="py-24">
        <div class="mb-16">
          <div class="inline-flex items-center gap-3 mb-4">
            <UIcon name="lucide-target" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
              What Should You Learn Next?
            </h2>
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Overwhelmed by choices? Answer a few quick questions and we'll point you to the perfect resources for your situation.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink to="/resources?difficulty=beginner&category=course" class="rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow group block">
            <div class="mb-3"><UIcon name="lucide-refresh-ccw" class="w-7 h-7 text-gray-600 dark:text-gray-300" /></div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">Career Change?</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">You're switching fields. You need structured, beginner-friendly resources.</p>
            <div class="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-accent">
              Find Beginner Courses
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </NuxtLink>

          <NuxtLink to="/resources?tags=interview-prep&category=practice" class="rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow group block">
            <div class="mb-3"><UIcon name="lucide-briefcase" class="w-7 h-7 text-gray-600 dark:text-gray-300" /></div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">Interview Prep?</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">You're preparing for technical interviews. You need focused, battle-tested resources.</p>
            <div class="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-accent">
              Interview Resources
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </NuxtLink>

          <NuxtLink to="/resources?difficulty=advanced" class="rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow group block">
            <div class="mb-3"><UIcon name="lucide-rocket" class="w-7 h-7 text-gray-600 dark:text-gray-300" /></div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">Level Up Existing Skills?</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">You know basics. You want to master advanced concepts and patterns.</p>
            <div class="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-accent">
              Advanced Resources
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </NuxtLink>

          <NuxtLink to="#learning-bundles" class="rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow group block">
            <div class="mb-3"><UIcon name="lucide-zap" class="w-7 h-7 text-gray-600 dark:text-gray-300" /></div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">Quick Learning Sprints?</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">You have limited time. You want intensive, high-impact learning bundles.</p>
            <div class="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-accent">
              Browse Learning Bundles
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </NuxtLink>
        </div>

        <div class="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <p class="text-center text-gray-700 dark:text-gray-300">
            <span class="font-semibold">Still not sure?</span> Scroll down to see our curated bundles, comparison guides, and real success stories from developers in your situation.
          </p>
        </div>
      </UContainer>
    </div>

    <!-- Expert Essentials - The Non-Negotiables -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-indigo-950/40 dark:via-blue-950/40 dark:to-cyan-950/40">
      <UContainer class="py-24">
        <div class="mb-16">
          <div class="inline-flex items-center gap-3 mb-4">
            <UIcon name="lucide-star" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
              Expert Essentials
            </h2>
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            The non-negotiable resources every serious developer needs to know. These are the foundations that separate capable engineers from exceptional ones.
          </p>
          <div class="bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-300 dark:border-indigo-700 rounded-lg p-6 max-w-3xl">
            <p class="text-indigo-900 dark:text-indigo-100 font-medium mb-2">🎯 Why Master These First?</p>
            <p class="text-indigo-800 dark:text-indigo-200">
              These curated essentials have been battle-tested by tens of thousands of developers. They build the foundational skills that unlock everything else—from landing your first dev job to architecting systems at scale.
            </p>
          </div>
        </div>
        
        <div v-if="featuredResources.length > 0" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in featuredResources.slice(0, 6)" 
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

        <div class="mt-8 flex justify-center">
          <NuxtLink
            to="/resources?featured=true"
            class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold underline underline-offset-4"
          >
            See all featured resources →
          </NuxtLink>
        </div>
      </UContainer>
    </div>

    <!-- Trending This Week -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-orange-950/30 dark:to-orange-900/20">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <UIcon name="lucide-flame" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            Trending This Week
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            The hottest resources spotted in the developer community - fresh updates and handpicked favorites.
          </p>
          <div class="bg-orange-100 dark:bg-orange-950/50 border border-orange-300 dark:border-orange-700 rounded-lg p-6 max-w-3xl">
            <p class="text-orange-800 dark:text-orange-200 font-medium mb-2">⚡ Stay Ahead of the Curve:</p>
            <p class="text-orange-700 dark:text-orange-300">
              "The tech landscape shifts faster than ever. These trending resources represent what the developer community is buzzing about right now. By diving into what's hot, you're not just learning - you're staying competitive and discovering tools before they hit the mainstream. What will you master this week?"
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in trendingThisWeek" 
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
      </UContainer>
    </div>

    <HomePartners :partners="partners" />

    <!-- Editor's Picks - Best of This Month -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-amber-950/30 dark:to-yellow-950/30">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <UIcon name="lucide-star" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            Editor's Picks - October 2025
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Hand-curated by our team. These resources stood out this month.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="rounded-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
            <div class="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <UIcon name="lucide-bar-chart" class="w-16 h-16 text-gray-600 dark:text-gray-300" />
            </div>
            <div class="p-6 bg-white dark:bg-gray-900">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">System Design Primer</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Master distributed systems architecture like the pros. 80-hour deep dive into scalability.</p>
              <div class="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-2 transition-transform">
                Start Learning <span>→</span>
              </div>
            </div>
          </div>

          <div class="rounded-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
            <div class="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <UIcon name="lucide-bot" class="w-16 h-16 text-gray-600 dark:text-gray-300" />
            </div>
            <div class="p-6 bg-white dark:bg-gray-900">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Google ML Crash Course</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">15-hour interactive course on machine learning fundamentals from Google engineers. No prerequisites needed.</p>
              <div class="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                Start Learning <span>→</span>
              </div>
            </div>
          </div>

          <div class="rounded-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
            <div class="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <UIcon name="lucide-rocket" class="w-16 h-16 text-gray-600 dark:text-gray-300" />
            </div>
            <div class="p-6 bg-white dark:bg-gray-900">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Full Stack Open 2024</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Complete modern web stack: React, Node, MongoDB, GraphQL. 11 parts, thousands of hours invested in quality.</p>
              <div class="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                Start Learning <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Resource Discovery Filters -->
    <!-- <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <UContainer class="py-16">
        <div class="mb-12">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Discover Your Perfect Resource
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Filter by your skill level, time commitment, and interests.
          </p>
        </div>
        
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          <USelect
            v-model="selectedDifficulty"
            placeholder="Skill Level"
            :options="[
              { label: '🟢 Beginner', value: 'beginner' },
              { label: '🟡 Intermediate', value: 'intermediate' },
              { label: '🔴 Advanced', value: 'advanced' },
              { label: 'All Levels', value: 'all-levels' }
            ]"
            class="w-48"
          />
          
          <USelect
            v-model="selectedCategory"
            placeholder="Category"
            :options="[
              { label: '📚 Courses', value: 'course' },
              { label: '📖 Articles', value: 'article' },
              { label: '🛠️ Tools', value: 'tool' },
              { label: '🎧 Podcasts', value: 'podcast' },
              { label: '🎮 Interactive', value: 'interactive' },
              { label: '📧 Newsletters', value: 'newsletter' },
              { label: '👥 Community', value: 'community' },
              { label: '💼 Career', value: 'career' },
              { label: '📚 Documentation', value: 'documentation' }
            ]"
            class="w-48"
          />
          
          <UButton
            @click="selectedDifficulty = ''; selectedCategory = ''"
            variant="outline"
            size="md"
          >
            Clear Filters
          </UButton>
        </div>
        
        <div v-if="filteredResources.length > 0" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ResourceCard
            v-for="resource in filteredResources" 
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
        
        <div v-else-if="selectedDifficulty || selectedCategory" class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-400">No resources found matching your filters. Try adjusting your criteria.</p>
        </div>
      </UContainer>
    </div> -->

    <!-- Quick Wins -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-950">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            ⚡ Quick Wins (< 2 hours)
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Fast-track your learning with bite-sized resources you can complete today.
          </p>
          <div class="bg-green-100 dark:bg-green-950/50 border border-green-300 dark:border-green-700 rounded-lg p-6 max-w-3xl">
            <p class="text-green-800 dark:text-green-200 font-medium mb-2">🚀 Your Productivity Coach Says:</p>
            <p class="text-green-700 dark:text-green-300">
              "Every expert was once a beginner, and every journey starts with small steps. These quick wins are your training wheels - perfect for building momentum without overwhelm. Complete one today, and you'll feel that satisfying 'I got this' confidence boost. Consistency compounds!"
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in quickWins" 
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
      </UContainer>
    </div>

    <!-- 👑 Master's Collection - Elite Resources -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-purple-950/40 dark:via-pink-950/40 dark:to-rose-950/40">
      <UContainer class="py-24">
        <div class="mb-16">
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="text-3xl">👑</span>
            <h2 class="text-3xl sm:text-4xl font-semibold dark:from-purple-300 dark:to-pink-300">
              Master's Collection
            </h2>
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            The most transformative, battle-tested resources handpicked by experts. These are the tools that accelerate careers and change how developers think.
          </p>
          <div class="dark:from-purple-900/50 dark:to-pink-900/50 border border-purple-200 dark:border-purple-800 rounded-lg p-6 max-w-3xl">
            <p class="text-purple-900 dark:text-purple-100 font-medium mb-2">✨ Why This Collection?</p>
            <p class="text-purple-800 dark:text-purple-200">
              Each resource here has proven itself across thousands of developers. Not just good—transformative. Master these foundations and you'll build, debug, and design with confidence others take years to achieve.
            </p>
          </div>
        </div>
        
        <div v-if="featuredResources.length > 0" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ResourceCard
            v-for="resource in featuredResources.slice(0, 8)" 
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

        <div v-if="featuredResources.length > 8" class="text-center mt-12">
          <NuxtLink
            to="/resources?featured=true"
            class="inline-flex items-center gap-2 px-6 py-3 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            Explore All Featured Resources
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>
      </UContainer>
    </div>

    <!-- Learning Bundles - Complete Skill Paths -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-emerald-950/40 dark:to-teal-950/40">
      <UContainer class="py-24">
        <div class="mb-16">
          <div class="inline-flex items-center gap-3 mb-4">
            <UIcon name="lucide-library" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
              Learning Bundles
            </h2>
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            Complete, structured learning paths. Stop jumping between resources. Follow these curated bundles from zero to hero in your chosen skill.
          </p>
          <div class="bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-700 rounded-lg p-6 max-w-3xl">
            <p class="text-emerald-900 dark:text-emerald-100 font-medium mb-2"><strong>How It Works</strong></p>
            <p class="text-emerald-800 dark:text-emerald-200">
              Each bundle combines the best resources in a proven sequence. No more decision paralysis. Pick your goal, follow the path, and level up. Typical completion time: 6-12 weeks depending on pace.
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="bundle in bundles" :key="bundle.id" class="group">
            <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 h-full hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 transition-all transform hover:-translate-y-1">
              <!-- Header -->
              <div class="mb-4">
                <div class="flex items-start gap-3 mb-3">
                  <UIcon v-if="bundle.icon" :name="bundle.icon" class="w-6 h-6 text-gray-600 dark:text-gray-300 flex-shrink-0 mt-1" />
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {{ bundle.title }}
                    </h3>
                  </div>
                  <span class="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap" :class="bundle.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' : bundle.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' : 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'">
                    {{ bundle.difficulty }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {{ bundle.description }}
                </p>
              </div>

              <!-- Duration -->
              <div class="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-200 dark:border-emerald-800">
                <p class="text-sm font-semibold text-emerald-900 dark:text-emerald-100"><UIcon name="lucide-clock" class="w-4 h-4 inline-block mr-1" /> {{ bundle.duration }}</p>
              </div>

              <!-- Resource Count -->
              <div class="mb-4">
                <p class="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2"><UIcon name="lucide-package" class="w-4 h-4 inline-block mr-1" /> {{ (bundle.resources || []).length }} Resources</p>
                <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <li v-for="(resource, idx) in (bundle.resources || []).slice(0, 3)" :key="idx" class="flex items-start gap-2">
                    <span class="text-emerald-600 dark:text-emerald-400 font-bold">→</span>
                    <span class="line-clamp-1">{{ resource.title }}</span>
                  </li>
                  <li v-if="(bundle.resources || []).length > 3" class="text-emerald-600 dark:text-emerald-400 font-medium">
                    +{{ (bundle.resources || []).length - 3 }} more...
                  </li>
                </ul>
              </div>

              <!-- Outcomes Preview -->
              <div class="mb-4">
                <p class="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">✅ You'll Master</p>
                <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <li v-for="(outcome, idx) in (bundle.outcomes || []).slice(0, 2)" :key="idx" class="flex items-start gap-2">
                    <span class="text-green-600 dark:text-green-400">✓</span>
                    <span>{{ outcome }}</span>
                  </li>
                </ul>
              </div>

              <!-- CTA -->
              <div class="pt-4 border-t border-gray-200 dark:border-gray-800">
                <button class="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-semibold rounded transition-colors text-sm">
                  Start This Path →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <p class="text-gray-600 dark:text-gray-400 mb-4">Ready to commit to a structured learning journey?</p>
          <a href="#" class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105">
            Browse All Learning Paths
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </UContainer>
    </div>

    <!-- 🌍 Real World Tech Stacks - What Actually Powers the Internet -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-slate-950/50 dark:to-gray-950/50">
      <UContainer class="py-24">
        <div class="mb-16">
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="text-3xl">🌍</span>
            <h2 class="text-3xl sm:text-4xl font-semibold dark:from-slate-300 dark:to-gray-300">
              Real World Tech Stacks
            </h2>
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            Forget the JavaScript bubble. Here's what ACTUALLY powers production systems worldwide—and why learning these gives you job security and higher pay.
          </p>
          <div class="bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg p-6 max-w-3xl">
            <p class="text-slate-900 dark:text-slate-100 font-medium mb-2">📊 Real Numbers</p>
            <p class="text-slate-800 dark:text-slate-200 text-sm">
              77% of all websites use PHP. Java powers global banking and healthcare. .NET dominates enterprises. WordPress runs 43% of the web. These aren't dying technologies—they're the backbone of the digital world. Companies NEED developers who understand these systems.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- PHP/Laravel -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-3">🐘</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">PHP & Laravel</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span class="font-semibold text-green-600 dark:text-green-400">77% of all websites</span> - WordPress, Shopify, Facebook (originally), Slack (backend), Netflix (originally)
            </p>
            <div class="space-y-2 mb-4">
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">💰 Salary:</span> $70-120K (mid-level)</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">📈 Job Market:</span> Massive (freelance, agencies, web hosts)</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">🚀 Growth:</span> Stable, consistent demand</p>
            </div>
            <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800 mb-4">
              <p class="text-xs text-green-800 dark:text-green-200"><span class="font-bold">✓ Best for:</span> Web agencies, freelancing, WordPress development, MVPs</p>
            </div>
            <NuxtLink to="/resources?tags=php,laravel,wordpress" class="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-700">
              Learn PHP Stack
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Java/Spring -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-3">☕</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Java & Spring Boot</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span class="font-semibold text-blue-600 dark:text-blue-400">Fortune 500 companies</span> - Banks, insurance, healthcare, government systems
            </p>
            <div class="space-y-2 mb-4">
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">💰 Salary:</span> $90-150K (mid-level)</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">📈 Job Market:</span> Very strong (enterprise, startups)</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">🚀 Growth:</span> Stable, enterprise-driven</p>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 mb-4">
              <p class="text-xs text-blue-800 dark:text-blue-200"><span class="font-bold">✓ Best for:</span> Enterprise jobs, scale, stable careers, big paydays</p>
            </div>
            <NuxtLink to="/resources?tags=java,spring" class="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700">
              Learn Java Stack
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

          <!-- .NET/C# -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-3">🔷</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">C# & .NET</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span class="font-semibold text-purple-600 dark:text-purple-400">Microsoft ecosystem</span> - Enterprise, gaming (Unity), Azure cloud
            </p>
            <div class="space-y-2 mb-4">
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">💰 Salary:</span> $85-145K (mid-level)</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">📈 Job Market:</span> Strong (enterprise, Azure)</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">🚀 Growth:</span> Growing with cloud adoption</p>
            </div>
            <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800 mb-4">
              <p class="text-xs text-purple-800 dark:text-purple-200"><span class="font-bold">✓ Best for:</span> Enterprise .NET shops, game dev, Azure/Microsoft skills</p>
            </div>
            <NuxtLink to="/resources?tags=csharp,dotnet" class="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700">
              Learn .NET Stack
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Go -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-3">🐹</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Go (Golang)</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span class="font-semibold text-cyan-600 dark:text-cyan-400">Infrastructure & cloud</span> - Docker, Kubernetes, Terraform, cloud-native tools
            </p>
            <div class="space-y-2 mb-4">
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">💰 Salary:</span> $100-160K (mid-level)</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">📈 Job Market:</span> Growing rapidly (cloud, DevOps)</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">🚀 Growth:</span> Fastest growing (50%+ year-over-year)</p>
            </div>
            <div class="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded border border-cyan-200 dark:border-cyan-800 mb-4">
              <p class="text-xs text-cyan-800 dark:text-cyan-200"><span class="font-bold">✓ Best for:</span> Cloud infrastructure, DevOps, high pay, future-proof</p>
            </div>
            <NuxtLink to="/resources?tags=go,golang" class="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700">
              Learn Go
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Rust -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-3">🦀</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Rust</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span class="font-semibold text-orange-600 dark:text-orange-400">Systems & performance</span> - Linux kernel, Firefox, blockchain, WebAssembly
            </p>
            <div class="space-y-2 mb-4">
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">💰 Salary:</span> $120-200K+ (mid-level)</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">📈 Job Market:</span> Niche but very lucrative</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">🚀 Growth:</span> Exploding (crypto, systems, performance)</p>
            </div>
            <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800 mb-4">
              <p class="text-xs text-orange-800 dark:text-orange-200"><span class="font-bold">✓ Best for:</span> Premium pay, cutting-edge work, future-proof skills</p>
            </div>
            <NuxtLink to="/resources?tags=rust" class="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700">
              Learn Rust
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Python (Backend/Data) -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-3">🐍</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Python (Backend)</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span class="font-semibold text-green-600 dark:text-green-400">Data science & backend</span> - Django, FastAPI, machine learning, data pipelines
            </p>
            <div class="space-y-2 mb-4">
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">💰 Salary:</span> $80-140K (mid-level, ML roles higher)</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">📈 Job Market:</span> Very strong (ML, data, backend)</p>
              <p class="text-xs text-gray-700 dark:text-gray-300"><span class="font-bold">🚀 Growth:</span> Steady (tied to AI/ML boom)</p>
            </div>
            <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800 mb-4">
              <p class="text-xs text-green-800 dark:text-green-200"><span class="font-bold">✓ Best for:</span> Data science, AI/ML, backend APIs, rapid development</p>
            </div>
            <NuxtLink to="/resources?category=course&tags=python" class="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-700">
              Learn Python Backend
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <div class="mt-12 p-8 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg">
          <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">💡 The Real Career Truth</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p class="font-semibold text-slate-800 dark:text-slate-200 mb-2">🏆 Job Security</p>
              <p class="text-sm text-slate-700 dark:text-slate-300">Enterprise stacks (Java, .NET, PHP) have been around 20+ years and will be around 20+ more. Your skills won't become obsolete.</p>
            </div>
            <div>
              <p class="font-semibold text-slate-800 dark:text-slate-200 mb-2">💰 Better Pay</p>
              <p class="text-sm text-slate-700 dark:text-slate-300">Enterprise developers earn 20-30% more on average. Java/Go/Rust developers earn the most. Less hype, more money.</p>
            </div>
            <div>
              <p class="font-semibold text-slate-800 dark:text-slate-200 mb-2">🌍 Massive Market</p>
              <p class="text-sm text-slate-700 dark:text-slate-300">Your job options span every industry: banking, healthcare, government, retail. Not just startups. This is the real economy.</p>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- 🔐 Freedom Through Code - Digital Rights, Privacy, and Open Systems -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-indigo-950/50 dark:via-purple-950/50 dark:to-pink-950/50">
      <UContainer class="py-24">
        <div class="mb-16">
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="text-3xl">🔐</span>
            <h2 class="text-3xl sm:text-4xl font-semibold dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300">
              Freedom Through Code
            </h2>
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl font-medium">
            Technology is a tool for human dignity. Privacy, security, and open systems enable people worldwide to communicate freely, access knowledge, and protect their rights.
          </p>
          <div class="max-w-4xl space-y-4 text-left">
            <div class="bg-white/50 dark:bg-gray-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
              <p class="text-gray-800 dark:text-gray-200 mb-3">
                <span class="font-bold text-indigo-600 dark:text-indigo-400">🌍 Knowledge as Liberation:</span> In countries with limited internet access or government censorship, understanding cryptography, internet architecture, and open-source principles can be life-changing. Technology is a path to truth, education, and connection.
              </p>
              <p class="text-gray-800 dark:text-gray-200 mb-3">
                <span class="font-bold text-purple-600 dark:text-purple-400">🔒 Privacy as Freedom:</span> Privacy isn't about hiding—it's about autonomy and dignity. Whether you're a journalist in a restrictive regime, a dissident sharing information, or simply someone who values personal freedom, privacy protections matter.
              </p>
              <p class="text-gray-800 dark:text-gray-200">
                <span class="font-bold text-pink-600 dark:text-pink-400">⛓️ Decentralization as Power:</span> Centralized systems can be controlled by a few. Decentralized systems distribute power. Open-source software, peer-to-peer networks, and blockchain technologies enable systems that no single entity can censor or shut down.
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <!-- Card 1: Cryptography -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-4">🔐</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Cryptography</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Understand the mathematics that protect communication. Encryption isn't just for spies—it's how ordinary people keep their conversations private, their data safe, and their lives their own.
            </p>
            <div class="space-y-2 mb-4 text-xs text-gray-700 dark:text-gray-300">
              <p><span class="font-semibold">Learn:</span> How encryption works, digital signatures, authentication</p>
              <p><span class="font-semibold">Master course:</span> Cryptography I by Stanford & Dan Boneh</p>
              <p><span class="font-semibold">Time:</span> 20 hours</p>
            </div>
            <NuxtLink to="/resources?tags=cryptography" class="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">
              Explore Cryptography
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Card 2: Internet Architecture -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-purple-200 dark:border-purple-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-4">🌐</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Internet Architecture</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Know how information travels, where it's vulnerable, and how the internet actually works. Understanding infrastructure is understanding where freedom can be protected—and threatened.
            </p>
            <div class="space-y-2 mb-4 text-xs text-gray-700 dark:text-gray-300">
              <p><span class="font-semibold">Learn:</span> DNS, TCP/IP, routing, packets, surveillance points</p>
              <p><span class="font-semibold">Master resource:</span> How the Internet Actually Works (Code.org)</p>
              <p><span class="font-semibold">Time:</span> 10 hours</p>
            </div>
            <NuxtLink to="/resources?tags=internet" class="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700">
              Learn Internet Basics
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Card 3: Privacy & Anonymity -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-pink-200 dark:border-pink-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-4">🕵️</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Privacy & Anonymity</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Practical tools and techniques to protect your data: VPNs, Tor, encrypted messaging, password management. Privacy is a fundamental right for all.
            </p>
            <div class="space-y-2 mb-4 text-xs text-gray-700 dark:text-gray-300">
              <p><span class="font-semibold">Learn:</span> VPNs, Tor, Signal, Proton Mail, metadata protection</p>
              <p><span class="font-semibold">Master guide:</span> Internet Privacy Handbook (EFF)</p>
              <p><span class="font-semibold">Time:</span> 6 hours</p>
            </div>
            <NuxtLink to="/resources?tags=privacy" class="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-700">
              Master Privacy
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Card 4: Open Source -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-4">🔓</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Open Source Freedom</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Transparency builds trust. Open-source software lets you see the code, verify security, and trust what you're using. Participate in communities that believe code should be free.
            </p>
            <div class="space-y-2 mb-4 text-xs text-gray-700 dark:text-gray-300">
              <p><span class="font-semibold">Learn:</span> Why open-source matters, how to contribute, community power</p>
              <p><span class="font-semibold">Master guide:</span> The Open Source Way (Red Hat)</p>
              <p><span class="font-semibold">Time:</span> 8 hours</p>
            </div>
            <NuxtLink to="/resources?tags=open-source" class="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">
              Join Open Source
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Card 5: Decentralization -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-purple-200 dark:border-purple-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-4">⛓️</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Decentralized Systems</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Systems without intermediaries. Peer-to-peer networks, blockchain, and decentralized organizations create technologies that can't be shut down or censored by any single entity.
            </p>
            <div class="space-y-2 mb-4 text-xs text-gray-700 dark:text-gray-300">
              <p><span class="font-semibold">Learn:</span> Blockchain, DAOs, IPFS, censorship resistance</p>
              <p><span class="font-semibold">Master course:</span> Decentralized Internet (Ethereum Foundation)</p>
              <p><span class="font-semibold">Time:</span> 12 hours</p>
            </div>
            <NuxtLink to="/resources?tags=decentralization" class="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700">
              Explore Decentralization
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Card 6: Web Security -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-pink-200 dark:border-pink-800 p-6 hover:shadow-lg transition-all">
            <div class="text-4xl mb-4">🛡️</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Web Security</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Understanding attacks protects you and others. Learn SQL injection, XSS, authentication vulnerabilities, and defense mechanisms. Security by understanding.
            </p>
            <div class="space-y-2 mb-4 text-xs text-gray-700 dark:text-gray-300">
              <p><span class="font-semibold">Learn:</span> Common attacks, defense mechanisms, ethical hacking</p>
              <p><span class="font-semibold">Master course:</span> Web Security Academy (PortSwigger)</p>
              <p><span class="font-semibold">Time:</span> 15 hours</p>
            </div>
            <NuxtLink to="/resources?tags=security" class="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-700">
              Master Web Security
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Complete Learning Bundle -->
        <div class="dark:from-indigo-900/30 dark:to-pink-900/30 border border-indigo-300 dark:border-indigo-700 rounded-lg p-8 text-center">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">📚 Complete Learning Path: Digital Freedom & Privacy</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-6">
            A comprehensive 12-week bundle combining cryptography, internet architecture, privacy tools, open-source principles, and security knowledge. For anyone who believes technology should empower human freedom.
          </p>
          <NuxtLink to="/resources?tags=digital-freedom" class="inline-flex items-center gap-2 px-6 py-3 hover:from-indigo-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all">
            Start the Freedom Path
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="mt-12 text-center text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
          <p class="mb-2">
            <span class="font-semibold">Note:</span> This content is not political. These resources serve universal human values: dignity, freedom of thought, access to knowledge, and the ability to protect oneself. They're relevant everywhere—in democracies and restrictive regimes alike.
          </p>
        </div>
      </UContainer>
    </div>

    <!-- ⚔️ Resource Showdowns - Head-to-Head Comparisons -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-amber-950/40 dark:to-orange-950/40">
      <UContainer class="py-24">
        <div class="mb-16">
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="text-3xl">⚔️</span>
            <h2 class="text-3xl sm:text-4xl font-semibold dark:from-amber-300 dark:to-orange-300">
              Resource Showdowns
            </h2>
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            Can't decide between similar resources? Here's how they stack up against each other.
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Comparison 1: Codewars vs LeetCode -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
            <div class="dark:from-amber-900/50 dark:to-orange-900/50 p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">Codewars vs LeetCode</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300">Coding practice platforms compared</p>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <h4 class="font-semibold text-amber-700 dark:text-amber-300 mb-2">🏆 Codewars Wins On:</h4>
                <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex gap-2"><span class="text-amber-500">✓</span> <span>Gamification (ranks, streaks, clans)</span></li>
                  <li class="flex gap-2"><span class="text-amber-500">✓</span> <span>Community-created problems (more fun)</span></li>
                  <li class="flex gap-2"><span class="text-amber-500">✓</span> <span>Multiple programming languages</span></li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-orange-700 dark:text-orange-300 mb-2">🏆 LeetCode Wins On:</h4>
                <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex gap-2"><span class="text-orange-500">✓</span> <span>Interview-focused problems</span></li>
                  <li class="flex gap-2"><span class="text-orange-500">✓</span> <span>Detailed company-specific prep</span></li>
                  <li class="flex gap-2"><span class="text-orange-500">✓</span> <span>Better for FAANG prep</span></li>
                </ul>
              </div>
              <div class="p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
                <p class="text-sm text-amber-900 dark:text-amber-100"><span class="font-bold">💡 Pick:</span> Codewars for learning, LeetCode for interviews</p>
              </div>
            </div>
          </div>

          <!-- Comparison 2: Full Stack Open vs The Odin Project -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
            <div class="dark:from-orange-900/50 dark:to-red-900/50 p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">Full Stack Open vs The Odin Project</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300">Comprehensive web dev courses compared</p>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <h4 class="font-semibold text-orange-700 dark:text-orange-300 mb-2">🏆 Full Stack Open Wins On:</h4>
                <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex gap-2"><span class="text-orange-500">✓</span> <span>Modern stack (React, Node, MongoDB)</span></li>
                  <li class="flex gap-2"><span class="text-orange-500">✓</span> <span>Faster completion (13 weeks vs 1+ year)</span></li>
                  <li class="flex gap-2"><span class="text-orange-500">✓</span> <span>Production-ready projects</span></li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-red-700 dark:text-red-300 mb-2">🏆 The Odin Project Wins On:</h4>
                <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex gap-2"><span class="text-red-500">✓</span> <span>Foundational web dev (HTML, CSS, vanilla JS)</span></li>
                  <li class="flex gap-2"><span class="text-red-500">✓</span> <span>Thorough explanations & resources</span></li>
                  <li class="flex gap-2"><span class="text-red-500">✓</span> <span>Better for absolute beginners</span></li>
                </ul>
              </div>
              <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
                <p class="text-sm text-orange-900 dark:text-orange-100"><span class="font-bold">💡 Pick:</span> Odin for foundations, Full Stack Open for modern stack</p>
              </div>
            </div>
          </div>

          <!-- Comparison 3: System Design Primer vs LeetCode System Design -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
            <div class="dark:from-red-900/50 dark:to-pink-900/50 p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">System Design Primer vs Interview Handbook</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300">System design learning resources compared</p>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <h4 class="font-semibold text-red-700 dark:text-red-300 mb-2">🏆 System Design Primer Wins On:</h4>
                <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex gap-2"><span class="text-red-500">✓</span> <span>Deep technical explanations</span></li>
                  <li class="flex gap-2"><span class="text-red-500">✓</span> <span>Real-world architecture examples</span></li>
                  <li class="flex gap-2"><span class="text-red-500">✓</span> <span>Comprehensive & thorough</span></li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-pink-700 dark:text-pink-300 mb-2">🏆 Interview Handbook Wins On:</h4>
                <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex gap-2"><span class="text-pink-500">✓</span> <span>Interview-specific patterns</span></li>
                  <li class="flex gap-2"><span class="text-pink-500">✓</span> <span>Quick reference format</span></li>
                  <li class="flex gap-2"><span class="text-pink-500">✓</span> <span>Faster to prepare with</span></li>
                </ul>
              </div>
              <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                <p class="text-sm text-red-900 dark:text-red-100"><span class="font-bold">💡 Pick:</span> Both! Use Primer to learn, Handbook to practice</p>
              </div>
            </div>
          </div>

          <!-- Comparison 4: NeetCode vs LeetCode -->
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
            <div class="dark:from-pink-900/50 dark:to-rose-900/50 p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">NeetCode vs LeetCode</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300">Focused interview prep platforms compared</p>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <h4 class="font-semibold text-pink-700 dark:text-pink-300 mb-2">🏆 NeetCode Wins On:</h4>
                <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex gap-2"><span class="text-pink-500">✓</span> <span>Video walkthroughs for every problem</span></li>
                  <li class="flex gap-2"><span class="text-pink-500">✓</span> <span>Curated 150 problems (not 1000+)</span></li>
                  <li class="flex gap-2"><span class="text-pink-500">✓</span> <span>Pattern-based learning</span></li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-rose-700 dark:text-rose-300 mb-2">🏆 LeetCode Wins On:</h4>
                <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex gap-2"><span class="text-rose-500">✓</span> <span>Massive problem database</span></li>
                  <li class="flex gap-2"><span class="text-rose-500">✓</span> <span>Company-specific questions</span></li>
                  <li class="flex gap-2"><span class="text-rose-500">✓</span> <span>Frequent updates & new problems</span></li>
                </ul>
              </div>
              <div class="p-3 bg-pink-50 dark:bg-pink-900/20 rounded border border-pink-200 dark:border-pink-800">
                <p class="text-sm text-pink-900 dark:text-pink-100"><span class="font-bold">💡 Pick:</span> NeetCode for learning patterns, LeetCode for grinding</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <h3 class="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">💡 The Real Truth</h3>
          <p class="text-amber-800 dark:text-amber-200">
            Most comparisons are "both are great" because they actually are. The key is picking based on YOUR learning style. Visual learner? Video solutions matter. Competitive? Gamification helps. Interview prepping? Focus on interview-specific resources. Don't waste time comparing—just pick and commit.
          </p>
        </div>
      </UContainer>
    </div>

    <!-- Developer Success Stories - Real Journeys, Real Results -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-red-950/40 dark:via-orange-950/40 dark:to-yellow-950/40">
      <UContainer class="py-24">
        <div class="mb-16">
          <div class="inline-flex items-center gap-3 mb-4">
            <UIcon name="lucide-trophy" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
              Success Stories
            </h2>
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            Real developers. Real outcomes. See how they used these resources to transform their careers.
          </p>
          <div class="bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded-lg p-6 max-w-3xl">
            <p class="text-red-900 dark:text-red-100 font-medium mb-2">✨ These are real stories from freeCodeCamp, Scrimba, YouTube creators, and open-source communities</p>
            <p class="text-red-800 dark:text-red-200">
              From career changers to indie hackers to engineers at Google and Netflix—these developers used the resources on this site to achieve their dreams. No fluff, no fake testimonials. Just real paths to real outcomes.
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="story in successStories" :key="story.id" class="group">
            <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 h-full hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700 transition-all transform hover:-translate-y-1">
              <!-- Header -->
              <div class="mb-4">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {{ story.developerName }}
                    </h3>
                    <p class="text-sm font-semibold text-orange-600 dark:text-orange-400">
                      {{ story.title }}
                    </p>
                  </div>
                  <div class="flex gap-1 flex-wrap justify-end">
                    <span v-for="tag in (story.tags || []).slice(0, 2)" :key="tag" class="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Story Description -->
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {{ story.description }}
              </p>

              <!-- Quote -->
              <div v-if="story.quote" class="mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded border-l-4 border-orange-400">
                <p class="text-sm italic text-gray-700 dark:text-gray-300">
                  "{{ story.quote }}"
                </p>
              </div>

              <!-- Resources Used -->
              <div class="mb-4">
                <p class="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">📚 Resources Used:</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="resource in (story.resourcesUsed || []).slice(0, 3)" :key="resource" class="px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {{ resource }}
                  </span>
                  <span v-if="(story.resourcesUsed || []).length > 3" class="px-2 py-1 text-xs text-gray-600 dark:text-gray-400">
                    +{{ (story.resourcesUsed || []).length - 3 }} more
                  </span>
                </div>
              </div>

              <!-- Outcome -->
              <div class="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                <p class="text-sm font-semibold text-green-900 dark:text-green-100">✅ Outcome:</p>
                <p class="text-sm text-green-800 dark:text-green-200">{{ story.outcome }}</p>
              </div>

              <!-- Source Link -->
              <div class="pt-4 border-t border-gray-200 dark:border-gray-800">
                <a :href="story.sourceUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
                  Read Full Story on {{ story.source }}
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 p-8 dark:from-red-900/50 dark:to-orange-900/50 border border-red-300 dark:border-red-700 rounded-lg">
          <h3 class="text-xl font-bold text-red-900 dark:text-red-100 mb-3">🎯 What These Stories Show</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p class="font-semibold text-red-800 dark:text-red-200 mb-1">💡 Career Change Works</p>
              <p class="text-sm text-red-700 dark:text-red-300">No CS degree? No problem. Thousands have made the leap.</p>
            </div>
            <div>
              <p class="font-semibold text-orange-800 dark:text-orange-200 mb-1">📚 Free Resources Work</p>
              <p class="text-sm text-orange-700 dark:text-orange-300">You don't need expensive bootcamps. Dedication matters more.</p>
            </div>
            <div>
              <p class="font-semibold text-red-800 dark:text-red-200 mb-1">🚀 Fast Growth Possible</p>
              <p class="text-sm text-red-700 dark:text-red-300">6 months to landing jobs? 2 years to senior roles? Yes.</p>
            </div>
            <div>
              <p class="font-semibold text-orange-800 dark:text-orange-200 mb-1">🎓 Portfolio > Credentials</p>
              <p class="text-sm text-orange-700 dark:text-orange-300">What you build matters more than where you learned.</p>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- New This Month -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-blue-950 dark:to-indigo-950">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <UIcon name="lucide-sparkles" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            New This Month
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Fresh resources added to help you stay current with the latest in development.
          </p>
          <div class="bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6 max-w-3xl">
            <p class="text-indigo-800 dark:text-indigo-200 font-medium mb-2">🔄 Your Growth Mindset Coach Says:</p>
            <p class="text-indigo-700 dark:text-indigo-300">
              "Technology evolves fast, and so should you! These fresh resources represent the cutting edge of development. By staying current, you're not just learning - you're future-proofing your career. Every month brings new opportunities to level up. What's one new skill you'll tackle this month?"
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in newThisMonth" 
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
      </UContainer>
    </div>

    <!-- Latest Resources Preview -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Dive Into Our Latest Resources
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Hand-picked weekly to accelerate your growth.
          </p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in latestResources" 
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
        
        <div class="mt-12 text-center">
          <UButton 
            to="/resources" 
            size="lg" 
            variant="outline"
            class="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            Browse All Resources →
          </UButton>
        </div>
      </UContainer>
    </div>

    <!-- Study Buddy Packs - Perfect Combinations -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-cyan-950/30 dark:to-blue-950/30">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <UIcon name="lucide-users" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            Study Buddy Packs
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Complementary resource combinations for accelerated learning. Use these together for 2x impact.
          </p>
        </div>

        <div class="space-y-8">
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🚀 React Full Stack Mastery
            </h3>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div class="font-bold text-blue-900 dark:text-blue-100 mb-2">Week 1-2: Theory</div>
                <p class="text-sm text-blue-800 dark:text-blue-200">React Official Tutorial + Tackling TypeScript</p>
              </div>
              <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <div class="font-bold text-purple-900 dark:text-purple-100 mb-2">Week 3-4: Projects</div>
                <p class="text-sm text-purple-800 dark:text-purple-200">Frontend Mentor + Build 2 Real Apps</p>
              </div>
              <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <div class="font-bold text-green-900 dark:text-green-100 mb-2">Week 5-6: Production</div>
                <p class="text-sm text-green-800 dark:text-green-200">Next.js Learn Course + Deploy 1 Project</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🤖 AI/ML Engineering Boot Camp
            </h3>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
                <div class="font-bold text-orange-900 dark:text-orange-100 mb-2">Foundation (Month 1)</div>
                <p class="text-sm text-orange-800 dark:text-orange-200">Google ML Crash Course + Python Basics</p>
              </div>
              <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                <div class="font-bold text-red-900 dark:text-red-100 mb-2">Deep Learning (Month 2)</div>
                <p class="text-sm text-red-800 dark:text-red-200">Deep Learning Specialization + PyTorch Practice</p>
              </div>
              <div class="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-700">
                <div class="font-bold text-pink-900 dark:text-pink-100 mb-2">Production (Month 3)</div>
                <p class="text-sm text-pink-800 dark:text-pink-200">Deploy ML Model + Kaggle Competition</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🐳 DevOps Engineer Path
            </h3>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-700">
                <div class="font-bold text-teal-900 dark:text-teal-100 mb-2">Containers (Week 1-2)</div>
                <p class="text-sm text-teal-800 dark:text-teal-200">Docker Basics + KodeKloud Labs</p>
              </div>
              <div class="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-700">
                <div class="font-bold text-cyan-900 dark:text-cyan-100 mb-2">Orchestration (Week 3-4)</div>
                <p class="text-sm text-cyan-800 dark:text-cyan-200">Kubernetes + System Design Primer</p>
              </div>
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div class="font-bold text-blue-900 dark:text-blue-100 mb-2">Production (Week 5-6)</div>
                <p class="text-sm text-blue-800 dark:text-blue-200">CI/CD Pipelines + AWS Essentials</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              💼 Interview Prep Intensive
            </h3>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
                <div class="font-bold text-indigo-900 dark:text-indigo-100 mb-2">Algorithms (2 weeks)</div>
                <p class="text-sm text-indigo-800 dark:text-indigo-200">LeetCode 50 Problems + Tech Interview Handbook</p>
              </div>
              <div class="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-700">
                <div class="font-bold text-violet-900 dark:text-violet-100 mb-2">System Design (2 weeks)</div>
                <p class="text-sm text-violet-800 dark:text-violet-200">System Design Primer + Mock Interviews</p>
              </div>
              <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <div class="font-bold text-purple-900 dark:text-purple-100 mb-2">Behavioral (1 week)</div>
                <p class="text-sm text-purple-800 dark:text-purple-200">STAR Method + Narrative Building</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-6">
          <p class="text-center text-cyan-900 dark:text-cyan-100">
            <span class="font-semibold">Pro Tip:</span> Don't jump between resources. Follow one buddy pack from start to finish. The combination creates synergy - each resource reinforces the others.
          </p>
        </div>
      </UContainer>
    </div>

    <!-- 🎯 Ready to Dive Deeper? - CTA to Resources -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-indigo-950/50 dark:via-blue-950/50 dark:to-cyan-950/50">
      <UContainer class="py-32">
        <div class="max-w-4xl mx-auto text-center">
          <div class="mb-8">
            <span class="text-6xl mb-6 block">🚀</span>
            <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Explore 160+ Curated Resources?
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              You've seen the strategy. Now discover the tools. Browse our complete collection of free, high-quality resources—filtered by topic, difficulty, format, and more.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-lg p-6 border border-gray-200 dark:border-gray-800">
              <div class="text-3xl mb-3">🔍</div>
              <h3 class="font-bold text-gray-900 dark:text-white mb-2">Smart Search</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Find exactly what you need with powerful filters and fuzzy search</p>
            </div>
            <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-lg p-6 border border-gray-200 dark:border-gray-800">
              <div class="text-3xl mb-3">📚</div>
              <h3 class="font-bold text-gray-900 dark:text-white mb-2">Every Category</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Courses, tools, books, podcasts, communities—all in one place</p>
            </div>
            <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-lg p-6 border border-gray-200 dark:border-gray-800">
              <div class="text-3xl mb-3">⚡</div>
              <h3 class="font-bold text-gray-900 dark:text-white mb-2">Always Free</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Every resource is free or open source. Learn without barriers</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink
              to="/resources"
              class="inline-flex items-center gap-3 px-8 py-4 hover:from-indigo-700 hover:to-blue-700 text-white text-lg font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Explore All Resources</span>
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
            
            <div class="inline-flex items-center gap-2 px-6 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-lg font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-700">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span>Or Press</span>
              <kbd class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 font-mono">⌘K</kbd>
              <span>to Search</span>
            </div>
          </div>

          <p class="mt-8 text-sm text-gray-500 dark:text-gray-500">
            💡 <span class="font-semibold">Pro Tip:</span> Use the filters to match your exact learning style, time commitment, and skill level
          </p>
        </div>
      </UContainer>
    </div>

    <!-- Hidden Gems - Underrated Resources -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-pink-950/30">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <UIcon name="lucide-gem" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            Hidden Gems
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Underrated, high-quality resources that deserve more attention. These won't find you—you have to find them.
          </p>
          <div class="bg-violet-100 dark:bg-violet-950/50 border border-violet-300 dark:border-violet-700 rounded-lg p-6 max-w-3xl">
            <p class="text-violet-800 dark:text-violet-200 font-medium mb-2">🔮 The Scout's Insight:</p>
            <p class="text-violet-700 dark:text-violet-300">
              "The best resources are often hidden in plain sight, undiscovered by the masses. While everyone follows the beaten path, explorers find the treasures. These gems are less popular but equally (or more) valuable. Be the developer who knows about them."
            </p>
          </div>
        </div>
        
        <div v-if="documentation.length > 0" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in documentation.slice(0, 3)" 
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
          <p class="text-gray-500 dark:text-gray-400">Coming soon...</p>
        </div>
      </UContainer>
    </div>

    <!-- � Books - Learn from the Masters -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-yellow-950/30">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            📚 Books - Deep Learning for the Committed
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            For those who learn best through books. The depth, structure, and comprehensiveness that only books provide.
          </p>
        </div>

        <!-- Strategic Book Learning Paths -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          <!-- Open Source Books on GitHub -->
          <div class="dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl border-2 border-green-300 dark:border-green-700 p-8 shadow-lg">
            <div class="flex items-start gap-4 mb-6">
              <div class="text-5xl">🌟</div>
              <div>
                <h3 class="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                  Free & Open Source Books
                </h3>
                <p class="text-green-700 dark:text-green-300 text-sm">
                  Generously shared by expert authors on GitHub
                </p>
              </div>
            </div>
            
            <div class="bg-white/60 dark:bg-gray-900/60 rounded-lg p-6 mb-6">
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                <span class="font-semibold text-green-800 dark:text-green-200">The Open Source Way:</span> Some of the world's best technical books are completely free and open source. Authors have generously made their life's work available to anyone with internet access.
              </p>
              <div class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Free forever, no sign-up required</span>
              </div>
              <div class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 mt-2">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Read online or download as PDF/ePub</span>
              </div>
              <div class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 mt-2">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Active communities & often updated</span>
              </div>
            </div>

            <div class="space-y-3">
              <div v-for="book in openSourceBooks.slice(0, 4)" :key="book.path" class="bg-white dark:bg-gray-900 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-1">{{ book.title }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{{ book.description }}</p>
                    <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                      <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        {{ book.githubStars || 'Many' }}
                      </span>
                      <span>•</span>
                      <span class="px-2 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded font-medium">FREE</span>
                    </div>
                  </div>
                  <a :href="book.url" target="_blank" rel="noopener noreferrer" class="flex-shrink-0 p-2 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors">
                    <svg class="w-5 h-5 text-green-700 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <UButton to="/resources?category=book&isOpenSource=true" size="lg" color="success" variant="solid" class="w-full mt-6">
              Explore All Free Books →
            </UButton>
          </div>

          <!-- O'Reilly - The Industry Standard -->
          <div class="dark:from-orange-950/50 dark:to-red-950/50 rounded-xl border-2 border-orange-300 dark:border-orange-700 p-8 shadow-lg">
            <div class="flex items-start gap-4 mb-6">
              <div class="text-5xl">🎓</div>
              <div>
                <h3 class="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-2">
                  O'Reilly Learning Platform
                </h3>
                <p class="text-orange-700 dark:text-orange-300 text-sm">
                  The undisputed champion of technical books
                </p>
              </div>
            </div>
            
            <div class="bg-white/60 dark:bg-gray-900/60 rounded-lg p-6 mb-6">
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                <span class="font-semibold text-orange-800 dark:text-orange-200">The Gold Standard:</span> O'Reilly has been the trusted name in technical education for decades. If you're serious about mastering a technology deeply, O'Reilly books are the benchmark.
              </p>
              <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>60,000+ books, courses, and videos</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Written by industry experts & practitioners</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Live online training & certifications</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Constantly updated with latest technologies</span>
                </div>
              </div>
            </div>

            <div class="bg-orange-100 dark:bg-orange-900/50 rounded-lg p-4 mb-6 border border-orange-300 dark:border-orange-700">
              <p class="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">💡 Student Discount Available</p>
              <p class="text-sm text-orange-800 dark:text-orange-200">
                Many universities provide free O'Reilly access through their library. Check if your school has an institutional subscription—you might already have access!
              </p>
            </div>

            <div class="space-y-3 mb-6">
              <div class="bg-white dark:bg-gray-900 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Popular O'Reilly Titles:</h4>
                <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li class="flex items-center gap-2">
                    <span class="text-orange-600 dark:text-orange-400">•</span>
                    <span>Designing Data-Intensive Applications</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-orange-600 dark:text-orange-400">•</span>
                    <span>Head First Design Patterns</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-orange-600 dark:text-orange-400">•</span>
                    <span>Learning Python (5th Edition)</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-orange-600 dark:text-orange-400">•</span>
                    <span>Kubernetes Up & Running</span>
                  </li>
                </ul>
              </div>
            </div>

            <a href="https://www.oreilly.com/library-access/" target="_blank" rel="noopener noreferrer" class="block w-full text-center px-6 py-3 bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">
              Check O'Reilly Learning →
            </a>
          </div>
        </div>

        <!-- All Books Browse -->
        <div class="text-center pt-8 border-t border-amber-200 dark:border-amber-800">
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Looking for something specific? Browse our complete curated collection of {{ allBooks.length }} technical books
          </p>
          <UButton to="/resources?category=book" size="lg" variant="outline">
            Browse All Books →
          </UButton>
        </div>
      </UContainer>
    </div>

    <!-- �🔥 Skills on Fire - Hot Skills This Season -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-red-950/30 dark:to-orange-950/30">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            🔥 Skills on Fire (2025)
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            The most sought-after skills right now. Master these and you'll be in demand.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            <h3 class="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">🤖 AI/ML Engineering</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Artificial intelligence and machine learning are reshaping every industry. From LLMs to computer vision, this is THE skill to master in 2025.
            </p>
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <span class="text-lg">📚</span>
                <span class="text-gray-700 dark:text-gray-300">Google ML Crash Course - Foundations</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-lg">🎓</span>
                <span class="text-gray-700 dark:text-gray-300">Deep Learning Specialization - Advanced</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-lg">💻</span>
                <span class="text-gray-700 dark:text-gray-300">PyTorch Deep Learning - Hands-on</span>
              </div>
            </div>
            <UButton to="/resources?topics=AI+%26+Machine+Learning" size="sm" variant="outline" class="mt-6 w-full">
              Explore AI/ML Courses →
            </UButton>
          </div>
          
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            <h3 class="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">☁️ DevOps & Cloud</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Cloud-native development and infrastructure automation are no longer optional. Docker, Kubernetes, and CI/CD are now foundational skills.
            </p>
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <span class="text-lg">🐳</span>
                <span class="text-gray-700 dark:text-gray-300">Docker & Containerization</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-lg">⚙️</span>
                <span class="text-gray-700 dark:text-gray-300">Kubernetes Orchestration</span>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-lg">🔄</span>
                <span class="text-gray-700 dark:text-gray-300">CI/CD Pipeline Automation</span>
              </div>
            </div>
            <UButton to="/resources?topics=Cloud+%26+DevOps" size="sm" variant="outline" class="mt-6 w-full">
              Explore DevOps Resources →
            </UButton>
          </div>
        </div>

        <div class="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <p class="text-center text-red-900 dark:text-red-100">
            <span class="font-semibold">Pro Tip:</span> Learning these skills now isn't optional—it's career insurance. The market is shifting fast. Master one of these and your stock rises significantly.
          </p>
        </div>
      </UContainer>
    </div>

    <!-- 30-Day Challenges - Sprint Learning (muted colors, iconography) -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <UIcon name="lucide-target" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            30-Day Challenges
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">Bite-sized learning sprints. Pick one and commit for 30 days.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink to="#learning-bundles" class="group bg-white dark:bg-gray-900 rounded-lg p-8 text-gray-900 dark:text-white hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 block">
            <div class="mb-4"><UIcon name="lucide-rocket" class="w-8 h-8 text-gray-600 dark:text-gray-300" /></div>
            <h3 class="text-xl font-bold mb-3">React in 30 Days</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-6">Build 3 projects while learning React fundamentals, hooks, and component patterns.</p>
            <div class="text-sm text-gray-500 space-y-2">
              <div>Day 1-10: Basics & Components</div>
              <div>Day 11-20: Hooks & State</div>
              <div>Day 21-30: Real Project</div>
            </div>
          </NuxtLink>

          <NuxtLink to="#learning-bundles" class="group bg-white dark:bg-gray-900 rounded-lg p-8 text-gray-900 dark:text-white hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 block">
            <div class="mb-4"><UIcon name="lucide-activity" class="w-8 h-8 text-gray-600 dark:text-gray-300" /></div>
            <h3 class="text-xl font-bold mb-3">Python Fundamentals</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-6">Master Python basics through daily exercises and mini-projects. Perfect for beginners.</p>
            <div class="text-sm text-gray-500 space-y-2">
              <div>Day 1-10: Syntax & Types</div>
              <div>Day 11-20: Functions & Loops</div>
              <div>Day 21-30: Mini Programs</div>
            </div>
          </NuxtLink>

          <NuxtLink to="#learning-bundles" class="group bg-white dark:bg-gray-900 rounded-lg p-8 text-gray-900 dark:text-white hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 block">
            <div class="mb-4"><UIcon name="lucide-paint" class="w-8 h-8 text-gray-600 dark:text-gray-300" /></div>
            <h3 class="text-xl font-bold mb-3">Frontend Design</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-6">Learn CSS, Tailwind, and design systems by building 3 beautiful projects from scratch.</p>
            <div class="text-sm text-gray-500 space-y-2">
              <div>Day 1-10: CSS Mastery</div>
              <div>Day 11-20: Tailwind & Components</div>
              <div>Day 21-30: Design System</div>
            </div>
          </NuxtLink>

          <NuxtLink to="#learning-bundles" class="group bg-white dark:bg-gray-900 rounded-lg p-8 text-gray-900 dark:text-white hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 block">
            <div class="mb-4"><UIcon name="lucide-box" class="w-8 h-8 text-gray-600 dark:text-gray-300" /></div>
            <h3 class="text-xl font-bold mb-3">Docker Mastery</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-6">From containers to orchestration. Deploy your first containerized app in 30 days.</p>
            <div class="text-sm text-gray-500 space-y-2">
              <div>Day 1-10: Docker Basics</div>
              <div>Day 11-20: Compose & Networking</div>
              <div>Day 21-30: Production Deploy</div>
            </div>
          </NuxtLink>

          <NuxtLink to="#learning-bundles" class="group bg-white dark:bg-gray-900 rounded-lg p-8 text-gray-900 dark:text-white hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 block">
            <div class="mb-4"><UIcon name="lucide-code" class="w-8 h-8 text-gray-600 dark:text-gray-300" /></div>
            <h3 class="text-xl font-bold mb-3">Data Structures 101</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-6">Interview prep essentials. Master arrays, linked lists, trees, and graphs in 30 days.</p>
            <div class="text-sm text-gray-500 space-y-2">
              <div>Day 1-10: Arrays & Lists</div>
              <div>Day 11-20: Trees & Graphs</div>
              <div>Day 21-30: Problem Solving</div>
            </div>
          </NuxtLink>

          <NuxtLink to="#learning-bundles" class="group bg-white dark:bg-gray-900 rounded-lg p-8 text-gray-900 dark:text-white hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 block">
            <div class="mb-4"><UIcon name="lucide-git-branch" class="w-8 h-8 text-gray-600 dark:text-gray-300" /></div>
            <h3 class="text-xl font-bold mb-3">Open Source Contributor</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-6">Make 5 meaningful open source contributions in 30 days and grow your portfolio.</p>
            <div class="text-sm text-gray-500 space-y-2">
              <div>Day 1-10: Setup & First PR</div>
              <div>Day 11-20: Bug Fixes</div>
              <div>Day 21-30: Feature Contribution</div>
            </div>
          </NuxtLink>
        </div>

        <div class="mt-12 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <p class="text-center text-gray-700 dark:text-gray-300">
            <span class="font-semibold">The 30-Day Challenge:</span> Pick one challenge. Commit fully for 30 days. Share your progress on Twitter/LinkedIn. Watch yourself level up faster than ever before.
          </p>
        </div>
      </UContainer>
    </div>

    <!-- 👨‍💻 Learn Like the Pros - Expert Strategies -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-slate-950 dark:to-gray-950">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            👨‍💻 Learn Like the Pros
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Proven strategies from senior developers who've mastered their craft.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span class="text-2xl">📚</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Learn by Building</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Not by watching videos</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Theory matters, but building real projects is how you internalize knowledge. Every expert developer got there by shipping things.
            </p>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✓ Pick a real problem</li>
              <li>✓ Build a solution</li>
              <li>✓ Share it publicly</li>
              <li>✓ Iterate based on feedback</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <span class="text-2xl">🔄</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Read Other People's Code</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Become a code critic</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Reading well-written code teaches you patterns and best practices faster than any tutorial. Open source is your textbook.
            </p>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✓ Study frameworks you use</li>
              <li>✓ Review PRs on open source</li>
              <li>✓ Analyze popular libraries</li>
              <li>✓ Notice patterns & conventions</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <span class="text-2xl">🎯</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Depth Over Breadth</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Master one thing well</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Learning many languages superficially is less valuable than deep mastery of one. Go deep, understand the philosophy.
            </p>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✓ Pick your primary language</li>
              <li>✓ Use it to build 5+ projects</li>
              <li>✓ Understand its philosophy</li>
              <li>✓ Then expand carefully</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <span class="text-2xl">🤝</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Teach What You Learn</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Share your knowledge</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Teaching forces you to understand deeply. Blog posts, Twitter threads, and mentoring solidify learning.
            </p>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✓ Write blog posts</li>
              <li>✓ Answer questions on Discord</li>
              <li>✓ Give talks at meetups</li>
              <li>✓ Mentor junior developers</li>
            </ul>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Breakthrough Resources - "Aha!" Moments -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-yellow-950/30 dark:to-orange-950/30">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <UIcon name="lucide-lightbulb" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            Breakthrough Resources - "Aha!" Moments
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            These resources create paradigm shifts. They change how you think about problems.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white dark:bg-gray-900 rounded-lg border-2 border-yellow-400 p-8 relative overflow-hidden group hover:shadow-2xl transition-shadow">
            <div class="absolute top-0 right-0 w-32 h-32 bg-yellow-100 dark:bg-yellow-900/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
            <div class="relative z-10">
              <div class="text-5xl mb-4">💭</div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">System Design Primer</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                <span class="font-semibold">The Breakthrough:</span> Most devs don't understand how to think at scale. This resource rewires your brain. You'll never look at architecture the same way.
              </p>
              <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-200 dark:border-yellow-800">
                <p class="text-sm text-yellow-900 dark:text-yellow-200">
                  "After reading this, you realize 90% of your problems are solved by design, not code."
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border-2 border-blue-400 p-8 relative overflow-hidden group hover:shadow-2xl transition-shadow">
            <div class="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
            <div class="relative z-10">
              <div class="text-5xl mb-4">🧠</div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">How to Contribute to Open Source</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                <span class="font-semibold">The Breakthrough:</span> You realize you can contribute immediately. The imposter syndrome dissolves. You see you're part of the community, not outside it.
              </p>
              <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
                <p class="text-sm text-blue-900 dark:text-blue-200">
                  "The only barrier was in your head. This removes it."
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border-2 border-purple-400 p-8 relative overflow-hidden group hover:shadow-2xl transition-shadow">
            <div class="absolute top-0 right-0 w-32 h-32 bg-purple-100 dark:bg-purple-900/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
            <div class="relative z-10">
              <div class="text-5xl mb-4">📖</div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Tackling TypeScript</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                <span class="font-semibold">The Breakthrough:</span> TypeScript suddenly clicks. You realize it's not a burden—it's a thinking tool. Error messages become helpful messages from your editor.
              </p>
              <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded border border-purple-200 dark:border-purple-800">
                <p class="text-sm text-purple-900 dark:text-purple-200">
                  "Catches bugs before runtime. Your refactoring becomes fearless."
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border-2 border-green-400 p-8 relative overflow-hidden group hover:shadow-2xl transition-shadow">
            <div class="absolute top-0 right-0 w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
            <div class="relative z-10">
              <div class="text-5xl mb-4">🚀</div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Google ML Crash Course</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                <span class="font-semibold">The Breakthrough:</span> You realize ML isn't magic—it's math and data. You can build intelligent systems. The future is accessible.
              </p>
              <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
                <p class="text-sm text-green-900 dark:text-green-200">
                  "AI went from intimidating to 'I can actually build this.'"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-8">
          <h3 class="text-lg font-bold text-orange-900 dark:text-orange-100 mb-3">🎯 Your Challenge</h3>
          <p class="text-orange-800 dark:text-orange-200 mb-4">
            Pick ONE resource from above that addresses your biggest gap. Commit to it fully. When that "aha!" moment hits—and it will—everything changes.
          </p>
          <p class="text-sm text-orange-700 dark:text-orange-300">
            The breakthrough resources aren't the easiest. They're the ones that unlock entire new ways of thinking.
          </p>
        </div>
      </UContainer>
    </div>

    <!-- Learning Paths -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-slate-950 dark:to-blue-950">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <UIcon name="lucide-map" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            Learning Paths
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">Structured journeys from beginner to expert. Pick your destination and start learning.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="p-6"><h3 class="text-xl font-bold text-white mb-2">Frontend Developer</h3><p class="text-blue-50 text-sm">Build beautiful, interactive web interfaces</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">HTML & CSS Basics</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">JavaScript Fundamentals</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">React & Modern Frameworks</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">TypeScript & Advanced Patterns</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Next.js & Full Stack</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="p-6"><h3 class="text-xl font-bold text-white mb-2">Backend Developer</h3><p class="text-purple-50 text-sm">Master server-side architecture and databases</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Programming Fundamentals</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Node.js & Runtime Environment</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Databases & SQL/NoSQL</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">API Design & REST/GraphQL</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Authentication & Security</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="p-6"><h3 class="text-xl font-bold text-white mb-2">AI/ML Engineer</h3><p class="text-orange-50 text-sm">Build intelligent systems with machine learning</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Python Fundamentals</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Math & Statistics Basics</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Machine Learning Crash Course</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Deep Learning & Neural Networks</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Production & Deployment</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="p-6"><h3 class="text-xl font-bold text-white mb-2">DevOps Engineer</h3><p class="text-green-50 text-sm">Deploy, scale, and manage infrastructure</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Linux & Command Line</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Docker & Containerization</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Kubernetes & Orchestration</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">CI/CD Pipelines & Automation</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Cloud Platforms (AWS/GCP)</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="p-6"><h3 class="text-xl font-bold text-white mb-2">Full Stack Developer</h3><p class="text-indigo-50 text-sm">Build complete end-to-end applications</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Web Fundamentals (HTML/CSS)</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Frontend (React/Vue)</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Backend (Node.js/Databases)</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">APIs & Integration</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Deployment & DevOps</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="p-6"><h3 class="text-xl font-bold text-white mb-2">Open Source Champion</h3><p class="text-rose-50 text-sm">Contribute to communities and grow your portfolio</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Git & GitHub Mastery</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Finding Beginner-Friendly Projects</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Making Your First PR</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Code Review & Community</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Building Your Portfolio</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
        </div>
        <div class="mt-12 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg"><p class="text-center text-gray-700 dark:text-gray-300">💡 <span class="font-semibold">Tip:</span> Pick a path that excites you. Each step includes curated resources, practice opportunities, and community support. Complete 5-10 resources per path on average (approximately 3-6 months).</p></div>
      </UContainer>
    </div>

    <!-- Controversial Truths - Hot Takes on Learning -->
    <div class="border-t border-gray-200 dark:border-gray-800 dark:from-rose-950/30 dark:to-red-950/30">
      <UContainer class="py-24">
        <div class="mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <UIcon name="lucide-flame" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            Controversial Truths About Learning to Code
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Unpopular opinions that will accelerate your growth if you embrace them.
          </p>
        </div>

        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-900 rounded-lg border-2 border-rose-300 dark:border-rose-800 p-8 group hover:shadow-lg transition-shadow">
            <h3 class="text-xl font-bold text-rose-700 dark:text-rose-400 mb-3">❌ "You Don't Need a Degree"</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-3">
              <span class="font-semibold text-gray-900 dark:text-gray-100">The Truth:</span> Most self-taught developers are actually quite smart people who just needed permission to start. But let's be real—some structured foundation helps. The degree wasn't your problem; your initiative is your superpower.
            </p>
            <div class="bg-rose-50 dark:bg-rose-900/20 p-4 rounded border border-rose-200 dark:border-rose-700">
              <p class="text-sm text-rose-800 dark:text-rose-200">💡 <span class="font-semibold">Action:</span> Skip the theory paralysis. Build something today. Credentials follow competence, not the other way around.</p>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border-2 border-orange-300 dark:border-orange-800 p-8 group hover:shadow-lg transition-shadow">
            <h3 class="text-xl font-bold text-orange-700 dark:text-orange-400 mb-3">❌ "Learn Everything About Your Language First"</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-3">
              <span class="font-semibold text-gray-900 dark:text-gray-100">The Truth:</span> You'll never learn everything. Stop waiting for mastery. The best developers learn 20% deeply, then learn the rest by solving real problems.
            </p>
            <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded border border-orange-200 dark:border-orange-700">
              <p class="text-sm text-orange-800 dark:text-orange-200">💡 <span class="font-semibold">Action:</span> Learn syntax, loops, and functions. Then build. Deep knowledge comes from using it, not reading about it.</p>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border-2 border-red-300 dark:border-red-800 p-8 group hover:shadow-lg transition-shadow">
            <h3 class="text-xl font-bold text-red-700 dark:text-red-400 mb-3">❌ "Portfolio Projects Don't Matter"</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-3">
              <span class="font-semibold text-gray-900 dark:text-gray-100">The Truth:</span> They're literally everything for hiring. Companies want proof you can ship. A mediocre portfolio beats no portfolio 10x over.
            </p>
            <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-700">
              <p class="text-sm text-red-800 dark:text-red-200">💡 <span class="font-semibold">Action:</span> Your best portfolio piece was something you built to solve a real problem. That matters more than a tutorial clone.</p>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border-2 border-pink-300 dark:border-pink-800 p-8 group hover:shadow-lg transition-shadow">
            <h3 class="text-xl font-bold text-pink-700 dark:text-pink-400 mb-3">❌ "You Need X Years of Experience for That Job"</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-3">
              <span class="font-semibold text-gray-900 dark:text-gray-100">The Truth:</span> That's a guideline, not a law. Apply anyway. The worst they say is no. Every senior developer broke this rule at some point.
            </p>
            <div class="bg-pink-50 dark:bg-pink-900/20 p-4 rounded border border-pink-200 dark:border-pink-700">
              <p class="text-sm text-pink-800 dark:text-pink-200">💡 <span class="font-semibold">Action:</span> If you're 80% there, apply. Confidence + demonstrated ability beats experience points every time.</p>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border-2 border-red-400 dark:border-red-700 p-8 group hover:shadow-lg transition-shadow">
            <h3 class="text-xl font-bold text-red-700 dark:text-red-400 mb-3">❌ "Watching Tutorials is Learning"</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-3">
              <span class="font-semibold text-gray-900 dark:text-gray-100">The Truth:</span> You're just consuming. Real learning requires struggle. Pause the video and code it yourself. That discomfort? That's growth.
            </p>
            <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-700">
              <p class="text-sm text-red-800 dark:text-red-200">💡 <span class="font-semibold">Action:</span> Use tutorials as reference, not gospel. Type every line yourself. Google when stuck. That struggle builds muscle memory.</p>
            </div>
          </div>
        </div>

        <div class="mt-12 bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 rounded-lg p-8">
          <h3 class="text-lg font-bold text-red-900 dark:text-red-100 mb-3">🎯 The Real Truth</h3>
          <p class="text-red-800 dark:text-red-200 mb-3">
            The biggest barrier to success isn't knowledge—it's action. You know what you need to do. Stop reading about learning and go learn by building. That's it. That's the secret.
          </p>
          <p class="text-sm text-red-700 dark:text-red-300">
            Close this tab. Open VS Code. Build something. Come back when you need help. The best education is action + feedback.
          </p>
        </div>
      </UContainer>
    </div>
  </div>
</template>
