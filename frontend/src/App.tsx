import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <Sidebar onSelectProject={handleSelectProject} />
        <MainContent projectId={selectedProjectId} />
      </div>
    </div>
  );
}

export default App;
