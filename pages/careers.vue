<!-- pages/careers.vue -->
<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: 'Real World Tech Stacks - Career-Focused Guidance | Grey Software',
  description: 'Career-focused guidance on which technologies to learn for specific job markets. Explore PHP/Laravel, Java/Spring, C#/.NET, Go, Rust, and Python stacks.',
  ogTitle: 'Real World Tech Stacks - Career-Focused Guidance',
  ogDescription: 'Career-focused guidance on which technologies to learn for specific job markets. Find the right tech stack for your career goals.',
})

// Tech Stack Data
const techStacks = [
  {
    id: 'php-laravel',
    name: 'PHP/Laravel Stack',
    icon: 'i-heroicons-server-stack',
    description: 'Powers WordPress (43% of web), Laravel ecosystem',
    bestFor: 'Freelance, agencies, rapid development',
    jobMarket: 'Massive, especially remote/freelance',
    color: 'purple',
    bundleLink: '/roadmaps/php-laravel-backend'
  },
  {
    id: 'java-spring',
    name: 'Java/Spring Stack',
    icon: 'i-heroicons-building-office-2',
    description: 'Enterprise backbone, Android development',
    bestFor: 'Enterprise, banking, large-scale systems',
    jobMarket: 'Highest paying, most stable',
    color: 'orange',
    bundleLink: '/roadmaps/java-spring-enterprise'
  },
  {
    id: 'csharp-dotnet',
    name: 'C#/.NET Stack',
    icon: 'i-heroicons-window',
    description: 'Microsoft ecosystem, game dev (Unity), enterprise',
    bestFor: 'Enterprise, gaming, Windows development',
    jobMarket: 'Strong in corporate environments',
    color: 'blue',
    bundleLink: '/roadmaps/dotnet-csharp-microsoft'
  },
  {
    id: 'go',
    name: 'Go Stack',
    icon: 'i-heroicons-bolt',
    description: 'Cloud infrastructure, DevOps tooling',
    bestFor: 'Cloud-native, microservices, performance-critical',
    jobMarket: 'Growing rapidly, premium salaries',
    color: 'cyan',
    bundleLink: '/roadmaps/go-rust-systems'
  },
  {
    id: 'rust',
    name: 'Rust Stack',
    icon: 'i-heroicons-shield-check',
    description: 'Systems programming, WebAssembly, security',
    bestFor: 'Performance-critical, systems, blockchain',
    jobMarket: 'Niche but highest satisfaction',
    color: 'red',
    bundleLink: '/roadmaps/go-rust-systems'
  },
  {
    id: 'python',
    name: 'Python Stack',
    icon: 'i-heroicons-cpu-chip',
    description: 'AI/ML, data science, automation',
    bestFor: 'Data science, AI, scripting, backend',
    jobMarket: 'Exploding in AI/ML space',
    color: 'yellow',
    bundleLink: '/roadmaps/python-mastery'
  }
]

// Hot Skills 2025
const hotSkills = [
  {
    name: 'AI/ML Engineering',
    technologies: 'Python, TensorFlow, PyTorch',
    demand: 'Very High',
    icon: 'i-heroicons-sparkles'
  },
  {
    name: 'DevOps & Cloud',
    technologies: 'Docker, Kubernetes, AWS/GCP',
    demand: 'High',
    icon: 'i-heroicons-cloud'
  },
  {
    name: 'Full-Stack Development',
    technologies: 'React, Node.js, TypeScript',
    demand: 'High',
    icon: 'i-heroicons-code-bracket'
  },
  {
    name: 'Cybersecurity',
    technologies: 'Security tools, Penetration testing',
    demand: 'Growing',
    icon: 'i-heroicons-shield-exclamation'
  }
]

// Helper function for stack card colors
const getStackColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; border: string; icon: string }> = {
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600',
      icon: 'text-purple-600 dark:text-purple-400'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600',
      icon: 'text-orange-600 dark:text-orange-400'
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600',
      icon: 'text-blue-600 dark:text-blue-400'
    },
    cyan: {
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      border: 'border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600',
      icon: 'text-cyan-600 dark:text-cyan-400'
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600',
      icon: 'text-red-600 dark:text-red-400'
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 dark:hover:border-yellow-600',
      icon: 'text-yellow-600 dark:text-yellow-400'
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
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Real World Tech Stacks
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Career-focused guidance on which technologies to learn for specific job markets
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <UButton 
              to="#tech-stacks" 
              size="lg" 
              class="bg-accent hover:bg-accent/90 text-white px-6"
            >
              Explore Tech Stacks
            </UButton>
            <UButton 
              to="/resources" 
              size="lg" 
              variant="outline"
              class="border-gray-300 dark:border-gray-700"
            >
              Browse Resources
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Career Truth Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-16 sm:py-20">
        <div class="max-w-3xl mx-auto">
          <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <UIcon name="i-heroicons-light-bulb" class="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  The Uncomfortable Truth About Tech Stacks
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Your favorite YouTuber's stack might not match your local job market. The "best" technology is often the one that gets you hired in your area.
                </p>
                <p class="text-gray-600 dark:text-gray-400 font-medium">
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 inline mr-1" />
                  Research job postings in YOUR area before committing to a learning path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Tech Stacks Section -->
    <div id="tech-stacks" class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Choose Your Tech Stack
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Each stack has its own job market, salary range, and career trajectory. Pick based on your goals.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="stack in techStacks" 
            :key="stack.id"
            class="group rounded-xl border p-6 transition-all hover:shadow-lg"
            :class="[
              getStackColorClasses(stack.color).bg,
              getStackColorClasses(stack.color).border
            ]"
          >
            <!-- Stack Header -->
            <div class="flex items-start gap-3 mb-4">
              <UIcon 
                :name="stack.icon" 
                class="w-8 h-8 flex-shrink-0"
                :class="getStackColorClasses(stack.color).icon"
              />
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ stack.name }}
              </h3>
            </div>

            <!-- Stack Description -->
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {{ stack.description }}
            </p>

            <!-- Stack Details -->
            <div class="space-y-3 mb-6">
              <div class="flex items-start gap-2">
                <span class="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide w-20 flex-shrink-0">Best for:</span>
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ stack.bestFor }}</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide w-20 flex-shrink-0">Job Market:</span>
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ stack.jobMarket }}</span>
              </div>
            </div>

            <!-- Stack CTA -->
            <NuxtLink 
              :to="stack.bundleLink"
              class="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline"
            >
              View Learning Path
              <UIcon name="lucide-arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Skills on Fire 2025 Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-16 sm:py-20">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-medium mb-4">
            <UIcon name="i-heroicons-fire" class="w-4 h-4" />
            Skills on Fire 2025
          </div>
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Hottest Skills in the Market
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            These skills are seeing the highest demand growth and salary premiums right now.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div 
            v-for="skill in hotSkills" 
            :key="skill.name"
            class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-accent dark:hover:border-accent hover:shadow-lg transition-all"
          >
            <div class="mb-4">
              <UIcon :name="skill.icon" class="w-8 h-8 text-accent" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              {{ skill.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {{ skill.technologies }}
            </p>
            <div class="flex items-center gap-2">
              <span 
                class="inline-block px-2 py-1 text-xs font-medium rounded-full"
                :class="skill.demand === 'Very High' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                  : skill.demand === 'High'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'"
              >
                {{ skill.demand }} Demand
              </span>
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
            Ready to Start Your Journey?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Explore our curated learning bundles designed for specific career paths, or browse all resources to find exactly what you need.
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

          <!-- Related Bundles -->
          <div class="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Popular learning paths:</p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              <NuxtLink 
                to="/roadmaps/java-spring-enterprise"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Java/Spring Enterprise
              </NuxtLink>
              <NuxtLink 
                to="/roadmaps/php-laravel-backend"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                PHP/Laravel Backend
              </NuxtLink>
              <NuxtLink 
                to="/roadmaps/dotnet-csharp-microsoft"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                .NET/C# Microsoft
              </NuxtLink>
              <NuxtLink 
                to="/roadmaps/go-rust-systems"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Go/Rust Systems
              </NuxtLink>
              <NuxtLink 
                to="/roadmaps/python-mastery"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Python Mastery
              </NuxtLink>
            </div>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>