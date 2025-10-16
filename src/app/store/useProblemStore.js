import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { toast } from "sonner";
import { actionAsyncStorageInstance } from "next/dist/server/app-render/action-async-storage-instance";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useProblemStore = create((set) => ({
  isCodeRunning: false,
  isCodeSubmitting: false,
  problem: null,
  isProblemLoading: false,
  runCodeResults: null,
  submitCodeResults: null,
  submissions: null,
  areSubmissionsLoading: false,
  areProblemsLoading: false,

  executeCode: async (data) => {
    set({ isCodeRunning: true });
    try {
      const response = await axiosInstance.post(
        `/execute/${data.problemId}`,
        data
      );

      set({ runCodeResults: response.data });
    } catch (error) {
      console.log("Error running the code: ", error.message);
      set({ runCodeResults: null });
      set({ isCodeRunning: false });
    } finally {
      set({ isCodeRunning: false });
    }
  },

  submitCode: async (data) => {
    set({ isCodeSubmitting: true });
    try {
      const response = await axiosInstance.post(
        `/submission/${data.problemId}`,
        data
      );

      set({ submitCodeResults: response.data });
    } catch (error) {
      console.log("Error running the code: ", error.message);
      set({ isCodeSubmitting: false });
      set({ submitCodeResults: null });
    } finally {
      set({ isCodeSubmitting: false });
    }
  },

  getProblemDetails: async (problemId) => {
    set({ isProblemLoading: true });
    try {
      const response = await axiosInstance.get(`/problem/${problemId}`);
      console.log("problem fetched successfully: ", response.data);
      set({ problem: response.data.data });
    } catch (error) {
      console.log("Error in fetching the problem: ", error.message);
      toast("error fetching the problem");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSubmisions: async (problemId) => {
    try {
      set({ areSubmissionsLoading: true });
      const response = await axiosInstance.get(`/submission/${problemId}`);
      console.log("Submissions fetched successfully!!: ", response.data);
      set({ submissions: response.data.data });
    } catch (error) {
      console.log("failed to fetch the submissions: ", error.message);
      set({ submissions: null });
      set({ areSubmissionsLoading: false });
    } finally {
      set({ areSubmissionsLoading: false });
    }
  },

  getAllProblems: async () => {
    try {
      set({ areProblemsLoading: true });
      const response = await axiosInstance.get("/problem");

      set({allLoadedProblems: response.data.data})
    } catch (error) {
      console.log("Something went wrong while fetching the problems!!: ",error.message)
    } finally {
      set({ areProblemsLoading: false });
      
    }
  },
}));
