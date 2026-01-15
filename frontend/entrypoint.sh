#!/bin/sh
echo "Current STRAPI_URL: $STRAPI_URL"

echo "Waiting for Strapi backend to be ready at $STRAPI_URL..."

# Wait loop (up to 2 minutes)
i=0
while [ $i -lt 24 ]; do
    if curl -s -f "$STRAPI_URL/api/modules" > /dev/null; then
        echo "Strapi module API is responsive!"
        break
    fi
    echo "Strapi not ready yet... waiting 5s (Attempt $((i+1))/24)"
    sleep 5
    i=$((i+1))
done

if [ $i -eq 24 ]; then
    echo "Timeout waiting for Strapi. Proceeding anyway, but sync might fail."
fi

echo "Starting content sync..."
npx astro sync

echo "Building production build..."
npm run build

echo "Starting preview server..."
npx astro preview --host --port 4321
