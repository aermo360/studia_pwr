echo "Current STRAPI_URL (Configured): $STRAPI_URL"

# Resolve hostname to IP to avoid Node DNS issues in Alpine
BACKEND_HOST=$(echo $STRAPI_URL | awk -F/ '{print $3}' | awk -F: '{print $1}')
BACKEND_PORT=$(echo $STRAPI_URL | awk -F/ '{print $3}' | awk -F: '{print $2}')
BACKEND_IP=$(getent hosts $BACKEND_HOST | awk '{ print $1 }')

if [ -n "$BACKEND_IP" ]; then
    export STRAPI_URL="http://$BACKEND_IP:$BACKEND_PORT"
    export NO_PROXY="localhost,127.0.0.1,backend,$BACKEND_IP"
    echo "Resolved START_URL to IP: $STRAPI_URL"
    echo "Set NO_PROXY to: $NO_PROXY"
else
    echo "Could not resolve backend IP, keeping: $STRAPI_URL"
fi

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
echo "Running Node Fetch Debugger:"
node debug-connection.js
npx astro sync

echo "Building production build..."
npm run build

echo "Starting preview server..."
npx astro preview --host --port 4321
