<template>
  <div class="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
    <UContainer class="py-24">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
          🗺️ Learning Paths
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Structured journeys from beginner to expert. Pick your destination and start learning.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
            <h3 class="text-xl font-bold text-white mb-2">Frontend Developer</h3>
            <p class="text-blue-50 text-sm">Build beautiful, interactive web interfaces</p>
          </div>
          <div class="p-6">
            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">HTML & CSS Basics</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">JavaScript Fundamentals</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">React & Modern Frameworks</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">TypeScript & Advanced Patterns</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Next.js & Full Stack</span></div>
            </div>
            <UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
            <h3 class="text-xl font-bold text-white mb-2">Backend Developer</h3>
            <p class="text-purple-50 text-sm">Master server-side architecture and databases</p>
          </div>
          <div class="p-6">
            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Programming Fundamentals</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Node.js & Runtime Environment</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Databases & SQL/NoSQL</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">API Design & REST/GraphQL</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Authentication & Security</span></div>
            </div>
            <UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gradient-to-r from-orange-500 to-red-500 p-6">
            <h3 class="text-xl font-bold text-white mb-2">AI/ML Engineer</h3>
            <p class="text-orange-50 text-sm">Build intelligent systems with machine learning</p>
          </div>
          <div class="p-6">
            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Python Fundamentals</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Math & Statistics Basics</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Machine Learning Crash Course</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Deep Learning & Neural Networks</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Production & Deployment</span></div>
            </div>
            <UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gradient-to-r from-green-500 to-teal-500 p-6">
            <h3 class="text-xl font-bold text-white mb-2">DevOps Engineer</h3>
            <p class="text-green-50 text-sm">Deploy, scale, and manage infrastructure</p>
          </div>
          <div class="p-6">
            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Linux & Command Line</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Docker & Containerization</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Kubernetes & Orchestration</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">CI/CD Pipelines & Automation</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Cloud Platforms (AWS/GCP)</span></div>
            </div>
            <UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gradient-to-r from-indigo-500 to-violet-500 p-6">
            <h3 class="text-xl font-bold text-white mb-2">Full Stack Developer</h3>
            <p class="text-indigo-50 text-sm">Build complete end-to-end applications</p>
          </div>
          <div class="p-6">
            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Web Fundamentals (HTML/CSS)</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Frontend (React/Vue)</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Backend (Node.js/Databases)</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">APIs & Integration</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Deployment & DevOps</span></div>
            </div>
            <UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
          <div class="bg-gradient-to-r from-rose-500 to-orange-500 p-6">
            <h3 class="text-xl font-bold text-white mb-2">Open Source Champion</h3>
            <p class="text-rose-50 text-sm">Contribute to communities and grow your portfolio</p>
          </div>
          <div class="p-6">
            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-2"><span class="text-lg">1️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Git & GitHub Mastery</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">2️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Finding Beginner-Friendly Projects</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">3️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Making Your First PR</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">4️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Code Review & Community</span></div>
              <div class="flex items-center gap-2"><span class="text-lg">5️⃣</span><span class="text-sm text-gray-700 dark:text-gray-300">Building Your Portfolio</span></div>
            </div>
            <UButton to="/resources" size="sm" variant="outline" class="w-full">Start Path →</UButton>
          </div>
        </div>
      </div>

      <div class="mt-12 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p class="text-center text-gray-700 dark:text-gray-300">
          💡 <span class="font-semibold">Tip:</span> Pick a path that excites you. Each step includes curated resources, practice opportunities, and community support. Complete 5-10 resources per path on average (approximately 3-6 months).
        </p>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
// Learning paths component - structured career journeys
</script>
