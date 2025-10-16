<!-- pages/resources/[...slug].vue -->
<script setup lang="ts">
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

// Fetch the resource
const { data: resource } = await useAsyncData(`resource-${slug}`, async () => {
  const resources = await queryCollection('resources').all()
  return resources.find(r => r.path.includes(slug))
})

if (!resource.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Resource not found'
  })
}

// Fetch related resources (same topic or tags)
const { data: relatedResources } = await useAsyncData(`related-${slug}`, async () => {
  if (!resource.value) return []
  
  const all = await queryCollection('resources').all()
  return all
    .filter(r => {
      if (r.path === resource.value!.path) return false
      
      // Match by topic or shared tags
      const sameTopic = r.topic === resource.value!.topic
      const sharedTags = r.tags.some(tag => resource.value!.tags.includes(tag))
      
      return sameTopic || sharedTags
    })
    .slice(0, 3)
})

// SEO Meta
useSeoMeta({
  title: `${resource.value.title} | Grey Software`,
  description: resource.value.description,
  ogTitle: resource.value.title,
  ogDescription: resource.value.description,
  ogType: 'article',
  ogUrl: `https://greysoftware.com${route.path}`,
  twitterCard: 'summary_large_image'
})

// Structured Data (Schema.org)
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': resource.value.format === 'course' ? 'Course' : 'CreativeWork',
        name: resource.value.title,
        description: resource.value.description,
        author: {
          '@type': 'Person',
          name: resource.value.author
        },
        provider: resource.value.author,
        educationalLevel: resource.value.difficulty,
        isAccessibleForFree: resource.value.isFree,
        license: resource.value.license,
        url: resource.value.url,
        ...(resource.value.githubUrl && {
          codeRepository: resource.value.githubUrl
        })
      })
    }
  ]
})

const breadcrumbs = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Resources', to: '/resources' },
  { label: resource.value?.topic || '', to: `/resources?topics=${encodeURIComponent(resource.value?.topic || '')}` },
  { label: resource.value?.title || '', to: route.path }
])

const difficultyConfig = {
  beginner: { label: 'Beginner', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30' },
  intermediate: { label: 'Intermediate', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30' },
  advanced: { label: 'Advanced', color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30' }
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <UContainer class="py-8">
      <!-- Breadcrumbs -->
      <nav 
        aria-label="Breadcrumb"
        class="mb-8"
      >
        <ol class="flex flex-wrap items-center gap-2 text-sm">
          <li v-for="(crumb, index) in breadcrumbs" :key="crumb.to" class="flex items-center gap-2">
            <NuxtLink 
              v-if="index < breadcrumbs.length - 1"
              :to="crumb.to"
              class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {{ crumb.label }}
            </NuxtLink>
            <span 
              v-else
              class="text-gray-900 dark:text-white font-medium"
              aria-current="page"
            >
              {{ crumb.label }}
            </span>
            <svg 
              v-if="index < breadcrumbs.length - 1"
              class="w-4 h-4 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="2" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <article class="lg:col-span-2 space-y-8">
          <!-- Header -->
          <header>
            <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {{ resource.title }}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {{ resource.description }}
            </p>

            <!-- Metadata Badges -->
            <div class="flex flex-wrap items-center gap-3">
              <span 
                v-if="resource.difficulty"
                :class="['px-3 py-1.5 rounded-lg text-sm font-medium', difficultyConfig[resource.difficulty].color]"
              >
                {{ difficultyConfig[resource.difficulty].label }}
              </span>

              <span 
                v-if="resource.estimatedTime"
                class="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900"
              >
                <svg class="w-4 h-4 inline-block mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ resource.estimatedTime }}
              </span>

              <span 
                v-if="resource.isFree"
                class="px-3 py-1.5 rounded-lg text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30"
              >
                Free
              </span>

              <span 
                v-if="resource.isOpenSource"
                class="px-3 py-1.5 rounded-lg text-sm font-medium text-accent bg-green-50 dark:bg-green-950/30"
              >
                <svg class="w-4 h-4 inline-block mr-1 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
                Open Source
              </span>

              <span 
                v-if="resource.license"
                class="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900"
              >
                {{ resource.license }}
              </span>

              <span 
                v-if="resource.githubStars"
                class="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900"
              >
                <svg class="w-4 h-4 inline-block mr-1 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                </svg>
                {{ resource.githubStars >= 1000 ? `${(resource.githubStars / 1000).toFixed(1)}k` : resource.githubStars }} stars
              </span>
            </div>
          </header>

          <!-- Primary Action Button -->
          <div class="flex flex-col sm:flex-row gap-3">
            <a
              :href="resource.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
            >
              Visit Resource
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>

            <a
              v-if="resource.githubUrl"
              :href="resource.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
              View on GitHub
            </a>

            <a
              v-if="resource.docsUrl"
              :href="resource.docsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Documentation
            </a>
          </div>

          <!-- Tags -->
          <div v-if="resource.tags.length > 0" class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="tag in resource.tags"
              :key="tag"
              :to="`/resources?search=${encodeURIComponent(tag)}`"
              class="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              #{{ tag }}
            </NuxtLink>
          </div>

          <!-- Roadmap Connection -->
          <div 
            v-if="resource.roadmapUrl"
            class="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg"
          >
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              <div class="flex-1">
                <h3 class="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Part of a Learning Path
                </h3>
                <p class="text-sm text-blue-700 dark:text-blue-300 mb-2">
                  This resource is part of the {{ resource.roadmapPath }} roadmap
                </p>
                <a
                  :href="resource.roadmapUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  View on roadmap.sh
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <!-- Quick Info -->
          <div class="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Info
            </h2>
            <dl class="space-y-3 text-sm">
              <div>
                <dt class="text-gray-600 dark:text-gray-400 mb-1">Topic</dt>
                <dd class="text-gray-900 dark:text-white font-medium">{{ resource.topic }}</dd>
              </div>
              <div>
                <dt class="text-gray-600 dark:text-gray-400 mb-1">Format</dt>
                <dd class="text-gray-900 dark:text-white font-medium capitalize">{{ resource.format || resource.category }}</dd>
              </div>
              <div>
                <dt class="text-gray-600 dark:text-gray-400 mb-1">Author</dt>
                <dd class="text-gray-900 dark:text-white font-medium">{{ resource.author }}</dd>
              </div>
              <div v-if="resource.publishedAt">
                <dt class="text-gray-600 dark:text-gray-400 mb-1">Published</dt>
                <dd class="text-gray-900 dark:text-white font-medium">
                  {{ new Date(resource.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Related Resources -->
          <div 
            v-if="relatedResources && relatedResources.length > 0"
            class="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg"
          >
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Related Resources
            </h2>
            <div class="space-y-4">
              <NuxtLink
                v-for="related in relatedResources"
                :key="related.path"
                :to="`/resources/${related.path.split('/').pop()?.replace('.md', '')}`"
                class="block group"
              >
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-1">
                  {{ related.title }}
                </h3>
                <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {{ related.description }}
                </p>
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </UContainer>
  </div>
</template>
