import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useFlashCards } from "../../hooks/useFlashCards";

export const FormFlashcard = ({id="", question="", answer="" }) => {
  const { formState, onInputChange } = useForm({ answer, question });
  const {editFlashcard} = useFlashCards()
  const { question: questionText, answer: answerText } = formState;

  const onSubmit = async(event) =>{
    event.preventDefault();
    try {
      if(!answerText.trim() || !questionText.trim()){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La pregunta o la respuesta estan vacios.",
        });
        return;
      }
  
      if(id){
        await editFlashcard(id,questionText,answerText);
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Flashcard editada con exito",
          showConfirmButton: false,
          timer: 2500
        });
      }else{
        editFlashcard(answerText,questionText)
      }
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al realizar esta accion, intentalo mas tarde",
      });
    }
  }
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="input input_modal">
        <label htmlFor="question">ingrese la pregunta</label>
        <input name="question" type="text" value={questionText} placeholder="EJ: Planeta Mas Grande Del Sistema Solar" onChange={onInputChange} />
      </div>
      <div className="input input_modal">
        <label htmlFor="answer">ingrese la respuesta</label>
        <textarea name="answer" type="text" value={answerText} placeholder="EJ: jupiter" onChange={onInputChange}></textarea>
      </div>
      <div className="btn_submit">
        <ion-icon name="save"></ion-icon>
        <button type="submit" className="btn">
          Guardar
        </button>
      </div>
    </form>
  );
};
