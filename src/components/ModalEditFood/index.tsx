import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal/modal";
import Input from "../Input/Input";
import { CreateFood, FoodTypes } from "../../types";

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodTypes;
  handleUpdateFood: (food: CreateFood) => Promise<void>;
}

export const ModalEditFood = ({
  isOpen,
  handleUpdateFood,
  editingFood,
  setIsOpen,
}: ModalEditFoodProps): JSX.Element => {
  async function handleSubmit(data: CreateFood) {
    handleUpdateFood(data);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input icon={null} name="image" placeholder="Cole o link aqui" />

        <Input icon={null} name="name" placeholder="Ex: Moda Italiana" />
        <Input icon={null} name="price" placeholder="Ex: 19.90" />

        <Input icon={null} name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
