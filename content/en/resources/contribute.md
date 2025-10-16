---
title: 'Contributing Resources'
description: 'Help us build the best curated resource collection for developers worldwide.'
---

# How to Contribute Resources

We welcome contributions from professionals and academics worldwide! Every resource is reviewed by our team to ensure it meets our quality standards.

::callout{icon="i-heroicons-information-circle"}
Our goal is to curate quality over quantity. If you've found a resource that genuinely helped you, chances are it will help others too.
::

## Submission Process

::steps
  1. **Fork the Repository**
     Start by forking the [official website repository on GitHub](https://github.com/grey-software/website).

  2. **Create a New File**
     Add a new markdown file inside the `content/en/resources/[category]` directory. For example, a new tool would go in `content/en/resources/tools/my-cool-tool.md`.

  3. **Add Frontmatter**
     Use the template below to fill out the required frontmatter fields for the resource.

  4. **Submit a Pull Request**
     Once you are done, submit a pull request to our repository. We'll review it and merge it if everything looks good.
::

## Resource Template

Copy and paste this template into your new markdown file and fill in the values.

::code-group
  ```markdown [content/en/resources/tools/example.md]
  ---
  title: "Your Resource Title"
  description: "A short, compelling description of what the resource is and why it's valuable."
  category: tutorial
  author: "Author Name"
  url: "https://example.com/the-resource"
  tags: ["javascript", "vue", "nuxt"]
  difficulty: intermediate
  publishedAt: 2025-10-16
  ---
  ```
::

::callout{icon="i-heroicons-rocket-launch" type="success"}
Once your pull request is merged, your contribution will be live on the site within minutes! Thank you for helping the community.
::