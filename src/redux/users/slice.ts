import { createSlice } from "@reduxjs/toolkit";

export interface Record {
  id: number;
  userId: string;
  text: string;
  audioUrl: string;
  createdAt: Date;
}

interface RecordState {
  newAudioUrl: string;
  updateRecordsTrigger: boolean;
  records: Record[];
  newAudioText: string;
}

const initialState: RecordState = {
  newAudioUrl: "",
  updateRecordsTrigger: true,
  records: [],
  newAudioText: "",
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    displayModal: (state, action) => {
      state.newAudioUrl = action.payload;
    },
    hideModal: (state) => {
      state.newAudioUrl = "";
      state.updateRecordsTrigger = !state.updateRecordsTrigger;
    },
    setRecords: (state, action) => {
      state.records = action.payload;
    },
    setNewAudioText: (state, action) => {
      state.newAudioText = action.payload;
    },
    resetNewAudioText: (state) => {
      state.newAudioText = "";
    },
  },
});

export const {
  displayModal,
  hideModal,
  setRecords,
  setNewAudioText,
  resetNewAudioText,
} = recordSlice.actions;
export default recordSlice.reducer;
