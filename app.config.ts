// app.config.ts
export default defineAppConfig({
  ui: {
    primary: 'neutral',
    gray: 'neutral'
  },
  header: {
    links: [
      { label: 'Resources', to: '/resources' },
      { label: 'Roadmaps', to: '/roadmaps' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contribute', to: '/resources/contribute' }
    ]
  },
  footer: {
    links: [
      { label: 'About', to: '/about' },
      { label: 'Community', to: '/community' },
      { label: 'Careers', to: '/careers' }
    ],
    socials: [
      { label: 'GitHub', icon: 'i-simple-icons-github', to: 'https://github.com/grey-software' }
    ]
  }
})