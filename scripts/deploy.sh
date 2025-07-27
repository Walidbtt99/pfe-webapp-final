#!/bin/bash

# ACTIA Engineering Services Deployment Script

set -e

echo "Starting ACTIA Engineering Services deployment..."


# Create namespace
echo "Creating Kubernetes namespace..."
kubectl apply -f k8s/namespace.yaml

# Apply secrets
echo "Applying secrets..."
kubectl apply -f k8s/secrets.yaml

# Apply persistent volumes
echo "Setting up persistent storage..."
kubectl apply -f k8s/persistent-volume.yaml

# Deploy database
echo "Deploying database..."
kubectl apply -f k8s/database-deployment.yaml

# Wait for database to be ready
echo "Waiting for database to be ready..."
kubectl wait --for=condition=ready pod -l app=actia-database -n actia-engineering --timeout=300s

# Deploy frontend (includes API routes)
echo "Deploying frontend with API..."
kubectl apply -f k8s/frontend-deployment.yaml

# Apply ingress
echo "Setting up ingress..."
kubectl apply -f k8s/ingress.yaml

echo "Deployment completed successfully!"

echo "Deployment Summary:"
echo "- Namespace: actia-engineering"
echo "- Frontend replicas: 3 (includes API routes)"
echo "- Database: PostgreSQL with persistent storage"
echo ""
echo "Check deployment status:"
echo "kubectl get pods -n actia-engineering"
echo ""
echo "Access the application:"
echo "kubectl get services -n actia-engineering"
