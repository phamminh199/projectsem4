import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

export interface Istate {
  skillClicked: string,
  reduxStateUserSignedIn: any,
  reduxStateIdjobForTest: number
  // cartInfo: any
}

const initialState: Istate = {
  skillClicked: "ReactJS", // cho skill có giá trị ban đầu ReactJS
  reduxStateUserSignedIn: {},
  reduxStateIdjobForTest: 0

  // cartInfo : {
  //   idCustomer: 0, 
  //   idStaff: 0,
  //   cars: {

  //   } 
  // }
};


export const jobSlice = createSlice({
  //(**) reduxJob này chính là reduxJob bên trong reducer của store.js: app_test_redux/src/app/store.js
  name: 'reduxJob', // The name property represents the name of the slice, which is used to identify and reference the slice within the Redux store. It is a string value that should be unique within the application to avoid conflicts with other slices.
  initialState,
  // Khai báo các hàm trong kho redux
  reducers: {
    // hàm này dùng để update state skillClicked
    reduxFunctionSkillclick: (state, action) => {
      // console.log("action in redux: " + JSON.stringify(action, null, 4));
      state.skillClicked = action.payload;
      // console.log("state.skillClicked: " + state.skillClicked);
    },
    
    // hàm này dùng để update state userSignedIn, tức là khi sign in thành công, thì nó sẽ lưu cái thông tin của người sign in thành công vào state trong kho redux, để các component khác có thể dùng chung
    reduxFunctionSetReduxStateUserSignedIn: (state, action) => {

      state.reduxStateUserSignedIn = action.payload;

      // console.log("action: " + JSON.stringify(action, null, 4));
      /*
      action: {
        "type": "reduxJob/reduxFunctionSetReduxStateUserSignedIn",
        "payload": {
            "email": "wwwww",
            "password": "zzzzz"
        }
      }

      // payload có thể là object hay string hay number từ component gửi sang
      action: {
        "type": "reduxJob/reduxFunctionSetReduxStateUserSignedIn",
        "payload": "textSDGvzDSFhbgzdfhb"
      }
      */
      // console.log("state: " + JSON.stringify(state, null, 4));
      /*
      state: {
        "skillClicked": "ReactJS",
        "reduxStateUserSignedIn": {}
      }
      */
    },

    // hàm này dùng để update state skillClicked
    reduxFunctionsetIdJobForTest: (state, action) => {
      state.reduxStateIdjobForTest = action.payload;
      console.log('action.payload: ', action.payload);
    },

  },//end reducers
});

export const { reduxFunctionSkillclick, reduxFunctionSetReduxStateUserSignedIn, reduxFunctionsetIdJobForTest} = jobSlice.actions; // export các hàm ra ngoài


    /*
    - Xuất state ra
    • selectSkillClick: tiền tố select, SkillClicked tượng trưng cho state skillClicked
    • (state): chính là initialState (*) bên trong hàm createSlice({})
    • reduxJob: chính là name: 'reduxJob' bên trong hàm createSlice({}) (**)
    • value: là value của state
    • todos là tên của state , ở đây là state mảng todos
    - Các component con muốn dùng thì phải dùng một cái hook gọi là useSelector: import { useSelector, useDispatch } from 'react-redux'; (giải thích chi tiết bên component Counter.js)
    */

export const selectSkillClicked = (state: RootState) => state.reduxJob.skillClicked;
export const selectReduxStateUserSignedIn = (state: RootState) => state.reduxJob.reduxStateUserSignedIn;
export const selectreduxStateIdjobForTest = (state: RootState) => state.reduxJob.reduxStateIdjobForTest;

export default jobSlice.reducer;
   /*
    lưu ý: export default jobSlice.reducer;
    nhưng ở file store.js thì lại là : import jobReducer from '../features/jobSlice';
    Tại sao lại phải ghi là jobReducer ?
    Chữ jobReducer này ta phải nhập tay, nó kết hợp từ 2 chữ như sau
      chữ job lấy từ jobSlice.reducer
      chữ reducer lấy từ jobSlice.reducer
      => kết hợp lại thành jobReducer
    */


   /*
    KẾT LUẬN:
    -   File này export ra những cái như sau:
         +   jobSlice
         +   hàm reduxFunctionSkillclick
         +   state selectSkillClicked
    */
