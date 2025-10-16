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
</script>

<template>
  <div>
    <HomeHero />
    <HomeFeatures />
    <HomePartners :partners="partners" />

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

    <!-- Featured Resources -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Featured Resources
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Our hand-picked favorites for developers.
          </p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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