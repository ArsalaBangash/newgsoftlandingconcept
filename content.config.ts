// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const topics = z.enum([
  'Web Development',
  'AI & Machine Learning',
  'Cloud & DevOps',
  'Developer Tools',
  'Community & Career',
  'Emerging Tech'
])

// A detailed schema for our curated resources
const resources = defineCollection({
  type: 'page',
  source: 'en/resources/**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // The main topic this resource belongs to
    topic: topics,
    category: z.enum(['tutorial', 'tool', 'article', 'course', 'youtube', 'podcast', 'book']),
    // Enhanced metadata
    format: z.enum(['video', 'article', 'course', 'tool', 'book', 'documentation', 'interactive']).optional(),
    author: z.string(),
    url: z.string().url(),
    tags: z.array(z.string()),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    // Time and effort
    estimatedTime: z.string().optional(), // e.g., "2 hours", "5 minutes", "10 weeks"
    // Open source indicators
    license: z.string().optional(), // e.g., "MIT", "GPL-3.0", "Apache-2.0", "Free"
    isFree: z.boolean().default(true),
    isOpenSource: z.boolean().default(false),
    // External links
    githubUrl: z.string().url().optional(),
    githubStars: z.number().optional(),
    docsUrl: z.string().url().optional(),
    // Roadmap integration
    roadmapUrl: z.string().url().optional(), // Link to roadmap.sh section
    roadmapPath: z.string().optional(), // e.g., "frontend", "backend", "devops"
    // Related content
    prerequisites: z.array(z.string()).optional(),
    relatedResources: z.array(z.string()).optional(), // Slugs of related resources
    // Metadata
    publishedAt: z.date(),
    lastUpdated: z.date().optional(),
    featured: z.boolean().default(false)
  })
})

// A standard schema for blog posts
const blog = defineCollection({
  type: 'page',
  source: 'en/blog/**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    author: z.string().optional(),
    cover: z.string().optional(),
    // Reading metadata
    readTime: z.string().optional(), // e.g., "5 min read"
    tags: z.array(z.string()).optional(),
    category: z.string().optional(), // e.g., "Resource Roundup", "Open Source Highlight"
    featured: z.boolean().default(false)
  })
})

// New collection for partners like freeCodeCamp
const partners = defineCollection({
  type: 'data',
  source: 'en/partners/**/*.yml',
  schema: z.object({
    name: z.string(),
    logo: z.string(), // e.g., 'freecodecamp' or 'scrimba'
    url: z.string().url(),
    description: z.string()
  })
})

// Curated learning bundles - skill paths combining multiple resources
const bundles = defineCollection({
  type: 'data',
  source: 'en/bundles/**/*.yml',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(), // emoji or icon name
    duration: z.string(), // e.g., "6 weeks", "3 months"
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    resources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      type: z.enum(['course', 'tutorial', 'book', 'practice', 'article']),
      duration: z.string(),
      description: z.string()
    })),
    outcomes: z.array(z.string()), // What you'll be able to do
    tags: z.array(z.string())
  })
})

// Real developer success stories from established sources
const successStories = defineCollection({
  type: 'data',
  source: 'en/stories/**/*.yml',
  schema: z.object({
    id: z.string(),
    developerName: z.string(),
    title: z.string(), // e.g., "From Bootcamp to Senior Dev at Google"
    description: z.string(), // Short excerpt from their story
    resourcesUsed: z.array(z.string()), // Resource titles they used
    outcome: z.string(), // What they achieved
    source: z.string(), // freeCodeCamp, Scrimba, YouTube, etc.
    sourceUrl: z.string().url(), // Direct link to full story
    videoUrl: z.string().url().optional(), // Video of their story if available
    quote: z.string().optional(), // Inspiring quote from them
    tags: z.array(z.string()), // career-change, no-degree, self-taught, etc.
    featured: z.boolean().default(false)
  })
})

export default defineContentConfig({
  collections: {
    resources,
    blog,
    partners,
    bundles,
    successStories
  }
})