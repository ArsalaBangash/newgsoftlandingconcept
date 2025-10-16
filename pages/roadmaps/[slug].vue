<!-- pages/roadmaps/[slug].vue -->
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const roadmaps = {
  'web-development': {
    title: 'Web Development Roadmap',
    description: 'Complete guide from basics to advanced web development',
    steps: [
      {
        title: 'HTML & CSS Fundamentals',
        description: 'Learn the building blocks of the web',
        resources: ['HTML Basics', 'CSS Fundamentals', 'Responsive Design'],
        completed: false
      },
      {
        title: 'JavaScript Basics',
        description: 'Programming fundamentals with JavaScript',
        resources: ['JavaScript Crash Course', 'DOM Manipulation'],
        completed: false
      },
      {
        title: 'Frontend Frameworks',
        description: 'Modern frontend development with React/Vue',
        resources: ['React Fundamentals', 'Vue.js Guide'],
        completed: false
      },
      {
        title: 'Backend Development',
        description: 'Server-side programming and APIs',
        resources: ['Node.js Basics', 'Express.js', 'REST APIs'],
        completed: false
      },
      {
        title: 'Databases',
        description: 'Data storage and management',
        resources: ['SQL Fundamentals', 'MongoDB', 'Database Design'],
        completed: false
      },
      {
        title: 'Deployment & DevOps',
        description: 'Getting your apps live',
        resources: ['Git & GitHub', 'Heroku/Netlify', 'CI/CD Basics'],
        completed: false
      }
    ]
  }
}

const roadmap = computed(() => roadmaps[slug as keyof typeof roadmaps])

if (!roadmap.value) {
  throw createError({ statusCode: 404, statusMessage: 'Roadmap not found' })
}

useSeoMeta({
  title: roadmap.value.title,
  description: roadmap.value.description
})
</script>

<template>
  <UContainer class="py-12">
    <!-- Header -->
    <div class="max-w-2xl mx-auto mb-12 text-center">
      <h1 class="text-4xl font-bold">{{ roadmap.title }}</h1>
      <p class="mt-4 text-lg text-gray-500">{{ roadmap.description }}</p>
    </div>

    <!-- Roadmap Steps -->
    <div class="max-w-4xl mx-auto">
      <div class="space-y-8">
        <div
          v-for="(step, index) in roadmap.steps"
          :key="index"
          class="flex items-start space-x-4"
        >
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
              {{ index + 1 }}
            </div>
          </div>
          <div class="flex-1">
            <UCard>
              <h3 class="text-lg font-bold">{{ step.title }}</h3>
              <p class="mt-2 text-gray-600 dark:text-gray-300">{{ step.description }}</p>
              <div class="mt-4">
                <h4 class="font-semibold">Recommended Resources:</h4>
                <ul class="mt-2 list-disc list-inside text-sm text-gray-500">
                  <li v-for="resource in step.resources" :key="resource">{{ resource }}</li>
                </ul>
              </div>
              <template #footer>
                <UButton variant="outline" size="sm">
                  Mark as Complete
                </UButton>
              </template>
            </UCard>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>