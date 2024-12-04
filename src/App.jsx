import ProjectSidebar from "./components/ProjectSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected   from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";
function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[]
  });

  function handleAddTask(text){
    
    setProjectState(prevState => {
      const taskId = Math.random();
    const newTask = {
      text: text,
      id: taskId,
      projectId: prevState.selectedProjectId
    };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  function handleDeleteTask(id){
    console.log("delete task pressed");
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)

      }
    })
  }
  function handleStartAddproject(){
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleCancel(){
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleDeleteProject(){
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects:prevState.projects.filter(project => project.id !== prevState.selectedProjectId),

      }
    })
  }


  function handleAddProject(projectData){
    const newProject = {
      ...projectData,
      id: Math.random()
    };
    setProjectState(prevState => {
      return {
        ...prevState,
        projects:[...prevState.projects, newProject],
        selectedProjectId: undefined
      }
    })
  }

  function handleSelectedProject(id){
  
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function deleteProject(){

  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} tasks={projectState.tasks} onDeleteTask={handleDeleteTask}/>
  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancel}/>
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddproject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8 " >
      <ProjectSidebar onStartAddProject={handleStartAddproject} onSelectProject={handleSelectedProject} projects={projectState.projects} selectedProjectId={projectState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
