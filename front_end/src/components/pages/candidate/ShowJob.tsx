// recft_clsx_module_scss
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from '../main.module.scss'     

import { useSelector, useDispatch} from 'react-redux';
import { selectSkillClicked, selectreduxStateIdjobForTest, reduxFunctionsetIdJobForTest } from '../../../features/jobSlice';
import instance from '../../../API/axios'
import collectionAPI from '../../../API/collectionAPI';
import SearchIcon from '@mui/icons-material/Search';
import EachJob from './EachJobTypeModule';
import { getSession,addSearchMonitor,getTypeOfComment,getUserSignIn, generateIdBytime, findPositiveWords, findNegativeWords, findDangerousWords, isWhQuestion } from '../../share/sharedFunction';

// mui -------------------------------------------------------------------------
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import EachJobTypeModule from './EachJobTypeModule';
import EachJobTypeList from './EachJobTypeList';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
// --------------------------firebase
import { projectStorage } from '../../share/firebase';

//------------------------

import { FileUploader } from "react-drag-drop-files";
type stateObj = {
   [key: string]: any;
};

interface UserSignIn {
   idcandidate: number;
   fullname: string;
   email: string;
   password: string;
   phone: string;
   dob: string;
   urlavatar: string;
   status: string;
}

function ShowJob() {
   const [stateUserSignIn, setStateUserSignIn] = useState<UserSignIn>(); // chứa object user sign in
   const [stateIsOpenDialogSubmitCV, setStateIsOpenDialogSubmitCV] = useState(false); // boolean
   

   const [stateJobclicked, setStateJobClicked] = useState<stateObj>({}); // chứa data của job được click vào
   const [stateArrJobOriginal, setStateArrJobOriginal] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end
   const [stateArrJobfilteredBySkill, setStateArrJobFilteredBySkill] = useState<any[]>([]); // đây là state chứa data đã đc filtered by skill
   const [stateArrJobByFilterButton, setStateArrJobByFilterButton] = useState<any[]>([]); // đây là state chứa data đã đc filtered by button filter
   const [stateArrJobBySearchButton, setStateArrJobBySearchButton] = useState<any[]>([]); // đây là state chứa data đã đc filtered by button search
   // Tại sao lại phải có tới 4 mảng chi cho mệt
   /*
   1. stateArrJobOriginal: để lưu giữ mảng ban đầu khi lấy data từ API
   2. stateArrJobfilteredBySkill: Là mảng kết quả sau khi đã lọc theoi skill được chọn từ mảng lấy về từ API
   3. stateArrJobByFilterButton: mảng này chứa kết quả filter theo các tham số stateCity,m StateLevel, StateCountry, salary... 
   4. stateArrJobBySearchButton: mảng này chứa kết quả search theo stateSearchInput khi ng dùng nhập vào ô input
   => vậy cái mảng cần render ra cho ng dùng xem là cái mảng stateArrJobBySearchButton
   */
   const [stateArrFavoriteOriginal, setStateArrFavoriteOriginal] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end

   const [stateArrAllReview, setStateArrAllReview] = useState<any[]>([]); // đây là state chứa tất cả review
   const [stateArrAllReviewOfACompany, setStateArrAllReviewOfACompany] = useState<any[]>([]); // đây là state chứa tất cả review

   const stateSkillselected = useSelector(selectSkillClicked);//hook lấy state từ jobSlice.js
   const [stateComment, setStateComment] = useState(""); // string

   const getData_findAllViewjobskillemployercompany = async () => {
      const response: any = await collectionAPI!.findAllViewjobskillemployercompany(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
      setStateArrJobOriginal(response.data);

      // SAU KHI getData_findAllViewjobskillemployercompany VỀ THÌ CHO NÓ FILTER CÁI DATA ĐÓ LIỀN LUÔN. MỤC ĐÍCH CỦA HÀM filterDataBySkill LÀ ĐỂ NÓ FILTER CÁI DATA BAN ĐẦU VỀ THEO SKILL ĐC CHỌN, 
      // SKILL MẶC ĐỊNH BAN ĐẦU MÌNH SET TRONG KHO REDUX LÀ REACTJS
      // TẠI SAO LẠI PHẢI TRUYỀN THAM SỐ response.data VÀO MÀ KO TRUYỀN CÁI STATE stateArrJobOriginal, VÌ STATE NÀY MÌNH VỪA CẬP NHẬT Ở DÒNG TRÊN, NÓ CHƯA KỊP ĂN, RA NGOÀI HÀM MỚI ĂN XONG
      // NE6NM TA PHẢI CHO CÁI MẢNG LÚC LẤY VỀ  LÀ response.data QUĂNG VÀO LÀM THAM SỐ LUÔN CHO NHANH
      filterDataBySkill(response.data);

   }
   const getData_findAllViewReview = async () => {
      const response: any = await collectionAPI.findAllViewReview(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
      setStateArrAllReview(response.data)
   }

   const getFavorite = async () => {
      const objUserSignIn = getUserSignIn();

      if(objUserSignIn != null){

         const idcandidate = objUserSignIn?.idcandidate ?? 0; // nếu stateUserSignIn là undefine thì gán 0 cho idcandidate
         const response: any = await collectionAPI!.findAllViewFavorite(idcandidate); //phải có await nghĩa là khi nào có data rồi thì mới lấy
   
         groupFavoriteByIdjobByIdcandidate(response.data);
      }

   }
   const groupFavoriteByIdjobByIdcandidate = (data:any) => {     
      const mergedData: any[] = [];
      const mergedMap: { [key: number]: any } = {};

      data.forEach((obj:any) => {
         const idjob = obj.idjob;
         if (mergedMap[idjob]) {
         mergedMap[idjob].idjobskill.push(obj.idjobskill);
         mergedMap[idjob].idskill.push(obj.idskill);
         mergedMap[idjob].skill.push(obj.skill);
         } else {
         mergedMap[idjob] = { ...obj };
         mergedMap[idjob].idjobskill = [obj.idjobskill];
         mergedMap[idjob].idskill = [obj.idskill];
         mergedMap[idjob].skill = [obj.skill];
         mergedData.push(mergedMap[idjob]);
         }
      });

      setStateArrFavoriteOriginal(mergedData);
      console.log(mergedData);
   }
   // console.log('stateArrFavoriteOriginal: ' + JSON.stringify(stateArrFavoriteOriginal, null, 4));
   // MỤC ĐÍCH CỦA HÀM filterDataBySkill LÀ ĐỂ NÓ FILTER CÁI DATA BAN ĐẦU VỀ THEO SKILL ĐC CHỌN, 
   // SKILL MẶC ĐỊNH BAN ĐẦU MÌNH SET TRONG KHO REDUX LÀ REACTJS
   const filterDataBySkill = (data:any) => {
      console.log('stateSkillselected: ', stateSkillselected);
      // lọc data theo skill đc chọn rồi cho vào mảng arr
      let arr: any = [];
      data.forEach((obj: any) => {
            
         if (obj.skill == stateSkillselected){
            arr.push(obj);
         }
      });

      // lấy những cái idjob đc chọn, vì 1 job có thể có 2 skill, dẫn đến trùng idjob, nên ở đây mình chỉ lấy idjob unique ko trùng thôi
      const arrIdjobOfSkillClicked = Array.from(new Set(arr.map((item:any) => item.idjob)));

      // cho các skill về thành 1 mảng rồi gán cho key skill trong mảng
      const arrJobfilteredTemp = data.filter((item:any) => arrIdjobOfSkillClicked.includes(item.idjob));
      // console.log(arrJobfilteredTemp);
      
      const arrJobfilteredTemp2 = arrJobfilteredTemp.reduce((result:any, obj:any) => {
         const existingObj = result.find((item:any) => item.idjob === obj.idjob);
         if (existingObj) {
           // If an object with the same idjob already exists, add the skill to the skill array
            existingObj.skill.push(obj.skill);
         } else {
           // If the object doesn't exist, create a new one and initialize the skill array
            result.push({
               ...obj,
               skill: [obj.skill]
            });
         }
         return result;
      }, []);
      // console.log(arrJobfilteredTemp2);

      countTotalJob(arrJobfilteredTemp2);
      setStateArrJobFilteredBySkill(arrJobfilteredTemp2); // cho cập nhật state đồng bộ hết cả 3 mảng
      setStateArrJobByFilterButton(arrJobfilteredTemp2); // cho cập nhật state đồng bộ hết cả 3 mảng
      setStateArrJobBySearchButton(arrJobfilteredTemp2); // cho cập nhật state đồng bộ hết cả 3 mảng
   } // filterDataBySkill

   const [stateSearchInput, setStateSearchInput] = useState<string>('');

   const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
            
      setStateSearchInput(event.target.value);
            
   }
   const handleKeyDownInputComment = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         setStateComment(event.currentTarget.value);
      }
   }
   const handleChangeInputComment = (event: React.ChangeEvent<HTMLInputElement>) => {
            
      setStateComment(event.target.value);
            
   }

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

   function getCurrentDateTimeWithTimezoneOffset() {
      const date = new Date();
      const timezoneOffset = 7 * 60 * 60 * 1000; // +7 timezone offset in milliseconds
      const adjustedDate = new Date(date.getTime() + timezoneOffset);
      const formattedDate = adjustedDate.toISOString().replace("Z", "+07:00");
   
      return formattedDate;
   }
   
   
   // const currentDateTime = getCurrentDateTimeWithTimezoneOffset();
   // console.log(currentDateTime);

   const onSendCommentToServer = async () => {
      const idgroup = generateIdBytime(); // 236318476
      const idcompany = stateJobclicked.idcompany;
      let idcandidate = 0;
      let idcontroller = 0;
      let idemployer = 0;
      let postdate = getCurrentDateTimeWithTimezoneOffset();
      const objUserSignIn = getUserSignIn();
      
      if (objUserSignIn != null) {
         const hasIdCandidate = objUserSignIn.hasOwnProperty('idcandidate');
         const hasIdController = objUserSignIn.hasOwnProperty('idcontroller');
         const hasIdEmployer = objUserSignIn.hasOwnProperty('idemployer');

         if (hasIdCandidate) {
            idcandidate = objUserSignIn.idcandidate || 0;
         }
         else {
            idcandidate = 0
         }
         if (hasIdController) {
            //@ts-ignore
            idcontroller = objUserSignIn.idcontroller || 0;
         }
         else {
            idcontroller = 0;
         }
         if (hasIdEmployer) {
            //@ts-ignore
            idemployer = objUserSignIn.idemployer || 0;
         }
         else {
            idemployer = 0;
         }

         console.log(hasIdCandidate); // true
         console.log(hasIdController); // false
         console.log(hasIdEmployer); // false
      } else {
         console.log("objUserSignIn is undefined");
      }


      let type = getTypeOfComment(stateComment);
      console.log('type: ', type);

      let status = "enable";
      if (type == "dangerous"){
         status = "disable"
      }

      let reply = "n/a"
      if (type == "question"){
         reply = "not yet";
      }
      const data = 
      {
         "idgroup": idgroup,
         "idreview": idgroup,
         "idcandidate": idcandidate,
         "idcontroller": idcontroller,
         "idemployer": idemployer,
         "idcompany": idcompany,
         "content": stateComment,
         "postdate": postdate,
         "type": type,
         "status": status,
         "reply": reply
      };
      console.log('data: ' + JSON.stringify(data, null, 4));

      /*
      {
         "idgroup": 1,
         "idreview": 1,
         "idcandidate": 1,
         "idcontroller": 0,
         "idemployer": 0,
         "idcompany": 76,
         "content": "Good company but too much overtime",
         "postdate": "2023-07-19T12:33:44.910+00:00"
      }
      */
      let response: any;
      try {
         response = await collectionAPI.addReview(data); // sau khi add xong thì thì bên java ta cho nó trả về viewreview luôn để nó cập nhật lại data về review
         // console.log("response: " + JSON.stringify(response, null, 4));
         setStateArrAllReview(response.data); // cập nhật lại data review

         console.log('stateIdJobClicked: ', stateIdJobClicked);

         const filteredReviews = response.data.filter((review:any) => review.idcompany === idcompany);
         setStateArrAllReviewOfACompany(filteredReviews); // cập nhật lại review của company mà sỡ hửu cái job đc click vào
         // console.log('filteredReviews after click send: ', filteredReviews);
         
      }catch(err){
         console.log('err:', err);
      }
      setStateComment("");
      if (type == "dangerous"){
         alert("Please kindly do not use inappropriate words !");
      }

   }
   // filter start
   const [stateCity, setStateCity] = useState('');
   // const [stateWorkMode, setStateWorkMode] = useState('');
   const [stateLevel, setStateLevel] = useState('');
   const [stateCountry, setStateCountry] = useState('');

   const handleCity = (event:any) => {
      setStateCity(event.target.value as string);
   };

   const handleLevel = (event:any) => {
      setStateLevel(event.target.value as string);
   };
   const handleCountry = (event:any) => {
      setStateCountry(event.target.value as string);
   };

   const [stateSalary, setStateSalary] = React.useState<number[]>([0, 10000]); //cái state này chỉ để cho thanh slider nó trượt cho visual, mình ko lấy data này
   const [stateSalaryMin, setStateSalaryMin] = useState(0);
   const [stateSalaryMax, setStateSalaryMax] = useState(10000);

   const handleSalary = (event: any, newValue: number | number[]) => {
      setStateSalary(newValue as number[]); // cái state này chỉ để cho thanh slider nó trượt cho visual, mình ko lấy data này
      setStateSalaryMin(event.target.value[0]*100);
      setStateSalaryMax(event.target.value[1]*100);
   };

   const filter = () => {
      const searchResults = [];

      // loop through cái mảng stateArrJobfilteredBySkill, nếu obj nào có thuộc tính city giống thì đẩy obj đó vào searchResults
      for (const obj of stateArrJobfilteredBySkill) {
         const cityCondition = stateCity !== '' ? obj.city.includes(stateCity) : true;
         const levelCondition = stateLevel !== '' ? obj.level.includes(stateLevel) : true;
         // const countryCondition = stateCountry !== '' ? obj.country.includes(stateCountry) : true;
         let countryCondition= true;

         if(stateCountry !== ''){
            if(stateCountry === 'Viet Nam'){
               countryCondition = obj.country.includes(stateCountry)
            } 
            else if (stateCountry === 'International'){
               countryCondition = !(obj.country.includes(stateCountry));

            }
         }
         // console.log('cityCondition: ', cityCondition);
         // console.log('levelCondition: ', levelCondition);
         // console.log('countryCondition: ', countryCondition);
         // console.log('countryCondition: ', countryCondition);
         // console.log('obj.salary: ', obj.salary);
         // console.log('stateSalaryMin: ', stateSalaryMin);
         // console.log('stateSalaryMax: ', stateSalaryMax);
         if (
            cityCondition &&
            levelCondition &&
            countryCondition &&
            obj.salary >= stateSalaryMin &&
            obj.salary <= stateSalaryMax
         ) {
            searchResults.push(obj);
         }
      }
      // console.log('searchResults: ', searchResults);
      setStateArrJobByFilterButton(searchResults);// cho cập nhật state đồng bộ hết cả 2 mảng
      setStateArrJobBySearchButton(searchResults);// cho cập nhật state đồng bộ hết cả 2 mảng
      countTotalJob(searchResults); // đếm số job thỏa điều kiện
      setStateSearchInput(''); // khi nhấn filter thì cho ô search về rỗng lại

   }

   const onSearch = () => {

      addSearchMonitor(stateSearchInput);

      const searchResults = [];
      for (const obj of stateArrJobByFilterButton) {
         if (
            obj.address.toLowerCase().includes(stateSearchInput.toLowerCase()) 
            ||
            obj.city.toLowerCase().includes(stateSearchInput.toLowerCase()) 
            ||
            obj.companyname.toLowerCase().includes(stateSearchInput.toLowerCase()) 
            ||
            obj.country.toLowerCase().includes(stateSearchInput.toLowerCase()) 
            ||
            obj.field.toLowerCase().includes(stateSearchInput.toLowerCase()) 
            ||
            obj.jobtitle.toLowerCase().includes(stateSearchInput.toLowerCase()) 
            ||
            obj.level.toLowerCase().includes(stateSearchInput.toLowerCase()) 
            ||
            obj.overtime.toLowerCase().includes(stateSearchInput.toLowerCase()) 
            ||
            obj.workmode.toLowerCase().includes(stateSearchInput.toLowerCase())
         ) {
            searchResults.push(obj);
         }
      }
      console.log(searchResults);
      countTotalJob(searchResults);
      setStateArrJobBySearchButton(searchResults);

   }
   
   const [arrtotalJob, setArrTotalJob] = useState<any[]>([]);
   const countTotalJob = (arr:any) => {
      const skill = stateSkillselected+', ';
      const totalJob = String(arr.length);
      const cityCondition = stateCity !== '' ? stateCity+', ' : '';
      const levelCondition = stateLevel !== '' ? stateLevel+', ' : '';
      const countryCondition = stateCountry !== '' ? stateCountry+', ' : '';
      const salary = 'from: $'+String(stateSalaryMin)+' To: $'+String(stateSalaryMax);
      const firstRow = <p key='1' className={clsx(styles.title)}>Total Jobs: {totalJob}</p>
      const secondRow = <p key='2' className={clsx(styles.note)}>{skill}{cityCondition}{levelCondition}{countryCondition}{salary}</p>
      const list = [];
      list.push(firstRow);
      list.push(secondRow);
      setArrTotalJob(list);
   }
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
   const [stateView, setStateView] = React.useState('module');

   const cvPostedOnJobOfUserSignIn = () => {
      const objUserSignIn = getUserSignIn();
      const idcan = objUserSignIn.idcandidate;

      const filterResumeEachJob = stateArrResumeeachjob.filter((obj:any) => obj.idcandidate == idcan);
      console.log('filterResumeEachJob: ', filterResumeEachJob);

      const filterDigitalEachJob = stateArrResumedigitaleachjob.filter((obj:any) => obj.idcandidate == idcan);
      console.log('filterDigitalEachJob: ', filterDigitalEachJob);

      const filterTestResult = stateArrTestresult.filter((obj:any) => obj.idcandidate == idcan);
      console.log('filterTestResult: ', filterTestResult);

      let arrIdjobInPDFTable: number[] = [];
      if(filterResumeEachJob.length > 0){
         filterResumeEachJob.forEach((obj:any) => {
            arrIdjobInPDFTable.push(obj.idcandidate)
         })
      }
      console.log('arrIdjobInPDFTable: ', arrIdjobInPDFTable);

      let arrIdjobInDigitalTable: number[] = [];
      if(filterDigitalEachJob.length > 0){
         filterDigitalEachJob.forEach((obj:any) => {
            arrIdjobInDigitalTable.push(obj.idcandidate)
         })
      }
      console.log('arrIdjobInDigitalTable: ', arrIdjobInDigitalTable);

      let arrIdjobInTestResultTable: number[] = [];
      if(filterTestResult.length > 0){
         filterTestResult.forEach((obj:any) => {
            arrIdjobInTestResultTable.push(obj.idcandidate)
         })
      }
      console.log('arrIdjobInTestResultTable: ', arrIdjobInTestResultTable);

      let arrMergeIdjob: number[] = arrIdjobInPDFTable.concat(arrIdjobInDigitalTable, arrIdjobInTestResultTable);
      let UniqueArrMergeIdjob: number[] = [];
      // tạo ra mảng chứa các idjob ko trùng
      for (const x of arrMergeIdjob) {
         if (!UniqueArrMergeIdjob.includes(x)) {
            UniqueArrMergeIdjob.push(x);
         }
      }
      //----------to be continue
   }
   
   const handleChangeView = (event: React.MouseEvent<HTMLElement>, kindOfView: string) => {
      const objUserSignIn = getUserSignIn();
      // kindOfView nó sẽ lấy giá trị value="module" value="list" value="quilt" từ ToggleButton nào đc click vào

      if(kindOfView == "favorite"){
         if(objUserSignIn == null){ // chưa sign in nên nó bằng null
            return alert("This function required sign in !");
         }

      }
      if(kindOfView == "CV Posted"){
         if(objUserSignIn == null){ // chưa sign in nên nó bằng null
            return alert("This function required sign in !");
         }
         else {
            cvPostedOnJobOfUserSignIn();
         }

      }

      setStateView(kindOfView);
   };

   const [stateArrResumeeachjob, setStateArrResumeeachjob] = useState<any[]>([]);
   const getData_all_resumeeachjob = async () => {
      let response: any;
      try {
         response = await collectionAPI.findAllResumeeachjob();
         setStateArrResumeeachjob(response.data);
      }catch(err){
         console.log('err:', err);
      }
   }

   const [stateArrTestresult, setStateArrTestresult] = useState<any[]>([]);
   const getData_all_Testresult = async () => {
      let response: any;
      try {
         response = await collectionAPI.findAllTestresult();
         setStateArrTestresult(response.data);
      }catch(err){
         console.log('err:', err);
      }
   }

   const [stateArrResumedigitaleachjob, setStateArrResumedigitaleachjob] = useState<any[]>([]);
   const getData_all_Resumedigitaleachjob = async () => {
      let response: any;
      try {
         response = await collectionAPI.findAllResumedigitaleachjob();
         // console.log('response.data: ', response.data);
         setStateArrResumedigitaleachjob(response.data);
      }catch(err){
         console.log('err:', err);
      }
   }

   const [stateArrResumeTemplate, setStateArrResumeTemplate] = useState<any[]>([]);
   const getData_all_ResumeTemplate = async () => {
      let response: any;
      try {
         response = await collectionAPI.findAllResumetemplate();
         setStateArrResumeTemplate(response.data);
      }catch(err){
         console.log('err:', err);
      }
   }

   const [stateIsViewDetailsAppear, setStateIsViewDetailsAppear] = useState(false);
   const [stateIdJobClicked, setStateIdJobClicked] = useState(0); // number
   const [stateBoolAlreadySubmited, setStateBoolAlreadySubmited] = useState(false);
   const [stateBoolAlreadyTested, setStateBoolAlreadyTested] = useState(false);
   const [stateArrResumeTemplateOfCurrentUser, setStateArrResumeTemplateOfCurrentUser] = useState<any[]>([]);

   const viewJobDetails = (idJobClicked: number) => {
      setStateIdJobClicked(idJobClicked);
      setStateIsViewDetailsAppear(!stateIsViewDetailsAppear);
      console.log("idJob: " + idJobClicked);

      const obj = stateArrJobBySearchButton.find((item) => item.idjob === idJobClicked); //lấy một object đầu tiên được tìm thấy mà thoả điều kiện
      setStateJobClicked(obj)

      let idcompany = obj.idcompany; // idcompany của công ty đc click vào

      const filteredReviews = stateArrAllReview.filter(review => review.idcompany === idcompany);
      setStateArrAllReviewOfACompany(filteredReviews);
      console.log('filteredReviews after click view: ', filteredReviews);

      // kiểm tra là userđang sign in đã nộp cv ở job đc click vào chưa, nếu rồi thì cho state stateBoolAlreadySubmited là true, ko thì false, để render ra nút submit cv hay submited cho phù hợp
      const obj2 = getUserSignIn(); // lấy user đang sign in
      const idcandidate = obj2.idcandidate;
      const alreadySubmit = stateArrResumeeachjob.find((item:any) => item.idcandidate === idcandidate && item.idjob === idJobClicked); // tìm xem trong bảng Resumeeachjob có idcandidate ứng với idjob này chưa, có rồi thì tức đã submit, nên mình sẽ ẩn nút submit, và ko cho nộp lại
      if(alreadySubmit != null ){
         setStateBoolAlreadySubmited(true);
      }

      // kiểm tra là user đang sign in đã làm bài test ở job đc click vào chưa, nếu rồi thì cho state stateBoolAlreadyTested là true, ko thì false, để render ra nút do the test hay tested cho phù hợp
      const alreadyTested = stateArrTestresult.find((item:any) => item.idcandidate === idcandidate && item.idjob === idJobClicked); // tìm xem trong bảng estresult có idcandidate ứng với idjob này chưa, có rồi thì tức đã test, nên mình sẽ ẩn nút tested, và ko cho nộp lại
      if(alreadyTested != null ){
         setStateBoolAlreadyTested(true);
      }

      // lấy tất cả các resume bản digital của user đang sign in để render ra giao diện cho hắn chọn để nộp
      const digitalCVOfUserSignIn = stateArrResumeTemplate.filter((obj:any) => obj.idcandidate === idcandidate);
      setStateArrResumeTemplateOfCurrentUser(digitalCVOfUserSignIn);

      // tìm trong data của bảng resumedigitaleachjob xem là user có idcandidate và idjob này chưa, có rồi tức đã submit thì ẩn nút submit của submit cv by data đi
      const searchResult = stateArrResumedigitaleachjob.filter((item:any) => item.idcandidate === idcandidate && item.idjob === idJobClicked);//tìm thấy sẽ ra true ngược lại ra false
      console.log('searchResult: ', searchResult);
      if(searchResult.length != 0){ // khác null tức là đã tồn tại
         setStateBoolAlreadySubmitDigitalCV(true); // ẩn nút submit đi, tức ko cho submit nữa
      }
      console.log('idJobClicked: ', idJobClicked);
      console.log('stateArrResumedigitaleachjob: ', stateArrResumedigitaleachjob);

   }//end viewJobDetails


   const [stateBoolAlreadySubmitDigitalCV, setStateBoolAlreadySubmitDigitalCV] = useState(false);
   const submitDigitalCVForThisJob = async (idresume:number) => {
      const obj2 = getUserSignIn(); // lấy user đang sign in
      const idcandidate = obj2.idcandidate;
      const idjob = stateJobclicked.idjob;

      
      const data = 
      {
         "idresume": idresume,
         "idcandidate": idcandidate,
         "idjob": idjob
      };

      let response1: any;
      let response2: any;
      try {

         response1 = await collectionAPI.findAllResumedigitaleachjob();
         
         const searchResult = response1.data.filter((item:any) => item.idcandidate === idcandidate && item.idjob === idjob);
         if(searchResult != null){
            alert("You have already submit digital CV, you can not apply 2 digital CV for the same job job");
            return; // thoát hàm
         }
         console.log('response1: ', response1);
         // response2 = await collectionAPI.addResumedigitaleachjob(data);

         // // sau khi add vào bảng thì backend sẽ trả ra các record của bảng resumedigitaleachjob,
         // // từ đây ta xác định luôn là user này đã submit bản resume digital rồi và không cho nộp tiếp bằng cách ẩn nút submit đi
         // const searchResult = response2.data.filter((item:any) => item.idcandidate === idcandidate && item.idjob === idjob);//tìm thấy sẽ ra true ngược lại ra false
         // if(searchResult != null){
         //    setStateBoolAlreadySubmitDigitalCV(true); // ẩn nút submit đi, tức ko cho submit nữa
         // }

      }catch(err){
         console.log('err:', err);
      }
   }
   const navigate = useNavigate(); //hook dùng để chuyển trang web

   const dispatch = useDispatch(); //hook phát đi đến jobSlice.js

   const doTheTest = () => {
   
      if (window.confirm("Are you sure you want to do the test now ?, if you cancel in the middle of the test, your result will be recorded as 0 point and you can not redo it again \n\nIf you wish to Proceed to the test, press ok, otherwise press cancel \n") == false) {
         return;
      } 

      const idjob = stateJobclicked.idjob;

      dispatch(reduxFunctionsetIdJobForTest(idjob));

      navigate("/test", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />
      
   }
   // view digital cv handle start-----------------------------------------------------------
   const [stateBoolDialogViewDigitalResume, setStateBoolDialogViewDigitalResume] = useState(false);
   type stateObjType = {
      [key: string]: any;
   };
      // đặt trong hàm
   const [stateObjCV, setStateObjCV] = useState<stateObjType>({})
   const [stateArrSkill1, setStateArrSkill1] = useState<any[]>([]);
   const [stateArrSkill2, setStateArrSkill2] = useState<any[]>([]);
   const [stateArrSkill3, setStateArrSkill3] = useState<any[]>([]);
   const [stateBoolBackShadowViewCV, setStateBoolBackShadowViewCV] = useState(false);
   const viewResumeDigitalDetails = (idresume:number) => {
      setStateBoolBackShadowViewCV(true)
      setStateBoolDialogViewDigitalResume(true);
      
      const obj:any = stateArrResumeTemplateOfCurrentUser.find((obj:any) => obj.idresume === idresume);

      setStateObjCV(obj);
      console.log('obj: ', obj);
      const skill1 = obj.skill1;
      const arrSkill1 = skill1.split('_');
      arrSkill1.pop(); //xóa phần tử rỗng cuối cùng


      const skill2 = obj.skill2;
      const arrSkill2 = skill2.split('_');
      arrSkill2.pop(); //xóa phần tử rỗng cuối cùng
      const skill3 = obj.skill3;
      const arrSkill3 = skill3.split('_');
      arrSkill3.pop(); //xóa phần tử rỗng cuối cùng
      // console.log('obj: ', obj);

      setStateArrSkill1(arrSkill1);
      setStateArrSkill2(arrSkill2);
      setStateArrSkill3(arrSkill3);
   }
   const clearShadowViewCV = () => {
      setStateBoolBackShadowViewCV(false)
      setStateBoolDialogViewDigitalResume(false);
      
   
   }
// view digital cv handle end-----------------------------------------------------------



   const viewJobDetailsFavorite = (idJobClicked: number) => {
      setStateIsViewDetailsAppear(!stateIsViewDetailsAppear);
      console.log("idJob: " + idJobClicked);
      const obj = stateArrFavoriteOriginal.find((item) => item.idjob === idJobClicked); //lấy một object đầu tiên được tìm thấy mà thoả điều kiện
      setStateJobClicked(obj)
   }

   const addToFavorite = async (idjob:number) => {
      const objUserSignIn = getUserSignIn();

      if(objUserSignIn == null){
         alert("Please sign in before add job to favorite !");
         return;
      }
      
      const idcandidate = objUserSignIn?.idcandidate ?? 0; // nếu stateUserSignIn là undefine thì gán 0 cho idcandidate

      let obj = {
         idcandidate:idcandidate,
         idjob:idjob
      }

      let response: any;
      try {
         response = await collectionAPI.addToFavorite(obj);
         console.log("response: " + JSON.stringify(response, null, 4));
         alert("Successfull ad to favorite");
         
      }catch(err){
         console.log('err:', err);
      }
   }

   const removeJobFromFavorite = async (idfavorite:number) => {
      if (window.confirm("Are you sure you want to remove ?") == true) {
         let response: any;
         try {
            response = await collectionAPI.removeJobFavorite(idfavorite);

            getFavorite();
         }catch(err){
            console.log('err:', err);
         }
      } else {
         return;
      }
   }

   const onSubmitCV = () => {
      const obj = getUserSignIn();
      if(obj == null){
         alert("Please sign in before submit CV");
         return;
      }
      setStateIsViewDetailsAppear(false);
      setStateIsOpenDialogSubmitCV(true);

   }
   const onCancelViewDetails = () => {
      setStateIsViewDetailsAppear(false);
      setStateJobClicked({}); // cho cái state object về rỗng
      setStateBoolDialogViewDigitalResume(false);
   }
   const onCancelSubmitCV = () => {
      setStateIsViewDetailsAppear(false);
      setStateIsOpenDialogSubmitCV(false);
      setStateBoolDialogViewDigitalResume(false);
   }

   const [stateErrorUpload, setStateErrorUpload] = useState(""); // boolean
   const [stateLinkCVOnfirebase, setStateLinkCVOnfirebase] = useState(""); // boolean

   const [cvFile, setCvFile] = useState(null);
   const arrDefaultImageTypes = ['application/pdf']
   const handleChangeUploadCV = (event: React.ChangeEvent<HTMLInputElement>) => {
      setStateBoolErrorUploadCV(false); // do đã chọn file nên mình cho thông báo lỗi chưa chọn file ẩn đi
      // hàm này khi mình nhấn chọn hình xong nó sẽ thực thi hàm này, 
      // cái dở của hàm này là khi mình nhấn chọn hình xong thì nó cũng upload hình lên firebase luôn, vì sao ?
      // vì khi upload lên xong thì mình sẽ có cái link của hình, mình cần có link của hình để upload vào sql server
      //@ts-ignore
      let selected = event.target.files[0]; //selected lúc này là 1 object chứa thông tin của hình mới upload, trong đó có các property quan trong như là: name, size, type
      if (selected && arrDefaultImageTypes.includes(selected.type)) { //nếu có file selected và type của nó phải là 1 trong các phần tử của mảng arrDefaultImageTypes
         
         //@ts-ignore
         setCvFile(selected);
         postPDFToStorageFirebase(selected);
         console.log('success post image to storage firebase and update stateUrlAvatar',stateLinkCVOnfirebase);

         // tắt báo lỗi 
         setStateErrorUpload("noError");

      } else {
         setCvFile(null); // cái này nó để hiện cái file trong thẻ input
         // hiện báo lỗi
         setStateErrorUpload("error");
      }

   };  
   const [stateBoolErrorUploadCV, setStateBoolErrorUploadCV] = useState(false);
   const onUploadCV = async () => {
      console.log('stateLinkCVOnfirebase: ', stateLinkCVOnfirebase);
      if(stateLinkCVOnfirebase === ''){
         setStateBoolErrorUploadCV(true);
         return
      }
      const idJob = stateJobclicked.idjob;
      const obj = getUserSignIn();
      const idcan = obj.idcandidate;
      const today = getCurrentDate();

      const alreadySubmit = stateArrResumeeachjob.find((item:any) => item.idcandidate === idcan && item.idjob === idJob); // tìm xem trong bảng Resumeeachjob có idcandidate ứng với idjob này chưa, có rồi thì tức đã submit, nên mình sẽ ẩn nút submit, và ko cho nộp lại
      if(alreadySubmit != null ){
         setStateBoolAlreadySubmited(true);
      }

      const data = {
         idcandidate: idcan, 
         urlfile: stateLinkCVOnfirebase, 
         idjob: idJob, 
         applydate: today
      }
      console.log('obj: ', obj);
      let response: any;
      try {
         response = await collectionAPI.addResumeeachjob(data);
         alert("Successfull upload CV, Your CV will be submited strait to employer of this job. Thanks so much !");
         // setStateIsOpenDialogSubmitCV(!stateIsOpenDialogSubmitCV);
         const alreadySubmit = response.data.filter((item:any) => item.idcandidate === idcan && item.idjob === idJob); // tìm xem trong bảng Resumeeachjob có idcandidate ứng với idjob này chưa, có rồi thì tức đã submit, nên mình sẽ ẩn nút submit, và ko cho nộp lại
         if(alreadySubmit != null ){
            setStateBoolAlreadySubmited(true);
         }
      }catch(err){
         console.log('err:', err);
      }
   }

// sdfjhLKhl349(*&)
   const postPDFToStorageFirebase = (file:any) => {
      //  mục đích của hàm này là post hình lên firebase, sau đó lấy cái đường dẫn của cái hình cập nhật vào stateUrlAvatar 
      const storageRef = projectStorage.ref(`pdf/${file.name}`); //folder avatars trên firebase storage
      
      storageRef.put(file).on('state_changed', (snap:any) => {
         // let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
         // setProgress(percentage);
      }, (err:any) => {
         // setError(err)
      }, async () => {
         const link = await storageRef.getDownloadURL();
         setStateLinkCVOnfirebase(link)
      })
      // return {progress, urlAvatar, error}
   }

   // const getData_all_ = async (data: any) => {
   //    let response: any;
   //    try {
   //       response = await collectionAPI.signUpAddCandidate(data);
   //       console.log("response: " + JSON.stringify(response, null, 4));
         
   //    }catch(err){
   //       console.log('err:', err);
   //    }
   //    onReset();
   // }
   useEffect(() => {
      // yêu cầu hàm getData_findAllViewjobskillemployercompany() chạy 1 lần mỗi khi component Home mount, để lấy dữ liệu từ backend
      getData_findAllViewjobskillemployercompany();
      getData_findAllViewReview();
      getData_all_resumeeachjob();
      getData_all_Testresult();
      getData_all_Resumedigitaleachjob();
      getData_all_ResumeTemplate();
      const obj = getUserSignIn();
      setStateUserSignIn(obj);
   }, []);

   useEffect(() => {
      // yêu cầu hàm filterDataBySkill() chạy mỗi khi stateSkillselected thay đổi giá trị, stateSkillselected lấy từ kho redux
      filterDataBySkill(stateArrJobOriginal);
   },[stateSkillselected]);

   useEffect(() => {
      if (stateView === 'favorite') {// mỗi khi click vào lựa chọn view favorite, thì sẽ gọi hàm này
         getFavorite();
      }
   }, [stateView]);
   function valuetext(value: number) {
      return `${value}°C`;
    }
    
      const [value, setValue] = React.useState<number[]>([20, 37]);
    
      const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };
   return (
      <div className={clsx(styles.component_ShowJob)}>
         <div className={clsx(styles.searchWrapper)}>
            <div className={clsx(styles.filter)}>
               <div className={clsx(styles.box)}>
                  <p>City</p>
                  <select name="from" onChange={handleCity} className={clsx(styles.selectOption)} >
                     <option value="All">All</option>
                     <option value="Ho Chi Minh">Ho Chi Minh</option>
                     <option value="Ha Noi">Ha Noi</option>
                     <option value="Da Nang">Da Nang</option>
                  </select>
               </div>
               <div className={clsx(styles.box)}>
                  <p>Level</p>
                  <select name="from" onChange={handleLevel} className={clsx(styles.selectOption)} >
                     <option value="All">All</option>
                     <option value="Internship">Internship</option>
                     <option value="Fresher">Fresher</option>
                     <option value="Junior">Junior</option>
                     <option value="Mid">Mid</option>
                     <option value="Senior">Senior</option>
                  </select>
               </div>
               <div className={clsx(styles.box)}>
                  <p>Country</p>
                  <select name="from" onChange={handleCountry} className={clsx(styles.selectOption)} >
                     <option value="All">All</option>
                     <option value="Viet Nam">Viet Nam</option>
                     <option value="International">International</option>
                  </select>
               </div>
               <div className={clsx(styles.box)}>
                  <div className={clsx(styles.sliderWrapper)}>
                     <p>$ {stateSalaryMin.toLocaleString('en-US')}</p>
                     <p>Salary Range</p>
                     <p>$ {stateSalaryMax.toLocaleString('en-US')}</p>
                  </div>
                     <Box sx={{ width: 200 }}>
                        <Slider
                        getAriaLabel={() => 'Salary range'}
                        value={stateSalary}
                        onChange={handleSalary}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        />
                     </Box>

               </div>

               <div className={clsx(styles.box)}>
                  <button onClick={filter}>Filter</button>
               </div>
            </div>
            
            <div className={clsx(styles.search)}>
               <input type="text" value={stateSearchInput} onChange={handleChangeSearch} placeholder='Search anything here...'></input>
               <button onClick={onSearch}>Search</button>
            </div>
         </div>
         <div className={clsx(styles.totalJob)}>
            <div className={clsx(styles.left)}>
               {arrtotalJob}
            </div>
            <div className={clsx(styles.right)}>
               <div className={clsx(styles.btnWrapper)}>
                  <ToggleButtonGroup
                     orientation="horizontal"
                     value={stateView}
                     exclusive
                     onChange={handleChangeView}
                     className={clsx(styles.viewSelect)}
                  >
                     {/* <ToggleButton value="CV Posted" aria-label="CV Posted">
                        <span>CV Posted</span>
                     </ToggleButton> */}
                     <ToggleButton value="favorite" aria-label="favorite">
                        <span>Favorite</span>
                     </ToggleButton>
                     <ToggleButton value="module" aria-label="module">
                        <ViewModuleIcon />
                     </ToggleButton>
                     <ToggleButton value="list" aria-label="list">
                        <ViewListIcon />
                     </ToggleButton>
                     {/* <ToggleButton value="quilt" aria-label="quilt">
                        <ViewQuiltIcon />
                     </ToggleButton> */}
                  </ToggleButtonGroup>
               </div>
            </div>
         </div>
         <hr />
         <div className={clsx(styles.main)}>
         {(() => {
            if (stateView == 'module') {
               return (
                  <div className={clsx(styles.moduleView)}>
                     {
                        stateArrJobBySearchButton.slice(stateFrom, stateTo).map((obj, index) => {
                           return ( 
                              <EachJobTypeModule 
                              key={obj.surrogateKey} 
                              surrogateKey={obj.surrogateKey}
                              idjob={obj.idjob}
                              jobtitle={obj.jobtitle}
                              companyname={obj.companyname}
                              salary={obj.salary}
                              workmode={obj.workmode}
                              city={obj.city} 
                              arrSkill={obj.skill}
                              viewJobDetails={viewJobDetails}
                              addToFavorite={addToFavorite}
                              />
                           )
                        })
                     }
                  </div>
               )
            }
            else if (stateView == 'list') {
               return (
                  <div className={clsx(styles.listView)}>
                     <div className={clsx(styles.heading)}>
                        <p>#</p>
                        <p>jobtitle</p>
                        {/* <p>skill</p> */}
                        <p>companyname</p>
                        <p>workmode</p>
                        <p>city</p>
                        <p>postdate</p>
                        <p>expiredate</p>
                        <p>salary</p>
                        <p>action</p>
                     </div>
                     {
                        stateArrJobBySearchButton.slice(stateFrom, stateTo).map((obj, index) => {
                           return ( 
                              <div className={clsx(styles.row)} key={obj.surrogateKey}>
                                 <p>{index+1}</p>
                                 <p>{obj.jobtitle}</p>
                                 {/* <p>{obj.skill}</p> */}
                                 <p>{obj.companyname}</p>
                                 <p>{obj.workmode}</p>
                                 <p>{obj.city}</p>
                                 <p>{obj.postdate}</p>
                                 <p>{obj.expiredate}</p>
                                 <p>{obj.salary}</p>
                                 <div className={clsx(styles.btnWrapper)}>
                                    <button onClick={()=>viewJobDetails(obj.idjob)}>View</button>
                                    
                                 </div>
                              </div>
                           )
                        })
                     }
                  </div>
               )
            }
            else if (stateView == 'favorite'){
               return (
                  <div className={clsx(styles.favorite)}>
                     <div className={clsx(styles.heading)}>
                        <p>#</p>
                        <p>jobtitle</p>
                        {/* <p>skill</p> */}
                        <p>companyname</p>
                        <p>workmode</p>
                        <p>city</p>
                        {/* <p>postdate</p> */}
                        <p>expiredate</p>
                        <p>salary</p>
                        <p>action</p>
                     </div>
                     {
                        stateArrFavoriteOriginal.slice(stateFrom, stateTo).map((obj, index) => {
                           return ( 
                              <div className={clsx(styles.row)} key={obj.surrogateKey}>
                                 <p>{index+1}</p>
                                 <p>{obj.jobtitle}</p>
                                 {/* <p>{obj.skill}</p> */}
                                 <p>{obj.companyname}</p>
                                 <p>{obj.workmode}</p>
                                 <p>{obj.city}</p>
                                 {/* <p>{obj.postdate}</p> */}
                                 <p>{obj.expiredate}</p>
                                 <p>{obj.salary}</p>
                                 <div className={clsx(styles.btnWrapper)}>
                                    <button onClick={()=>viewJobDetailsFavorite(obj.idjob)} className={clsx(styles.view)}>View</button>
                                    <button onClick={()=>removeJobFromFavorite(obj.idfavorite)} className={clsx(styles.remove)}>remove</button>
                                 </div>
                              </div>
                           )
                        })
                     }
                  </div>
               )
            }
            // else if (stateView == 'CV Posted'){
            //    return (
            //       <div className={clsx(styles.favorite)}>
            //          <div className={clsx(styles.heading)}>
            //             <p>#</p>
            //             <p>jobtitle</p>
            //             {/* <p>skill</p> */}
            //             <p>companyname</p>
            //             <p>workmode</p>
            //             <p>city</p>
            //             {/* <p>postdate</p> */}
            //             <p>expiredate</p>
            //             <p>salary</p>
            //             <p>action</p>
            //          </div>
            //          {
            //             stateArrFavoriteOriginal.slice(stateFrom, stateTo).map((obj, index) => {
            //                return ( 
            //                   <div className={clsx(styles.row)} key={obj.surrogateKey}>
            //                      <p>{index+1}</p>
            //                      <p>{obj.jobtitle}</p>
            //                      {/* <p>{obj.skill}</p> */}
            //                      <p>{obj.companyname}</p>
            //                      <p>{obj.workmode}</p>
            //                      <p>{obj.city}</p>
            //                      {/* <p>{obj.postdate}</p> */}
            //                      <p>{obj.expiredate}</p>
            //                      <p>{obj.salary}</p>
            //                      <div className={clsx(styles.btnWrapper)}>
            //                         <button onClick={()=>viewJobDetailsFavorite(obj.idjob)} className={clsx(styles.view)}>View</button>
            //                         <button onClick={()=>removeJobFromFavorite(obj.idfavorite)} className={clsx(styles.remove)}>remove</button>
            //                      </div>
            //                   </div>
            //                )
            //             })
            //          }
            //       </div>
            //    )
            // }
         })()}
         
         </div>
         <div className={clsx(styles.paginationWrapper)}>
            <div className={clsx(styles.row)}>
               <label>Jobs per page: </label>
               <input type="text" name="stateItemsPerPage" value={stateItemsPerPage} onChange={handleItemsPerPage}
               />
            </div>
            <Stack spacing={2}>
               <Pagination count={50} color="primary" onChange={handlePagination} />
            </Stack>
         </div>
         {/* <div className={clsx(styles.backShadow,{[styles.appear]: stateIsViewDetailsAppear})} onClick={onCancelViewDetails}> */}
         <div className={clsx(styles.backShadow,{[styles.appear]: stateIsViewDetailsAppear})}>
         </div>
         <div className={clsx(styles.viewDetailsDialog, {[styles.appear]: stateIsViewDetailsAppear})}>
            <h1>JOB DETAILS</h1>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>address:</p><p className={clsx(styles.value)}>{stateJobclicked.address}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>city:</p><p className={clsx(styles.value)}>{stateJobclicked.city}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>companyname:</p><p className={clsx(styles.value)}>{stateJobclicked.companyname}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>country:</p><p className={clsx(styles.value)}>{stateJobclicked.country}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>expiredate:</p><p className={clsx(styles.value)}>{stateJobclicked.expiredate}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>field:</p><p className={clsx(styles.value)}>{stateJobclicked.field}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>jobtitle:</p><p className={clsx(styles.value)}>{stateJobclicked.jobtitle}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>level:</p><p className={clsx(styles.value)}>{stateJobclicked.level}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>overtime:</p><p className={clsx(styles.value)}>{stateJobclicked.overtime}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>postdate:</p><p className={clsx(styles.value)}>{stateJobclicked.postdate}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>salary:</p><p className={clsx(styles.value)}>$ {stateJobclicked.salary}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>size:</p><p className={clsx(styles.value)}>{stateJobclicked.size} persons</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>skill:</p><p className={clsx(styles.value)}>
               {stateJobclicked.skill}
            </p>
            </div>
            <div className={clsx(styles.btnWrapper)}>
               <button onClick={onSubmitCV} className={clsx(styles.submit)}>Submit CV</button>
               <button onClick={onCancelViewDetails} className={clsx(styles.cancel)}>Cancel</button>
            </div>
         </div>
         <div className={clsx(styles.viewCompanyDialog, {[styles.appear]: stateIsViewDetailsAppear})}>
            <h1>COMPANY DETAILS</h1>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>city:</p><p className={clsx(styles.value)}>{stateJobclicked.city}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>companyname:</p><p className={clsx(styles.value)}>{stateJobclicked.companyname}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>country:</p><p className={clsx(styles.value)}>{stateJobclicked.country}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>overtime:</p><p className={clsx(styles.value)}>{stateJobclicked.overtime}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>size:</p><p className={clsx(styles.value)}>{stateJobclicked.size} persons</p>
            </div>



         </div>

         <div className={clsx(styles.commentsWrapper, {[styles.appear]: stateIsViewDetailsAppear})}>
            <h1>COMMENTS</h1>
            {
               stateArrAllReviewOfACompany.map((obj, index) => {
                  if (obj.idcandidate != 0 && obj.status == "enable") {
                     return ( 
                        <div key={obj.id} className={clsx(styles.reviewBoxLeft)}>
                           <div className={clsx(styles.left)}>
                              {/* <img src="./assets/picture/avatarvu.jpg" className="avatar" alt="avatar" /> */}
                              {/* <img className={clsx(styles.logo)} src="../assets/logo/logo.png" alt="logo" /> */}

                              <img src={obj.candidateurl} alt="" className={clsx(styles.avatar)}/>
                           </div>
                           <div className={clsx(styles.right)}>
                              <p className={clsx(styles.name)}>{obj.candidatename}</p>
                              <p className={clsx(styles.content)}>
                                 {obj.content}
                              </p>
                              <div className={clsx(styles.row)}>
                                 <p className={clsx(styles.time)}>{obj.postdate}</p>
                                 <div className={clsx(styles.btnwrapper)}>
                                    <DeleteOutlineIcon className={clsx(styles.delete)}></DeleteOutlineIcon>
                                    <BorderColorIcon className={clsx(styles.edit)}></BorderColorIcon>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )
                  } else if (obj.idcandidate == 0 && obj.status == "enable" ) {
                     let url = (obj.controllerurl == null) ? obj.employerurl : obj.controllerurl;
                     let name = (obj.controllername == null) ? obj.employername : obj.controllername;

                     return ( 
                        <div key={obj.id} className={clsx(styles.reviewBoxRight)}>
                           <div className={clsx(styles.left)}>
                              <p className={clsx(styles.name)}>{name}</p>
                              <p className={clsx(styles.content)}>
                                 {obj.content}
                              </p>
                              <div className={clsx(styles.row)}>
                                 <div className={clsx(styles.btnwrapper)}>
                                    <DeleteOutlineIcon className={clsx(styles.delete)}></DeleteOutlineIcon>
                                    <BorderColorIcon className={clsx(styles.edit)}></BorderColorIcon>
                                 </div>
                                 <p className={clsx(styles.time)}>{obj.postdate}</p>
                              </div>
                           </div>
                           <div className={clsx(styles.right)}>
                              <img src={url} alt="" className={clsx(styles.avatar)}/>

                           </div>
                        </div>
                     )
                  }
               })
            }
            <div className={clsx(styles.clearFloat)}>                   
            </div>
            <div className={clsx(styles.inputWrapper)}>
               <input type="text" name="stateComment" 
               defaultValue={stateComment} 
               onChange={handleChangeInputComment} 
               placeholder='Please enter your comment here...'
               onKeyDown={handleKeyDownInputComment}
               />
               <button onClick={onSendCommentToServer}>Send</button>
            </div>
         </div>
         {/* <div className={clsx(styles.backShadowSubmitCV,{[styles.appear]: stateIsOpenDialogSubmitCV})} onClick={onCancelSubmitCV}> */}
         <div className={clsx(styles.backShadowSubmitCV,{[styles.appear]: stateIsOpenDialogSubmitCV})}>
         </div>
         <div className={clsx(styles.dialogSubmitCVpdf, {[styles.appear]: stateIsOpenDialogSubmitCV})}>
            <h1>SUBMIT CV BY PDF</h1>

            <div className={clsx(styles.row)}>

               <label>Upload your CV for this job: </label>

               <input type="file" name="cvFile" onChange={handleChangeUploadCV} />
               {/* <FileUploader handleChange={handleChangeUploadCV} name="stateFile" types={fileTypes} /> */}
            </div>
            {
               stateBoolErrorUploadCV &&
               <p style={{ color: 'red' }}>Not yet choose file</p>
            }
            {stateErrorUpload == "error" && 
               <div className={clsx(styles.row, styles.error)}>
                  <label></label>
                  <span className={clsx(styles.right)}>
                     <span style={{ color: 'red' }}>CV must be in pdf format</span>
                  </span>
               </div>
            }
            <div className={clsx(styles.btnWrapper)}>
               {
                  stateBoolAlreadySubmited == false &&
                  <button onClick={onUploadCV} className={clsx(styles.submit)}>Submit PDF</button>
               }
               <button onClick={onCancelSubmitCV} className={clsx(styles.cancel)}>Cancel</button>
            </div>
         </div>
         <div className={clsx(styles.backShadowViewCV,{[styles.appear]: stateBoolBackShadowViewCV})} onClick={clearShadowViewCV}>
         </div>
         <div className={clsx(styles.dialogSubmitCVdigital, {[styles.appear]: stateIsOpenDialogSubmitCV})}>
            <h1>SUBMIT CV BY DATA</h1>
            <p className={clsx(styles.note)}> <b>* Note:</b> Please submit your CV by data of resume template that you have created. 
            By this way, your CV will be scanned and and viewed by employer easily. 
            This will help to improve your change of success.
            you can only submit only one digital resume.
            
            </p>
            <div className={clsx(styles.heading)}>
               <p>#</p>
               <p>companyapply</p>
               <p>fullname</p>
               <p>email</p>
               <p>action</p>
            </div>
            {
               stateArrResumeTemplateOfCurrentUser.map((obj, index) => {
                  return (
                     <div className={clsx(styles.row)} key={obj.idresume}>
                        <p>{index+1}</p>
                        <p>{obj.companyapply}</p>
                        <p>{obj.fullname}</p>
                        <p>{obj.email}</p>
                        <div className={clsx(styles.btnWrapper)}>
                           <button onClick={()=>viewResumeDigitalDetails(obj.idresume)} className={clsx(styles.view)}>View</button>
                           {
                              stateBoolAlreadySubmitDigitalCV == false &&
                              <button onClick={()=>submitDigitalCVForThisJob(obj.idresume)} className={clsx(styles.submit)}>Submit digital</button>
                           }
                        </div>
                     </div>
                  )
               })
            }
         </div>
         <div className={clsx(styles.dialogTest, {[styles.appear]: stateIsOpenDialogSubmitCV})}>
            <h1>DO THE TEST</h1>
            <p className={clsx(styles.note)}><b>* Note:</b> Please kindly do the test, this test contains 15 basic questions. 
            The result of this test will be sent to employer for their review. 
            The better the result the better chance of success.
            Once you complete the test, you can not redo it again with this job
            </p>
            {
               stateBoolAlreadyTested == false ?
               <button onClick={doTheTest} className={clsx(styles.test)}>do the test</button>
               :
               <button className={clsx(styles.tested)}>Already did the test</button>
            }
         </div>
         {
            stateBoolDialogViewDigitalResume &&

            <div className={clsx(styles.outerContainerViewPostedPRINT, {[styles.appear]: stateBoolDialogViewDigitalResume})}>
               <div className={clsx(styles.innerContainer)}>
                  <div className={clsx(styles.leftRight)}>
                     <div className={clsx(styles.left)}>
                        <div className={clsx(styles.avatarWrapper)}>
                              <img src={stateObjCV.urlavatar} className="avatar" alt="avatar" />
                        </div>
                        <div className={clsx(styles.contactWrapper)}>
                              <h1>General info</h1>
                              <p className={clsx(styles.key)}>Name</p>
                              <p className={clsx(styles.value)}>{stateObjCV.fullname}</p>
                              <p className={clsx(styles.key)}>Address</p>
                              <p className={clsx(styles.value)}>{stateObjCV.address}</p>
                              <p className={clsx(styles.key)}>Phone</p>
                              <p className={clsx(styles.value)}>{stateObjCV.phone}</p>
                              <p className={clsx(styles.key)}>Email</p>
                              <p className={clsx(styles.value)}>{stateObjCV.email}</p>
                              <p className={clsx(styles.key)}>Birth</p>
                              <p className={clsx(styles.value)}>{stateObjCV.dob}</p>
                              <p className={clsx(styles.key)}>Language</p>
                              <p className={clsx(styles.value)}>{stateObjCV.language}</p>
                        </div>
                     </div>
                     <div className={clsx(styles.right)}>
                        <div className={clsx(styles.jobapply)}>
                              <h1 className={clsx(styles.title)}>Apply</h1>
                              <p className={clsx(styles.key)}>Position</p>
                              <p className={clsx(styles.value)}>{stateObjCV.jobapply}</p>
                              <p className={clsx(styles.key)}>Company</p>
                              <p className={clsx(styles.value)}>{stateObjCV.companyapply}</p>
                        </div>
                        <div className={clsx(styles.summaryWrapper)}>
                              <h1 className={clsx(styles.title)}>Summary</h1>
                              <p className={clsx(styles.value)}>{stateObjCV.summary}</p>
                        </div>
                        <div className={clsx(styles.education)}>
                              <h1 className={clsx(styles.title)}>Skill </h1>
                              <div className={clsx(styles.skillwrapper)}>
                                 <div className={clsx(styles.col)}>
                                    <p  className={clsx(styles.key)}>Skill</p>
                                    {
                                          stateArrSkill1.map((obj, index) => {
                                             return ( 
                                                <p key={index} className={clsx(styles.value)}>{obj}</p>
                                             )
                                          })
                                    }
                                 </div>
                                 <div className={clsx(styles.col, styles.middle)}>
                                    <p  className={clsx(styles.key)}>Skill</p>
                                    {
                                          stateArrSkill2.map((obj, index) => {
                                             return ( 
                                                <p key={index} className={clsx(styles.value)}>{obj}</p>
                                             )
                                          })
                                    }
                                 </div>
                                 <div className={clsx(styles.col)}>
                                 <p  className={clsx(styles.key)}>Skill</p>
                                    {
                                          stateArrSkill3.map((obj, index) => {
                                             return ( 
                                                <p key={index} className={clsx(styles.value)}>{obj}</p>
                                             )
                                          })
                                    }
                                 </div>
                              </div>
                              <h1 className={clsx(styles.title)}>Education </h1>
                              <div className={clsx(styles.row)}>
                                 <p className={clsx(styles.key)}>University/College</p>
                                 <p className={clsx(styles.value)}>{stateObjCV.education1}</p>
                              </div>
                              <div className={clsx(styles.row)}>
                                 <p className={clsx(styles.key)}>Achievement</p>
                                 <p className={clsx(styles.value)}>{stateObjCV.achievement}</p>
                              </div>
                              <h1 className={clsx(styles.title)}>Certification </h1>
                              <ol>
                                 <li>{stateObjCV.certificate1}</li>
                                 <li>{stateObjCV.certificate2}</li>
                                 <li>{stateObjCV.certificate3}</li>
                              </ol>
                        </div>
                     </div>
                  </div>
                  <div className={clsx(styles.experiencesWrapper)}>
                              
                     <h1 className={clsx(styles.title)}>Experiences</h1>
                     <div className={clsx(styles.row)}>
                     <div className={clsx(styles.left)}>
                              <p className={clsx(styles.key)}>Position</p>
                              <p className={clsx(styles.value)}>{stateObjCV.position1}</p>
                              <p className={clsx(styles.key)}>Duration</p>
                              <p className={clsx(styles.value)}>{stateObjCV.duration1}</p>
                              <p className={clsx(styles.key)}>Comany name</p>
                              <p className={clsx(styles.value)}>{stateObjCV.companyname1}</p>
                        </div>
                        <div className={clsx(styles.right)}>
                              <p className={clsx(styles.key)}>Describe</p>
                              <ul>
                                 <li>{stateObjCV.describeyourwork1}</li>
                                 <li>{stateObjCV.describeyourwork1}</li>
                                 <li>{stateObjCV.describeyourwork1}</li>
                                 <li>{stateObjCV.describeyourwork1}</li>
                              </ul>
                        </div>
                     </div>
                     <h1 className={clsx(styles.title)}>&nbsp;</h1>
                     <div className={clsx(styles.row)}>
                        <div className={clsx(styles.left, styles.lastLeft)}>
                              <p className={clsx(styles.key)}>Position</p>
                              <p className={clsx(styles.value)}>{stateObjCV.position2}</p>
                              <p className={clsx(styles.key)}>Duration</p>
                              <p className={clsx(styles.value)}>{stateObjCV.duration2}</p>
                              <p className={clsx(styles.key)}>Comany name</p>
                              <p className={clsx(styles.value)}>{stateObjCV.companyname2}</p>
                        </div>
                        <div className={clsx(styles.right)}>
                              <p className={clsx(styles.key)}>Describe</p>
                              <ul>
                                 <li>{stateObjCV.describeyourwork1}</li>
                                 <li>{stateObjCV.describeyourwork1}</li>
                                 <li>{stateObjCV.describeyourwork1}</li>
                                 <li>{stateObjCV.describeyourwork1}</li>
                              </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         }
      </div>
   )
}
export default ShowJob
