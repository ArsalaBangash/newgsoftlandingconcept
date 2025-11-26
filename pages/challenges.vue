<!-- pages/challenges.vue -->
<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: '30-Day Challenges - Sprint Learning with Structured Goals | Grey Software',
  description: 'Sprint learning with structured, time-boxed goals. Pick a challenge and commit to 30 days of focused learning in React, Python, Docker, and more.',
  ogTitle: '30-Day Challenges - Sprint Learning with Structured Goals',
  ogDescription: 'Sprint learning with structured, time-boxed goals. Pick a challenge and commit to 30 days of focused learning.',
})

// Challenge Data
const challenges = [
  {
    id: 'react',
    name: '30 Days of React',
    icon: 'i-heroicons-cube-transparent',
    color: 'cyan',
    description: 'Build a new React project every day',
    outcome: 'Portfolio of 30 mini-projects',
    difficulty: 'Intermediate',
    dailyCommitment: '1-2 hours'
  },
  {
    id: 'python',
    name: '30 Days of Python',
    icon: 'i-heroicons-code-bracket',
    color: 'yellow',
    description: 'Master Python fundamentals through daily exercises',
    outcome: 'Strong Python foundation',
    difficulty: 'Beginner',
    dailyCommitment: '1 hour'
  },
  {
    id: 'frontend-design',
    name: '30 Days of Frontend Design',
    icon: 'i-heroicons-paint-brush',
    color: 'pink',
    description: 'Recreate popular UI designs',
    outcome: 'Design eye and CSS mastery',
    difficulty: 'Intermediate',
    dailyCommitment: '1-2 hours'
  },
  {
    id: 'docker',
    name: '30 Days of Docker',
    icon: 'i-heroicons-cube',
    color: 'blue',
    description: 'Containerize everything',
    outcome: 'DevOps-ready skills',
    difficulty: 'Intermediate',
    dailyCommitment: '1 hour'
  },
  {
    id: 'data-structures',
    name: '30 Days of Data Structures',
    icon: 'i-heroicons-squares-2x2',
    color: 'green',
    description: 'One data structure per day',
    outcome: 'Interview-ready fundamentals',
    difficulty: 'Intermediate',
    dailyCommitment: '1-2 hours'
  },
  {
    id: 'open-source',
    name: '30 Days of Open Source',
    icon: 'i-heroicons-heart',
    color: 'red',
    description: 'Contribute to open source daily',
    outcome: 'GitHub profile that stands out',
    difficulty: 'All levels',
    dailyCommitment: '30 min - 2 hours'
  }
]

// How It Works Timeline
const timeline = [
  {
    days: 'Day 1-7',
    title: 'Foundation Building',
    description: 'Set up your environment and learn the basics'
  },
  {
    days: 'Day 8-14',
    title: 'Core Concepts',
    description: 'Dive deeper into fundamental concepts'
  },
  {
    days: 'Day 15-21',
    title: 'Advanced Topics',
    description: 'Tackle more complex challenges'
  },
  {
    days: 'Day 22-30',
    title: 'Real-world Projects',
    description: 'Apply everything in practical projects'
  }
]

// Tips for Success
const tips = [
  {
    icon: 'i-heroicons-fire',
    title: 'Start small, build momentum',
    description: 'Begin with achievable daily goals to build consistency'
  },
  {
    icon: 'i-heroicons-megaphone',
    title: 'Track your progress publicly',
    description: 'Share your journey with #30DayChallenge'
  },
  {
    icon: 'i-heroicons-user-group',
    title: 'Join a community',
    description: 'Find accountability partners and support'
  },
  {
    icon: 'i-heroicons-link',
    title: "Don't break the chain",
    description: 'Consistency beats intensity every time'
  }
]

// Helper function for challenge card colors
const getChallengeColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
    cyan: {
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      border: 'border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600',
      icon: 'text-cyan-600 dark:text-cyan-400',
      badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 dark:hover:border-yellow-600',
      icon: 'text-yellow-600 dark:text-yellow-400',
      badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    },
    pink: {
      bg: 'bg-pink-50 dark:bg-pink-900/20',
      border: 'border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600',
      icon: 'text-pink-600 dark:text-pink-400',
      badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600',
      icon: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600',
      icon: 'text-green-600 dark:text-green-400',
      badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600',
      icon: 'text-red-600 dark:text-red-400',
      badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
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
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
            30-Day Learning Sprints
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            30-Day Challenges
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Sprint learning with structured, time-boxed goals. Pick a challenge and commit to 30 days of focused learning.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <UButton 
              to="#challenges" 
              size="lg" 
              class="bg-accent hover:bg-accent/90 text-white px-6"
            >
              Browse Challenges
            </UButton>
            <UButton 
              to="/resources" 
              size="lg" 
              variant="outline"
              class="border-gray-300 dark:border-gray-700"
            >
              Explore Resources
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Challenge Cards Section -->
    <div id="challenges" class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Choose Your Challenge
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Each challenge is designed to build real skills through daily practice. Pick one that matches your goals.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="challenge in challenges" 
            :key="challenge.id"
            class="group rounded-xl border p-6 transition-all hover:shadow-lg"
            :class="[
              getChallengeColorClasses(challenge.color).bg,
              getChallengeColorClasses(challenge.color).border
            ]"
          >
            <!-- Challenge Header -->
            <div class="flex items-start gap-3 mb-4">
              <UIcon 
                :name="challenge.icon" 
                class="w-8 h-8 flex-shrink-0"
                :class="getChallengeColorClasses(challenge.color).icon"
              />
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ challenge.name }}
              </h3>
            </div>

            <!-- Challenge Description -->
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {{ challenge.description }}
            </p>

            <!-- Challenge Details -->
            <div class="space-y-3 mb-6">
              <div class="flex items-start gap-2">
                <UIcon name="i-heroicons-trophy" class="w-4 h-4 text-gray-500 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">Outcome:</span>
                  <span class="text-sm text-gray-700 dark:text-gray-300 ml-1">{{ challenge.outcome }}</span>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-heroicons-clock" class="w-4 h-4 text-gray-500 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">Daily:</span>
                  <span class="text-sm text-gray-700 dark:text-gray-300 ml-1">{{ challenge.dailyCommitment }}</span>
                </div>
              </div>
            </div>

            <!-- Difficulty Badge -->
            <div class="flex items-center justify-between">
              <span 
                class="inline-block px-3 py-1 text-xs font-medium rounded-full"
                :class="getChallengeColorClasses(challenge.color).badge"
              >
                {{ challenge.difficulty }}
              </span>
              <button 
                class="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline"
              >
                Start Challenge
                <UIcon name="lucide-arrow-right" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- How It Works Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Each 30-day challenge follows a proven structure to maximize your learning.
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="(phase, index) in timeline" 
              :key="phase.days"
              class="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-accent dark:hover:border-accent transition-all"
            >
              <!-- Phase Number -->
              <div class="absolute -top-3 left-6 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                {{ index + 1 }}
              </div>
              
              <!-- Phase Content -->
              <div class="pt-2">
                <span class="text-sm font-medium text-accent">{{ phase.days }}</span>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-1 mb-2">
                  {{ phase.title }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ phase.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Tips for Success Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Tips for Success
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Follow these proven strategies to complete your 30-day challenge.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div 
            v-for="tip in tips" 
            :key="tip.title"
            class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-accent dark:hover:border-accent hover:shadow-lg transition-all"
          >
            <div class="mb-4">
              <UIcon :name="tip.icon" class="w-8 h-8 text-accent" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              {{ tip.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ tip.description }}
            </p>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- CTA Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-20 sm:py-28">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Challenge?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Explore our curated learning bundles for structured paths, or browse all resources to build your own challenge.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <UButton 
              to="/roadmaps" 
              size="xl" 
              class="bg-accent hover:bg-accent/90 text-white px-8 py-3 font-medium"
            >
              Browse Learning Bundles
            </UButton>
            <UButton 
              to="/resources" 
              size="xl" 
              variant="outline"
              class="border-gray-300 dark:border-gray-700 px-8 py-3"
            >
              Explore All Resources
            </UButton>
          </div>

          <!-- Social Sharing -->
          <div class="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Share your challenge journey:</p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              <a 
                href="https://twitter.com/intent/tweet?text=I'm%20starting%20a%2030-day%20coding%20challenge!%20%2330DayChallenge&url=https://greysoftware.org/challenges"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
              >
                <UIcon name="lucide-twitter" class="w-4 h-4" />
                Share on Twitter
              </a>
              <span class="px-4 py-2 text-sm bg-accent/10 text-accent rounded-full font-medium">
                #30DayChallenge
              </span>
            </div>
          </div>

          <!-- Related Links -->
          <div class="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Related resources:</p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              <NuxtLink 
                to="/roadmaps/web-fundamentals"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Web Fundamentals
              </NuxtLink>
              <NuxtLink 
                to="/roadmaps/python-mastery"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Python Mastery
              </NuxtLink>
              <NuxtLink 
                to="/roadmaps/devops-pro"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                DevOps Pro
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