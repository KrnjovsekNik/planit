import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function MojeNaloge() {
  // Začetni podatki
  const [tasks, setTasks] = useState({
    toDo: ["Naredi dizajn", "Preglej kodo", "Napiši dokumentacijo"],
    inProgress: ["Izdelaj API", "Testiraj funkcionalnost"],
    done: ["Deploy na strežnik"],
  });

  // Funkcija za obdelavo premikanja nalog
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // Če ni destinacije (naloga je "padla" izven stolpca)
    if (!destination) return;

    // Če je naloga premaknjena znotraj istega stolpca
    if (source.droppableId === destination.droppableId) {
      const columnTasks = Array.from(tasks[source.droppableId]);
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({ ...prev, [source.droppableId]: columnTasks }));
    } else {
      // Če je naloga premaknjena v drug stolpec
      const sourceTasks = Array.from(tasks[source.droppableId]);
      const destinationTasks = Array.from(tasks[destination.droppableId]);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks,
      }));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Moje Naloge</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={styles.columns}>
          {/* Ustvarimo tri stolpce */}
          {Object.keys(tasks).map((columnId) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={styles.column}
                >
                  <h2 style={styles.columnTitle}>
                    {columnId === "toDo" && "Za Narediti"}
                    {columnId === "inProgress" && "V Delo"}
                    {columnId === "done" && "Narejeno"}
                  </h2>
                  {tasks[columnId].map((task, index) => (
                    <Draggable
                      key={task}
                      draggableId={task}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...styles.task,
                            ...provided.draggableProps.style,
                          }}
                        >
                          {task}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f0f8ff",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: "20px",
  },
  columns: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  column: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    width: "300px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  columnTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: "15px",
  },
  task: {
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: "5px",
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
};

export default MojeNaloge;
