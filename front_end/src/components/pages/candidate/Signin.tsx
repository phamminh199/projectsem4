// recft_clsx_module_scss
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from '../main.module.scss'     //file scss cùng cấp
// import { onSetAccountAtBeginning } from '../../../features/bookSlice';
import {reduxFunctionSetReduxStateUserSignedIn} from '../../../features/jobSlice';
import { useSelector, useDispatch } from 'react-redux'; //useSelector: hook lấy state từ jobSlice.js ; useDispatch: hook phát đi đến jobSlice.js
import { setLocalStorageWithExpiry, getLocalStorageWithExpiry } from '../../share/sharedFunction';
import collectionAPI from '../../../API/collectionAPI';
import { setSessionWithExpiry, comparePassword } from '../../share/sharedFunction';


type stateObj = {
   [key: string]: any;
};

type propType = {
   update_stateParentUserSignIn: any;
}


function SignIn(props: propType) {

   const {update_stateParentUserSignIn} = props;

   const [data, setData] = useState([]);
   const [form, setForm] = useState({email: "", password: ""});
   const [isAuthorized, setIsAuthorized] = useState(false);
   const [stateSignInFail, setStateSignInFail] = useState(false);

      // đặt trong hàm
   const [stateObjCandidate, setStateObjCandidate] = useState<stateObj>({})
   const [stateObjController, setStateObjController] = useState<stateObj>({})
   const [stateObjEmployer, setStateObjEmployer] = useState<stateObj>({})
   const navigate = useNavigate(); //hook dùng để chuyển trang web
   //tạo biến chứa đối tượng, là cú pháp quy định sẵn https request gửi từ front end tới back end, cái đoạn mà thay đổi là đoạn này Bearer ${localStorage.getItem('tokenLoginJWT')}
   const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('tokenLoginJWT')}`}
   }

   const testFunctionRedux = () => {

      const obj = {email: "wwwww", password: "zzzzz"};
      
      dispatch(reduxFunctionSetReduxStateUserSignedIn("textSDGvzDSFhbgzdfhb"));
            
   }
   const dispatch = useDispatch(); //hook phát đi đến bookSlice.js
   
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            
      setForm({
         ...form,
         [event.target.name]: event.target.value,
      })
      
   }
   //gửi dữ liệu qua nodejs thông qua thư viên axios, sau khi gửi xong thì load lại data về frontend
   type FormSignInType = {
      email: string;
      password: string;
   }

   const wait = (ms:any) => new Promise((resolve) => setTimeout(resolve, ms)); // HÀM NÀY CỰC QUAN TRỌNG, NÓ CÓ NHIỆM VỤ YÊU CẦU CHƯƠNG TRÌNH ĐỢI t GI Y TRƯỚC KHI CHO ĐI TIẾP

   const checkSignin = async (form: FormSignInType) => {

      const pass = form.password;
      // const passwordEncrypted = await comparePassword(pass);

      // console.log('passwordEncrypted: ', passwordEncrypted);
      let dataCandidate: any;
      let dataEmployer: any;
      let dataController: any;
      console.log('form: ' + JSON.stringify(form, null, 4));
      try {
         dataCandidate = await collectionAPI.checkSignInCandidate(form);
         if (dataCandidate.data !== "") { // khác rỗng tức là có
            let obj: any = dataCandidate.data; // phải lưu thành obj rồi mới cho vào hàm, nếu ko là ko ko kịp lấy data
            update_stateParentUserSignIn(obj); //hàm này gửi đối tượng đã sign in về cho component cha MainView , để từ component cha đổ sang component MenuBar để hiện hình
            // console.log('dataCandidate.data : ' + JSON.stringify(dataCandidate.data , null, 4));
            // cách 1: lưu vào kho redux
            dispatch(reduxFunctionSetReduxStateUserSignedIn(obj));
            // cách 2: lưu vào session 
            setSessionWithExpiry(obj,'sessioncandidatesignin',2); // lưu vào session
            // cách 3: lưu trên server side: chưa thử
            setStateSignInFail(false);

            // Store the token in localStorage or session storage
            const { token } = dataCandidate.data;

            navigate("/", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />

         } 
      }catch(err){
         console.log('err:', err);
      }

      await wait(200); // đợi 0.2 giây

      try {
         dataController = await collectionAPI.checkSignInController(form);
         // console.log("dataController.data: " + JSON.stringify(dataController.data, null, 4));
         
         if(dataController.data !== ""){ // khác rỗng tức là có
            let obj: any = dataController.data; // phải lưu thành obj rồi mới cho vào hàm, nếu ko là ko ko kịp lấy data
            update_stateParentUserSignIn(obj); //hàm này gửi đối tượng đã sign in về cho component cha MainView , để từ component cha đổ sang component MenuBar để hiện hình
            
            // console.log('dataController.data: ' + JSON.stringify(dataController.data, null, 4));
            // cách 1: lưu vào kho redux
            dispatch(reduxFunctionSetReduxStateUserSignedIn(obj));
            // cách 2: lưu vào session 
            setSessionWithExpiry(obj,'sessioncontrollersignin',2); // lưu vào session
            setStateSignInFail(false);

            navigate("/controller", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />
         }
      }catch(err){
         console.log('err:', err);
      }

      await wait(200); // đợi 0.2 giây

      try {
         dataEmployer = await collectionAPI.checkSignInEmployer(form);
         // console.log("dataEmployer.data: " + JSON.stringify(dataEmployer.data, null, 4));
         if(dataEmployer.data !== ""){ // khác rỗng tức là có
            let obj: any = dataEmployer.data; // phải lưu thành obj rồi mới cho vào hàm, nếu ko là ko ko kịp lấy data
            update_stateParentUserSignIn(obj); //hàm này gửi đối tượng đã sign in về cho component cha MainView , để từ component cha đổ sang component MenuBar để hiện hình
            // console.log('obj: ' + JSON.stringify(obj, null, 4));
            // cách 1: lưu vào kho redux
            dispatch(reduxFunctionSetReduxStateUserSignedIn(obj));
            // cách 2: lưu vào session 
            setSessionWithExpiry(obj,'sessionemployersignin',2); // lưu vào session
            setStateSignInFail(false);
            navigate("/employer", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />
         }
      }catch(err){
         console.log('err:', err);
      }
      //trường hợp check cả 3 bảng cũng ko đúng thì sign in ko hợp lệ
      if(dataCandidate.data === "" && dataController.data === "" && dataEmployer.data === ""){
         setStateSignInFail(true);
      }

   }//end postData



   //hàm này sẽ thay hàm getToken để nếu như đăng nhập đúng usernme và pass thì mới lấy đc accesstoken và lưu vào local Storage
   const handleSubmitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();

      // console.log("form: " + JSON.stringify(form, null, 4));

      checkSignin(form);
            
   }//end handleSubmitSignIn

   useEffect(() => {
      localStorage.getItem('tokenToSignIn') && setIsAuthorized(true); // nếu có (true) token tokenToSignIn được lưu trong localstorage thì set state isAuthorized thành true để nó tắt form sign in đi và hiện page sau khi sign in successfull
   },[]);
   // console.log("stateObjCandidate: " + JSON.stringify(stateObjCandidate, null, 4));
   // console.log("stateObjController: " + JSON.stringify(stateObjController, null, 4));
   // console.log("stateObjEmployer: " + JSON.stringify(stateObjEmployer, null, 4));

   return (
      <div className={clsx(styles.component_SignIn)}>

         <div className={clsx(styles.formLogin)}>
            <form onSubmit = {handleSubmitSignIn}>
               <h2>SIGN IN</h2>
               <div className={clsx(styles.row)}>
                  <label>Email: </label>
                  <input type="text" name="email" value={form.email} onChange={handleChange} /><div></div>
               </div>
               <div className={clsx(styles.row)}>
                  <label>Password: </label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} /><div></div>
               </div>

               <div className={clsx(styles.btnWrapper)}>
                     
                  <button type="submit" >Submit</button>
                  <button type="reset" >Reset</button>
               
               </div>
               <p className={clsx(styles.already)}>
                  Does not have an account ? Click here to 
                  <span><Link className={clsx(styles.link)} to="/signup"> sign Up</Link></span>
               </p>
            </form>
            {/* <button onClick={testFunctionRedux}>testFunctionRedux</button> */}
            {
               stateSignInFail &&
               <p style={{ color: 'red' }}>Fail sign in !. Email or password is incorrect, or your account has been blocked. Please try again</p>
            }
         </div>
      </div>
   )
}
export default SignIn