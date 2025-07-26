# Database Dockerfile (PostgreSQL)
FROM postgres:15-alpine

# Set environment variables
ENV POSTGRES_DB=actia_db
ENV POSTGRES_USER=actia_user
ENV POSTGRES_PASSWORD=actia_password

# Copy initialization scripts
COPY scripts/init-database.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB
