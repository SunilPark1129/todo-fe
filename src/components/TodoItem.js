import React from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";

// * 이번 과제 -----------------------------------------------------------------
const TodoItem = ({ item, setTodoList }) => {
  const { _id, task, isComplete } = item;
  const complete = isComplete ? "끝남" : "안끝남";

  // Q) 웹 성능에 대해서 질문이 있습니다!
  // updateTask와 deleteTask 함수를 child component (TodoItem)에 구현을 했는데
  // 이 방법은 child component마다 updateTask, deleteTask 함수가 생성(?)되니까 웹 성능에 악영향을 주는걸까요?
  // 아니면 부모에서 함수를 만들고 자식에게 비교적 가벼운 콜백함수를 보내서 필요한 값만 전달 받는것이 좋은건가요?
  // 어떤 방법이 회사에서 선호하는지 알고싶습니다.
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
