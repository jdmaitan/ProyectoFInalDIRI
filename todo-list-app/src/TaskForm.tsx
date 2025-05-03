import React, { useState } from 'react';

interface TaskFormProps {
  onAdd: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [text, setText] = useState<string>('');

  const handleAdd = () => {
    if (text.trim() !== '') {
      onAdd(text);
      setText('');
    }
  };

  return (
    <div className="add-task-form">
      <input
        type="text"
        placeholder="Añadir nueva tarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Añadir</button>
    </div>
  );
};

export default TaskForm;