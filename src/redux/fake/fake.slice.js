import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fakeData: [],
};

export const { actions: fakeActions, reducer: fakeReducer } = createSlice({
  name: "fake",
  initialState,
  reducers: {
    setSaveFakeData: (state, { payload }) => {
      state.fakeData = payload;
    },
  },
});
