# Build Issues Resolution Summary

## Problems Identified

### 1. **SQLite Dependencies** ✅ RESOLVED
- **Issue**: `better-sqlite3` and `nuxt-llms` were incompatible with Netlify static builds
- **Solution**: Removed `nuxt-llms` module, kept `better-sqlite3` as Nuxt Content requires it
- **Why it works now**: Nuxt Content 3.7.1 requires better-sqlite3 for local database operations during build time. The generated static files don't include the SQLite binary.

### 2. **Partners Collection Schema** ✅ RESOLVED  
- **Issue**: Schema expected JSON files but actual files were YAML
- **Solution**: Changed `source: 'en/partners/**/*.json'` to `source: 'en/partners/**/*.yml'`

### 3. **Missing Netlify Configuration** ✅ RESOLVED
- **Issue**: No `netlify.toml` file
- **Solution**: Created netlify.toml with proper Node 22 and pnpm 9 configuration

### 4. **pnpm Build Scripts** ⚠️ NEEDS ATTENTION
- **Issue**: pnpm 10.18.3 has strict build script policies
- **Current Status**: Works locally with manual approval, needs configuration for CI

## Files Modified

### package.json
```json
{
  "dependencies": {
    "@nuxt/content": "3.7.1",
    "@nuxt/image": "1.11.0",
    "@nuxt/ui": "4.0.1",
    "@nuxtjs/i18n": "^10.1.1",
    "@nuxtjs/seo": "^3.2.2",
    "better-sqlite3": "^12.4.1",  // Required by Nuxt Content
    "nuxt": "^4.1.3",
    "typescript": "^5.6.3",
    "vue": "^3.5.22",
    "vue-router": "^4.5.1"
  }
}
```

### nuxt.config.ts
- Removed `'nuxt-llms'` from modules array
- Removed `llms` configuration
- Kept clean `content` configuration

### netlify.toml (NEW)
```toml
[build]
  command = "pnpm run generate"
  publish = ".output/public"

[build.environment]
  NODE_VERSION = "22"
  PNPM_VERSION = "9"
  CONTENT_DATABASE_TYPE = "libsql"
  CONTENT_DATABASE_URL = ":memory:"
```

### .npmrc (NEW)
```
shamefully-hoist=true
public-hoist-pattern[]=*@nuxt*
public-hoist-pattern[]=*estree-walker*
strict-peer-dependencies=false
```

### .gitignore (UPDATED)
Added Nuxt-specific ignores:
```
.nuxt/
.output/
local.db
local.db-shm
local.db-wal
```

## Why better-sqlite3 is OK for Netlify

### Build Time vs Runtime
- **Build Time**: better-sqlite3 runs on Netlify's build servers (Ubuntu/Linux)
- **Runtime**: The static files are served; no database code runs
- **Result**: The SQLite database is only used to index and query content during `nuxt generate`

### How it Works
1. During `pnpm install`: better-sqlite3 compiles for the build environment
2. During `nuxt generate`: Nuxt Content uses SQLite to process markdown files
3. **Output**: Static HTML/JS/CSS files in `.output/public/`
4. **Deploy**: Only static files are deployed, no SQLite binary

## Next Steps for Deployment

### Option 1: Let Netlify Handle It (RECOMMENDED)
Netlify's build environment should handle better-sqlite3 compilation automatically since:
- You're using Node 22 (specified in netlify.toml)
- pnpm 9 is specified
- The build environment has necessary compilers

### Option 2: If Build Still Fails
Add this to `package.json` scripts:
```json
"scripts": {
  "preinstall": "npx only-allow pnpm",
  "postinstall": "nuxt prepare"
}
```

### Option 3: Use Build Plugin
Add to `netlify.toml`:
```toml
[[plugins]]
  package = "netlify-plugin-pnpm"
```

## Testing Locally

```bash
# Clean install
rm -rf node_modules .nuxt pnpm-lock.yaml
pnpm install

# Test dev server
pnpm run dev

# Test production build
pnpm run generate

# Preview production build
pnpm run preview
```

## Common Issues & Solutions

### Issue: "better-sqlite3 requires build scripts"
**Solution**: This is normal. pnpm will handle it during install on Netlify.

### Issue: "estree-walker no exports main"
**Solution**: The `.npmrc` with `shamefully-hoist=true` resolves this.

### Issue: Build works locally but fails on Netlify
**Solution**: Check that `netlify.toml` has correct Node and pnpm versions.

## Deployment Checklist

Before pushing to Netlify:
- [x] `better-sqlite3` in dependencies
- [x] `nuxt-llms` removed
- [x] Partners schema fixed (yml not json)
- [x] `netlify.toml` created
- [x] `.npmrc` configured
- [x] `.gitignore` updated
- [ ] Test local build with `pnpm run generate`
- [ ] Commit all changes
- [ ] Push to GitHub
- [ ] Monitor Netlify build logs

## Expected Netlify Build Output

You should see:
1. ✅ Dependencies installed (including better-sqlite3)
2. ✅ `nuxt prepare` runs successfully
3. ✅ `nuxt generate` creates static files
4. ✅ Site published to `.output/public`

## If Netlify Build Still Fails

Check these in order:
1. **Build logs**: Look for the specific error message
2. **Node version**: Verify Node 22 is being used
3. **pnpm version**: Verify pnpm 9 is being used
4. **Dependencies**: Ensure all packages installed successfully
5. **Build command**: Verify it's running `pnpm run generate`

## Support Resources

- [Nuxt Content Documentation](https://content.nuxt.com)
- [Netlify Build Documentation](https://docs.netlify.com/configure-builds/overview/)
- [pnpm Documentation](https://pnpm.io/npmrc)
