import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import authServices from "../services/authServices";

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, role, password }, thunkAPI) => {
    try {
      const response = await authServices.register(username, role, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await authServices.login(username, password);
      return {user:data}
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


export const logout = createAsyncThunk("auth/logout", async () => {
    authServices.logout();
  });

  const initialState = isUser()==true
    ? { isLoggedIn: true, user: getUser(), message:"" }
    : { isLoggedIn: false, user: null, message:"" };
  const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
      [register.fulfilled]: (state, action) => {
        state.isLoggedIn = false;
      },
      [register.rejected]: (state, action) => {
        state.isLoggedIn = false;
      },
      [login.fulfilled]: (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.message = "Berhasil Login!"
      },
      [login.rejected]: (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      },
      [logout.fulfilled]: (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      },
    },
  });
  const { reducer } = authSlice;
  export default reducer;


  function isUser(){
    if (typeof window !== 'undefined') {
      if(localStorage.getItem('user')){
        return true;
      }else{
        return false;
      }
    }

    
  }

  function getUser(){
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user');
    }
   
  }