import { ref, computed } from 'vue'
import Fuse from 'fuse.js'

export const useSearch = (collection: string, options: any) => {
  const searchQuery = ref('')
  const { data: resources } = useAsyncData(`search-${collection}`,
    async () => {
      try {
        // @ts-ignore - collection name is dynamic
        return await queryCollection(collection).all()
      } catch (error) {
        console.warn(`Failed to load ${collection}:`, error)
        return []
      }
    }
  )

  const fuse = computed(() => {
    if (!resources.value || !Array.isArray(resources.value)) {
      return null
    }
    return new Fuse(resources.value, options)
  })

  const searchResults = computed(() => {
    if (!searchQuery.value || !fuse.value) {
      return resources.value || []
    }
    // Return results sorted by relevance score (lower score = better match)
    const results = fuse.value.search(searchQuery.value)
    return results.map(result => ({
      ...result.item,
      _searchScore: result.score
    }))
  })

  return {
    searchQuery,
    searchResults,
    resources,
  }
}
