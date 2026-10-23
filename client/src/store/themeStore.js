import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(persist(
    (set) =>(
        {
   mode: 'light',

   setMode: (mode) => set({mode:mode})
        }
    ),
    {name : 'theme-storage'}
))