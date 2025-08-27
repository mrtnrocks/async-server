import React, { useEffect, useState } from 'react';

interface Project {
  id: string;
  name: string;
}

interface SidebarProps {
  onSelectProject: (projectId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // TODO: Replace with dynamic org_id
        const orgId = 'test-org';
        const response = await fetch(`http://localhost:8000/project/projects?org_id=${orgId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="Sidebar">
      <h2>Projects</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {projects.map(project => (
            <li key={project.id} onClick={() => onSelectProject(project.id)}>
              {project.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
