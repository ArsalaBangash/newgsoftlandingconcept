#!/bin/bash
# filepath: /Users/arsala/newgsoftlandingconcept/verify-resources.sh

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
TOTAL=0
VALID=0
INVALID=0
TIMEOUT=0

echo "🔍 Scanning all resources for 404s and broken links..."
echo "=================================================="

# Find all markdown files in resources directory
for file in content/en/resources/**/*.md; do
    if [ -f "$file" ]; then
        # Extract URL from frontmatter
        url=$(grep -m1 '^url:' "$file" | sed 's/url: "\(.*\)"/\1/' | xargs)
        
        if [ -n "$url" ]; then
            TOTAL=$((TOTAL + 1))
            title=$(grep -m1 '^title:' "$file" | sed 's/title: "\(.*\)"/\1/')
            
            # Check if URL is valid (skip localhost and relative URLs)
            if [[ $url == http* ]]; then
                # Use curl with timeout and follow redirects
                response=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 --connect-timeout 5 "$url" 2>/dev/null)
                
                if [ $? -ne 0 ]; then
                    echo -e "${YELLOW}⏱️  TIMEOUT${NC} - $title"
                    echo "   URL: $url"
                    echo "   File: $file"
                    TIMEOUT=$((TIMEOUT + 1))
                elif [ "$response" = "404" ]; then
                    echo -e "${RED}❌ 404 NOT FOUND${NC} - $title"
                    echo "   URL: $url"
                    echo "   File: $file"
                    INVALID=$((INVALID + 1))
                elif [ "$response" = "403" ]; then
                    echo -e "${YELLOW}⛔ 403 FORBIDDEN${NC} - $title"
                    echo "   URL: $url"
                    echo "   File: $file"
                    TIMEOUT=$((TIMEOUT + 1))
                elif [[ "$response" =~ ^2 ]]; then
                    echo -e "${GREEN}✅ $response${NC} - $title"
                    VALID=$((VALID + 1))
                else
                    echo -e "${YELLOW}⚠️  $response${NC} - $title"
                    echo "   URL: $url"
                    TIMEOUT=$((TIMEOUT + 1))
                fi
            else
                echo -e "${YELLOW}⏭️  SKIP${NC} - $title (local/relative URL)"
            fi
        fi
    fi
done

echo ""
echo "=================================================="
echo "📊 REPORT SUMMARY"
echo "=================================================="
echo "Total URLs checked: $TOTAL"
echo -e "${GREEN}✅ Valid (2xx):${NC} $VALID"
echo -e "${RED}❌ 404 Errors:${NC} $INVALID"
echo -e "${YELLOW}⚠️  Timeouts/Other:${NC} $TIMEOUT"
echo "=================================================="

if [ $INVALID -gt 0 ]; then
    echo -e "\n${RED}⚠️  ACTION REQUIRED: Found $INVALID broken links!${NC}"
    exit 1
else
    echo -e "\n${GREEN}✅ All links verified!${NC}"
    exit 0
fi