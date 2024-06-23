import { Card, Col, Row } from "antd";

function ToDoList() {

    return (
        <div className="to-do-list">
            <Row className="to-do" gutter={16}>
                <div className="todo-day">
                    <h2>Tarefas do dia</h2>
                    <Col className="card-todo" span={8}>
                        <Card title="Card title">
                            Card content
                        </Card>
                    </Col>
                </div>
                <div className="todo-day">
                    <h2>Tarefas da noite</h2>
                    <Col className="card-todo" span={8}>
                        <Card title="Card title">
                            Card content
                        </Card>
                    </Col>
                </div>
            </Row>
        </div>
    );
}

export default ToDoList;
