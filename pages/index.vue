<!-- pages/index.vue -->
<script setup lang="ts">

const { data: allResources } = await useAsyncData('all-resources', async () => {
  try {
    return await queryCollection('resources').all()
  } catch (error) {
    console.warn('Failed to load resources:', error)
    return []
  }
})

const { data: partners } = await useAsyncData('partners', async () => {
  try {
    return await queryCollection('partners').all()
  } catch (error) {
    console.warn('Failed to load partners:', error)
    return []
  }
})

const featuredResources = computed(() => {
  return (allResources.value || []).filter(r => r.featured)
})

const articles = computed(() => {
  return (allResources.value || []).filter(r => r.category === 'article')
})

const tools = computed(() => {
  return (allResources.value || []).filter(r => r.category === 'tool')
})

const courses = computed(() => {
  return (allResources.value || []).filter(r => r.category === 'course')
})

const podcasts = computed(() => {
  return (allResources.value || []).filter(r => r.category === 'podcast')
})

const tutorials = computed(() => {
  return (allResources.value || []).filter(r => r.category === 'tutorial')
})

const youtube = computed(() => {
  return (allResources.value || []).filter(r => r.category === 'youtube')
})

const books = computed(() => {
  return (allResources.value || []).filter(r => r.category === 'book')
})

const practice = computed(() => {
  return (allResources.value || []).filter((r: any) => r.category === 'practice')
})

const community = computed(() => {
  return (allResources.value || []).filter((r: any) => r.category === 'community')
})

const newsletters = computed(() => {
  return (allResources.value || []).filter((r: any) => r.category === 'newsletter')
})

const jobs = computed(() => {
  return (allResources.value || []).filter((r: any) => r.category === 'job')
})

const interactive = computed(() => {
  return (allResources.value || []).filter((r: any) => r.category === 'interactive')
})

const career = computed(() => {
  return (allResources.value || []).filter((r: any) => r.category === 'career')
})

const documentation = computed(() => {
  return (allResources.value || []).filter((r: any) => r.category === 'documentation')
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
</script>

<template>
  <div>
    <HomeHero />
    <HomeFeatures />

    <!-- ⭐ Expert Essentials - The Non-Negotiables -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-950/40 dark:via-blue-950/40 dark:to-cyan-950/40">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="text-3xl">⭐</span>
            <h2 class="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Expert Essentials
            </h2>
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            The non-negotiable resources every serious developer needs to know. These are the foundations that separate capable engineers from exceptional ones.
          </p>
          <div class="bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-300 dark:border-indigo-700 rounded-lg p-6 max-w-3xl mx-auto">
            <p class="text-indigo-900 dark:text-indigo-100 font-medium mb-2">🎯 Why Master These First?</p>
            <p class="text-indigo-800 dark:text-indigo-200">
              These curated essentials have been battle-tested by tens of thousands of developers. They build the foundational skills that unlock everything else—from landing your first dev job to architecting systems at scale.
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            to="/resources"
            class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold underline underline-offset-4"
          >
            See all featured resources →
          </NuxtLink>
        </div>
      </UContainer>
    </div>

    <!-- 🔥 Trending This Week -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
            🔥 Trending This Week
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            The hottest resources spotted in the developer community - fresh updates and handpicked favorites.
          </p>
          <div class="bg-orange-100 dark:bg-orange-950/50 border border-orange-300 dark:border-orange-700 rounded-lg p-6 max-w-3xl mx-auto">
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

    <!-- ⭐ Best of This Month -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            ⭐ Editor's Picks - October 2025
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Hand-curated by our team. These resources stood out this month.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
            <div class="h-40 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-6xl">📊</div>
            <div class="p-6 bg-white dark:bg-gray-900">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">System Design Primer</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Master distributed systems architecture like the pros. 80-hour deep dive into scalability.</p>
              <div class="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-2 transition-transform">
                Start Learning <span>→</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
            <div class="h-40 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-6xl">🤖</div>
            <div class="p-6 bg-white dark:bg-gray-900">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Google ML Crash Course</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">15-hour interactive course on machine learning fundamentals from Google engineers. No prerequisites needed.</p>
              <div class="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                Start Learning <span>→</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
            <div class="h-40 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-6xl">🚀</div>
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

    <!-- 🏃 Speed Run - Crash Courses -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            🏃 Speed Run - Learn in Hours, Not Weeks
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Crash courses perfect for weekends or dedicated learning days. Get up to speed fast.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <div class="text-3xl mb-3">⏱️</div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">4 Hours</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">React Basics - Build your first component</p>
            <div class="text-xs text-red-600 dark:text-red-400">Perfect for: Quick weekend project</div>
          </div>

          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <div class="text-3xl mb-3">⏱️</div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">8 Hours</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">Next.js Crash Course - Full stack in a day</p>
            <div class="text-xs text-blue-600 dark:text-blue-400">Perfect for: Deploy first app</div>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
            <div class="text-3xl mb-3">⏱️</div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">6 Hours</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">Docker & Containers - Deploy like a pro</p>
            <div class="text-xs text-purple-600 dark:text-purple-400">Perfect for: Understand DevOps</div>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <div class="text-3xl mb-3">⏱️</div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">5 Hours</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">TypeScript Essentials - Type safety 101</p>
            <div class="text-xs text-green-600 dark:text-green-400">Perfect for: Level up JavaScript</div>
          </div>
        </div>

        <div class="mt-12 p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p class="text-center text-gray-700 dark:text-gray-300">
            <span class="font-semibold">💪 Challenge Yourself:</span> Pick one Speed Run. Block out 8 hours this weekend. Complete it. Post "I built this in 8 hours" on Twitter. Watch the engagement.
          </p>
        </div>
      </UContainer>
    </div>

    <!-- Resource Discovery Filters -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <UContainer class="py-16">
        <div class="text-center mb-12">
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
    </div>

    <!-- Quick Wins -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-950">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            ⚡ Quick Wins (< 2 hours)
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Fast-track your learning with bite-sized resources you can complete today.
          </p>
          <div class="bg-green-100 dark:bg-green-950/50 border border-green-300 dark:border-green-700 rounded-lg p-6 max-w-3xl mx-auto">
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
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-950/40 dark:via-pink-950/40 dark:to-rose-950/40">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="text-3xl">👑</span>
            <h2 class="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
              Master's Collection
            </h2>
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            The most transformative, battle-tested resources handpicked by experts. These are the tools that accelerate careers and change how developers think.
          </p>
          <div class="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 border border-purple-200 dark:border-purple-800 rounded-lg p-6 max-w-3xl mx-auto">
            <p class="text-purple-900 dark:text-purple-100 font-medium mb-2">✨ Why This Collection?</p>
            <p class="text-purple-800 dark:text-purple-200">
              Each resource here has proven itself across thousands of developers. Not just good—transformative. Master these foundations and you'll build, debug, and design with confidence others take years to achieve.
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            to="/resources"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            Explore All Featured Resources
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>
      </UContainer>
    </div>

    <!-- New This Month -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            ✨ New This Month
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Fresh resources added to help you stay current with the latest in development.
          </p>
          <div class="bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6 max-w-3xl mx-auto">
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
        <div class="text-center mb-16">
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

    <!-- 🤝 Perfect Study Buddy Combinations -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            🤝 Study Buddy Packs
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

    <!-- Articles -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Insightful Articles
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Deep dives into development topics and career advice.
          </p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in articles" 
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

    <!-- Tools -->
        <!-- Tools -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Essential Developer Tools
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Tools that power modern development workflows.
          </p>
          <div class="bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-lg p-6 max-w-3xl mx-auto">
            <p class="text-purple-800 dark:text-purple-200 font-medium mb-2">🛠️ Your Efficiency Expert Says:</p>
            <p class="text-purple-700 dark:text-purple-300">
              "The right tools don't just make you faster - they make you better. These aren't just utilities; they're force multipliers for your development superpowers. Invest time in learning them well, and you'll wonder how you ever coded without them. Your future self will thank you for this investment!"
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in tools" 
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

    <!-- Courses -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Recommended Courses
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Structured learning paths for skill development.
          </p>
          <div class="bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 rounded-lg p-6 max-w-3xl mx-auto">
            <p class="text-orange-800 dark:text-orange-200 font-medium mb-2">🎓 Your Learning Strategist Says:</p>
            <p class="text-orange-700 dark:text-orange-300">
              "Courses aren't just about acquiring knowledge - they're about building systematic understanding. These carefully selected programs provide the structure you need to go from confused to confident. Commit to one, follow through completely, and watch how it transforms not just what you know, but how you think about problems."
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in courses" 
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
    </div>    <!-- Podcasts -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Developer Podcasts
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Learn while commuting with expert insights.
          </p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in podcasts" 
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

    <!-- Tutorials -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Hands-On Tutorials
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Step-by-step guides to build real projects.
          </p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in tutorials" 
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

    <!-- YouTube -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            YouTube Channels
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Visual learning with expert tutorials and talks.
          </p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in youtube" 
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

    <!-- Books -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Recommended Books
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            In-depth knowledge from timeless classics.
          </p>
          <div class="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg p-6 max-w-3xl mx-auto">
            <p class="text-amber-800 dark:text-amber-200 font-medium mb-2">📖 Your Wisdom Guide Says:</p>
            <p class="text-amber-700 dark:text-amber-300">
              "Books are investments in your future self. While tutorials teach you how, books teach you why. These aren't just reading materials - they're mind-expanding journeys that will change how you approach problems forever. Read deeply, take notes, and revisit them. The best developers are also the best learners."
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in books" 
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

    <!-- Practice & Challenges -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Practice & Challenges
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Sharpen your skills with coding challenges and algorithms.
          </p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in practice" 
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

    <!-- Community Platforms -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Open Source & Community
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Connect with developers worldwide and contribute to open source.
          </p>
        </div>
        
        <!-- Community Coaching Copy -->
        <div class="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Build Your Developer Network
              </h3>
              <p class="text-blue-800 dark:text-blue-200">
                You're not just learning to code—you're joining a global community of creators. Start small: follow one developer on Twitter, join one Discord server, contribute to one open source project. Your network will accelerate your growth faster than any tutorial ever could. Remember, the best opportunities come from the people you meet along the way.
              </p>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in community" 
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

    <!-- Newsletters -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Newsletters & Blogs
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Stay current with curated tech news and insights.
          </p>
        </div>
        
        <!-- Newsletters Coaching Copy -->
        <div class="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-12">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Never Stop Learning
              </h3>
              <p class="text-purple-800 dark:text-purple-200">
                The tech world moves fast—really fast. But here's the truth: you don't need to read everything. You need to read the right things consistently. Pick 2-3 newsletters that speak to you, set aside 15 minutes each morning, and commit to this ritual. Over time, this small habit will make you the developer who "just knows" what's coming next. Your future self will thank you.
              </p>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in newsletters" 
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

    <!-- Job Boards -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Job Boards & Career
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Find your next opportunity in tech.
          </p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in jobs" 
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

    <!-- Interactive Learning -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Interactive Learning Platforms
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Hands-on learning platforms with interactive coding environments and challenges.
          </p>
        </div>
        
        <!-- Interactive Learning Coaching Copy -->
        <div class="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-12">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                Learning Through Doing
              </h3>
              <p class="text-green-800 dark:text-green-200">
                Theory is important, but mastery comes from practice. These interactive platforms aren't just games—they're your training ground. Set a goal: complete one challenge per day, or spend 30 minutes building something new. The magic happens when you stop consuming content and start creating. Every bug you fix, every feature you build, every challenge you overcome—these are the moments that transform you from a learner into a builder.
              </p>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in interactive" 
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

    <!-- Career Resources -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Career Development Resources
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Level up your career with salary data, interview prep, and professional growth tools.
          </p>
          <div class="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-3xl mx-auto">
            <p class="text-blue-800 dark:text-blue-200 font-medium mb-2">💪 Your Career Coach Says:</p>
            <p class="text-blue-700 dark:text-blue-300">
              "Success isn't just about technical skills - it's about knowing your worth, preparing strategically, and building the career you deserve. These resources give you the tools to negotiate better, interview confidently, and grow professionally. You've got the talent - now get the recognition you deserve!"
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in career" 
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

    <!-- 💎 Hidden Gems - Underrated Resources -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-pink-950/30">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
            💎 Hidden Gems
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Underrated, high-quality resources that deserve more attention. These won't find you—you have to find them.
          </p>
          <div class="bg-violet-100 dark:bg-violet-950/50 border border-violet-300 dark:border-violet-700 rounded-lg p-6 max-w-3xl mx-auto">
            <p class="text-violet-800 dark:text-violet-200 font-medium mb-2">🔮 The Scout's Insight:</p>
            <p class="text-violet-700 dark:text-violet-300">
              "The best resources are often hidden in plain sight, undiscovered by the masses. While everyone follows the beaten path, explorers find the treasures. These gems are less popular but equally (or more) valuable. Be the developer who knows about them."
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </UContainer>
    </div>

    <!-- 🔥 Skills on Fire - Hot Skills This Season -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30">
      <UContainer class="py-24">
        <div class="text-center mb-16">
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
            <UButton to="/resources?category=course" size="sm" variant="outline" class="mt-6 w-full">
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
            <UButton to="/resources?category=course" size="sm" variant="outline" class="mt-6 w-full">
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

    <!-- 🎯 30-Day Challenges - Sprint Learning -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            🎯 30-Day Challenges
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Bite-sized learning sprints. Pick one and commit for 30 days.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <div class="text-4xl mb-4">🚀</div>
            <h3 class="text-xl font-bold mb-3">React in 30 Days</h3>
            <p class="text-blue-100 mb-6">Build 3 projects while learning React fundamentals, hooks, and component patterns.</p>
            <div class="text-sm text-blue-200 space-y-2">
              <div>📝 Day 1-10: Basics & Components</div>
              <div>📝 Day 11-20: Hooks & State</div>
              <div>📝 Day 21-30: Real Project</div>
            </div>
          </div>

          <div class="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-8 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <div class="text-4xl mb-4">🐍</div>
            <h3 class="text-xl font-bold mb-3">Python Fundamentals</h3>
            <p class="text-purple-100 mb-6">Master Python basics through daily exercises and mini-projects. Perfect for beginners.</p>
            <div class="text-sm text-purple-200 space-y-2">
              <div>📝 Day 1-10: Syntax & Types</div>
              <div>📝 Day 11-20: Functions & Loops</div>
              <div>📝 Day 21-30: Mini Programs</div>
            </div>
          </div>

          <div class="group bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-8 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <div class="text-4xl mb-4">🎨</div>
            <h3 class="text-xl font-bold mb-3">Frontend Design</h3>
            <p class="text-green-100 mb-6">Learn CSS, Tailwind, and design systems by building 3 beautiful projects from scratch.</p>
            <div class="text-sm text-green-200 space-y-2">
              <div>📝 Day 1-10: CSS Mastery</div>
              <div>📝 Day 11-20: Tailwind & Components</div>
              <div>📝 Day 21-30: Design System</div>
            </div>
          </div>

          <div class="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-8 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <div class="text-4xl mb-4">🐳</div>
            <h3 class="text-xl font-bold mb-3">Docker Mastery</h3>
            <p class="text-orange-100 mb-6">From containers to orchestration. Deploy your first containerized app in 30 days.</p>
            <div class="text-sm text-orange-200 space-y-2">
              <div>📝 Day 1-10: Docker Basics</div>
              <div>📝 Day 11-20: Compose & Networking</div>
              <div>📝 Day 21-30: Production Deploy</div>
            </div>
          </div>

          <div class="group bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-8 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <div class="text-4xl mb-4">🎤</div>
            <h3 class="text-xl font-bold mb-3">Data Structures 101</h3>
            <p class="text-pink-100 mb-6">Interview prep essentials. Master arrays, linked lists, trees, and graphs in 30 days.</p>
            <div class="text-sm text-pink-200 space-y-2">
              <div>📝 Day 1-10: Arrays & Lists</div>
              <div>📝 Day 11-20: Trees & Graphs</div>
              <div>📝 Day 21-30: Problem Solving</div>
            </div>
          </div>

          <div class="group bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-8 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <div class="text-4xl mb-4">🔗</div>
            <h3 class="text-xl font-bold mb-3">Open Source Contributor</h3>
            <p class="text-indigo-100 mb-6">Make 5 meaningful open source contributions in 30 days and grow your portfolio.</p>
            <div class="text-sm text-indigo-200 space-y-2">
              <div>📝 Day 1-10: Setup & First PR</div>
              <div>📝 Day 11-20: Bug Fixes</div>
              <div>📝 Day 21-30: Feature Contribution</div>
            </div>
          </div>
        </div>

        <div class="mt-12 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <p class="text-center text-blue-900 dark:text-blue-100">
            <span class="font-semibold">The 30-Day Challenge:</span> Pick one challenge. Commit fully for 30 days. Share your progress on Twitter/LinkedIn. Watch yourself level up faster than ever before.
          </p>
        </div>
      </UContainer>
    </div>

    <!-- 👨‍💻 Learn Like the Pros - Expert Strategies -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950">
      <UContainer class="py-24">
        <div class="text-center mb-16">
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

    <!-- � Breakthrough Moments - The "Aha!" Resources -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            🌟 Breakthrough Resources - "Aha!" Moments
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

    <!-- �🎓 Yearly Developer Roadmap -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            🎓 12-Month Developer Roadmap
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Strategic learning plan for 2025. Master a new skill each quarter.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white dark:bg-gray-900 rounded-lg border-l-4 border-l-red-500 p-6 hover:shadow-lg transition-shadow">
            <div class="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Q1 (Jan-Mar)</div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-3">Foundations</h4>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✓ Data Structures</li>
              <li>✓ Algorithms</li>
              <li>✓ System Design Basics</li>
              <li>✓ 10 LeetCode problems</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border-l-4 border-l-yellow-500 p-6 hover:shadow-lg transition-shadow">
            <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">Q2 (Apr-Jun)</div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-3">Specialization</h4>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✓ Deep dive into language</li>
              <li>✓ Framework mastery</li>
              <li>✓ Build 2 projects</li>
              <li>✓ Code review 50 PRs</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border-l-4 border-l-green-500 p-6 hover:shadow-lg transition-shadow">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Q3 (Jul-Sep)</div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-3">Open Source</h4>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✓ Contribute to OSS</li>
              <li>✓ 5+ meaningful PRs</li>
              <li>✓ Lead code review</li>
              <li>✓ Mentor someone</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg border-l-4 border-l-blue-500 p-6 hover:shadow-lg transition-shadow">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">Q4 (Oct-Dec)</div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-3">Elevation</h4>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✓ Interview prep</li>
              <li>✓ Portfolio showcase</li>
              <li>✓ Conference talk?</li>
              <li>✓ Reflect & plan 2026</li>
            </ul>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Learning Paths -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">🗺️ Learning Paths</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">Structured journeys from beginner to expert. Pick your destination and start learning.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="bg-gradient-to-r from-blue-500 to-cyan-500 p-6"><h3 class="text-xl font-bold text-white mb-2">Frontend Developer</h3><p class="text-blue-50 text-sm">Build beautiful, interactive web interfaces</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">HTML & CSS Basics</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">JavaScript Fundamentals</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">React & Modern Frameworks</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">TypeScript & Advanced Patterns</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Next.js & Full Stack</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="bg-gradient-to-r from-purple-500 to-pink-500 p-6"><h3 class="text-xl font-bold text-white mb-2">Backend Developer</h3><p class="text-purple-50 text-sm">Master server-side architecture and databases</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Programming Fundamentals</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Node.js & Runtime Environment</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Databases & SQL/NoSQL</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">API Design & REST/GraphQL</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Authentication & Security</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="bg-gradient-to-r from-orange-500 to-red-500 p-6"><h3 class="text-xl font-bold text-white mb-2">AI/ML Engineer</h3><p class="text-orange-50 text-sm">Build intelligent systems with machine learning</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Python Fundamentals</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Math & Statistics Basics</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Machine Learning Crash Course</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Deep Learning & Neural Networks</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Production & Deployment</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="bg-gradient-to-r from-green-500 to-teal-500 p-6"><h3 class="text-xl font-bold text-white mb-2">DevOps Engineer</h3><p class="text-green-50 text-sm">Deploy, scale, and manage infrastructure</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Linux & Command Line</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Docker & Containerization</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Kubernetes & Orchestration</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">CI/CD Pipelines & Automation</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Cloud Platforms (AWS/GCP)</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="bg-gradient-to-r from-indigo-500 to-violet-500 p-6"><h3 class="text-xl font-bold text-white mb-2">Full Stack Developer</h3><p class="text-indigo-50 text-sm">Build complete end-to-end applications</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Web Fundamentals (HTML/CSS)</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Frontend (React/Vue)</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Backend (Node.js/Databases)</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">APIs & Integration</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Deployment & DevOps</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
          <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"><div class="bg-gradient-to-r from-rose-500 to-orange-500 p-6"><h3 class="text-xl font-bold text-white mb-2">Open Source Champion</h3><p class="text-rose-50 text-sm">Contribute to communities and grow your portfolio</p></div><div class="p-6"><div class="space-y-3 mb-6"><div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Git & GitHub Mastery</span></div><div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Finding Beginner-Friendly Projects</span></div><div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Making Your First PR</span></div><div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Code Review & Community</span></div><div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Building Your Portfolio</span></div></div><UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton></div></div>
        </div>
        <div class="mt-12 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg"><p class="text-center text-gray-700 dark:text-gray-300">💡 <span class="font-semibold">Tip:</span> Pick a path that excites you. Each step includes curated resources, practice opportunities, and community support. Complete 5-10 resources per path on average (approximately 3-6 months).</p></div>
      </UContainer>
    </div>

    <!-- 🔥 Controversial Truths - Hot Takes on Learning -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            🔥 Controversial Truths About Learning to Code
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

    <!-- Documentation & References -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Documentation & References
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Authoritative documentation and reference materials for modern development.
          </p>
          <div class="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg p-6 max-w-3xl mx-auto">
            <p class="text-green-800 dark:text-green-200 font-medium mb-2">🎯 Your Technical Mentor Says:</p>
            <p class="text-green-700 dark:text-green-300">
              "Great developers don't memorize everything - they know where to find the right information quickly. These documentation resources are your professional lifeline. Master them, and you'll solve problems faster, write better code, and become the developer everyone turns to for answers."
            </p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            v-for="resource in documentation" 
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
  </div>
</template>
