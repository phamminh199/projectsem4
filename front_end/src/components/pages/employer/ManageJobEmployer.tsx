import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from '../../pages/main.module.scss'     
import { useSelector, useDispatch} from 'react-redux';
import collectionAPI from '../../../API/collectionAPI';


import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import { validatePassword,getUserSignIn, validateEmail,validatePhone,validateFullName, wait, hashPassword, getSession } from '../../share/sharedFunction';
import { projectStorage } from '../../share/firebase';

//  export to pdf
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// import excel
import { read, utils } from 'xlsx';


type stateObj = { // đặt ngoài function
   [key: string]: any;
};
// type propType = {
//    stateUserSignIn: any;
// }

function ManageJobEmployer() {
   // const {stateUserSignIn} = props;
   const [stateArrAll, setStateArrAll] = useState<any[]>([])
   const [stateArrAllFinal, setStateArrAllFinal] = useState<any[]>([])
   const [stateArrPending, setStateArrPending] = useState<any[]>([])
   const [stateArrPendingFinal, setStateArrPendingFinal] = useState<any[]>([])
   const [stateArrApprove, setStateArrApprove] = useState<any[]>([])
   const [stateArrApproveFinal, setStateArrApproveFinal] = useState<any[]>([])
   const [stateArrComplete, setStateArrComplete] = useState<any[]>([])
   const [stateArrCompleteFinal, setStateArrCompleteFinal] = useState<any[]>([])
   const [stateBackShadow, setStateBackShadow] = useState(false);
   // -------------------------------------------------------add new controller start

const [stateSearchInput, setStateSearchInput] = useState<string>('');

const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
         
   setStateSearchInput(event.target.value);
   let input = event.target.value;
         console.log('input: ', input);
   const arr = [];
   for (const obj of stateArrAll) {
      if (
         obj.jobtitle.toLowerCase().includes(input.toLowerCase()) 
         ||
         obj.level.toLowerCase().includes(input.toLowerCase()) 
         ||
         obj.skill.toLowerCase().includes(input.toLowerCase()) 
         ||
         obj.companyname.toLowerCase().includes(input.toLowerCase()) 
         ||
         obj.city.toLowerCase().includes(input.toLowerCase()) 
         ||
         obj.address.toLowerCase().includes(input.toLowerCase()) 
         ||
         obj.workmode.toLowerCase().includes(input.toLowerCase()) 
      ) {
         arr.push(obj);
      }
   }

   let arrPending: any[] = [];
   let arrApprove: any[] = [];
   let arrExpired: any[] = [];
   let arrComplete: any[] = [];
   arr.forEach((obj: any) => {
      
      if (obj.status === "pending"){
         arrPending.push(obj);
      }
      else if(obj.status === "approved"){
         arrApprove.push(obj);
      }
      else if(obj.status === "complete"){
         arrComplete.push(obj);
      }
   });

   setStateArrAllFinal(arr);
   setStateArrPendingFinal(arrPending);
   setStateArrApproveFinal(arrApprove);
   setStateArrCompleteFinal(arrComplete);
}
// -------------------------------------------------------search end
// -------------------------------------------------------sort start
const [stateSortIcon, setStateSortIcon] = useState("az"); // boolean
const onSortJobtitle = (type:string) => {
   let arr = stateArrAll;

   if(type == 'az'){
      setStateSortIcon('za');
      arr.sort((a, b) => a.jobtitle.localeCompare(b.fullname));
   }
   else if(type == 'za'){
      setStateSortIcon('az');
      arr.sort((a, b) => b.jobtitle.localeCompare(a.fullname));
   }
   let arrPending: any[] = [];
   let arrApprove: any[] = [];
   let arrComplete: any[] = [];
   arr.forEach((obj: any) => {
      
      if (obj.status === "pending"){
         arrPending.push(obj);
      }
      else if(obj.status === "approved"){
         arrApprove.push(obj);
      }
      else if(obj.status === "complete"){
         arrComplete.push(obj);
      }
   });
   setStateArrAllFinal(arr);
   setStateArrPendingFinal(arrPending);
   setStateArrApproveFinal(arrApprove);
   setStateArrCompleteFinal(arrComplete);
}
// -------------------------------------------------------sort end
   const onClearBackShadow = () => {
      setStateBackShadow(false);
      setStateIsViewDetailsAppear(false);
      setStateViewDialogSwitchStatus(false);

   }

   // const [stateNumberAll, setStateNumberAll] = useState(0); 
   // const [stateNumberPending, setStateNumberPending] = useState(0); 
   // const [stateNumberApprove, setStateNumberApprove] = useState(0); 
   // const [stateNumberComplete, setStateNumberComplete] = useState(0); 
   const splitData = (arr: any) => {
      // bỏ những idjob trùng đứng sau đi, do 1 job có nhiều skill, mình chỉ lấy job riêng biệt để hiện ra thôi
      
      const userSignIn = getUserSignIn(); //phải lấy user sign in trực tiếp ở đây, vì lấy thông qua state nó trễ nhịp
      console.log('userSignIn.idcompany: ', userSignIn.idcompany);
      const arrJobOfThisCompany = arr.filter((item:any) => item.idcompany === userSignIn.idcompany);//tìm thấy sẽ trả ra mảng chứa object được tìm thấy, có thể tìm thấy nhiều object thoả điều kiện, còn ko nó sẽ trả ra -1

      // console.log('arrJobOfThisCompany: ', arrJobOfThisCompany);
      let arrUniqueIdjob:any = [];
      for (let i = 0; i < arrJobOfThisCompany.length; i++){
         let flag = false;

         for (let j = 0; j < arrUniqueIdjob.length; j++){
         
            if(arrJobOfThisCompany[i].idjob == arrUniqueIdjob[j].idjob){
               flag = true
               break;
            }
         }  
         if(flag == false){
            arrUniqueIdjob.push(arrJobOfThisCompany[i])
         }
      }  
      console.log('arrUniqueIdjob: ', arrUniqueIdjob);
      // hàm này dùng để phân rã arr thành các arr có cùng status
      let arrPending: any[] = [];
      let arrApprove: any[] = [];
      let arrComplete: any[] = [];
      arrUniqueIdjob.forEach((obj: any) => {
         
         if (obj.status === "pending"){
            arrPending.push(obj);
         }
         else if(obj.status === "approved"){
            arrApprove.push(obj);
         }
         else if(obj.status === "complete"){
            arrComplete.push(obj);
         }
      });
      setStateArrAll(arrUniqueIdjob);
      setStateArrAllFinal(arrUniqueIdjob);
      setStateArrPending(arrPending);
      setStateArrPendingFinal(arrPending);
      setStateArrApprove(arrApprove);
      setStateArrApproveFinal(arrApprove);
      setStateArrComplete(arrComplete);
      setStateArrCompleteFinal(arrComplete);

      // setStateNumberAll(arrUniqueIdjob.length)
      // setStateNumberPending(arrPending.length);
      // setStateNumberApprove(arrApprove.length);
      // setStateNumberComplete(arrComplete.length);
      }

   const getData = async () => {
      try {
         const response: any = await collectionAPI.findAllViewjobskillemployercompany(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
         splitData(response.data);
      }catch(err){
         console.log('err:', err);
      }
   }

   const switchStatus = async (idjob: number, status:string) => {
      const obj = stateArrAllFinal.find((item) => item.idjob === idjob);
      let response: any;
   
      const data = 
      {
         idjob: obj.idjob,
         postdate: obj.postdate,
         address: obj.address,
         city: obj.city,
         workmode: obj.workmode,
         expiredate: obj.expiredate,
         salary: obj.salary,
         status: status,
         level: obj.level,
         jobtitle: obj.jobtitle
      };

      try {
         response = await collectionAPI.editJob(data);
         // console.log("response: " + JSON.stringify(response.data, null, 4));
         splitData(response.data);
      }catch(err){
         console.log('err:', err);
      }
   }

   const switchStatusAll = async (view:string,status:string) => {

      if (view == "viewPending" && status == "approve all"){
         for (let i = 0; i < stateArrPendingFinal.length; i++){
            switchStatus(stateArrPendingFinal[i].idjob,'complete');
            await wait(300);
         }
      }
   }

   const [stateObjClicked, setStateObjClicked] = useState<stateObj>({}); // chứa data của job được click vào
   const [stateIsViewDetailsAppear, setStateIsViewDetailsAppear] = useState(false);
   const onView = (idjob: number) => {
      setStateIsViewDetailsAppear(true);
      setStateBackShadow(true);
      // console.log("idjob: " + idjob);
      // console.log(stateArrAll);
      const obj = stateArrAll.find((item) => item.idjob === idjob); //lấy một object đầu tiên được tìm thấy mà thoả điều kiện
      // console.log(obj);
      setStateObjClicked(obj)
   }

   type stateObj = {
      [key: string]: any;
   };
   const [stateUserSignIn, setStateUserSignIn] = useState<stateObj>({})
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

   // input type checkbox ---------------------------------------------------start
     // State to store the checked status of each checkbox
   const [checkedItems, setCheckedItems] = useState<stateObj>({})

   const handleCheckboxChange = (event:any) => {
      const idjob = event.target.value;
      setCheckedItems((prevState:any) => ({
      ...prevState,
      [idjob]: !prevState[idjob],
      }));
   };

   const [stateDialogSwitchStatusAppear, setStateDialogSwitchStatusAppear] = useState(false); // boolean
   const switchStatusSelected = async (status:string) => {
      
      setStateDialogSwitchStatusAppear(!stateDialogSwitchStatusAppear); // 
      const arrchecked = stateArrAllFinal.filter(item => checkedItems[item.idjob]).map(item => item.idjob);
      console.log('arrchecked: ', arrchecked);
      for (let i = 0; i < arrchecked.length; i++){
         switchStatus(arrchecked[i],status);
         await wait(300);
      }
      setCheckedItems({}); // uncheck hết các item checked
   
   }
   // input type checkbox ---------------------------------------------------end

   // import excel start -----------------------------------------------------start
   function areAllElementsUnique(arr:any) {
      return new Set(arr).size === arr.length; // hàm kiểm tra các phần tử có trùng nhau ko
   }
   const [stateErrorAppear, setStateErrorAppear] = useState(false);
   const [stateExcelFile, setStateExcelFile] = useState(null);
   const [stateArrIdjob, setStateArrIdjob] = useState<any[]>([]);
   const [stateStatusInput, setStateStatusInput] = useState("");
   const [stateTextIdjob, setStateTextIdjob] = useState("");
   const handleExcelFileUpload = (event:any) => {
      if(event.target.files[0] == null || event.target.files[0] == undefined || event.target.files[0] == ""){
         return;
      }
      const file = event.target.files[0];


          // Check file type
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
         console.log('Invalid file type. Please select an XLSX file.');
         return;
      }


      // Check file size
      const maxSize = 20480; // 20KB in bytes
      if (file.size > maxSize) {
            console.log('File size exceeds the limit of 20KB.');
            setStateExcelFile(null);
            return;
         }
      setStateExcelFile(file);
      const reader = new FileReader();

      reader.onload = (e) => {
         const data = new Uint8Array(e.target?.result as ArrayBuffer);
         const workbook = read(data, { type: 'array' });

         // Assuming the first sheet is the one you want to read
         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
         const jsonData:any = utils.sheet_to_json(worksheet, { header: 1 });

         // Process the data as needed
         // console.log(jsonData.length);
         // console.log('jsonData: ' + JSON.stringify(jsonData, null, 4));
            // Validate row count
         if (jsonData.length > 1) {
            alert("File contains more than 1 rows.");
            return;
         }

         // console.log('action: ', jsonData[0][0]);
         let arrStatus = ["pending","approved","complete","paid"]
         let statusInput = jsonData[0][0];
         if (!arrStatus.includes(statusInput)) {
            alert("cell A1 must be pending or approved or complete");
            return;
         } 
         setStateStatusInput(statusInput);
         
         let arr:any = [];
         let text = ""

         // lấy từ A2 tức i = 1, A1 là ô ghi status rồi
         for (let i = 1; i < jsonData[0].length; i++){
            let n = jsonData[0][i];
            arr.push(n);
            text += n + ","
            if(i == 10){
               break;
            }
         }  
         let modifiedText = text.slice(0, -1); //  bỏ dấu , ở cuối
         setStateTextIdjob(modifiedText)
         const areElementsUnique = areAllElementsUnique(jsonData[0]); // kiểm tra các phần tử có trùng nhau ko 
         if(areElementsUnique == false){
            alert("All idjob must be different");
            return;
         }
         setStateArrIdjob(arr);
         setStateBackShadow(true);
         setStateViewDialogSwitchStatus(true);

      };

   reader.readAsArrayBuffer(file);
   };

   const [stateViewDialogSwitchStatus, setStateViewDialogSwitchStatus] = useState(false);

   const proceedSwitchStatus = async () => {
   
      onClearBackShadow();
      for (let i = 0; i < stateArrIdjob.length; i++){
         switchStatus(stateArrIdjob[i],stateStatusInput);
         await wait(300);
      }
      alert(`Succesfull update all of your input idjob: ${stateTextIdjob} to ${stateStatusInput}`);
   }

   // import excel -----------------------------------------------------end
   return (
      <div className={clsx(styles.component_ManageJobEmployer)}>
         <div className={clsx(styles.main)}>
                  
            <div className={clsx(styles.headerWrapper)}>
               <h1>MANAGE JOB</h1>
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
                        <span className={clsx(styles.kind)}>all</span>
                     </ToggleButton>
                     <ToggleButton value="pending" aria-label="pending">
                        <span className={clsx(styles.kind)}>pending</span>
                     </ToggleButton>
                     <ToggleButton value="approved" aria-label="approved">
                        <span className={clsx(styles.kind)}>approve</span>
                     </ToggleButton>
                     <ToggleButton value="complete" aria-label="complete">
                        <span className={clsx(styles.kind)}>complete</span>
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
                                       <img src="../assets/picture/az.png" className={clsx(styles.icon)} alt="avatar" onClick={()=>onSortJobtitle('az')}/>
                                    </>
                                 )
                              }
                              else if (stateSortIcon == 'za') {
                                 return (
                                    <>
                                       <img src="../assets/picture/za.png" className={clsx(styles.icon)} alt="avatar" onClick={()=>onSortJobtitle('za')}/>
                                    </>
                                 )
                              }
                           })()}
                        </Button>
                        <Button className={clsx(styles.button)}>
                           <Tooltip title="Download PDF" placement="top" arrow>
                              <img src="../assets/picture/download.png" className={clsx(styles.icon)} alt="download" onClick={downloadPDF}/>
                           </Tooltip>
                        </Button>
                        <Button className={clsx(styles.button)}>
                           {/* <Tooltip title="Upload excel file to change status" placement="top" arrow> */}
                              <img src="../assets/picture/excel.png" className={clsx(styles.icon)} alt="download"/>
                              <input type="file" name="stateExcelFile" accept=".xlsx, .xls" onChange={handleExcelFileUpload} className={clsx(styles.customInput)}/>

                           {/* </Tooltip> */}
                        </Button>
                        {/* <Button>Three</Button> */}
                     </ButtonGroup>

                  </Box>
                  {/* <AddIcon fontSize='large' className={clsx(styles.right)} onClick={()=>onAdd()}/> */}
               </div>
            </div>
            <div className={clsx(styles.container)} >
               {(() => {
                  if (stateView === "all") {
                     return (
                        <>
                           <div className={clsx(styles.printPDF)} id="pdfAll">
                              <div className={clsx(styles.heading, styles.heading_all)}>
                                 <p>jobtitle</p>
                                 <p>level</p>
                                 <p>postdate</p>
                                 <p>salary</p>
                                 <p>status</p>
                                 <p>Action</p>
                              </div>   
                              <div className={clsx(styles.viewWrapper)}>
                                 {
                                    stateArrAllFinal.slice(stateFrom, stateTo).map((obj, index) => {
                                       return ( 
                                          <div className={clsx(styles.row_all)} key={obj.idjob}>
                                             <p className={clsx(styles.title)}>{obj.jobtitle}</p>
                                             <p>{obj.level}</p>
                                             <p>{obj.postdate}</p>
                                             <p>{obj.salary}</p>
                                             {
                                                obj.status === "pending" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                             }
                                             <div className={clsx(styles.action_all)}>
                                                <button onClick={()=>onView(obj.idjob)} className={clsx(styles.view)}>View</button>
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
                  else if (stateView === "pending") {
                     return (
                        <>
                           <div className={clsx(styles.printPDF)} id="pdfPending">
                              <div className={clsx(styles.heading_pending)}>
                                 <p>jobtitle</p>
                                 <p>level</p>
                                 {/* <p>postdate</p> */}
                                 <p>salary</p>
                                 <p>status</p>
                                 <div className={clsx(styles.action)}>
                                    <div className={clsx(styles.btn)}>
                                       <button onClick={()=>switchStatusAll("viewPending","approve all")} className={clsx(styles.approved)}>approve all</button>
                                    </div>
                                    {/* <div className={clsx(styles.btn)}>
                                       <button onClick={()=>switchStatusAll("viewPending","pending all")} className={clsx(styles.approved)}>pending all</button>
                                    </div> */}
                                    <div className={clsx(styles.switchStatusWrapper)}>
                                       <button onClick={()=>setStateDialogSwitchStatusAppear(!stateDialogSwitchStatusAppear)} className={clsx(styles.switch)}>Switch status selected</button>
                                       <div className={clsx(styles.dialogSwitchStatus, {[styles.appear]: stateDialogSwitchStatusAppear})}>
                                          <p className={clsx(styles.item)} onClick={()=>switchStatusSelected('pending')}>pending</p>
                                          <p className={clsx(styles.item)} onClick={()=>switchStatusSelected('approve')}>approve</p>
                                          <p className={clsx(styles.item)} onClick={()=>switchStatusSelected('complete')}>complete</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>   

                              <div className={clsx(styles.viewWrapper)}>
                                 {
                                    stateArrPendingFinal.slice(stateFrom, stateTo).map((obj, index) => {
                                       return ( 
                                             <div className={clsx(styles.row_pending)} key={obj.idjob}>
                                                <p className={clsx(styles.title)}>{obj.jobtitle}</p>
                                                <p>{obj.level}</p>
                                                {/* <p>{obj.postdate}</p> */}
                                                <p>{obj.salary}</p>
                                                {
                                                   obj.status === "pending" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                                }
                                                <div className={clsx(styles.action_pending)}>
                                                   {/* {(() => {
                                                      if (obj.status === "pending") {
                                                         return (
                                                            <div className={clsx(styles.btn)}>
                                                               <button onClick={()=>switchStatus(obj.idjob,"approved")} className={clsx(styles.approved)}>approved</button>
                                                            </div>
                                                         )
                                                      } 
                                                      else if (obj.status === "approved") {
                                                         return (
                                                            <div className={clsx(styles.btn)}>
                                                               <button onClick={()=>switchStatus(obj.idjob,'pending')} className={clsx(styles.pending)}>pending</button>
                                                            </div>
                                                         )
                                                      }
                                                   })()} */}
                                                   <div className={clsx(styles.btn)}>
                                                      <button onClick={()=>onView(obj.idjob)} className={clsx(styles.view)}>view</button>
                                                   </div>
                                                   <div className={clsx(styles.checkbox)}>
                                                      <input
                                                         type="checkbox"
                                                         value={obj.idjob}
                                                         checked={checkedItems[obj.idjob] || false}
                                                         onChange={handleCheckboxChange}
                                                      />
                                                   </div>
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
                  else if (stateView === "approved") {
                     return (
                        <>
                           <div className={clsx(styles.printPDF)} id="pdfApprove">
                              <div className={clsx(styles.heading,styles.heading_approved)}>
                                 <p>jobtitle</p>
                                 <p>postdate</p>
                                 <p>salary</p>
                                 <p>status</p>
                                 <div className={clsx(styles.action)}>
                                    {/* <div className={clsx(styles.btn)}>
                                       <button onClick={()=>switchStatusAll("viewApproved","pending all")} className={clsx(styles.approved)}>Pending all</button>
                                    </div> */}
                                    <div className={clsx(styles.btn)}>
                                       view
                                       {/* <button onClick={()=>switchStatusAll("viewApproved","approve all")} className={clsx(styles.approved)}>Approve all</button> */}
                                    </div>
                                    {/* <div className={clsx(styles.btn)}>
                                       <button onClick={()=>switchStatusAll("viewApproved","complete all")} className={clsx(styles.approved)}>Complete all</button>
                                    </div> */}
                                    <div className={clsx(styles.switchStatusWrapper)}>
                                       <button onClick={()=>setStateDialogSwitchStatusAppear(!stateDialogSwitchStatusAppear)} className={clsx(styles.switch)}>Switch status selected</button>
                                       <div className={clsx(styles.dialogSwitchStatus, {[styles.appear]: stateDialogSwitchStatusAppear})}>
                                          <p className={clsx(styles.item)} onClick={()=>switchStatusSelected('pending')}>pending</p>
                                          <p className={clsx(styles.item)} onClick={()=>switchStatusSelected('approve')}>approve</p>
                                          <p className={clsx(styles.item)} onClick={()=>switchStatusSelected('complete')}>complete</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>  
                              <div className={clsx(styles.viewWrapper)}>
                                 {
                                    stateArrApproveFinal.slice(stateFrom, stateTo).map((obj, index) => {
                                       return ( 
                                             <div className={clsx(styles.row_approved)} key={obj.idjob}>
                                                <p className={clsx(styles.title)}>{obj.jobtitle}</p>
                                                <p>{obj.postdate}</p>
                                                <p>{obj.salary}</p>
                                                {
                                                   obj.status === "pending" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                                }
                                                <div className={clsx(styles.action_approved)}>
                                                   {/* {(() => {
                                                      if (obj.status === "pending") {
                                                         return (
                                                            <div className={clsx(styles.btn)}>
                                                               <button onClick={()=>switchStatus(obj.idjob,"approved")} className={clsx(styles.approve)}>approved</button>
                                                            </div>
                                                         )
                                                      } 
                                                      else if (obj.status === "approved") {
                                                         return (
                                                            <div className={clsx(styles.btn)}>
                                                               <button onClick={()=>switchStatus(obj.idjob,'pending')} className={clsx(styles.pending)}>pending</button>
                                                            </div>
                                                         )
                                                      }
                                                   })()} */}
                                                   {/* <div className={clsx(styles.completeWrapper)}>
                                                      <button onClick={()=>switchStatus(obj.idjob,'complete')} className={clsx(styles.complete)}>complete</button>
                                                   </div> */}
                                                   <div className={clsx(styles.btn)}>
                                                      <button onClick={()=>onView(obj.idjob)} className={clsx(styles.view)}>view</button>
                                                   </div>
                                                   <div className={clsx(styles.checkbox)}>
                                                      <input
                                                         type="checkbox"
                                                         value={obj.idjob}
                                                         checked={checkedItems[obj.idjob] || false}
                                                         onChange={handleCheckboxChange}
                                                      />
                                                   </div>
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
                  else if (stateView === "complete") {
                     return (
                        <>
                           <div className={clsx(styles.printPDF)} id="pdfComplete">
                              <div className={clsx(styles.heading,styles.heading_complete)}>
                                 <p>jobtitle</p>
                                 <p>postdate</p>
                                 <p>salary</p>
                                 <p>status</p>
                                 <div className={clsx(styles.action)}>
                                    {/* <div className={clsx(styles.btn)}>
                                       <button onClick={()=>switchStatusAll("viewApproved","pending all")} className={clsx(styles.approved)}>Pending all</button>
                                    </div> */}
                                    <div className={clsx(styles.btn)}>
                                       view
                                       {/* <button onClick={()=>switchStatusAll("viewApproved","approve all")} className={clsx(styles.approved)}>Approve all</button> */}
                                    </div>
                                    {/* <div className={clsx(styles.btn)}>
                                       <button onClick={()=>switchStatusAll("viewApproved","complete all")} className={clsx(styles.approved)}>Complete all</button>
                                    </div> */}
                                    <div className={clsx(styles.switchStatusWrapper)}>
                                       <button onClick={()=>setStateDialogSwitchStatusAppear(!stateDialogSwitchStatusAppear)} className={clsx(styles.switch)}>Switch status selected</button>
                                       <div className={clsx(styles.dialogSwitchStatus, {[styles.appear]: stateDialogSwitchStatusAppear})}>
                                          <p className={clsx(styles.item)} onClick={()=>switchStatusSelected('pending')}>pending</p>
                                          <p className={clsx(styles.item)} onClick={()=>switchStatusSelected('approve')}>approve</p>
                                          <p className={clsx(styles.item)} onClick={()=>switchStatusSelected('complete')}>complete</p>
                                          <hr />
                                          <p className={clsx(styles.item)} onClick={()=>switchStatusSelected('paid')}>paid</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>  
                              <div className={clsx(styles.viewWrapper)}>
                                 {
                                    stateArrCompleteFinal.slice(stateFrom, stateTo).map((obj, index) => {
                                       return ( 
                                             <div className={clsx(styles.row_complete)} key={obj.idjob}>
                                                <p className={clsx(styles.title)}>{obj.jobtitle}</p>
                                                <p>{obj.postdate}</p>
                                                <p>{obj.salary}</p>
                                                {
                                                   obj.status === "pending" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                                }
                                                <div className={clsx(styles.action_complete)}>
                                                   {(() => {
                                                      if (obj.status === "pending") {
                                                         return (
                                                            <div className={clsx(styles.btn)}>
                                                               <button onClick={()=>switchStatus(obj.idjob,"approved")} className={clsx(styles.approve)}>approved</button>
                                                            </div>
                                                         )
                                                      } 
                                                      else if (obj.status === "approved") {
                                                         return (
                                                            <div className={clsx(styles.btn)}>
                                                               <button onClick={()=>switchStatus(obj.idjob,'pending')} className={clsx(styles.pending)}>pending</button>
                                                            </div>
                                                         )
                                                      }
                                                   })()}
                                                   {/* <div className={clsx(styles.completeWrapper)}>
                                                      <button onClick={()=>switchStatus(obj.idjob,'complete')} className={clsx(styles.complete)}>complete</button>
                                                   </div> */}
                                                   <div className={clsx(styles.btn)}>
                                                      <button onClick={()=>onView(obj.idjob)} className={clsx(styles.view)}>view</button>
                                                   </div>
                                                   <div className={clsx(styles.checkbox)}>
                                                      <input
                                                         type="checkbox"
                                                         value={obj.idjob}
                                                         checked={checkedItems[obj.idjob] || false}
                                                         onChange={handleCheckboxChange}
                                                      />
                                                   </div>
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
         {/* <div className={clsx(styles.backShadow,{[styles.appear]: stateIsViewDetailsAppear})} onClick={onCancelDialog}>
         </div> */}
         <div className={clsx(styles.backShadow, {[styles.appear]: stateBackShadow})} onClick={onClearBackShadow}>
         </div>
         <div className={clsx(styles.viewDetailsDialog, {[styles.appear]: stateIsViewDetailsAppear})}>
            <h1>JOB DETAILS</h1>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>address:</p><p className={clsx(styles.value)}>{stateObjClicked.address}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>city:</p><p className={clsx(styles.value)}>{stateObjClicked.city}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>companyname:</p><p className={clsx(styles.value)}>{stateObjClicked.companyname}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>country:</p><p className={clsx(styles.value)}>{stateObjClicked.country}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>expiredate:</p><p className={clsx(styles.value)}>{stateObjClicked.expiredate}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>field:</p><p className={clsx(styles.value)}>{stateObjClicked.field}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>jobtitle:</p><p className={clsx(styles.value)}>{stateObjClicked.jobtitle}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>level:</p><p className={clsx(styles.value)}>{stateObjClicked.level}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>overtime:</p><p className={clsx(styles.value)}>{stateObjClicked.overtime}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>postdate:</p><p className={clsx(styles.value)}>{stateObjClicked.postdate}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>salary:</p><p className={clsx(styles.value)}>$ {stateObjClicked.salary}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>size:</p><p className={clsx(styles.value)}>{stateObjClicked.size} persons</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>skill:</p><p className={clsx(styles.value)}>
               {stateObjClicked.skill}
            </p>
            </div>
            {/* <div className={clsx(styles.btnWrapper)}>
               <button onClick={onSubmitCV} className={clsx(styles.submit)}>Submit CV</button>
               <button onClick={onCancelViewDetails} className={clsx(styles.cancel)}>Cancel</button>
            </div> */}
         </div>
         <div className={clsx(styles.viewDialogSwitchStatus, {[styles.appear]: stateViewDialogSwitchStatus})}>
            <h2>Your info to update below:</h2>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>Update status into:</p><p className={clsx(styles.value)}>{stateStatusInput}</p>
            </div>
            <div className={clsx(styles.row)}>
               <p className={clsx(styles.key)}>idjob to be updated:</p>
               <p className={clsx(styles.value)} >{stateTextIdjob}</p>
            </div>

            <div className={clsx(styles.btnWrapper)}>
               <button onClick={proceedSwitchStatus} className={clsx(styles.proceed)}>Proceed</button>
               <button onClick={onClearBackShadow} className={clsx(styles.cancel)}>Cancel</button>
            </div>
         </div>


      </div>
                  

   )
}
export default ManageJobEmployer
