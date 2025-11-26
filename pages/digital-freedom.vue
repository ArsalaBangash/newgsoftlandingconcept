<!-- pages/digital-freedom.vue -->
<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: 'Digital Freedom - Privacy, Security & Open Source | Grey Software',
  description: 'Learn to protect your privacy, understand the internet\'s architecture, and build technology that respects human rights.',
  ogTitle: 'Digital Freedom - Privacy, Security & Open Source',
  ogDescription: 'Learn to protect your privacy, understand the internet\'s architecture, and build technology that respects human rights.',
})

// Topic Cards Data
const topics = [
  {
    id: 'cryptography',
    name: 'Cryptography',
    icon: 'i-heroicons-key',
    color: 'purple',
    description: 'Learn the math and code that keeps secrets safe',
    topics: ['Encryption', 'Hashing', 'Digital signatures', 'PKI'],
    whyItMatters: 'Foundation of all secure communication'
  },
  {
    id: 'internet-architecture',
    name: 'Internet Architecture',
    icon: 'i-heroicons-globe-alt',
    color: 'blue',
    description: 'Understand how the internet actually works',
    topics: ['DNS', 'TCP/IP', 'BGP', 'CDNs', 'Routing'],
    whyItMatters: 'Knowledge is power over your digital life'
  },
  {
    id: 'privacy-anonymity',
    name: 'Privacy & Anonymity',
    icon: 'i-heroicons-eye-slash',
    color: 'green',
    description: 'Tools and techniques for digital privacy',
    topics: ['Tor', 'VPNs', 'Metadata', 'Browser fingerprinting'],
    whyItMatters: 'Privacy is a fundamental human right'
  },
  {
    id: 'open-source',
    name: 'Open Source Philosophy',
    icon: 'i-heroicons-heart',
    color: 'red',
    description: 'Software freedom and community-driven development',
    topics: ['Licensing', 'Contribution', 'Governance', 'Sustainability'],
    whyItMatters: 'Transparency builds trust'
  },
  {
    id: 'decentralization',
    name: 'Decentralization',
    icon: 'i-heroicons-squares-2x2',
    color: 'orange',
    description: 'Beyond centralized platforms',
    topics: ['P2P', 'Blockchain basics', 'Federated systems', 'Web3'],
    whyItMatters: 'Resilience against censorship and control'
  },
  {
    id: 'web-security',
    name: 'Web Security',
    icon: 'i-heroicons-shield-check',
    color: 'cyan',
    description: 'Protect applications and users',
    topics: ['OWASP Top 10', 'XSS', 'CSRF', 'Authentication'],
    whyItMatters: 'Security is everyone\'s responsibility'
  }
]

// Why This Matters Points
const whyThisMattersPoints = [
  {
    icon: 'i-heroicons-eye',
    title: 'Data Collection is Everywhere',
    description: 'Every app, every website, every service is collecting data about you. Understanding how this works is the first step to protecting yourself.'
  },
  {
    icon: 'i-heroicons-code-bracket',
    title: 'Privacy by Design',
    description: 'As developers, we have the power to build systems that respect user privacy from the ground up, not as an afterthought.'
  },
  {
    icon: 'i-heroicons-scale',
    title: 'Ethical Responsibility',
    description: 'Understanding these topics makes you a more ethical and capable developer who can make informed decisions about the systems you build.'
  },
  {
    icon: 'i-heroicons-user-group',
    title: 'Empowering Users',
    description: 'When you understand digital freedom, you can help others protect themselves and make informed choices about their digital lives.'
  }
]

// Helper function for topic card colors
const getTopicColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600',
      icon: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
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
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600',
      icon: 'text-orange-600 dark:text-orange-400',
      badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    },
    cyan: {
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      border: 'border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600',
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
            <UIcon name="i-heroicons-shield-check" class="w-4 h-4" />
            Privacy • Security • Open Source
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Digital Freedom
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Learn to protect your privacy, understand the internet's architecture, and build technology that respects human rights.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <UButton 
              to="#topics" 
              size="lg" 
              class="bg-accent hover:bg-accent/90 text-white px-6"
            >
              Explore Topics
            </UButton>
            <UButton 
              to="/roadmaps/digital-freedom-privacy" 
              size="lg" 
              variant="outline"
              class="border-gray-300 dark:border-gray-700"
            >
              <UIcon name="i-heroicons-academic-cap" class="w-4 h-4 mr-2" />
              View Learning Bundle
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Uncomfortable Truth Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-16 sm:py-20">
        <div class="max-w-3xl mx-auto">
          <div class="bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800 rounded-xl p-8">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  The Uncomfortable Truth
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Most developers build surveillance tools without realizing it. Every analytics script, every tracking pixel, every "personalization" feature contributes to a system that monitors and profiles users.
                </p>
                <p class="text-gray-600 dark:text-gray-400 font-medium">
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 inline mr-1" />
                  Understanding these topics makes you a more ethical and capable developer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Topics Grid Section -->
    <div id="topics" class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Freedom Through Code
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Master these topics to build technology that empowers rather than exploits.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="topic in topics" 
            :key="topic.id"
            class="group rounded-xl border p-6 transition-all hover:shadow-lg"
            :class="[
              getTopicColorClasses(topic.color).bg,
              getTopicColorClasses(topic.color).border
            ]"
          >
            <!-- Topic Header -->
            <div class="flex items-start gap-3 mb-4">
              <UIcon 
                :name="topic.icon" 
                class="w-8 h-8 flex-shrink-0"
                :class="getTopicColorClasses(topic.color).icon"
              />
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ topic.name }}
              </h3>
            </div>

            <!-- Topic Description -->
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {{ topic.description }}
            </p>

            <!-- Topics List -->
            <div class="mb-4">
              <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-2">
                Topics Covered
              </h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="t in topic.topics" 
                  :key="t"
                  class="px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700"
                >
                  {{ t }}
                </span>
              </div>
            </div>

            <!-- Why It Matters -->
            <div class="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <p class="text-sm font-medium" :class="getTopicColorClasses(topic.color).icon">
                <UIcon name="i-heroicons-light-bulb" class="w-4 h-4 inline mr-1" />
                {{ topic.whyItMatters }}
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Why This Matters Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Why This Matters
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Digital freedom isn't just about technology—it's about human rights in the digital age.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div 
            v-for="point in whyThisMattersPoints" 
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

    <!-- Related Resources Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <UContainer class="py-16 sm:py-20">
        <div class="max-w-3xl mx-auto">
          <div class="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8 sm:p-10 text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-full mb-6 shadow-sm">
              <UIcon name="i-heroicons-book-open" class="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              Digital Freedom & Privacy Bundle
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              A curated collection of resources to help you understand and implement privacy-respecting technology.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <UButton 
                to="/roadmaps/digital-freedom-privacy"
                size="lg" 
                class="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                <UIcon name="i-heroicons-academic-cap" class="w-4 h-4 mr-2" />
                View Learning Bundle
              </UButton>
              <UButton 
                to="/resources?tags=security,privacy"
                size="lg" 
                variant="outline"
                class="border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-400"
              >
                Browse Security Resources
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- CTA Section -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <UContainer class="py-20 sm:py-28">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Start Building for Freedom
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Every line of code is a choice. Choose to build technology that respects and empowers users.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <UButton 
              to="/resources?tags=security" 
              size="xl" 
              class="bg-accent hover:bg-accent/90 text-white px-8 py-3 font-medium"
            >
              Browse Security Resources
            </UButton>
            <UButton 
              to="/roadmaps/digital-freedom-privacy" 
              size="xl" 
              variant="outline"
              class="border-gray-300 dark:border-gray-700 px-8 py-3"
            >
              View Digital Freedom Bundle
            </UButton>
          </div>

          <!-- Contribute CTA -->
          <div class="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Want to contribute?</p>
            <UButton 
              to="https://github.com/grey-software/grey-software.github.io"
              target="_blank"
              variant="ghost"
              class="text-accent hover:bg-accent/10"
            >
              <UIcon name="lucide-github" class="w-4 h-4 mr-2" />
              Contribute Resources on GitHub
            </UButton>
          </div>

          <!-- Related Links -->
          <div class="pt-8 border-t border-gray-200 dark:border-gray-800 mt-8">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Explore more:</p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              <NuxtLink 
                to="/roadmaps/secure-modern-web-dev"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Secure Web Development
              </NuxtLink>
              <NuxtLink 
                to="/roadmaps/devops-pro"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                DevOps & Security
              </NuxtLink>
              <NuxtLink 
                to="/careers"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Career Paths
              </NuxtLink>
              <NuxtLink 
                to="/stories"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Success Stories
              </NuxtLink>
            </div>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>