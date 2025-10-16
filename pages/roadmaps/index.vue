<!-- pages/roadmaps/index.vue -->
<script setup lang="ts">
useSeoMeta({
  title: 'Developer Roadmaps | Grey Software',
  description: 'Explore curated learning paths for developers. Step-by-step guides for web development, backend, DevOps, and more powered by roadmap.sh',
  ogTitle: 'Developer Learning Roadmaps'
})

interface Roadmap {
  id: string
  title: string
  description: string
  url: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
}

const roadmaps: Roadmap[] = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Step by step guide to become a modern frontend developer. Learn HTML, CSS, JavaScript, React, and more.',
    url: 'https://roadmap.sh/frontend',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    difficulty: 'beginner',
    estimatedTime: '6-12 months'
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Comprehensive guide to becoming a backend developer. Master server-side programming, databases, APIs, and deployment.',
    url: 'https://roadmap.sh/backend',
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    difficulty: 'intermediate',
    estimatedTime: '8-14 months'
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Learn DevOps practices, CI/CD pipelines, cloud platforms, container orchestration, and infrastructure as code.',
    url: 'https://roadmap.sh/devops',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    difficulty: 'advanced',
    estimatedTime: '10-16 months'
  },
  {
    id: 'full-stack',
    title: 'Full Stack Developer',
    description: 'Complete roadmap for full-stack development. Learn both frontend and backend technologies to build complete applications.',
    url: 'https://roadmap.sh/full-stack',
    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.06-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
    difficulty: 'intermediate',
    estimatedTime: '12-18 months'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Master JavaScript from basics to advanced concepts. Learn ES6+, async programming, design patterns, and modern frameworks.',
    url: 'https://roadmap.sh/javascript',
    icon: 'M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64',
    difficulty: 'beginner',
    estimatedTime: '4-8 months'
  },
  {
    id: 'react',
    title: 'React Developer',
    description: 'Comprehensive React roadmap covering hooks, state management, routing, testing, and ecosystem best practices.',
    url: 'https://roadmap.sh/react',
    icon: 'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z',
    difficulty: 'intermediate',
    estimatedTime: '3-6 months'
  }
]

const difficultyConfig = {
  beginner: { label: 'Beginner', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30' },
  intermediate: { label: 'Intermediate', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30' },
  advanced: { label: 'Advanced', color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30' }
}

// Fetch resources with roadmap links
const { data: resourcesWithRoadmaps } = await useAsyncData('roadmap-resources', async () => {
  const resources = await queryCollection('resources').all()
  return resources.filter(r => r.roadmapUrl)
})

const resourcesByRoadmap = computed(() => {
  if (!resourcesWithRoadmaps.value) return {}
  
  const grouped: Record<string, typeof resourcesWithRoadmaps.value> = {}
  resourcesWithRoadmaps.value.forEach(resource => {
    const path = resource.roadmapPath || 'other'
    if (!grouped[path]) grouped[path] = []
    grouped[path].push(resource)
  })
  return grouped
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <UContainer class="py-12">
      <!-- Header -->
      <div class="max-w-3xl mb-12">
        <h1 class="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
          Developer Learning Roadmaps
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Structured, step-by-step paths to master different areas of software development.
          All roadmaps are curated by <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accent/80 font-medium">roadmap.sh</a>,
          with resources hand-picked by Grey Software.
        </p>
        <div class="flex flex-wrap gap-3">
          <a
            href="https://roadmap.sh"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors"
          >
            Visit roadmap.sh
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
          <NuxtLink
            to="/resources"
            class="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-medium rounded-lg hover:border-accent transition-colors"
          >
            Browse All Resources
          </NuxtLink>
        </div>
      </div>

      <!-- Roadmaps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <a
          v-for="roadmap in roadmaps"
          :key="roadmap.id"
          :href="roadmap.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group block p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover-lift hover:border-accent transition-all"
        >
          <!-- Icon -->
          <div class="w-12 h-12 mb-4 flex items-center justify-center bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
            <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" :d="roadmap.icon" />
            </svg>
          </div>

          <!-- Content -->
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
            {{ roadmap.title }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {{ roadmap.description }}
          </p>

          <!-- Metadata -->
          <div class="flex flex-wrap items-center gap-2">
            <span :class="['px-2 py-1 rounded-md text-xs font-medium', difficultyConfig[roadmap.difficulty].color]">
              {{ difficultyConfig[roadmap.difficulty].label }}
            </span>
            <span class="px-2 py-1 rounded-md text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900">
              {{ roadmap.estimatedTime }}
            </span>
            <span 
              v-if="resourcesByRoadmap[roadmap.id]"
              class="px-2 py-1 rounded-md text-xs font-medium text-accent bg-green-50 dark:bg-green-950/30"
            >
              {{ resourcesByRoadmap[roadmap.id].length }} resources
            </span>
          </div>
        </a>
      </div>

      <!-- Resources by Roadmap Section -->
      <div v-if="resourcesWithRoadmaps && resourcesWithRoadmaps.length > 0" class="border-t border-gray-200 dark:border-gray-800 pt-12">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
          Resources by Learning Path
        </h2>
        
        <div 
          v-for="(resources, path) in resourcesByRoadmap"
          :key="path"
          class="mb-12 last:mb-0"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 capitalize">
            {{ path.replace('-', ' ') }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResourceCard
              v-for="resource in resources"
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
        </div>
      </div>
    </UContainer>
  </div>
</template>