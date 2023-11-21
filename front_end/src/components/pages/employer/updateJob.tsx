// recft_clsx_module_scss
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from '../main.module.scss' 
import { useSelector, useDispatch} from 'react-redux';
// import { projectStorage } from '../../../share/firebase';
import collectionAPI from '../../../API/collectionAPI';
import { arr_vietnam } from '../../share/arr_vietnam';
import { getUserSignIn, getSession} from '../../share/sharedFunction';

//mui

function UpdateJob () {
   // hàm lấy ngày hiện tại: yyyy-mm-dd, và gán cho state postdate luôn
   const getCurrentDate = () => {
            
      const currentDate = new Date(); // 
      const year = currentDate.getFullYear(); // Get the current year (e.g., 2023)
      const month = currentDate.getMonth(); // Get the current month (0-11; 0 represents January, 11 represents December)
      const day = currentDate.getDate(); // Get the current day of the month (1-31)

      // Adjust month and day to display as two digits if needed
      const formattedMonth = month < 9 ? `0${month + 1}` : `${month + 1}`;
      const formattedDay = day < 10 ? `0${day}` : `${day}`;

      // Create the date string in the desired format (e.g., "2023-07-10")
      const currentDateStr = `${year}-${formattedMonth}-${formattedDay}`;

      return currentDateStr;
      // console.log(currentDateStr); // O
            
   }
   const navigate = useNavigate(); //hook dùng để chuyển trang web

   const [groupState, setGroupState] = useState({
      idjob: 1,
      idemployer: 1,
      idcontroller: 1,
      postdate: getCurrentDate(),
      address: "",
      city: "",
      workmode: "office",
      expiredate: "",
      salary: 10,
      status: "pending",
      level: "Internship",
      jobtitle: "",
      reasonsToJoin1: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem ",
      reasonsToJoin2: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem ",
      reasonsToJoin3: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem ",
      jobsDescriptions1: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem ",
      jobsDescriptions2: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem ",
      jobsDescriptions3: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem ",
      skillsExperiences1: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem ",
      skillsExperiences2: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem ",
      skillsExperiences3: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem ",
      whyYouLoveWorkingHere1: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem ",
      whyYouLoveWorkingHere2: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem ",
      whyYouLoveWorkingHere3: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente enim mollitia omnis nulla esse, est dolor a aut, autem "
   });
   const [stateErrorJobTitle, setStateErrorJobTitle] = useState(false); // boolean
   const [stateErrorAddress, setStateErrorAddress] = useState(false); // boolean
   const [stateError1, setStateError1] = useState(false); // boolean reasonsToJoin1
   const [stateError2, setStateError2] = useState(false); // boolean jobsDescriptions1
   const [stateError3, setStateError3] = useState(false); // boolean skillsExperiences1
   const [stateError4, setStateError4] = useState(false); // boolean whyYouLoveWorkingHere1

   const [nameCitySelected, setNameCitiSelected] = useState(''); //chứa tên city khi mình chọn trong ô select option
   const [citiesOptions, setCitiesOptions] = useState<any[]>([]); //Tạo ra dánh sách các option để xổ ra

   const [nameDistrictSelected, setNameDistrictSelected] = useState('');
   const [districtsOptions, setDistrictsOptions] = useState<any[]>([]);

   const [nameWardSelected, setNameWardSelected] = useState('');
   const [wardsOptions, setWardsOptions] = useState<any[]>([]);

   const arrSkill = 
   [
      {id:1,name:'ReactJS'},
      {id:2,name:'java'},
      {id:3,name:'php'},
      {id:4,name:'javascript'},
      {id:5,name:'SQL'},
      {id:6,name:'Android'},
      {id:7,name:'iOS'},
      {id:8,name:'MySQL'},
      {id:9,name:'Tester'},
      {id:10,name:'Ruby'},
      {id:11,name:'Python'},
      {id:12,name:'Mobile Apps'},
      {id:13,name:'Ruby on Rails'},
      {id:14,name:'QA QC'},
      {id:15,name:'.NET'},
      {id:16,name:'Business Analyst'},
      {id:17,name:'Linux'},
      {id:18,name:'NodeJS'},
      {id:19,name:'Designer'},
      {id:20,name:'Machine learning'},
      {id:21,name:'AI'}
   ]

   const [stateLevel, setStateLevel] = useState(''); //phải có state này để nó thay đổi nội dung ô select sau khi ta select
   const [stateWorkmode, setStateWorkmode] = useState(''); //phải có state này để nó thay đổi nội dung ô select sau khi ta select
console.log('---------------------------------------------');
   const fullfillCitySelectOptions = () => {
      let arr: any = []
      for (let i = 0, len = arr_vietnam.length; i < len; i++){
         arr.push(
            <option key={Math.random()} value={arr_vietnam[i].name}>{arr_vietnam[i].name}</option>
         )
      }  
      setCitiesOptions(arr); //set state cho nó là tập hợp các option để mình chèn vào select lúc render ra
   }
   const fullfillDistrictSelectOptions = (cityName:string) => {
      let arr: any = []
      // console.log('cityName: ', cityName);
      
      const indexCity = arr_vietnam.findIndex((obj) => obj.name === cityName);// tìm index của city
      // console.log("indexCity: " + indexCity);
      // console.log(arr_vietnam[indexCity].districts);

      let arrDistricts = arr_vietnam[indexCity].districts

      for (let i = 0; i < arrDistricts.length; i++){
         arr.push(
            <option key={Math.random()} value={arrDistricts[i].name}>{arrDistricts[i].name}</option>
         )
      } 

      setDistrictsOptions(arr);
   }
   const fullfillWardsSelectOptions = (districtName:string) => {
      let arr: any = []
      // console.log('districtName: ', districtName);
      const indexCity = arr_vietnam.findIndex((obj) => obj.name === nameCitySelected);// tìm index của city
      const indexDistrict = arr_vietnam[indexCity].districts.findIndex((obj) => obj.name === districtName);// tìm index của city

      let arrWards = arr_vietnam[indexCity].districts[indexDistrict].Wards

      for (let i = 0; i < arrWards.length; i++){
         arr.push(
            // `$ {id}` ép id thành string
            //@ts-ignore
            <option key={Math.random()} value={arrWards[i].name}>{arrWards[i].name}</option>
         )
      } 
      setWardsOptions(arr);
   }

   const handleCity = (e: any) => {

      // console.log("e.target.value: " + e.target.value);
      if(e.target.value === "empty"){
         alert("City can not be empty !");
      }else {

         setNameCitiSelected(e.target.value);
         
         fullfillDistrictSelectOptions(e.target.value);
      }
   }

   const handleDistrict = (e: any) => {
      setNameDistrictSelected(e.target.value); // e.target.value là giá trị khi mình chọn trong ô select option
      fullfillWardsSelectOptions(e.target.value);
   }

   const handleAddress = (e: any) => {
      
      setNameWardSelected(e.target.value);
      
   }
   const handleWard = (e: any) => {
      
      setNameWardSelected(e.target.value);
      
   }
   // console.log('nameCitySelected: ', nameCitySelected);
   // console.log('nameDistrictSelected: ', nameDistrictSelected);
   // console.log('nameWardSelected: ', nameWardSelected);


   const handleChange = (e: any) => {
      const {name, value} = e.target; //gộp 2 dòng trên làm 1, name là attribute name của thẻ <input type="text" name="email"

      //validate salary
      //name là attribute name của thẻ <input type="text" name="email"
      // console.log(e.target.name);
      if(e.target.name =='salary'){
         if(Number(e.target.value) < 0){
            setGroupState({
               ...groupState,
               salary: 1
            })
         } 
         else if(e.target.value > 100000){
            setGroupState({
               ...groupState,
               salary: 100000
            })
         }
         else {
            setGroupState({
               ...groupState,
               salary: Number(e.target.value)
            })
         }
      }
      else if(e.target.name =='expiredate'){
         const currentDate = getCurrentDate();
         const datePostMin = new Date(currentDate);
         const datePostMax = new Date(currentDate);
         // Add 20 days to datePostMin
         datePostMin.setDate(datePostMin.getDate() + 20);
         datePostMax.setDate(datePostMin.getDate() +  180);

         // Convert the updated date back to a string
         const datePostMin20str = datePostMin.toISOString().split('T')[0];
         const datePostMax180str = datePostMax.toISOString().split('T')[0];

         // chuyển lại về type date để so sánh
         const datePostMin20 = new Date(datePostMin20str);
         const datePostMin180 = new Date(datePostMax180str);
         const dateExpired = new Date(e.target.value);
         if(dateExpired < datePostMin20){
            setGroupState({
               ...groupState,
               expiredate: datePostMin20str // lấy ngày theo kiểu string nó mới chịu yyyy-mm-dd, còn chuyển thành Date là chỉ để so sánh thôi
            })
         }
         else if(dateExpired > datePostMin180){
            setGroupState({
               ...groupState,
               expiredate: datePostMax180str // lấy ngày theo kiểu string nó mới chịu yyyy-mm-dd, còn chuyển thành Date là chỉ để so sánh thôi
            })
         }
         else { // nếu ngày đc chọn nằm trong khoảng cho phép thì cập nhật ngày đc chọn
            setGroupState({
               ...groupState,
               expiredate: e.target.value
            })
         }
      }
      else if(e.target.name =='jobtitle'){
         if(e.target.value == "" || e.target.value.trim() == ""){
            setStateErrorJobTitle(true);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
         else 
         {
            setStateErrorJobTitle(false);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
      }
      else if(e.target.name =='address'){
         if(e.target.value == "" || e.target.value.trim() == ""){
            setStateErrorAddress(true);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
         else 
         {
            setStateErrorAddress(false);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
      }
      else if(e.target.name =='reasonsToJoin1'){
         if(e.target.value == "" || e.target.value.trim() == ""){
            setStateError1(true);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
         else 
         {
            setStateError1(false);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
      }
      else if(e.target.name =='jobsDescriptions1'){
         if(e.target.value == "" || e.target.value.trim() == ""){
            setStateError2(true);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
         else 
         {
            setStateError2(false);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
      }
      else if(e.target.name =='skillsExperiences1'){
         if(e.target.value == "" || e.target.value.trim() == ""){
            setStateError3(true);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
         else 
         {
            setStateError3(false);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
      }
      else if(e.target.name =='whyYouLoveWorkingHere1'){
         if(e.target.value == "" || e.target.value.trim() == ""){
            setStateError4(true);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
         else 
         {
            setStateError4(false);
            setGroupState((prev)=>{
               return {...prev, [name]: value};
            });
         }
      }
      else {

         setGroupState((prev)=>{
            return {...prev, [name]: value};
         });
      }

   };
   const handleChangeLevel = (e: any) => {

      setStateLevel(e.target.value); // update state này để nó thay đổi nội dung ô select sau khi ta select

      //update vào groupState
      setGroupState({
         ...groupState,
         level: e.target.value
      })   
   }
   const handleChangeWorkmode = (e: any) => {

      setStateWorkmode(e.target.value); // update state này để nó thay đổi nội dung ô select sau khi ta select

      //update vào groupState
      setGroupState({
         ...groupState,
         workmode: e.target.value
      })   
   }
   
   type FormAddType = {
      idemployer: number,
      idcontroller: number,
      postdate: string,
      address: string,
      city: string,
      workmode: string,
      expiredate: string,
      salary: number,
      status: string,
      level: string,
      jobtitle: string,
      reasonsToJoin1: string,
      reasonsToJoin2: string,
      reasonsToJoin3: string,
      jobsDescriptions1: string,
      jobsDescriptions2: string,
      jobsDescriptions3: string,
      skillsExperiences1: string,
      skillsExperiences2: string,
      skillsExperiences3: string,
      whyYouLoveWorkingHere1: string,
      whyYouLoveWorkingHere2: string,
      whyYouLoveWorkingHere3:string
   }

   type stateObjType = {
      [key: string]: any;
   };
      // đặt trong hàm
   const [stateObjTobeEdit, setStateObjTobeEdit] = useState<stateObjType>({})

   const getData_findAllJob = async () => {
      let response: any;
      try {
         response = await collectionAPI.findAllJob();
         const idjobFromSession = getSession("sessionidjobTobeEdit");

         const idjob = idjobFromSession.idjobTobeEdit;

         const obj = response.data.find((job:any)=> job.idjob == idjob)

         // console.log('obj: ' + JSON.stringify(obj, null, 4));
         // // setStateObjTobeEdit(obj);

         setGroupState({
            ...groupState,
            idjob: obj.idjob,
            postdate: obj.postdate,
            address: obj.address,
            workmode: obj.workmode,
            expiredate: obj.expiredate,
            salary: obj.salary,
            status: obj.status,
            jobtitle: obj.jobtitle,
            idcontroller: obj.idcontroller,
            idemployer: obj.idemployer

         })  
         
      }catch(err){
         console.log('err:', err);
      }
   }

   //gửi dữ liệu qua nodejs thông qua thư viên axios, sau khi gửi xong thì load lại data về frontend
   const postData = async (data: FormAddType) => {
      console.log('data: ', data);
      let response: any;
      try {
         response = await collectionAPI.editJob(data);
         console.log("response: " + JSON.stringify(response, null, 4));
         onReset();
         localStorage.setItem('activeComponent', 'Cars.tsx')
         alert("Succesfull post new job !");
         window.location.reload();
      }catch(err){
         console.log('err:', err);
      }
   }

   type JobObjFormat = {
      idjob: number,
      idemployer: number,
      idcontroller: number,
      postdate: string,
      address: string,
      city: string,
      workmode: string,
      expiredate: string,
      salary: number,
      status: string,
      level: string,
      jobtitle: string,
   }
   const postData_UpdateJob = async (data: JobObjFormat) => {
      console.log('postData_UpdateJob1');
      let response: any;
      try {
         response = await collectionAPI.editJob(data);
         console.log("response: " + JSON.stringify(response, null, 4));
         console.log('postData_UpdateJob2');
      // onReset();
         // localStorage.setItem('activeComponent', 'Cars.tsx')
         // alert("Succesfull post new job !");
         // window.location.reload();
      }catch(err){
         console.log('err:', err);
      }
      console.log('postData_UpdateJob3');

   }
   type JobSkillObjFormat = {
      idjob: number,
      idskill: number
   }
   const postData_addtablejobskill = async (data: JobSkillObjFormat) => {
      // console.log("data: " + JSON.stringify(data, null, 4));
      console.log('postData_addtablejobskill1');
         let response: any;
      try {
         response = await collectionAPI.addtablejobskill(data);
         console.log("response: " + JSON.stringify(response, null, 4));
      console.log('postData_addtablejobskill2');
      }catch(err){
            console.log('err:', err);
      }
      console.log('postData_addtablejobskill3');

   }
   type ReasonstojoinObjFormat = {
      idjob: number,
      reasonstojoin: string
   }
   const postData_addtablereasonstojoin = async (data: ReasonstojoinObjFormat) => {
      console.log('postData_addtablereasonstojoin1');
      let response: any;
      try {
         response = await collectionAPI.addtablereasonstojoin(data);
         console.log("response: " + JSON.stringify(response, null, 4));
         console.log('postData_addtablereasonstojoin2');
         
      }catch(err){
         console.log('err:', err);
      }
         console.log('postData_addtablereasonstojoin3');
   }
   type JobsDescriptionsObjFormat = {
      idjob: number,
      jobsdescriptions: string
   }
   const postData_addtablejobdescription = async (data: JobsDescriptionsObjFormat) => {
      let response: any;
      try {
         response = await collectionAPI.addtablejobdescription(data);
         console.log("response: " + JSON.stringify(response, null, 4));
      }catch(err){
         console.log('err:', err);
      }
   }
   type SkillsExperiencesObjFormat = {
      idjob: number,
      skillsexperiences: string
   }
   const postData_addtableskillexperience = async (data: SkillsExperiencesObjFormat) => {
      let response: any;
      try {
         response = await collectionAPI.addtableskillexperience(data);
         console.log(3);
         console.log("response: " + JSON.stringify(response, null, 4));
      }catch(err){
         console.log('err:', err);
      }
      console.log(4);
   }
   type WhyYouLoveWorkingHereObjFormat = {
      idjob: number,
      whyyouloveworkinghere: string
   }
   const postData_addtablewhyyouloveworkinghere = async (data: WhyYouLoveWorkingHereObjFormat) => {
      let response: any;
      try {
         response = await collectionAPI.addtablewhyyouloveworkinghere(data);
         console.log("response: " + JSON.stringify(response, null, 4));
      }catch(err){
         console.log('err:', err);
      }
   }
   function generateIdBytime() {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      const years = currentDate.getFullYear();
      const months = currentDate.getMonth();
      const day = currentDate.getDay();
      const le = years % 100; // chỉ lấy số 23 thôi thay vì 2023
      // Combine hours and seconds into a single string
      const combinedValue = `${le}${months}${day}${hours}${minutes}${seconds}`;
      const finalNumber = Number(combinedValue);
      console.log(finalNumber);
      return finalNumber;
   }
   // handleSubmitAdd -> postData(objectPostToBackEnd)
   const wait = (ms:any) => new Promise((resolve) => setTimeout(resolve, ms)); // HÀM NÀY CỰC QUAN TRỌNG, NÓ CÓ NHIỆM VỤ YÊU CẦU CHƯƠNG TRÌNH ĐỢI t GIÂY TRƯỚC KHI CHO ĐI TIẾP
   const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // prevent the default form submission behavior from occurring. This allows you to handle the form submission in a custom way, such as making asynchronous API calls, performing validation, updating state, or executing other logic.

      // validate
      if(stateErrorJobTitle == true || stateErrorAddress == true || stateError1 == true || stateError2 == true || stateError3 == true || stateError4 == true){
         alert("Please do not leave required input blank ");
      }

      const arr_reasonsToJoin = [];
            
      if(groupState.reasonsToJoin1 != ""){
         arr_reasonsToJoin.push(groupState.reasonsToJoin1);
      }
      if(groupState.reasonsToJoin2 != ""){
         arr_reasonsToJoin.push(groupState.reasonsToJoin2);
      }
      if(groupState.reasonsToJoin3 != ""){
         arr_reasonsToJoin.push(groupState.reasonsToJoin3);
      }
      await wait(200);

      const arr_jobsDescriptions = [];
            
      if(groupState.jobsDescriptions1 != ""){
         arr_jobsDescriptions.push(groupState.jobsDescriptions1);
      }
      if(groupState.jobsDescriptions2 != ""){
         arr_jobsDescriptions.push(groupState.jobsDescriptions2);
      }
      if(groupState.jobsDescriptions3 != ""){
         arr_jobsDescriptions.push(groupState.jobsDescriptions3);
      }
      await wait(200);

      const arr_skillsExperiences = [];
            
      if(groupState.skillsExperiences1 != ""){
         arr_skillsExperiences.push(groupState.skillsExperiences1);
      }
      if(groupState.skillsExperiences2 != ""){
         arr_skillsExperiences.push(groupState.skillsExperiences2);
      }
      if(groupState.skillsExperiences3 != ""){
         arr_skillsExperiences.push(groupState.skillsExperiences3);
      }
      await wait(200);

      const arr_whyYouLoveWorkingHere = [];
            
      if(groupState.whyYouLoveWorkingHere1 != ""){
         arr_whyYouLoveWorkingHere.push(groupState.whyYouLoveWorkingHere1);
      }
      if(groupState.whyYouLoveWorkingHere2 != ""){
         arr_whyYouLoveWorkingHere.push(groupState.whyYouLoveWorkingHere2);
      }
      if(groupState.whyYouLoveWorkingHere3 != ""){
         arr_whyYouLoveWorkingHere.push(groupState.whyYouLoveWorkingHere3);
      }

      const idjobsystem = generateIdBytime();
      await wait(200);
      

      const address = groupState.address+', '+nameWardSelected+', '+nameDistrictSelected
      await postData_UpdateJob(
         {
            idjob: groupState.idjob,
            idemployer: groupState.idemployer,
            idcontroller: groupState.idcontroller,
            postdate: groupState.postdate,
            address: address,
            city: nameCitySelected,
            workmode: groupState.workmode,
            expiredate: groupState.expiredate,
            salary: groupState.salary,
            status:groupState.status,
            level:groupState.level,
            jobtitle:groupState.jobtitle,
         }
      );
      await wait(200);
      for (let i = 0; i < arrSkillChecked.length; i++){
         await postData_addtablejobskill(
            {
               idjob: idjobsystem,
               idskill: arrSkillChecked[i]
            }
         );
         await wait(200);
      }  
      for (let i = 0; i < arr_reasonsToJoin.length; i++){
         await postData_addtablereasonstojoin(
            {
               idjob: idjobsystem,
               reasonstojoin: groupState.reasonsToJoin1
            }
         )
         await wait(200);
      }  
      for (let i = 0; i < arr_jobsDescriptions.length; i++){
         await postData_addtablejobdescription(
            {
               idjob: idjobsystem,
               jobsdescriptions: groupState.jobsDescriptions1
            }
         )
         await wait(200);
      }  
      for (let i = 0; i < arr_skillsExperiences.length; i++){
         await postData_addtableskillexperience(
            {
               idjob: idjobsystem,
               skillsexperiences: groupState.skillsExperiences1
            }
         )
         await wait(200);
      }  
      for (let i = 0; i < arr_whyYouLoveWorkingHere.length; i++){
         await postData_addtablewhyyouloveworkinghere(
            {
               idjob: idjobsystem,
               whyyouloveworkinghere: groupState.whyYouLoveWorkingHere1
            }
         )
         await wait(200);
      }  
      alert("Your job profiles have been successful post to the system. Our Controller will check your job posting as soon as possible");
      navigate("/employer", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />
   }//end handleSubmitAdd

   const onReset = () => {
      setGroupState({
         idjob:0,
         idemployer: 0,
         idcontroller: 0,
         postdate: "",
         address: "",
         city: "",
         workmode: "",
         expiredate: "",
         salary: 0,
         status:"",
         level:"",
         jobtitle:"",
         reasonsToJoin1: "",
         reasonsToJoin2: "",
         reasonsToJoin3: "",
         jobsDescriptions1: "",
         jobsDescriptions2: "",
         jobsDescriptions3: "",
         skillsExperiences1: "",
         skillsExperiences2: "",
         skillsExperiences3: "",
         whyYouLoveWorkingHere1: "",
         whyYouLoveWorkingHere2: "",
         whyYouLoveWorkingHere3: ""
      })
   }
   // console.log('groupState: ', groupState);
   const [arrSkillChecked, setArrSkillChecked] = useState<number[]>([]);
   const handleArrSkillCheck = (id:any) => {
            
      // setArrSkillChecked([id]); //viết như vầy thì nó chỉ lưu đc 1 cái id, mà ko lưu được cái trước đó đã nhấn => xuất hiện cách ở dưới để giải quyết
      // setArrSkillChecked(prev => [...prev, id]); //đẩy vào mảng state, ở đay state arrSkillChecked là dạng mảng, prev tượng trưng cho phần tử trước đó, ghi như vầy thì nó sẽ lưu được cả phần tử trước đó, tuy nhiên ta muốn viết hàm có điều kiện nữa thì => xuất hiện cách viết dưới đây

      setArrSkillChecked((prev: number[]) => {
         const isChecked = arrSkillChecked.includes(id); //nếu mảng arrSkillChecked có chứa tham số truyền vào id thì là true và gán cho hằng isChecked

         if (isChecked) { //nếu isChecked === true thì...
            
            return arrSkillChecked.filter(item => item !== id); //dùng js thuần
            // return without(arrSkillChecked, id); //dùng without của lodash
            
         } else {
            return [...prev, id]
         }
      })
   }// end handleArrSkillCheck
   // console.log(arrSkillChecked);
   // console.log(groupState);

   useEffect(() => {
      fullfillCitySelectOptions();
      getData_findAllJob();
   },[]);

   return (

      <div className={clsx(styles.component_UpdateJob )}>
         <form onSubmit = {handleSubmitAdd} className={clsx(styles.formAdd)}>
            <h2>Update Job</h2>
            {/* <h2>UPDATE POSTED JOB</h2> */}
            <div className={clsx(styles.row)}>
            
               <label>job title: </label>
               {/* <input type="text" name="jobtitle" value={groupState.jobtitle} onChange={handleChange} required/> */}
               <input type="text" name="jobtitle" value={groupState.jobtitle} onChange={handleChange} required/>

            </div>
            {
               stateErrorJobTitle && <p style={{ color: 'red' }} className={clsx(styles.errorMessage)}>Job title can not be blank or contain only white space</p>
            }
            <div className={clsx(styles.row)}>

               <label>Company Address: </label>
            
               <input type="text" name="address" value={groupState.address} onChange={handleChange} required/>

            </div>
            {
               stateErrorAddress && <p style={{ color: 'red' }} className={clsx(styles.errorMessage)}>address can not be blank or contain only white space</p>
            }
            <div className={clsx(styles.row)}>
               <label>City</label>
               <select name="citySelected" onChange={handleCity}>
                  <option value="empty">Please select a city...</option>

                  {citiesOptions}
               </select>
            </div>
            <div className={clsx(styles.row)}>
               <label>District</label>
               <select name="districtSelected" onChange={handleDistrict}>
                  {districtsOptions}
               </select>
            </div>
            <div className={clsx(styles.row)}>
               <label>Ward</label>
               <select name="wardSelected" onChange={handleWard}>
                  {wardsOptions}
               </select>
            </div>
            
            {/* <div className={clsx(styles.row)}>

               <label>City: </label>

               <input type="text" name="city" value={groupState.city} onChange={handleChange} required/>
            </div> */}
            
            <div className={clsx(styles.row)}>
            
               <label>Workmode: </label>

               <select name="workmode" onChange={handleChangeWorkmode} className={clsx(styles.levelWrapper)}>
                  <option value="hybrid">hybrid</option>
                  <option value="remote">remote</option>     
                  <option value="office">office</option>     
                  <option value="flexible">flexible</option>     
               </select>
            </div>
            
            <div className={clsx(styles.row)}>

               <label>post date: </label>

               <input type="date" name="postdate" value={groupState.postdate} onChange={handleChange}  readOnly/>
            </div>
            <div className={clsx(styles.row)}>

               <label>expire date: </label>

               <input type="date" name="expiredate" value={groupState.expiredate} onChange={handleChange}  required/>
            </div>
            


            <div className={clsx(styles.row)}>

               <label>salary: </label>

               <input type="number" name="salary" value={groupState.salary.toString()} onChange={handleChange} required/>
               {/* .toString() phải có để nó bỏ cái số 0 dư ở đầu số, vào hàm handleChange mình ép int lại */}
            </div>
            <div className={clsx(styles.row)}>
            
               <label>Level: </label>

               <select name="level" onChange={handleChangeLevel} className={clsx(styles.levelWrapper)}>
                  <option value="Internship">Internship</option>
                  <option value="Fresher">Fresher</option>     
                  <option value="Junior">Junior</option>     
                  <option value="Mid">Mid</option>     
                  <option value="Senior">Senior</option>     
               </select>
            </div>
            <div className={clsx(styles.row, styles.skillCheckbox)}>
               <label>Skills: </label>
               <div className={clsx(styles.checkboxWrapper)}>
                  {
                     arrSkill.map(object => ( //truyền nguyên cả object đi xuống component con
                        <div key={object.id} className={clsx(styles.inputGroup)}>
                           <input
                              type="checkbox"
                              onChange={() => handleArrSkillCheck(object.id)}
                              checked={arrSkillChecked.includes(object.id)} // set điều kiện state arrSkillChecked phải chứa object.id thì mới cho nút này arrSkillChecked hiện lên
                           /><span>{object.name}</span> 
                        </div>
                     ))
                  }
               </div>

            </div>
            <div className={clsx(styles.row3)}>
               <label>Reasons to join: </label>
               <div className={clsx(styles.inputGroup)}>
                  <input type="text" name="reasonsToJoin1" value={groupState.reasonsToJoin1} onChange={handleChange} required placeholder='First reason to join our company (required)'/>
                  {
                     stateError1 && <p style={{ color: 'red' }} className={clsx(styles.errorMessage)}>input can not be blank or contain only white space</p>
                  }
                  <input type="text" name="reasonsToJoin2" value={groupState.reasonsToJoin2} onChange={handleChange} placeholder='Second reason to join our company (not required)'/>
                  <input type="text" name="reasonsToJoin3" value={groupState.reasonsToJoin3} onChange={handleChange} placeholder='Third reason to join our company (not required)'/>
               </div>
            </div>
            <div className={clsx(styles.row3)}>
               <label>Job descriptions: </label>
               <div className={clsx(styles.inputGroup)}>
                  <input type="text" name="jobsDescriptions1" value={groupState.jobsDescriptions1} onChange={handleChange} required placeholder='First reason to join our company (required)'/>
                  {
                     stateError2 && <p style={{ color: 'red' }} className={clsx(styles.errorMessage)}>input can not be blank or contain only white space</p>
                  }
                  <input type="text" name="jobsDescriptions2" value={groupState.jobsDescriptions2} onChange={handleChange} placeholder='Second reason to join our company (not required)'/>
                  <input type="text" name="jobsDescriptions3" value={groupState.jobsDescriptions3} onChange={handleChange} placeholder='Third reason to join our company (not required)'/>
               </div>
            </div>
            <div className={clsx(styles.row3)}>
               <label>Skill Experiences: </label>
               <div className={clsx(styles.inputGroup)}>
                  <input type="text" name="skillsExperiences1" value={groupState.skillsExperiences1} onChange={handleChange} required placeholder='First reason to join our company (required)'/>
                  {
                     stateError3 && <p style={{ color: 'red' }} className={clsx(styles.errorMessage)}>input can not be blank or contain only white space</p>
                  }
                  <input type="text" name="skillsExperiences2" value={groupState.skillsExperiences2} onChange={handleChange} placeholder='Second reason to join our company (not required)'/>
                  <input type="text" name="skillsExperiences3" value={groupState.skillsExperiences3} onChange={handleChange} placeholder='Third reason to join our company (not required)'/>
               </div>
            </div>
            <div className={clsx(styles.row3)}>
               <label>Why you love working here: </label>
               <div className={clsx(styles.inputGroup)}>
                  <input type="text" name="whyYouLoveWorkingHere1" value={groupState.whyYouLoveWorkingHere1} onChange={handleChange} required placeholder='First reason to join our company (required)'/>
                  {
                     stateError4 && <p style={{ color: 'red' }} className={clsx(styles.errorMessage)}>input can not be blank or contain only white space</p>
                  }
                  <input type="text" name="whyYouLoveWorkingHere2" value={groupState.whyYouLoveWorkingHere2} onChange={handleChange} placeholder='Second reason to join our company (not required)'/>
                  <input type="text" name="whyYouLoveWorkingHere3" value={groupState.whyYouLoveWorkingHere3} onChange={handleChange} placeholder='Third reason to join our company (not required)'/>
               </div>
            </div>

            <div className={clsx(styles.btnWrapper)}>
               
               <button type="submit" >Submit</button>
               <button type="reset" onClick={onReset}>Reset</button>
            </div>
         </form>
      </div>
   )
}
export default UpdateJob 

// const objectPostToBackEnd = {
//    idjob: idjobsystem,
//    idemployer: groupState.idemployer,
//    idcontroller: groupState.idcontroller,
//    postdate: groupState.postdate,
//    address: groupState.address,
//    city: groupState.city,
//    workmode: groupState.workmode,
//    expiredate: groupState.expiredate,
//    salary: groupState.salary,
//    status:groupState.status,
//    level:groupState.level,
//    jobtitle:groupState.jobtitle,
//    reasonsToJoin1: groupState.reasonsToJoin1,
//    reasonsToJoin2: groupState.reasonsToJoin2,
//    reasonsToJoin3: groupState.reasonsToJoin3,
//    jobsDescriptions1: groupState.jobsDescriptions1,
//    jobsDescriptions2: groupState.jobsDescriptions2,
//    jobsDescriptions3: groupState.jobsDescriptions3,
//    skillsExperiences1: groupState.skillsExperiences1,
//    skillsExperiences2: groupState.skillsExperiences2,
//    skillsExperiences3: groupState.skillsExperiences3,
//    whyYouLoveWorkingHere1: groupState.whyYouLoveWorkingHere1,
//    whyYouLoveWorkingHere2: groupState.whyYouLoveWorkingHere2,
//    whyYouLoveWorkingHere3: groupState.whyYouLoveWorkingHere3,
// }