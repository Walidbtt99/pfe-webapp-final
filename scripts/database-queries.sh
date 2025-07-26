#!/bin/bash

echo "🗄️  ACTIA Database Verification Script"
echo "======================================"

# Function to run SQL queries
run_query() {
    local query="$1"
    local description="$2"
    
    echo ""
    echo "📊 $description"
    echo "----------------------------------------"
    docker exec -it actia-database psql -U actia_user -d actia_db -c "$query"
}

# Check if database container is running
if ! docker ps | grep -q actia-database; then
    echo "❌ Database container is not running!"
    echo "Run: docker-compose up -d"
    exit 1
fi

echo "✅ Database container is running"

# Basic queries
run_query "SELECT version();" "PostgreSQL Version"

run_query "SELECT current_database(), current_user, now();" "Connection Info"

run_query "SELECT COUNT(*) as total_contacts FROM contacts;" "Total Contacts Count"

run_query "
SELECT 
    id,
    name,
    email,
    company,
    LEFT(message, 50) || '...' as message_preview,
    created_at
FROM contacts 
ORDER BY created_at DESC 
LIMIT 5;
" "Latest 5 Contacts"

run_query "
SELECT 
    CASE 
        WHEN company IS NOT NULL THEN 'With Company' 
        ELSE 'Without Company' 
    END as company_status,
    COUNT(*) as count
FROM contacts 
GROUP BY company_status;
" "Contacts by Company Status"

run_query "
SELECT 
    DATE(created_at) as date,
    COUNT(*) as contacts_per_day
FROM contacts 
GROUP BY DATE(created_at)
ORDER BY date DESC;
" "Contacts per Day"

run_query "
SELECT 
    AVG(LENGTH(message)) as avg_message_length,
    MIN(LENGTH(message)) as min_message_length,
    MAX(LENGTH(message)) as max_message_length
FROM contacts;
" "Message Length Statistics"

echo ""
echo "✅ Database verification complete!"
echo ""
echo "💡 To add test data, run:"
echo "curl -X POST http://localhost:3000/api/admin/database -H 'Content-Type: application/json' -d '{\"action\":\"add_test_data\"}'"
