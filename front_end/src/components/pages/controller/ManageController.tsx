import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from '../../pages/main.module.scss'     
import { useSelector, useDispatch} from 'react-redux';
import collectionAPI from '../../../API/collectionAPI';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { validatePassword,validateEmail,validatePhone,validateFullName, wait, hashPassword, getSession } from '../../share/sharedFunction';
import { projectStorage } from '../../share/firebase';

//  export to pdf
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

type stateObj = { // đặt ngoài function
   [key: string]: any;
};
// type propType = {
//    stateUserSignIn: any;
// }

function ManageController() {
   // const {stateUserSignIn} = props;
   const [stateArrAll, setStateArrAll] = useState<any[]>([])
   const [stateArrAllFinal, setStateArrAllFinal] = useState<any[]>([])
   const [stateArrAdmin, setStateArrAdmin] = useState<any[]>([])
   const [stateArrAdminFinal, setStateArrAdminFinal] = useState<any[]>([])
   const [stateArrStaff, setStateArrStaff] = useState<any[]>([])
   const [stateArrStaffFinal, setStateArrStaffFinal] = useState<any[]>([])
   const [stateBackShadow, setStateBackShadow] = useState(false);
   const [stateRole, setStateRole] = useState('admin');
   // -------------------------------------------------------add new controller start


   const [stateViewDialogAdd, setStateViewDialogAdd] = useState(false);
   const [groupState, setGroupState] = useState({
      fullname: "",
      password: "",
      passwordConfirm: "",
      email: "",
      phone: "",
      role: "",
      urlavatar: "",
      status: "enable",
   });

   const [groupStateError, setGroupStateError] = useState({
      fullname: "notyet",
      email: "notyet",
      emailExisted: "notyet",
      password: "notyet",
      passwordConfirm: "notyet",
      phone: "notyet",
      urlavatar: "notyet"
   });

   const onAdd = () => {
      setStateViewDialogAdd(true);
      setStateBackShadow(true);
   }

   const [stateUrlAvatar, setStateUrlAvatar] = useState('');
   const [avatarFile, setAvatarFile] = useState(null);
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
   const handleChange = (e: any) => {
      const {name, value} = e.target; //gộp 2 dòng trên làm 1, name là attribute name của thẻ <input type="text" name="email"
      var trimmedInput = e.target.value.trim();
      console.log('trimmedInput: ', trimmedInput);
      if(e.target.name =='fullname'){
         const result = validateFullName(trimmedInput);
         console.log('result: ', result);
         if (result) {
            // Valid full name
            setGroupState({
               ...groupState,
               fullname: trimmedInput
            })
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
         let result = validateEmail(trimmedInput);

         console.log('stateEmailEdit: ', stateEmailEdit);
         console.log('trimmedInput: ', trimmedInput);
   
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

            // chỉ kiểm tra email có tồn tại hay ko, chỉ khi email nhập vào khác email cũ của obj muốn edit
            // Khi nhấn vào chữ edit của obj nào, thì mình bắt email của obj đó và cập nhật cho state stateEmailEdit
            // vậy chỉ khi stateEmailEdit != "" (tức có email, có nhấn vào nút edit) và stateEmailEdit khác email vừa nhập vào ô input thì mới cho validate email ko trùng
            // Việc này để cho khỏi validate email đã tồn tại khi user muốn giữ nguyên email
            if(stateEmailEdit != "" && stateEmailEdit != trimmedInput){
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
            if(stateEmailEdit == ""){
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
      // else {

      // }
      setGroupState((prev)=>{
         return {...prev, [name]: value};
      });


   };
   // console.log('groupState: ' + JSON.stringify(groupState, null, 4));
   const onReset = () => {
      setGroupState({
         fullname: "",
         password: "",
         passwordConfirm: "",
         email: "",
         phone: "",
         role: "",
         urlavatar: "",
         status: "enable",
      })
      setGroupStateError({
         fullname: "notyet",
         email: "notyet",
         emailExisted: "notyet",
         password: "notyet",
         passwordConfirm: "notyet",
         phone: "notyet",
         urlavatar: "notyet",
      });
   }

   const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // prevent the default form submission behavior from occurring. This allows you to handle the form submission in a custom way, such as making asynchronous API calls, performing validation, updating state, or executing other logic.

      // validate
      const hasError = Object.values(groupStateError).some(value => value === "error");
      const result = hasError ? "has error" : "has no error";
      if (result === "has error"){
         return;
      }
      const pass = groupState.password;
      const passwordEncrypted = await hashPassword(pass);

      // console.log('passwordEncrypted: ', passwordEncrypted);
      let data = 
         {
            fullname: groupState.fullname,
            password: passwordEncrypted,
            email: groupState.email,
            phone: groupState.phone,
            role: stateRole,
            urlavatar: groupState.urlavatar,
            status: "enable",
         };
      console.log('data: ' + JSON.stringify(data, null, 4));
      // await wait(300);
      let response: any;
      try {
         response = await collectionAPI.addController(data);
         console.log("response: " + JSON.stringify(response.data, null, 4));
            splitController(response.data);
         
      }catch(err){
         console.log('err:', err);
      }
      alert("New account has been successful post to the system");
      onClearBackShadow();
   }
// -------------------------------------------------------add new controller end
// -------------------------------------------------------edit controller start
   const [stateViewDialogEdit, setStateViewDialogEdit] = useState(false);

      // đặt trong hàm
   const [stateEditUser, setStateEditUser] = useState<stateObj>({})
   const [stateEmailEdit, setStateEmailEdit] = useState(""); // // tại sao lại phải lấy email của obj muốn edit ? giải thích ở chỗ handleChange validate cái email, kéo lên trên xem
   const onEdit = (idcontroller: number) => {
      setStateBackShadow(true);
      setStateViewDialogEdit(true);
      const obj = stateArrAllFinal.find((item) => item.idcontroller === idcontroller);
      setGroupState(obj);
      setStateEmailEdit(obj.email); // tại sao lại phải lấy email của obj muốn edit ? giải thích ở chỗ handleChange validate cái email, kéo lên trên xem
      console.log('obj: ', obj);
   }
   const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // prevent the default form submission behavior from occurring. This allows you to handle the form submission in a custom way, such as making asynchronous API calls, performing validation, updating state, or executing other logic.

      // validate
      const hasError = Object.values(groupStateError).some(value => value === "error");
      const result = hasError ? "has error" : "has no error";
      if (result === "has error"){
         return;
      }
      const pass = groupState.password;
      const passwordEncrypted = await hashPassword(pass);

      // KHI EDIT THÌ DATA PHẢI CÓ CÁI id của object đc edit, khi đẩy vào java thì vẫn có thể dùng serviceAddController, nó sẽ tìm ra cái dòng có trùng idcontroller và ghi đè
      let data = 
         {
            idcontroller: stateUserSignIn.idcontroller,
            fullname: groupState.fullname,
            password: passwordEncrypted,
            email: groupState.email,
            phone: groupState.phone,
            role: stateRole,
            urlavatar: groupState.urlavatar,
            status: "enable",
         };
      console.log('data: ' + JSON.stringify(data, null, 4));
      // await wait(300);
      let response: any;
      try {
         response = await collectionAPI.editController(data);
         console.log("response: " + JSON.stringify(response.data, null, 4));
         splitController(response.data);
         
      }catch(err){
         console.log('err:', err);
      }
      alert("Account has been successful updated to the system");
      onClearBackShadow();
   }
// -------------------------------------------------------edit controller end
// console.log('groupState: ', groupState);
// -------------------------------------------------------search start
const [stateSearchInput, setStateSearchInput] = useState<string>('');

const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
         
   setStateSearchInput(event.target.value);
   let input = event.target.value;
         console.log('input: ', input);
   const searchResults = [];
   for (const obj of stateArrAll) {
      if (
         obj.fullname.toLowerCase().includes(input.toLowerCase()) 
         ||
         obj.email.toLowerCase().includes(input.toLowerCase()) 
         ||
         obj.role.toLowerCase().includes(input.toLowerCase()) 
         ||
         obj.phone.toLowerCase().includes(input.toLowerCase()) 
      ) {
         searchResults.push(obj);
      }
   }

   let arrAdmin: any[] = [];
   let arrStaff: any[] = [];
   searchResults.forEach((obj: any) => {
      
      if (obj.role === "admin"){
         arrAdmin.push(obj);
      }
      else if(obj.role === "staff"){
         arrStaff.push(obj);
      }
   });
   setStateArrAllFinal(searchResults);
   setStateArrAdminFinal(arrAdmin);
   setStateArrStaffFinal(arrStaff);
}
// -------------------------------------------------------search end
// -------------------------------------------------------sort start
const [stateSortIcon, setStateSortIcon] = useState("az"); // boolean
const onSortFullName = (type:string) => {
   let arr = stateArrAll;

   if(type == 'az'){
      setStateSortIcon('za');
      arr.sort((a, b) => a.fullname.localeCompare(b.fullname));
      let arrAdmin: any[] = [];
      let arrStaff: any[] = [];
      arr.forEach((obj: any) => {
         
         if (obj.role === "admin"){
            arrAdmin.push(obj);
         }
         else if(obj.role === "staff"){
            arrStaff.push(obj);
         }
      });
      setStateArrAllFinal(arr);
      setStateArrAdminFinal(arrAdmin);
      setStateArrStaffFinal(arrStaff);

      // setStateArrAll(arr);
      // setStateArrAdmin(arrAdmin);
      // setStateArrStaff(arrStaff);
   }
   else if(type == 'za'){
      setStateSortIcon('az');
      arr.sort((a, b) => b.fullname.localeCompare(a.fullname));
      let arrAdmin: any[] = [];
      let arrStaff: any[] = [];
      arr.forEach((obj: any) => {
         
         if (obj.role === "admin"){
            arrAdmin.push(obj);
         }
         else if(obj.role === "staff"){
            arrStaff.push(obj);
         }
      });
      setStateArrAllFinal(arr);
      setStateArrAdminFinal(arrAdmin);
      setStateArrStaffFinal(arrStaff);

      // setStateArrAll(arr);
      // setStateArrAdmin(arrAdmin);
      // setStateArrStaff(arrStaff);
   }
}
// -------------------------------------------------------sort end
   const onClearBackShadow = () => {
      setStateBackShadow(false);
      setStateIsViewDetailsAppear(false);
      setStateViewDialogAdd(false);
      setStateViewDialogEdit(false);
      onReset();

   }
   const splitController = (arr: any) => {
   // hàm này dùng để phân rã controller thành all, admin và staff
      
      let arrAdmin: any[] = [];
      let arrStaff: any[] = [];
      arr.forEach((obj: any) => {
         
         if (obj.role === "admin"){
            arrAdmin.push(obj);
         }
         else if(obj.role === "staff"){
            arrStaff.push(obj);
         }
      });
      setStateArrAll(arr);
      setStateArrAllFinal(arr);
      setStateArrAdmin(arrAdmin);
      setStateArrAdminFinal(arrAdmin);
      setStateArrStaff(arrStaff);
      setStateArrStaffFinal(arrStaff);
            
   }

   const getData = async () => {
      try {
         const response: any = await collectionAPI.findAllController(); //phải có await nghĩa là khi nào có data rồi thì mới lấy

         splitController(response.data);

      }catch(err){
         console.log('err:', err);
      }
   }

   const SwitchStatusUser = async (idcontroller: number) => {
      console.log('idcontroller:', idcontroller);
      const data = stateArrAllFinal.find((item) => item.idcontroller === idcontroller);
      if(data.status == 'active'){
         data.status = 'disable'
      }
      else {
         data.status = 'active'
      }

      let response: any;
      try {
         response = await collectionAPI.editController(data);
         // console.log("response: " + JSON.stringify(response.data, null, 4));
         splitController(response.data);
         
      }catch(err){
         console.log('err:', err);
      }
   }


   const [stateObjClicked, setStateObjClicked] = useState<stateObj>({}); // chứa data của job được click vào
   const [stateIsViewDetailsAppear, setStateIsViewDetailsAppear] = useState(false);
   const onView = (idcontroller: number) => {
      setStateIsViewDetailsAppear(true);
      setStateBackShadow(true);
      // console.log("idcontroller: " + idcontroller);
      // console.log(stateArrAll);
      const obj = stateArrAll.find((item) => item.idcontroller === idcontroller); //lấy một object đầu tiên được tìm thấy mà thoả điều kiện
      // obj.dob = obj.dob.split("T")[0];
      // console.log(obj);
      setStateObjClicked(obj)
   }

   type stateObj = {
      [key: string]: any;
   };
         // đặt trong hàm
   const [stateUserSignIn, setStateUserSignIn] = useState<stateObj>({})
      // yêu cầu hàm getData() chạy 1 lần mỗi khi component Home mount, để lấy dữ liệu mảng products từ  nodejs để đổ ra frontend reactjs
   useEffect(() => {
      getData();
      const obj = getSession('sessioncontrollersignin');
      setStateUserSignIn(obj);
   }, []);
   const [stateView, setStateView] = React.useState('all');
   const handleChangeView = (event: React.MouseEvent<HTMLElement>, kindOfView: string) => {
      // kindOfView nó sẽ lấy giá trị value="module" value="list" value="quilt" từ ToggleButton nào đc click vào
      if(kindOfView != ""){
         setStateView(kindOfView);
      }
   };

   const [stateItemsPerPage, setStateItemsPerPage] = useState(30);
   const [pagination, setPagination] = React.useState(1);
   const [stateFrom, setStateFrom] = useState(0);
   const [stateTo, setStateTo] = useState(30);

   const handleItemsPerPage = (event: any) => {
      const n = Number(event.target.value);
      if(n <0){
         setStateItemsPerPage(1);
      }
      // else if(n)
      else if (n > 100){
         setStateItemsPerPage(100);
      }
      else {
         setStateItemsPerPage(n);
      }
      
   }

   const resetItemsPerPage = () => {
            
      if(stateItemsPerPage == 0){ // trường hợp đặc biệt ngoại lệ, nếu user input value là 0 thì khi nhấn chuyển trang ta phải cho nó lên 1 và hiện 1 sản phẩm, ko cho hiện kiểu 0 ko đẹp
         setStateItemsPerPage(1)

         return; // xong rồi kết thúc hàm luôn, ko cho nó chạy code bên dưới
      }
      const itemsPerPage = stateItemsPerPage; // số item mình muốn hiện mỗi trang cho ng dùng nhập vào, mặc định là 30
      const to = 1*itemsPerPage; //hiện đến phần tử số bao nhiêu
      const from = to-itemsPerPage; // Hiện từ phần tử số bao nhiêu


      setStateTo(to);
      setStateFrom(from);
            
   }
   const handlePagination = async (e: any, value: any) => {
      console.log("value: " + value);
      // value chính là số mà mình click vào 1 hoặc 2,3
      if(stateItemsPerPage == 0){ // trường hợp đặc biệt ngoại lệ, nếu user input value là 0 thì khi nhấn chuyển trang ta phải cho nó lên 1 và hiện 1 sản phẩm, ko cho hiện kiểu 0 ko đẹp
         setStateItemsPerPage(1)
         setStateFrom(0);
         setStateTo(1);
         return; // xong rồi kết thúc hàm luôn, ko cho nó chạy code bên dưới
      }
      const itemsPerPage = stateItemsPerPage; // số item mình muốn hiện mỗi trang cho ng dùng nhập vào, mặc định là 30
      const to = value*itemsPerPage; //hiện đến phần tử số bao nhiêu
      const from = to-itemsPerPage; // Hiện từ phần tử số bao nhiêu

      setStateTo(to);
      setStateFrom(from);
   }

   const downloadPDF = async () => {
      const pdf = new jsPDF('portrait', 'pt', 'a4');
      const pdfElement:any = document.querySelector('#pdfAll');
      if (!pdfElement) {
         return;
      }
      const data = await html2canvas(pdfElement);
      const img = data.toDataURL('image/png');
      const imgProperties = pdf.getImageProperties(img);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('file.pdf');
   };

   return (
      <div className={clsx(styles.component_ManageController)}>
         <div className={clsx(styles.main)}>
                  
            <div className={clsx(styles.headerWrapper)}>
               <h1>MANAGE CONTROLLER</h1>
               <div className={clsx(styles.miniMenu)}>
                  <ToggleButtonGroup
                  orientation="horizontal"
                  value={stateView}
                  exclusive
                  // border: 1px solid blue;
                  size="small"
                  onChange={handleChangeView}
                  className={clsx(styles.left)}
                  >
                     <ToggleButton value="all" aria-label="all">
                        {/* <ViewModuleIcon /> */}
                        <span className={clsx(styles.kind)}>All</span>
                     </ToggleButton>
                     <ToggleButton value="admin" aria-label="admin">
                        {/* <ViewListIcon /> */}
                        <span className={clsx(styles.kind)}>Admin</span>
                     </ToggleButton>
                     <ToggleButton value="staff" aria-label="staff">
                        {/* <ViewQuiltIcon /> */}
                        <span className={clsx(styles.kind)}>staff</span>
                     </ToggleButton>
                  </ToggleButtonGroup>
                  <div className={clsx(styles.searchWrapper)}>
                     <input type="text" value={stateSearchInput} onChange={handleChangeSearch} placeholder='Search anything here...'></input>
                  </div>
                  <Box
                     sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     '& > *': {
                        m: 1,
                     },
                     }}
                     className={clsx(styles.box)}
                  >
                     <ButtonGroup variant="outlined" aria-label="outlined button group" className={clsx(styles.buttonGroup)}>

                        <Button className={clsx(styles.button)}>
                           {(() => {
                              if (stateSortIcon == 'az') {
                                 return (
                                    <>
                                       <img src="../assets/picture/az.png" className={clsx(styles.icon)} alt="avatar" onClick={()=>onSortFullName('az')}/>
                                    </>
                                 )
                              }
                              else if (stateSortIcon == 'za') {
                                 return (
                                    <>
                                       <img src="../assets/picture/za.png" className={clsx(styles.icon)} alt="avatar" onClick={()=>onSortFullName('za')}/>
                                    </>
                                 )
                              }
                           })()}
                        </Button>
                        <Button className={clsx(styles.button)}>
                           <img src="../assets/picture/download.png" className={clsx(styles.icon)} alt="download" onClick={downloadPDF}/>
                        </Button>
                        {/* <Button>Three</Button> */}
                     </ButtonGroup>

                  </Box>
                  <AddIcon fontSize='large' className={clsx(styles.right)} onClick={()=>onAdd()}/>
               </div>
            </div>
            <div className={clsx(styles.container)} >
               {(() => {
                  if (stateView === "all") {
                     return (
                        <>
                           <div className={clsx(styles.printPDF)} id="pdfAll">
                              <div className={clsx(styles.heading)}>
                                 <p>Name</p>
                                 <p>Email</p>
                                 <p>Role</p>
                                 <p>Picture</p>
                                 <p>Status</p>
                                 <p>Action</p>
                              </div>   
                              <div className={clsx(styles.viewWrapper)}>
                                 {
                                    stateArrAllFinal.slice(stateFrom, stateTo).map((obj, index) => {
                                       return ( 
                                          <div className={clsx(styles.row)} key={obj.idcontroller}>
                                             <p>{obj.fullname}</p>
                                             <p>{obj.email}</p>
                                             <p>{obj.role}</p>
                                             <div className={clsx(styles.imgWrapper)}>
                                                <img src={obj.urlavatar} alt="" className={clsx(styles.avatar)}/>
                                             </div>
                                             {
                                                obj.status === "disable" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                             }
                                             <div className={clsx(styles.actionWrapper)}>
                                                {(() => {
                                                   if(obj.idcontroller != 1 && obj.idcontroller != 2 && obj.idcontroller != 3){ // 3 admin đầu ko đc disable nên bỏ nút disable đi

                                                      if (obj.status === "active") {
                                                         return (
                                                            <button onClick={()=>SwitchStatusUser(obj.idcontroller)} className={clsx(styles.btnDisable)}>Disable</button>
                                                         )
                                                      } else if (obj.status === "disable") {
                                                         return (
                                                            <button onClick={()=>SwitchStatusUser(obj.idcontroller)} className={clsx(styles.btnActivate)}>active</button>
                                                         )
                                                      }
                                                   }
                                                })()}
                                                {(() => {
                                                   if (stateUserSignIn.idcontroller === obj.idcontroller) {
                                                      return (
                                                         <>
                                                            <button onClick={()=>onEdit(obj.idcontroller)} className={clsx(styles.btnEdit)}>Edit</button>
                                                         </>
                                                      )
                                                   }
                                                })()}
                                                <button onClick={()=>onView(obj.idcontroller)} className={clsx(styles.btnView)}>View</button>
                                             </div> 
                                          </div>
                                    
                                       )
                                    })
                                 }
                              </div>
                           </div>
                           <div className={clsx(styles.paginationWrapper)}>
                              <div className={clsx(styles.inputWrapper)}>
                                 <label>Jobs per page: </label>
                                 <input type="text" name="stateItemsPerPage" value={stateItemsPerPage} onChange={handleItemsPerPage}
                                 />
                                 <label className={clsx(styles.go)} onClick={resetItemsPerPage}>Go</label>
                              </div>
                              <Stack spacing={2}>
                                 <Pagination count={50} color="primary" onChange={handlePagination} />
                              </Stack>
                           </div>
                        </>
                     )
                  }
                  else if (stateView === "admin") {
                     return (
                        <>
                           <div className={clsx(styles.printPDF)} id="pdfAdmin">
                              <div className={clsx(styles.heading)}>
                                    <p>Name</p>
                                    <p>Email</p>
                                    <p>Role</p>
                                    <p>Picture</p>
                                    <p>Status</p>
                                    <p>Action</p>
                              </div>   

                              <div className={clsx(styles.viewWrapper)}>
                                 {
                                    stateArrAdminFinal.slice(stateFrom, stateTo).map((obj, index) => {
                                       return ( 
                                             <div className={clsx(styles.row)} key={obj.idcontroller}>
                                                <p>{obj.fullname}</p>
                                                <p>{obj.email}</p>
                                                <p>{obj.role}</p>
                                                <div className={clsx(styles.imgWrapper)}>
                                                   <img src={obj.urlavatar} alt="" className={clsx(styles.avatar)}/>
                                                </div>
                                                {
                                                   obj.status === "disable" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                                }
                                                <div className={clsx(styles.actionWrapper)}>
                                                   {(() => {
                                                      if(obj.idcontroller != 1 && obj.idcontroller != 2 && obj.idcontroller != 3){ // 3 admin đầu ko đc disable nên bỏ nút disable đi

                                                         if (obj.status === "active") {
                                                            return (
                                                               <button onClick={()=>SwitchStatusUser(obj.idcontroller)} className={clsx(styles.btnDisable)}>Disable</button>
                                                            )
                                                         } else if (obj.status === "disable") {
                                                            return (
                                                               <button onClick={()=>SwitchStatusUser(obj.idcontroller)} className={clsx(styles.btnActivate)}>active</button>
                                                            )
                                                         }
                                                      }
                                                   })()}
                                                   {(() => {
                                                      if (stateUserSignIn.idcontroller === obj.idcontroller) {
                                                         return (
                                                            <>
                                                               <button onClick={()=>onEdit(obj.idcontroller)} className={clsx(styles.btnEdit)}>Edit</button>
                                                            </>
                                                         )
                                                      }
                                                   })()}

                                                   <button onClick={()=>onView(obj.idcontroller)} className={clsx(styles.btnView)}>View</button>
                                                </div> 
                                             </div>
                                    
                                       )
                                    })
                                 }
                              </div>
                           </div>
                           <div className={clsx(styles.paginationWrapper)}>
                              <div className={clsx(styles.inputWrapper)}>
                                 <label>Jobs per page: </label>
                                 <input type="text" name="stateItemsPerPage" value={stateItemsPerPage} onChange={handleItemsPerPage}
                                 />
                                 <label className={clsx(styles.go)} onClick={resetItemsPerPage}>Go</label>
                              </div>
                              <Stack spacing={2}>
                                 <Pagination count={50} color="primary" onChange={handlePagination} />
                              </Stack>
                           </div>
                        </>
                     )
                  }
                  else if (stateView === "staff") {
                     return (
                        <>
                           <div className={clsx(styles.printPDF)} id="pdfStaff">
                              <div className={clsx(styles.heading)}>
                                 <p>Name</p>
                                 <p>Email</p>
                                 <p>Role</p>
                                 <p>Picture</p>
                                 <p>Status</p>
                                 <p>Action</p>
                              </div>  
                              <div className={clsx(styles.viewWrapper)}>
                                 {
                                    stateArrStaffFinal.slice(stateFrom, stateTo).map((obj, index) => {
                                       return ( 
                                             <div className={clsx(styles.row)} key={obj.idcontroller}>
                                                <p>{obj.fullname}</p>
                                                <p>{obj.email}</p>
                                                <p>{obj.role}</p>
                                                <div className={clsx(styles.imgWrapper)}>
                                                   <img src={obj.urlavatar} alt="" className={clsx(styles.avatar)}/>
                                                </div>
                                                {
                                                   obj.status === "disable" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                                }
                                                <div className={clsx(styles.actionWrapper)}>
                                                   {(() => {
                                                      if(obj.idcontroller != 1 && obj.idcontroller != 2 && obj.idcontroller != 3){ // 3 admin đầu ko đc disable nên bỏ nút disable đi

                                                         if (obj.status === "active") {
                                                            return (
                                                               <button onClick={()=>SwitchStatusUser(obj.idcontroller)} className={clsx(styles.btnDisable)}>Disable</button>
                                                            )
                                                         } else if (obj.status === "disable") {
                                                            return (
                                                               <button onClick={()=>SwitchStatusUser(obj.idcontroller)} className={clsx(styles.btnActivate)}>active</button>
                                                            )
                                                         }
                                                      }
                                                   })()}
                                                   {(() => {
                                                      if (stateUserSignIn.idcontroller === obj.idcontroller) {
                                                         return (
                                                            <>
                                                               <button onClick={()=>onEdit(obj.idcontroller)} className={clsx(styles.btnEdit)}>Edit</button>
                                                            </>
                                                         )
                                                      }
                                                   })()}
                                                   <button onClick={()=>onView(obj.idcontroller)} className={clsx(styles.btnView)}>View</button>
                                                </div> 
                                             </div>
                                    
                                       )
                                    })
                                 }
                              </div>
                           </div>   
                           <div className={clsx(styles.paginationWrapper)}>
                              <div className={clsx(styles.inputWrapper)}>
                                 <label>Jobs per page: </label>
                                 <input type="text" name="stateItemsPerPage" value={stateItemsPerPage} onChange={handleItemsPerPage}
                                 />
                                 <label className={clsx(styles.go)} onClick={resetItemsPerPage}>Go</label>
                              </div>
                              <Stack spacing={2}>
                                 <Pagination count={50} color="primary" onChange={handlePagination} />
                              </Stack>
                           </div>

                        </>
                     )
                  }
               })()}
            </div>
         </div>
   
         <div className={clsx(styles.backShadow, {[styles.appear]: stateBackShadow})} onClick={onClearBackShadow}>
         </div>
         <div className={clsx(styles.viewDetailsDialog, {[styles.appear]: stateIsViewDetailsAppear})}>
            <div className={clsx(styles.row)}>
               <p className={clsx(styles.key)}>fullname:</p><p className={clsx(styles.value)}>{stateObjClicked.fullname}</p>
            </div>
            <div className={clsx(styles.row)}>
               <p className={clsx(styles.key)}>email:</p><p className={clsx(styles.value)}>{stateObjClicked.email}</p>
            </div>
            <div className={clsx(styles.row)}>
               <p className={clsx(styles.key)}>phone:</p><p className={clsx(styles.value)}>{stateObjClicked.phone}</p>
            </div>
            <div className={clsx(styles.row)}>
               <p className={clsx(styles.key)}>role:</p><p className={clsx(styles.value)}>{stateObjClicked.role}</p>
            </div>
            <div className={clsx(styles.row)}>
               <p className={clsx(styles.key)}>status:</p><p className={clsx(styles.value)}>{stateObjClicked.status}</p>
            </div>
            <div className={clsx(styles.row,styles.imgWrapper)}>
               <img src={stateObjClicked.urlavatar} alt="" className={clsx(styles.avatar)}/>
            </div>
         </div>
         <div className={clsx(styles.dialogAdd, {[styles.appear]: stateViewDialogAdd})}>
            <form onSubmit = {handleSubmitAdd} className={clsx(styles.formAddController)}>
               <h2>CREATE NEW CONTROLLER</h2>
   {/* --------------------------------------------------------------- */}

               <div className={clsx(styles.row)}>

                  <label>Full name: </label>
               
                  <input type="text" name="fullname" value={groupState.fullname} onChange={handleChange}  required/>

               </div>
               {groupStateError.fullname === "error" && 
                  <div className={clsx(styles.row, styles.error)}>
                     <label></label>
                     <span className={clsx(styles.right)}>
                        <span>Full name can not leave blank and has at least 5 letters and maximum 50 letters</span>
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

                  <input type="number" name="phone" value={groupState.phone} onChange={handleChange}  required/>
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

                  <label>Role: </label>

                  <div className={clsx(styles.radioGroup)}>
                     <div className={clsx(styles.group)}>
                        <input type="radio" name="role" checked={stateRole == "admin"} value="admin" className={clsx(styles.item)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStateRole(e.target.value)}/> <span>admin</span>
                     </div>
                     <div className={clsx(styles.group)}>
                        <input type="radio" name="role" checked={stateRole == "staff"} value="staff" className={clsx(styles.item)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStateRole(e.target.value)}/> <span>staff</span>
                     </div>
                  </div>
                  
               </div>
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

            </form>
         </div>
         <div className={clsx(styles.dialogEdit, {[styles.appear]: stateViewDialogEdit})}>
            <form onSubmit = {handleSubmitEdit} className={clsx(styles.formAddController)}>
               <h2>EDIT CONTROLLER</h2>
   {/* --------------------------------------------------------------- */}

               <div className={clsx(styles.row)}>

                  <label>Full name: </label>
               
                  <input type="text" name="fullname" value={groupState.fullname} onChange={handleChange}  required/>

               </div>
               {groupStateError.fullname === "error" && 
                  <div className={clsx(styles.row, styles.error)}>
                     <label></label>
                     <span className={clsx(styles.right)}>
                        <span>Full name can not leave blank and has at least 5 letters and maximum 50 letters</span>
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

                  <input type="number" name="phone" value={groupState.phone} onChange={handleChange}  required/>
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

                  <label>Role: </label>

                  <div className={clsx(styles.radioGroup)}>
                     <div className={clsx(styles.group)}>
                        <input type="radio" name="role" checked={stateRole == "admin"} value="admin" className={clsx(styles.item)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStateRole(e.target.value)}/> <span>admin</span>
                     </div>
                     <div className={clsx(styles.group)}>
                        <input type="radio" name="role" checked={stateRole == "staff"} value="staff" className={clsx(styles.item)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStateRole(e.target.value)}/> <span>staff</span>
                     </div>
                  </div>
                  
               </div>
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

            </form>
         </div>
      </div>
                  

   )
}
export default ManageController

