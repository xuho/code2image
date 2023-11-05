import { create } from "zustand"
import { persist } from "zustand/middleware"
const useStore = create(
    persist(
        () => ({
            code: "",
            title: "Untitled",
            theme: "candy",
            darkMode: true,
            showBackground: true,
            language: "plaintext",
            autoDetectLanguage: false,
            fontSize: 16,
            fontStyle: "jetBrainsMono",
            padding: 32,
        }),
        {
            name: "user-preferences",
        }
    )
)
export default useStore;
