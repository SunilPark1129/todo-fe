import React from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";

// * 이번 과제 -----------------------------------------------------------------
const TodoItem = ({ item, setTodoList }) => {
  const { _id, task, isComplete } = item;
  const complete = isComplete ? "끝남" : "안끝남";

  const updateTask = async () => {
    try {
      const response = await api.put(`/tasks/${_id}`, { isComplete });

      if (response.status === 200) {
        const res = await api.get("/tasks");
        // 받아온 값을 표시하기 위해 state에 전달
        setTodoList(res.data.data);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await api.delete(`/tasks/${_id}`, { isComplete });

      if (response.status === 200) {
        const res = await api.get("/tasks");
        // 받아온 값을 표시하기 위해 state에 전달
        setTodoList(res.data.data);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{task}</div>

          <div>
            <button className="button-delete" onClick={deleteTask}>
              삭제
            </button>
            <button className="button-delete" onClick={updateTask}>
              {complete}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
