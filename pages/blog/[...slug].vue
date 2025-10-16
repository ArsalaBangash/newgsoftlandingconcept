<!-- pages/blog/[...slug].vue -->
<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <UContainer class="py-12">
    <article class="max-w-4xl mx-auto">
      <header class="mb-8">
        <h1 class="text-4xl font-bold">{{ route.meta.title }}</h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-300">{{ route.meta.description }}</p>
        <div class="mt-4 text-sm text-gray-500">
          By {{ route.meta.author }} • {{ new Date(route.meta.publishedAt).toLocaleDateString() }}
        </div>
      </header>

      <ContentDoc />
    </article>
  </UContainer>
</template>