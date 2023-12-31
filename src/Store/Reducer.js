import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Products} from '../helpers/Products';

const reducerSlice = createSlice({
  name: 'reducers',
  initialState: {
    products: Products.products,
    cartarray: [],
    addresses: [],
    email: '',
    password: '',
    bankAccNo: 0,
    accHolderName: '',
    IFSC: '',
    UID: '',
    myorders: [],
    profilePhoto: '',
    Qty: [{id: 0, Qty: 1}],
    profileData: {},
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setCartArray(state, action) {
      state.cartarray = action.payload;
    },
    setAddresses2(state, action) {
      state.addresses = [];
    },
    setAddresses(state, action) {
      if (action?.payload?.isNew) {
        console.log('action?.payload?.id', action?.payload);
        state.addresses = [...state.addresses, action?.payload?.data];
      } else {
        const temp = state?.addresses?.map(item => {
          console.log('item dsdfehgfdafgh 222', item);
          if (item?.id == action?.payload?.data?.id) {
            return action?.payload?.data;
          } else {
            return item;
          }
        });
        state.addresses = temp;
      }
    },
    setEmailRedux(state, action) {
      state.email = action.payload;
    },
    setPasswordRedux(state, action) {
      state.password = action.payload;
    },
    setBankAccNo(state, action) {
      state.bankAccNo = action.payload;
    },
    setAccHolderName(state, action) {
      state.accHolderName = action.payload;
    },
    setIFSC(state, action) {
      state.IFSC = action.payload;
    },
    setUID(state, action) {
      state.UID = action.payload;
    },
    setMyorders(state, action) {
      state.myorders = action.payload;
    },
    setProfilePhoto(state, action) {
      state.profilePhoto = action.payload;
    },
    setQty(state, action) {
      state.Qty = [...state.Qty, action.payload];
    },
    setProfileData(state, action) {
      state.profileData = action.payload;
    },
  },
});

export const {
  setProducts,
  setEmailRedux,
  setPasswordRedux,
  setBankAccNo,
  setAccHolderName,
  setIFSC,
  setCartArray,
  setAddresses,
  setAddresses2,
  setUID,
  setMyorders,
  setProfilePhoto,
  setQty,
  setProfileData,
} = reducerSlice.actions;

export default reducerSlice.reducer;
