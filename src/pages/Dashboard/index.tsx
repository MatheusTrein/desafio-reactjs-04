import { useEffect, useState } from "react";
import Food from "../../components/Food/Food";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { useAxios } from "../../hooks/useAxios";
import { FOODS_GET, FOOD_DELETE, FOOD_POST, FOOD_PUT } from "../../services/api";
import { CreateFood, FoodTypes } from "../../types";
import { FoodsContainer } from "./styles";

export const Dashboard = (): JSX.Element => {
  const [foods, setFoods] = useState<FoodTypes[]>([]);
  const [editingFood, setEditingFood] = useState<FoodTypes>({} as FoodTypes);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFoodModalOpen, setEditingFoodModalOpen] = useState(false);

  const { request } = useAxios();

  useEffect(() => {
    const loadFoods = async () => {
      const { path, config } = FOODS_GET("/foods");

      const { data: foodsData } = await request(path, config);

      setFoods(foodsData);
    };

    loadFoods();
  }, []);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditingModal() {
    setEditingFoodModalOpen(!editingFoodModalOpen);
  }

  async function handleAddFood(food: CreateFood) {
    try {
      const { path, config } = FOOD_POST("/foods", {
        ...food,
        available: true,
      });

      const { data } = await request(path, config);

      setFoods([...foods, data]);
    } catch (err) {}
  }

  async function handleUpdateFood(food: CreateFood) {
    try {
      const foods_put = FOOD_PUT("/foods", String(editingFood.id), { ...editingFood, ...food });

      const foodUpdated = await request(foods_put.path, foods_put.config);

      const foodsUpdated = foods.map((f) => (f.id !== foodUpdated.data.id ? f : foodUpdated.data));

      setFoods(foodsUpdated);
    } catch (err) {}
  }

  async function handleDeleteFood(foodId: number) {
    const { path, config } = FOOD_DELETE("/foods", String(foodId));

    await request(path, config);

    const foodsFiltered = foods.filter((food) => food.id !== foodId);

    setFoods(foodsFiltered);
  }

  function handleEditFood(food: FoodTypes) {
    setEditingFood(food);
    setEditingFoodModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood isOpen={modalOpen} setIsOpen={toggleModal} handleAddFood={handleAddFood} />
      <ModalEditFood
        isOpen={editingFoodModalOpen}
        setIsOpen={toggleEditingModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
