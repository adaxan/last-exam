import { create } from "zustand";
import dataJson from "../data/data.json";

const useCard = create((set) => {
  return {
    cards: JSON.parse(localStorage.getItem("cards")) || dataJson,

    addCard: (card) =>
      set((state) => {
        const newCards = [...state.cards, card];
        localStorage.setItem("cards", JSON.stringify(newCards));
        return { cards: newCards };
      }),

    deleteCard: (id) =>
      set((state) => {
        const newCards = state.cards.filter((card) => card.id !== id);
        localStorage.setItem("cards", JSON.stringify(newCards));
        return { cards: newCards };
      }),

    updateCard: (id, updatedCard) =>
      set((state) => {
        const newCards = state.cards.map((card) =>
          card.id == id ? updatedCard : card
        );
        localStorage.setItem("cards", JSON.stringify(newCards));
        return { cards: newCards };
      }),
  };
});
if (!localStorage.getItem("cards")) {
  localStorage.setItem("cards", JSON.stringify(dataJson));
}

export default useCard;