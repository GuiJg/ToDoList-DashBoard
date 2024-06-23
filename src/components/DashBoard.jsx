import { Card, Col, Row, Statistic } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function DashBoard() {
    const [, setIsLoading] = useState(false);
    const [tasksDay, setTasksDay] = useState([]);
    const [tasksNight, setTasksNight] = useState([]);
    const navigate = useNavigate();

    const getTasksDay = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/tasksDay");
            setTasksDay(response.data);
        } catch (error) {
            toast.error("Erro ao carregar as tarefas do dia");
        } finally {
            setIsLoading(false);
        }
    }

    const getTasksNight = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/tasksNight');
            setTasksNight(response.data);
        } catch (error) {
            toast.error("Erro ao carregar as tarefas da noite");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getTasksDay();
        getTasksNight();
    }, []);

    return (
        <div className='dashboard'>
            <Row className='dashboard-container' gutter={16}>
                <Col span={8}>
                    <Card
                        title="Tarefas do dia"
                        bordered={false}
                        onClick={() => navigate('/listas')}
                        className='dashboard-card'
                    >
                        {tasksDay.map((data) => (
                            <div key={data.id}>
                                <p>{data.titleDay}</p>
                            </div>
                        ))}
                        <Statistic title="Total de Tarefas" value={tasksDay.length} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        title="Tarefas da noite"
                        bordered={false}
                        onClick={() => navigate('/listas')}
                        className='dashboard-card'
                        id='card-night'
                    >
                        {tasksNight.map((data) => (
                            <div key={data.id}>
                                <p>{data.titleNight}</p>
                            </div>
                        ))}
                        <Statistic title="Total de Tarefas" value={tasksNight.length} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        title="Gráfico de Progresso"
                        bordered={false}
                        className='dashboard-card'
                    >
                        {/* Aqui você pode adicionar um gráfico de progresso ou outro tipo de visualização */}
                        <Statistic title="Gráfico" value={75} suffix="%" />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        title="Desempenho"
                        bordered={false}
                        className='dashboard-card'
                    >
                        {/* Aqui você pode adicionar outro tipo de gráfico ou estatística */}
                        <Statistic title="Estatística" value={25} suffix="%" />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default DashBoard;
