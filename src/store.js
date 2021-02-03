import create from 'zustand';

// Small and simple global store, less than 1Kb, no provider required.
export const useStore = create((set) => ({
  failedMutationData: null,
  discardFailedMutation: () => set({ failedMutationData: null }),
  setFailedMutation: (data) => set({ failedMutationData: data }),
}));
