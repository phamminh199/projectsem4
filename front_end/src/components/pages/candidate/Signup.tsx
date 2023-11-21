// recft_clsx_module_scss
import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from '../main.module.scss'     //file scss cùng cấp
import { projectStorage } from '../../share/firebase';
import collectionAPI from '../../../API/collectionAPI';
import { validatePassword,validateEmail,validatePhone,validateBirthday,validateFullName, wait, hashPassword, comparePassword } from '../../share/sharedFunction';
import bcrypt from "bcryptjs-react"; // npm i bcryptjs-react

function SignUp() {

   const [groupState, setGroupState] = useState({
      fullname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      dob: "",
      urlavatar: "",
      status: ""
   });
   const [groupStateError, setGroupStateError] = useState({
      fullname: "notyet",
      email: "notyet",
      emailExisted: "notyet",
      password: "notyet",
      passwordConfirm: "notyet",
      phone: "notyet",
      dob: "notyet",
      urlavatar: "notyet",
      status:"notyet",
   });

   const [stateUrlAvatar, setStateUrlAvatar] = useState('');
   const [avatarFile, setAvatarFile] = useState(null);
   const refInputUsername = React.useRef() as React.MutableRefObject<HTMLInputElement>;
   const refInputEmail = React.useRef() as React.MutableRefObject<HTMLInputElement>;
   //tạo biến chứa đối tượng, là cú pháp quy định sẵn https request gửi từ front end tới back end, cái đoạn mà thay đổi là đoạn này Bearer ${localStorage.getItem('tokenLoginJWT')}
   const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('tokenToSignInByLocalStorage')}`}
   }

   const checkEmailExist = async (email: any) => {
      let findCandidateEmail: any;
      let findControllerEmail: any;
      let findEmployerEmail: any;
      try {
         findCandidateEmail = await collectionAPI.findCandidateEmail(email);
         // console.log("findCandidateEmail: " + JSON.stringify(findCandidateEmail, null, 4));
         
      }catch(err){
         console.log('err:', err);
      }
      await wait(200);
      try {
         findControllerEmail = await collectionAPI.findControllerEmail(email);
         // console.log("findCandidateEmail: " + JSON.stringify(findControllerEmail, null, 4));
         
      }catch(err){
         console.log('err:', err);
      }
      await wait(200);

      try {
         findEmployerEmail = await collectionAPI.findEmployerEmail(email);
         // console.log("findEmployerEmail: " + JSON.stringify(findEmployerEmail, null, 4));
         
      }catch(err){
         console.log('err:', err);
      }
      if(findCandidateEmail.data == true || findControllerEmail.data == true || findEmployerEmail.data == true){
         return true;
      }
      else {
         return false;
      }
   }


   const handleChange = (e: any) => {
      const {name, value} = e.target; //gộp 2 dòng trên làm 1, name là attribute name của thẻ <input type="text" name="email"
      
      var trimmedInput = e.target.value.trim();

      /*
      - Phải để đoạn code này ở dưới, vì nếu ko có thì nó sẽ ko update state,
      - các đoạn if chỉ thực thi khi validate result là true, nhưng ban đầu mới đánh vài ký tự thì làm sao mà ra true đc
      - 
         setGroupState((prev)=>{
            return {...prev, [name]: value};
         });
      */
      if(e.target.name =='fullname'){
         const result = validateFullName(trimmedInput);

         if (result) {
            // Valid full name
            // setGroupState({
            //    ...groupState,
            //    fullname: trimmedInput
            // })
            // cho cái state error về lại false để nó ko hiện lỗi nữa
            setGroupStateError({
               ...groupStateError,
               fullname: "noError"
            })
         } 
         else {
            // Invalid full name
            setGroupStateError({
               ...groupStateError,
               fullname: "error"
            })
         }
      }
      else if(e.target.name =='email'){
         const result = validateEmail(trimmedInput);
         if(result){
            // Valid email
            setGroupState({
               ...groupState,
               email: trimmedInput
            })
            // cho cái state error về lại false để nó ko hiện lỗi nữa
            setGroupStateError({
               ...groupStateError,
               email: "noError"
            })

            // kiểm tra email có tồn tại ko, nó dùng promise mẹ gì đấy chatGPT
            checkEmailExist(trimmedInput)
            .then((result) => {
               if (result) { // nếu email đã tồn tại thì báo lỗi
                  
                  // lưu ý phải update 2 thuộc tính cùng lúc với nhau, chứ ko phần ra, vì nó ko kịp nhận giá trị ngay trong hàm, phải thoát ra ngoài hàm nó mới nhận
                  setGroupStateError({
                  ...groupStateError,
                  email: "noError", // email đã đúng format nhưng có tồn tại
                  emailExisted: "error"
                  });
               } else {
                  setGroupStateError({
                  ...groupStateError,
                  email: "noError", // email đúng format và ko tồn tại
                  emailExisted: "noError"
                  });
               }
            })
            .catch((error) => {
               // Handle any error that occurred during the checkEmailExist function
               console.log("Error:", error);
            });
         }
         else if(result == false){

            // lưu ý phải update 2 thuộc tính cùng lúc với nhau, chứ ko phần ra, vì nó ko kịp nhận giá trị ngay trong hàm, phải thoát ra ngoài hàm nó mới nhận
            setGroupStateError({
               ...groupStateError,
               email: "error",
               emailExisted: "noError"
            })

         }
      }
      else if(e.target.name =='password'){
         const result = validatePassword(trimmedInput);
         if(result){

            // Valid password
            setGroupState({
               ...groupState,
               password: trimmedInput
            })
            // cho cái state error về lại false để nó ko hiện lỗi nữa
            setGroupStateError({
               ...groupStateError,
               password: "noError"
            })
         }
         else {
            setGroupStateError({
               ...groupStateError,
               password: "error"
            })
         }
      }
      else if(e.target.name =='passwordConfirm'){
         const result = validatePassword(trimmedInput);
         if(trimmedInput === groupState.password){
            // cho cái state error về lại false để nó ko hiện lỗi nữa
            setGroupStateError({
               ...groupStateError,
               passwordConfirm: "noError"
            })
         }
         else {
            setGroupStateError({
               ...groupStateError,
               passwordConfirm: "error"
            })
         }
      }
      else if(e.target.name =='phone'){
         const result = validatePhone(trimmedInput);
         if(result){
            // Valid password
            setGroupState({
               ...groupState,
               phone: trimmedInput
            })
            // cho cái state error về lại false để nó ko hiện lỗi nữa
            setGroupStateError({
               ...groupStateError,
               phone: "noError"
            })
         }
         else {
            setGroupStateError({
               ...groupStateError,
               phone: "error"
            })
         }
      }
      else if(e.target.name =='dob'){
         const result = validateBirthday(trimmedInput);
         if(result){
            // Valid password
            setGroupState({
               ...groupState,
               dob: trimmedInput
            })
            // cho cái state error về lại false để nó ko hiện lỗi nữa
            setGroupStateError({
               ...groupStateError,
               dob: "noError"
            })
         }
         else {
            setGroupStateError({
               ...groupStateError,
               dob: "error"
            })
         }
      }

      //validate salary
      //name là attribute name của thẻ <input type="text" name="email"
      // console.log(e.target.name);

         setGroupState((prev)=>{
            return {...prev, [name]: value};
         });

   };
   
   const arrDefaultImageTypes = ['image/png','image/jpeg', 'image/jpg']
   const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
      // hàm này khi mình nhấn chọn hình xong nó sẽ thực thi hàm này, 
      // cái dở của hàm này là khi mình nhấn chọn hình xong thì nó cũng upload hình lên firebase luôn, vì sao ?
      // vì khi upload lên xong thì mình sẽ có cái link của hình, mình cần có link của hình để upload vào sql server
      //@ts-ignore
      let selected = event.target.files[0]; //selected lúc này là 1 object chứa thông tin của hình mới upload, trong đó có các property quan trong như là: name, size, type

      if (selected && arrDefaultImageTypes.includes(selected.type)) { //nếu có file selected và type của nó phải là 1 trong các phần tử của mảng arrDefaultImageTypes
         
         //@ts-ignore
         setAvatarFile(selected);
         postAvatarToStorageFirebase(selected);
         console.log('success post image to storage firebase and update stateUrlAvatar',stateUrlAvatar);

         // tắt báo lỗi 
         setGroupStateError({
            ...groupStateError,
            urlavatar: "noError"
         })

      } else {
         setAvatarFile(null); // cái này nó để hiện cái file trong thẻ input
         // hiện báo lỗi
         setGroupStateError({
            ...groupStateError,
            urlavatar: "error"
         })
      }

   };  

// sdfjhLKhl349(*&)
   const postAvatarToStorageFirebase = (file:any) => {
      //  mục đích của hàm này là post hình lên firebase, sau đó lấy cái đường dẫn của cái hình cập nhật vào stateUrlAvatar 
      const storageRef = projectStorage.ref(`avatars/${file.name}`); //folder avatars trên firebase storage
      
      storageRef.put(file).on('state_changed', (snap:any) => {
         // let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
         // setProgress(percentage);
      }, (err:any) => {
         // setError(err)
      }, async () => {
         const urlAvatar = await storageRef.getDownloadURL();
         setGroupState({
            ...groupState,
            urlavatar: urlAvatar
         })
         // setStateUrlAvatar(urlAvatar);
      })
      // return {progress, urlAvatar, error}
   }
   // console.log(stateUrlAvatar);

   //gửi dữ liệu qua nodejs thông qua thư viên axios, sau khi gửi xong thì load lại data về frontend
   const postData = async (data: any) => {
      let response: any;
      try {
         response = await collectionAPI.signUpAddCandidate(data);
         console.log("response: " + JSON.stringify(response, null, 4));
         alert("Successfull sign up !");
         
      }catch(err){
         console.log('err:', err);
      }
      onReset();
   }

   const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();

      // kiểm tra xem groupStateError có bất cứ key value nào là error ko, error thì cho return, ko cho đi tiếp
      const hasError = Object.values(groupStateError).some(value => value === "error");

      const result = hasError ? "has error" : "has no error";
      if (result === "has error"){
         return;
      }

      const pass = groupState.password;
      const passwordEncrypted = await hashPassword(pass);

      console.log('passwordEncrypted: ', passwordEncrypted);

      const obj = 
      {
         fullname: groupState.fullname,
         email: groupState.email,
         password: passwordEncrypted,
         phone: groupState.phone,
         dob: groupState.dob,
         urlavatar: groupState.urlavatar,
         status: groupState.status
      }
      postData(obj);

   }//end handleSubmitSignUp


   const onReset = () => {
      setGroupState({
         fullname: "",
         email: "",
         password: "",
         passwordConfirm: "",
         phone: "",
         dob: "",
         urlavatar: "",
         status: ""
      })
      setGroupStateError({
         fullname: "notyet",
         email: "notyet",
         emailExisted: "notyet",
         password: "notyet",
         passwordConfirm: "notyet",
         phone: "notyet",
         dob: "notyet",
         urlavatar: "notyet",
         status:"notyet",
      });
   }
   // console.log('groupStateError: ' + JSON.stringify(groupStateError, null, 4));
   // console.log('groupState: ' + JSON.stringify(groupState, null, 4));
   return (
      <div className={clsx(styles.component_SignUp)}>


         <form onSubmit = {handleSubmitSignUp} className={clsx(styles.formSignUp)}>
            <h2>SIGN UP</h2>
{/* --------------------------------------------------------------- */}

            <div className={clsx(styles.row)}>

               <label>Full name: </label>
            
               <input type="text" name="fullname" value={groupState.fullname} onChange={handleChange} ref={refInputUsername} required/>

            </div>
            {groupStateError.fullname === "error" && 
               <div className={clsx(styles.row, styles.error)}>
                  <label></label>
                  <span className={clsx(styles.right)}>
                     <span>Full name can not leave blank and has at least 5 characters</span>
                  </span>
               </div>
            }
{/* --------------------------------------------------------------- */}

            <div className={clsx(styles.row)}>

               <label>Email: </label>

               <input type="text" name="email" defaultValue={groupState.email} onBlur={handleChange} required/>
            </div>
            {groupStateError.email == "error" && 
               <div className={clsx(styles.row, styles.error)}>
                  <label></label>
                  <span className={clsx(styles.right)}>
                     <span>Email can not leave blank and has proper format</span>
                  </span>
               </div>
            }
            {groupStateError.emailExisted == "error" && 
               <div className={clsx(styles.row, styles.error)}>
                  <label></label>
                  <span className={clsx(styles.right)}>
                     <span>Your input email existed in the database, please type other email.</span>
                  </span>
               </div>
            }
{/* --------------------------------------------------------------- */}

            <div className={clsx(styles.row)}>

               <label>Password: </label>

               <input type="password" name="password" value={groupState.password} onChange={handleChange} required/>
            </div>
            {groupStateError.password == "error" && 
               <div className={clsx(styles.row, styles.error)}>
                  <label></label>
                  <span className={clsx(styles.right)}>
                     <span>Password must have minimum 8 characters, maximum 20, including 1 uppercase, 1 lowercase, 1 number, 1 special character and no space between. Example: sdfjhLKhl349(*&)</span>
                  </span>
               </div>
            }
{/* --------------------------------------------------------------- */}
            <div className={clsx(styles.row)}>

               <label>Password confirm: </label>

               <input type="password" name="passwordConfirm" value={groupState.passwordConfirm} onChange={handleChange} required/>
            </div>
            {groupStateError.passwordConfirm == "error" && 
               <div className={clsx(styles.row, styles.error)}>
                  <label></label>
                  <span className={clsx(styles.right)}>
                     <span>Password confirm must be the same with password</span>
                  </span>
               </div>
            }
{/* --------------------------------------------------------------- */}
            <div className={clsx(styles.row)}>

               <label>Phone: </label>

               <input type="number" name="phone" value={groupState.phone} onChange={handleChange} ref={refInputEmail} required/>
            </div>
            {groupStateError.phone == "error" && 
               <div className={clsx(styles.row, styles.error)}>
                  <label></label>
                  <span className={clsx(styles.right)}>
                     <span>Phone must be valid numbers</span>
                  </span>
               </div>
            }
{/* --------------------------------------------------------------- */}

            <div className={clsx(styles.row)}>

               <label>Date of Birth: </label>

               <input type="date" name="dob" value={groupState.dob} onChange={handleChange}/>
            </div>
            {groupStateError.dob == "error" && 
               <div className={clsx(styles.row, styles.error)}>
                  <label></label>
                  <span className={clsx(styles.right)}>
                     <span>Age must be larger or equal to 18 and less than 90 years old</span>
                  </span>
               </div>
            }
{/* --------------------------------------------------------------- */}

            <div className={clsx(styles.row)}>

               <label>Avatar: </label>

               <input type="file" name="avatarFile" onChange={handleChangeAvatar} />
            </div>
            {groupStateError.urlavatar == "error" && 
               <div className={clsx(styles.row, styles.error)}>
                  <label></label>
                  <span className={clsx(styles.right)}>
                     <span>Avatar must be an image file with extension png or jpg or jpeg</span>
                  </span>
               </div>
            }
            {groupStateError.urlavatar == "noError" &&

               <div className={clsx(styles.imgwrapper)}>
                  <img src={groupState.urlavatar} className="avatar" alt="avatar" />
               </div>
            }
{/* --------------------------------------------------------------- */}

            <div className={clsx(styles.btnWrapper)}>
               
               <button type="submit" >Submit</button>
               {/* <button type="reset" >Reset</button> */}
               <button type="reset" onClick={onReset}>Reset</button>
            </div>

            <p className={clsx(styles.already)}>
               Already have an account ? Click here to
               <span><Link className={clsx(styles.link)} to="/signin"> sign In</Link></span>
            </p>
         </form>
      </div>
   )
}
export default SignUp

//Gsdfjhg23846^%
