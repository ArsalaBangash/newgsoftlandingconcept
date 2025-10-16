<!-- pages/blog/index.vue -->
<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').order('publishedAt', 'DESC').all()
)

useSeoMeta({
  title: 'Blog',
  description: 'Latest articles on developer trends, tutorials, and community stories.'
})
</script>

<template>
  <UContainer class="py-12">
    <!-- Header -->
    <div class="max-w-2xl mx-auto mb-12 text-center">
      <h1 class="text-4xl font-bold">Blog</h1>
      <p class="mt-4 text-lg text-gray-500">
        Insights, tutorials, and stories from the developer community.
      </p>
    </div>

    <!-- Blog Posts -->
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <UCard v-for="post in posts" :key="post.path">
        <template #header v-if="post.cover">
          <NuxtImg :src="post.cover" :alt="post.title" class="w-full h-48 object-cover rounded-t-lg" />
        </template>
        <h3 class="text-lg font-bold">{{ post.title }}</h3>
        <p class="mt-1 text-sm text-gray-500 line-clamp-3">{{ post.description }}</p>
        <div class="mt-2 text-xs text-gray-400">
          {{ post.author }} • {{ new Date(post.publishedAt).toLocaleDateString() }}
        </div>
        <template #footer>
          <UButton :to="post.path" block>
            Read More
          </UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>