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
  codeExecutionOutput: null,
  codeSubmissionOutput: null,
  submissions: null,
  isSubmissionsLoading: false,

  executeCode: async (data) => {
    set({ isCodeRunning: true });
    try {
      const response = await axiosInstance.post(
        `/execute/${data.problemId}`,
        data
      );

      set({ codeExecutionOutput: response.data });
    } catch (error) {
      console.log("Error running the code: ", error.message);
      set({ codeExecutionOutput: null });
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

      set({ codeSubmissionOutput: response.data });
    } catch (error) {
      console.log("Error running the code: ", error.message);
      set({ isCodeSubmitting: false });
      set({ codeSubmissionOutput: null });
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
      set({ isSubmissionsLoading: true });

      const response = await axiosInstance.get(`/submission/${problemId}`)
      console.log("Submissions fetched successfully!!")
      set({submissions:response.data})
    } catch (error) {
      console.log("failed to fetch the submissions: ", error.message)
      set({submissions:null})
      set({ isSubmissionsLoading: false });
    } finally {
      set({ isSubmissionsLoading: false });

    }
  },
}));
