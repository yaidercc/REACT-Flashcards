import { useContext, useEffect, useState } from "react";
import Icono from "../../plugins/icon.jsx";
import { useTopics } from "../../hooks/useTopics.js";
import { Modal } from "../../utils/Modal/Modal.jsx";
import { TopicsAndFlashcards } from "../../context/Topics/TopicsAndFlashcardsContext.jsx";

export const TopicsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectTopic } = useTopics();
  const { topics } = useContext(TopicsAndFlashcards);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

 
  return (
    <section className="topic section container">
      <ul className="container_list-topics">
        <li className="btn_open-topics">
          <button className="btn_topics" onClick={handleOpen}>
            <span>Temarios</span>
            <span className={isOpen ? "arrowIcon rotate__arrow" : "arrowIcon"}>
              <Icono name="arrowDown" />
            </span>
          </button>
          <ul className={isOpen ? "submenu_topics" : "submenu_topics hide"}>
            <li>
              <div className="input_search" data-search="temarios">
                <input type="search" name="search" placeholder="Buscar temarios" />
                <Icono name="search" />
              </div>
            </li>
            <li className="topics__container scroll">
              <ul className="topics__list">
                {topics.map((topic) => {
                  return (
                    <li onClick={()=> selectTopic(topic._id)} className="topic__item" key={topic.name}>
                      <span>{topic.name}</span>
                      
                      <div className="topics__settings">
                        <button className="topics__setting topics__edit">
                          <Icono name="pencil" />
                        </button>
                        <button className="topics__setting topics__delete">
                          <Icono name="trash" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
            <div className="container_new-topic">
              <button className="btn__addTopic">
                <Icono name="add" />
                <span>Nuevo</span>
              </button>
            </div>
          </ul>
        </li>
      </ul>
    </section>
  );
};
