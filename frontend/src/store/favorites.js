import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
	persist(
		(set, get) => ({
			favorites: [],
			toggleFavorite: (productId) => {
				const { favorites } = get();
				if (favorites.includes(productId)) {
					set({ favorites: favorites.filter((id) => id !== productId) });
				} else {
					set({ favorites: [...favorites, productId] });
				}
			},
			isFavorite: (productId) => get().favorites.includes(productId),
		}),
		{
			name: "product-favorites",
		}
	)
);
