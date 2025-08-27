import { create } from "zustand";

export const useCareerStore = create((set) => ({
    interest: "",
    skill: "",
    experience: "",
    result: null,
    setInterest: (val) => set({ interest: val }),
    setSkill: (val) => set({ skill: val }),
    setExperience: (val) => set({ experience: val }),
    setResult: (val) => set({ result: val }),
    reset: () =>
        set({
            interest: "",
            skill: "",
            experience: "",
            result: null,
        }),
}));