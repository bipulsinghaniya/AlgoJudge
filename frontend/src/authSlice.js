import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from './utils/axiosClient'

export const registerUser = createAsyncThunk('auth/register',
  async (userData, { rejectWithValue }) => {
    try {
        console.log("hello world in authSlice in line 7");

    const response =  await axiosClient.post('/user/register', userData);
    // return response.data.user;
    return response.data; // otp
    } catch (error) {
      // return rejectWithValue(error);
    if (error.response) {
  return rejectWithValue(error.response.data.message);
} else {
  console.log("hello world in authSlice in line 15");
  return rejectWithValue("Server not responding");
}
      
    }
  }
);


// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/user/login', credentials);
//       return response.data.user;
//     } catch (error) {
//       // return rejectWithValue(error);
//       return rejectWithValue(
//   // error.response?.data || { message: "Invalid email or password" }
//     error.response?.data?.message || "Invalid email or password"
// );
//     }
//   }
// );


export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/login', credentials);

      return response.data; // 🔥 IMPORTANT (not .user)

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid credentials"
      );
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/google', { token });
      return response.data; // returns user
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Google authentication failed"
      );
    }
  }
);
export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get('/user/check');
      return data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(null); // Special case for no session
      }
      // return rejectWithValue(error);
      return rejectWithValue(
  error.response?.data || { message: "Invalid email or password" }
);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.post('/user/logout');
      return null;
    } catch (error) {
      // return rejectWithValue(error);
      return rejectWithValue(
  error.response?.data || { message: "Invalid email or password" }
);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (emailId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/forgot-password', { emailId });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset OTP"
      );
    }
  }
);

export const verifyResetOtp = createAsyncThunk(
  'auth/verifyResetOtp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/verify-reset-otp', data);
      return response.data; // contains resetToken
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/reset-password', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
reducers: {
  clearError: (state) => {
    state.error = null;
  }
},
  extraReducers: (builder) => {
    builder
      // Register User Cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.isAuthenticated = !!action.payload; 
                state.isAuthenticated = false; // otp 

        // state.user = action.payload;
          state.user = null; // otp

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload?.message || 'Something went wrong';
        // state.error = action.payload || 'Something went wrong';

        console.log("ERROR PAYLOAD:", action.payload);

        state.error =
  typeof action.payload === "string"
    ? action.payload
    : action.payload?.message || "Something went wrong";

        state.isAuthenticated = false;
        state.user = null;
      })
  
      // Login User Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.isAuthenticated = !!action.payload;
      //   state.user = action.payload;
      // })
      .addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  state.isAuthenticated = true;

  state.user = action.payload.user; // 🔥 FIX
})
      // .addCase(loginUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload?.message || 'Something went wrong';
      //   state.isAuthenticated = false;
      //   state.user = null;
      // })

      .addCase(loginUser.rejected, (state, action) => {
  state.loading = false;

  console.log("REJECTED:", action); // 🔥 DEBUG

  state.error = action.payload || action.error.message;
  state.isAuthenticated = false;
  state.user = null;
})

      // Google Login Cases
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; 
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Google authentication failed";
        state.isAuthenticated = false;
        state.user = null;
      })
  
      // Check Auth Cases
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      // .addCase(checkAuth.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload?.message || 'Something went wrong';
      //   state.isAuthenticated = false;
      //   state.user = null;
      // })


      .addCase(checkAuth.rejected, (state, action) => {
  state.loading = false;
  state.isAuthenticated = false;
  state.user = null;

  // 🔥 IMPORTANT FIX
  if (action.payload === null) {
    state.error = null; // not logged in → NOT error
  } else {
    state.error = action.payload?.message || 'Something went wrong';
  }
})
  
      // Logout User Cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
        state.isAuthenticated = false;
        state.user = null;
      });
  }
});

export default authSlice.reducer;
export const { clearError } = authSlice.actions;