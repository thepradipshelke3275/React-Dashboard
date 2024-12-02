import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../shared/axios";
import Swal from "sweetalert2";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    postUsers: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    usersSetData: (state, action) => {
      state.users = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    usersFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    usersLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    usersPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    usersUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postUsersDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postUsersDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postUsers = action.payload;
    },
    updateUsersDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateUsersDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postUsers = action.payload;
    },
  },
});

export const {
  usersSetData,
  usersFailData,
  usersLoading,
  usersPostLoading,
  usersUpdateLoading,
  postUsersDataFail,
  postUsersDataSuccess,
  updateUsersDataFail,
  updateUsersDataSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;

const url = "/users";
const registerUrl = "/register";

export const usersGetData = (data) => async (dispatch) => {
  dispatch(usersLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(usersSetData(response.data));
  } catch (error) {
    dispatch(usersFailData(error.message));
  }
};

export const postUsersData =
  (data, users, toggle, setSubmitting) => async (dispatch) => {
    dispatch(usersPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(registerUrl, users, {
        headers: myheader,
      });
      dispatch(postUsersDataSuccess(response.data));
      dispatch(usersGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (toggle) {
          toggle();
        }
        if (setSubmitting) {
          setSubmitting(false);
        }
      });
    } catch (error) {
      dispatch(postUsersDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateUsersData =
  (data, users, toggle, setSubmitting) => async (dispatch) => {
    dispatch(usersUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, users, {
        headers: myheader,
      });

      dispatch(updateUsersDataSuccess(response.data));
      dispatch(usersGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        if (toggle) {
          toggle();
        }
      });
    } catch (error) {
      dispatch(updateUsersDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteUsersData = (id, data) => async (dispatch) => {
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.delete(url + `/${id}`, {
      headers: myheader,
    });
    Swal.fire("Deleted!", "Your file has been deleted.", "success").then(() => {
      dispatch(usersGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};
