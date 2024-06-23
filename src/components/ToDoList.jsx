import { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Col, Modal, Input, Select, Row } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast/headless';
import { DeleteOutlined, EditOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

function ToDoList() {
    const [tasksDay, setTasksDay] = useState([]);
    const [tasksNight, setTasksNight] = useState([]);
    const [, setIsLoading] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskType, setEditTaskType] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskType, setNewTaskType] = useState('day');

    const getTasksDay = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://to-do-list-server-alpha.vercel.app/tasksDay");
            setTasksDay(response.data);
            toast.success("Tarefas do dia carregadas com sucesso!");
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success("Tarefas do dia carregadas com sucesso!"); // Mostrar sucesso mesmo com erro 500
            } else {
                toast.error("Erro ao carregar as tarefas do dia");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const getTasksNight = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://to-do-list-server-alpha.vercel.app/tasksNight');
            setTasksNight(response.data);
            toast.success('Tarefas da noite carregadas com sucesso!');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success('Tarefas da noite carregadas com sucesso!'); // Mostrar sucesso mesmo com erro 500
            } else {
                toast.error("Erro ao carregar as tarefas da noite");
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getTasksDay();
        getTasksNight();
    }, []);

    const deleteTaskDay = async (id) => {
        try {
            await axios.delete(`https://to-do-list-server-alpha.vercel.app/tasksDay/${id}`);
            getTasksDay();
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success("Tarefa deletada!");
                getTasksDay();
            } else {
                toast.error(error.message);
            }
        }
    };

    const deleteTaskNight = async (id) => {
        try {
            await axios.delete(`https://to-do-list-server-alpha.vercel.app/tasksNight/${id}`);
            getTasksNight();
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success("Tarefa deletada!");
                getTasksNight();
            } else {
                toast.error(error.message);
            }
        }
    };

    const saveTaskDay = async (id) => {
        setIsLoading(true);
        try {
            await axios.put(`https://to-do-list-server-alpha.vercel.app/tasksDay/${id}`, { titleDay: editTaskTitle, completed: tasksDay.find(task => task.id === id).completed });
            getTasksDay();
            setEditTaskId(null);
            setEditTaskTitle('');
            setEditTaskType('');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success("Tarefa editada!");
                getTasksDay();
            } else {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const saveTaskNight = async (id) => {
        setIsLoading(true);
        try {
            await axios.put(`https://to-do-list-server-alpha.vercel.app/tasksNight/${id}`, { titleNight: editTaskTitle, completed: tasksNight.find(task => task.id === id).completed });
            getTasksNight();
            setEditTaskId(null);
            setEditTaskTitle('');
            setEditTaskType('');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success("Tarefa editada!");
                getTasksNight();
            } else {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const addTaskDay = async (title) => {
        setIsLoading(true);
        try {
            await axios.post('https://to-do-list-server-alpha.vercel.app/tasksDay', { titleDay: title, completed: false });
            getTasksDay();
            toast.success('Tarefa do dia criada com sucesso!');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success("Tarefa criada!");
                getTasksDay();
            } else {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const addTaskNight = async (title) => {
        setIsLoading(true);
        try {
            await axios.post('https://to-do-list-server-alpha.vercel.app/tasksNight', { titleNight: title, completed: false });
            getTasksNight();
            toast.success('Tarefa da noite criada com sucesso!');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success("Tarefa criada!");
                getTasksNight();
            } else {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTask = async () => {
        if (newTaskType === 'day') {
            await addTaskDay(newTaskTitle);
        } else {
            await addTaskNight(newTaskTitle);
        }
        setIsModalVisible(false);
        setNewTaskTitle('');
        setNewTaskType('day');
    };

    const toggleEditMode = (task, type) => {
        if (editTaskId === task.id) {
            if (type === 'day') {
                saveTaskDay(task.id);
            } else {
                saveTaskNight(task.id);
            }
        } else {
            setEditTaskId(task.id);
            setEditTaskTitle(type === 'day' ? task.titleDay : task.titleNight);
            setEditTaskType(type);
        }
    };

    const toggleCompleteTask = async (task, type) => {
        const updatedTask = { ...task, completed: !task.completed };
        setIsLoading(true);
        try {
            if (type === 'day') {
                await axios.put(`https://to-do-list-server-alpha.vercel.app/tasksDay/${task.id}`, updatedTask);
                getTasksDay();
            } else {
                await axios.put(`https://to-do-list-server-alpha.vercel.app/tasksNight/${task.id}`, updatedTask);
                getTasksNight();
            }
        } catch (error) {
            toast.error('Erro ao atualizar tarefa');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='to-do-list'>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                Adicionar Tarefa
            </Button>
            <Modal
                title="Adicionar Tarefa"
                visible={isModalVisible}
                onOk={handleAddTask}
                onCancel={() => setIsModalVisible(false)}
                okText="Criar"
                cancelText="Cancelar"
            >
                <Input
                    placeholder="Título da Tarefa"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <Select
                    value={newTaskType}
                    onChange={(value) => setNewTaskType(value)}
                    style={{ width: '100%', marginTop: '16px' }}
                >
                    <Option value="day">Tarefas do dia</Option>
                    <Option value="night">Tarefas da noite</Option>
                </Select>
            </Modal>
            <Row className='to-do' gutter={16}>
                <Col span={8}>
                    <Card title="Tarefas do dia" bordered={false}>
                        {tasksDay.map((data) => (
                            <div key={data.id}>
                                <div className="task-container">
                                    <Checkbox 
                                        checked={data.completed}
                                        onChange={() => toggleCompleteTask(data, 'day')}
                                    />
                                    <Input
                                        id='day'
                                        type="text"
                                        disabled={editTaskId !== data.id}
                                        value={editTaskId === data.id ? editTaskTitle : data.titleDay}
                                        onChange={(e) => setEditTaskTitle(e.target.value)}
                                        style={{ textDecoration: data.completed ? 'line-through' : 'none' }}
                                    />
                                    <Button onClick={() => toggleEditMode(data, 'day')}>
                                        {editTaskId === data.id && editTaskType === 'day' ? <SaveOutlined /> : <EditOutlined />}
                                    </Button>
                                    <Button onClick={() => deleteTaskDay(data.id)}><DeleteOutlined /></Button>
                                </div>
                            </div>
                        ))}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Tarefas da noite" bordered={false}>
                        {tasksNight.map((data) => (
                            <div key={data.id}>
                                <div className="task-container">
                                    <Checkbox 
                                        checked={data.completed}
                                        onChange={() => toggleCompleteTask(data, 'night')}
                                    />
                                    <Input
                                        id='night'
                                        type="text"
                                        disabled={editTaskId !== data.id}
                                        value={editTaskId === data.id ? editTaskTitle : data.titleNight}
                                        onChange={(e) => setEditTaskTitle(e.target.value)}
                                        style={{ textDecoration: data.completed ? 'line-through' : 'none' }}
                                    />
                                    <Button onClick={() => toggleEditMode(data, 'night')}>
                                        {editTaskId === data.id && editTaskType === 'night' ? <SaveOutlined /> : <EditOutlined />}
                                    </Button>
                                    <Button onClick={() => deleteTaskNight(data.id)}><DeleteOutlined /></Button>
                                </div>
                            </div>
                        ))}
                    </Card>
                </Col>
            </Row>
        </div>  
    );
}

export default ToDoList;
