#!/bin/bash

echo "🔍 Checking database for saved contacts..."

# Connect to the PostgreSQL database container
docker exec -it actia-database psql -U actia_user -d actia_db -c "
SELECT 
    id,
    name,
    email,
    company,
    message,
    created_at
FROM contacts 
ORDER BY created_at DESC 
LIMIT 10;
"

echo ""
echo "📊 Total contacts count:"
docker exec -it actia-database psql -U actia_user -d actia_db -c "
SELECT COUNT(*) as total_contacts FROM contacts;
"
