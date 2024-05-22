import React, { useState } from 'react';
export default function Todo() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showAddWarning, setShowAddWarning] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAddTask = () => {
    if (task.trim() === '') {
      setShowAddWarning(true);
    } else {
      if (deleteIndex !== null) { 
        const updatedTasks = tasks.map((t, i) =>
          i === deleteIndex ? { ...t, name: task } : t
        );
        setTasks(updatedTasks);
        setDeleteIndex(null); // Đặt lại index chỉnh sửa
        setTask(''); // Xóa nội dung của task
      } else {
        setTasks([...tasks, { name: task, completed: false }]);
        setTask('');
      }
      setShowAddWarning(false);
    }
  };

  const handleToggleTask = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const handleDeleteTask = (index:any) => {
    setDeleteIndex(index);
    setShowDeleteWarning(true);
  };

  const handleConfirmDelete = () => {
    const newTasks = tasks.filter((_, i) => i !== deleteIndex);
    setTasks(newTasks);
    setDeleteIndex(null);
    setShowDeleteWarning(false);
  };

  const handleEditTask = (index) => {
    setTask(tasks[index].name);
    setDeleteIndex(index);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <div className="input-container">
        <input
          type="text"
          placeholder='Nhập tên công việc'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask} className="add-btn">{deleteIndex !== null ? 'Lưu' : 'Thêm'}</button>
      </div>
      <nav>
        <ul>
          <li onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Tất cả</li>
          <li onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Đã hoàn thành</li>
          <li onClick={() => setFilter('incomplete')} className={filter === 'incomplete' ? 'active' : ''}>Chưa hoàn thành</li>
        </ul>
      </nav>
      {showDeleteWarning && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h2>Xác nhận</h2>
              <i className="fas fa-xmark"></i>
            </div>
            <div className="modal-body-custom">
              <p>Bạn chắc chắn muốn xóa công việc này?</p>
            </div>
            <div className="modal-footer-footer">
              <button className="btn btn-light" onClick={() => setShowDeleteWarning(false)}>Hủy</button>
              <button className="btn btn-danger" onClick={handleConfirmDelete}>Xóa</button>
            </div>
          </div>
        </div>
      )}
      {showAddWarning && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h2>Cảnh báo</h2>
              <i className="fas fa-xmark"></i>
            </div>
            <div className="modal-body-custom">
              <p>Tên công việc không được phép để trống.</p>
            </div>
            <div className="modal-footer-footer">
              <button className="btn btn-light" onClick={() => setShowAddWarning(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className="task-item">
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(index)}
              />
              <label className={task.completed ? 'completed' : ''}>{task.name}</label>
            </div>
            <div>
              <button onClick={() => handleEditTask(index)} className="edit-btn">
                <span className="material-symbols-outlined">Edit_Square</span>
              </button>
              <button onClick={() => handleDeleteTask(index)} className="delete-btn">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
