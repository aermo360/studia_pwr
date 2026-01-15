#!/bin/sh
echo "Current STRAPI_URL: $STRAPI_URL"

echo "Waiting for Strapi backend to be ready at $STRAPI_URL..."

# Wait loop (up to 1 minute)
i=0
while [ $i -lt 12 ]; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$STRAPI_URL/api/modules")
    
    echo "Check ($((i+1))/12): $STRAPI_URL/api/modules returned HTTP $HTTP_CODE"

    if [ "$HTTP_CODE" = "200" ]; then
        echo "Strapi module API is responsive (200 OK)!"
        break
    elif [ "$HTTP_CODE" = "403" ]; then
        echo "Strapi reachable but returned 403 Forbidden. Check Public Permissions!"
        # We break here because waiting won't fix permissions; we want to try sync to show error
        break 
    fi

    echo "Strapi not ready yet... waiting 5s"
    sleep 5
    i=$((i+1))
done

echo "Starting content sync..."
npx astro sync

echo "Building production build..."
npm run build

echo "Starting preview server..."
npx astro preview --host --port 4321
