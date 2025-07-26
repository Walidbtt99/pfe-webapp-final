-- Create contacts table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);

-- Insert sample data (optional)
INSERT INTO contacts (name, email, company, message) VALUES
('Jean Dupont', 'jean.dupont@example.com', 'TechCorp', 'Intéressé par vos solutions d''électromobilité'),
('Marie Martin', 'marie.martin@example.com', 'AutoInnovate', 'Demande d''information sur vos services de diagnostic')
ON CONFLICT DO NOTHING;
