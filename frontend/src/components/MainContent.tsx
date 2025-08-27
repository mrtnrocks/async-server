import React, { useEffect, useState } from 'react';

interface Task {
  id: string;
  title: string;
}

interface MainContentProps {
  projectId: string | null;
}

const MainContent: React.FC<MainContentProps> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setTasks([]);
      return;
    }

    const fetchTasks = async () => {
      setLoading(true);
      try {
        // TODO: Replace with dynamic org_id
        const orgId = 'test-org';
        const response = await fetch(`http://localhost:8000/task/tasks?org_id=${orgId}&project_id=${projectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  return (
    <div className="MainContent">
      <h2>Tasks</h2>
      {projectId ? (
        <>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && (
            <ul>
              {tasks.map(task => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Please select a project to see the tasks.</p>
      )}
    </div>
  );
};

export default MainContent;
