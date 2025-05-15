import axiosInstancePrivate from '@/api/axiosInstance';
import productServicePrivate, {
    getAllProductsApi,
    getAllProductsPageApi,
    getProductBySlugApi,
    getProductSoldApi,
    getProductsPageByCategoryApi,
    searchNameProductApi,
    searchNameProductNoPageApi,
} from '@/api/productService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isLoadingSearch: false,
    error: null,
    products: null,
    productSold: null,
    formProductValue: {
        nameProduct: '',
        unit: '',
        quantity: '',
        note: '',
        promotion: '',
        selling: '',
        description: '',
        cost: '',
    },
    currentProductId: null,
    urlImgProducts: [],
    arrImgSelected: [],
    arrImgRemoveTemp: [],
    productsSearch: [],
    productSelectedInCategoryAdd: [],
    productSelectedInComboAdd: [],
    valueSortDishes: 'asc',
    productSelected: null,
    starArrEvaluated: [],
};

export const getAllProductPages = createAsyncThunk(
    '/product/get-all-products-pages',
    async (pageNumber) => {
        try {
            const response = await getAllProductsPageApi(pageNumber);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getAllProducts = createAsyncThunk(
    '/product/get-all-products',
    async () => {
        try {
            const response = await getAllProductsApi();
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getProductSold = createAsyncThunk(
    '/product/get-product-sold',
    async () => {
        try {
            const response = await getProductSoldApi();
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getProductsPageByCategory = createAsyncThunk(
    '/product/get-products-page-by-category',
    async ({ id, pageNumber }) => {
        try {
            const response = await getProductsPageByCategoryApi(id, pageNumber);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getProductBySlug = createAsyncThunk(
    '/product/get-product-by-slug',
    async (slug) => {
        try {
            const response = await getProductBySlugApi(slug);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const addProduct = createAsyncThunk(
    '/product/add-product',
    async (formData, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = productServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.addProductApi(formData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    '/product/update-product',
    async ({ formData, id }, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = productServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.updateProductApi({ formData, id });
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    '/product/delete-product',
    async ({ id, categoryId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const api = productServicePrivate(
                axiosInstancePrivate(getState, dispatch)
            );
            const response = await api.deleteProductApi(id, categoryId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const searchProductName = createAsyncThunk(
    '/product/search-product-name',
    async ({ page, q }) => {
        try {
            const response = await searchNameProductApi({
                page,
                q,
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const searchProductNameNoPage = createAsyncThunk(
    '/product/search-product-name-no-pages',
    async (q) => {
        try {
            const response = await searchNameProductNoPageApi(q);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFormProductValue: (state, action) => {
            state.formProductValue = { ...action.payload.formValue };
            state.urlImgProducts = [...action.payload.urlImgProducts];
        },
        setUrlImgProduct: (state, action) => {
            state.urlImgProducts = [action.payload, ...state.urlImgProducts];
        },
        deleteImgProduct: (state, action) => {
            console.log('action.payload: ', action.payload);
            state.urlImgProducts = state.urlImgProducts.filter(
                (img, index) => !action.payload.includes(index)
            );
            state.arrImgSelected = [];
        },
        setImgSelected: (state, action) => {
            state.arrImgSelected = state.arrImgSelected.includes(action.payload)
                ? state.arrImgSelected.filter((img) => img !== action.payload)
                : [action.payload, ...state.arrImgSelected];
        },
        setImgSelectedRemoved: (state, action) => {
            state.arrImgRemoveTemp = state.arrImgRemoveTemp.includes(
                action.payload
            )
                ? state.arrImgRemoveTemp.filter(
                      (item) => item !== action.payload
                  )
                : [action.payload, ...state.arrImgRemoveTemp];
        },
        resetUrlImgProduct: (state) => {
            state.urlImgProducts = [];
        },
        handleDeleteImage: (state, action) => {
            state.urlImgProducts = state.urlImgProducts.filter(
                (img, index) => index !== action.payload
            );
        },
        setProductSelectedInCategory: (state, action) => {
            state.productSelectedInCategoryAdd = action.payload;
        },

        deleteProductSelectedInCategory: (state, action) => {
            state.productSelectedInCategoryAdd =
                state.productSelectedInCategoryAdd.filter(
                    (item) => item._id !== action.payload
                );
        },

        //
        // setProductSelectedInCombo: (state, action) => {
        //     state.productSelectedInComboAdd = action.payload;
        // },
        // deleteProductSelectedInCombo: (state, action) => {
        //     state.productSelectedInComboAdd =
        //         state.productSelectedInComboAdd.filter(
        //             (item) => item._id !== action.payload
        //         );
        // },
        setValueSortDishes: (state, action) => {
            state.valueSortDishes = action.payload;
        },
        setProductSeleted: (state, action) => {
            state.productSelected = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //get product pages
            .addCase(getAllProductPages.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllProductPages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(getAllProductPages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //get Products Page By Category
            .addCase(getProductsPageByCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductsPageByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(getProductsPageByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //get Product By Slug
            .addCase(getProductBySlug.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductBySlug.fulfilled, (state, action) => {
                state.isLoading = false;
                state.formProductValue = {
                    nameProduct: action.payload?.data?.name,
                    unit: action.payload?.data?.unit._id,
                    quantity: action.payload?.data?.quantity,
                    note: action.payload?.data?.note,
                    promotion: action.payload?.data?.promotion,
                    selling: action.payload?.data?.selling,
                    description: action.payload?.data?.description,
                    cost: action.payload?.data?.cost,
                };
                state.productSelected = action.payload?.data;
                state.urlImgProducts = action.payload?.success && [
                    ...action.payload.data.images,
                ];
                state.currentProductId = action.payload?.data?._id;
                state.error = null;
            })
            .addCase(getProductBySlug.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //add Product
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //update Product
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //search products name
            .addCase(searchProductName.pending, (state) => {
                state.isLoadingSearch = true;
                state.error = null;
            })
            .addCase(searchProductName.fulfilled, (state, action) => {
                state.isLoadingSearch = false;
                state.productsSearch = action.payload;
                state.error = null;
            })
            .addCase(searchProductName.rejected, (state, action) => {
                state.isLoadingSearch = false;
                state.error = action.payload;
            })

            //search products name no page
            .addCase(searchProductNameNoPage.pending, (state) => {
                state.isLoadingSearch = true;
                state.error = null;
            })
            .addCase(searchProductNameNoPage.fulfilled, (state, action) => {
                state.isLoadingSearch = false;
                state.productsSearch = action.payload;
                state.error = null;
            })
            .addCase(searchProductNameNoPage.rejected, (state, action) => {
                state.isLoadingSearch = false;
                state.error = action.payload;
            })

            .addCase(getProductSold.pending, (state) => {
                state.isLoadingSearch = true;
            })
            .addCase(getProductSold.fulfilled, (state, action) => {
                state.isLoadingSearch = false;
                state.productSold = action.payload.data;
            })
            .addCase(getProductSold.rejected, (state) => {
                state.isLoadingSearch = false;
            });
    },
});

export const {
    setFormProductValue,
    setUrlImgProduct,
    resetUrlImgProduct,
    handleDeleteImage,
    deleteImgProduct,
    setImgSelected,
    setProductSelectedInCategory,
    deleteProductSelectedInCategory,
    deleteProductSelectedInCombo,
    setProductSelectedInCombo,
    setValueSortDishes,
    setProductSeleted,
    setImgSelectedRemoved,
} = productSlice.actions;
export default productSlice.reducer;
