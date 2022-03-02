import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal/modal";
import Input from "../Input/Input";
import { CreateFood } from "../../types";

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: CreateFood) => Promise<void>;
}

export const ModalAddFood = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}: ModalAddFoodProps): JSX.Element => {
  async function handleSubmit(data: CreateFood) {
    handleAddFood(data);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input icon={null} name="image" placeholder="Cole o link aqui" />

        <Input icon={null} name="name" placeholder="Ex: Moda Italiana" />
        <Input icon={null} name="price" placeholder="Ex: 19.90" />

        <Input icon={null} name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
