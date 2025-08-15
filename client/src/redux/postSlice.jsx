import {
    addPostApi,
    deletePostApi,
    getPostPageApi,
    getPostSlugApi,
    updatePostApi,
    uploadImgtApi,
} from '@/api/postService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    posts: null,
    post: null,
    valueFormInput: {
        title: '',
    },
    arrImgUpload: null,
    
};

export const addPost = createAsyncThunk(
    '/post/add-post',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await addPostApi(formData);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Server error' }
            );
        }
    }
);

export const updatePost = createAsyncThunk(
    '/post/update-post',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await updatePostApi(id, formData);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Server error' }
            );
        }
    }
);

export const getPostSlug = createAsyncThunk(
    '/post/get-post-slug',
    async (slug, { rejectWithValue }) => {
        try {
            const response = await getPostSlugApi(slug);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Server error' }
            );
        }
    }
);

export const getPostPage = createAsyncThunk(
    '/post/get-post-page',
    async ({ type, pageNumber }, { rejectWithValue }) => {
        try {
            const response = await getPostPageApi(type, pageNumber);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Server error' }
            );
        }
    }
);

export const deletePost = createAsyncThunk(
    '/post/delete-post',
    async (id, { rejectWithValue }) => {
        try {
            const response = await deletePostApi(id);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Server error' }
            );
        }
    }
);

export const uploadImg = createAsyncThunk(
    '/post/upload-img-post',
    async (id, { rejectWithValue }) => {
        try {
            const response = await uploadImgtApi(id);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Server error' }
            );
        }
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setValueEditor: (state, action) => {
            state.posts = action.payload;
        },
        setValueFormInput: (state, action) => {
            state.valueFormInput.title = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addPost.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addPost.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(getPostSlug.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPostSlug.fulfilled, (state, action) => {
                state.isLoading = false;
                state.post = action.payload.data;
                state.valueFormInput.title = action.payload.data?.title;
            })
            .addCase(getPostSlug.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(getPostPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPostPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
            })
            .addCase(getPostPage.rejected, (state) => {
                state.isLoading = false;
            })

            //
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deletePost.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(uploadImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImg.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(uploadImg.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default postSlice.reducer;
