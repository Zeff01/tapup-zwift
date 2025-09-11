#!/bin/bash

# Script to fix transaction data via API
# Make sure your Next.js app is running on port 3000 or 3001

PORT=${PORT:-3001}
BASE_URL="http://localhost:$PORT"

echo "=== Running Transaction Data Fixes ==="
echo "Using URL: $BASE_URL"
echo

# Step 1: Analyze
echo "1. Analyzing current data..."
curl -X POST "$BASE_URL/api/admin/fix-transaction-data" \
  -H "Content-Type: application/json" \
  -d '{"action": "analyze"}' \
  2>/dev/null

echo -e "\n\n2. Fixing transaction statuses..."
curl -X POST "$BASE_URL/api/admin/fix-transaction-data" \
  -H "Content-Type: application/json" \
  -d '{"action": "fix-statuses"}' \
  2>/dev/null

echo -e "\n\n3. Fixing missing customer data..."
curl -X POST "$BASE_URL/api/admin/fix-transaction-data" \
  -H "Content-Type: application/json" \
  -d '{"action": "fix-missing-customers"}' \
  2>/dev/null

echo -e "\n\n4. Re-analyzing to confirm fixes..."
curl -X POST "$BASE_URL/api/admin/fix-transaction-data" \
  -H "Content-Type: application/json" \
  -d '{"action": "analyze"}' \
  2>/dev/null

echo -e "\n\n✅ All fixes completed!"