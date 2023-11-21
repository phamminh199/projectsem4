import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from './ListAppliedCV.module.scss' 
import { useSelector, useDispatch} from 'react-redux';
import { ROUTE_NAME_EMPLOYER, EmployerSidebarRoute  } from '../../share/route-option';
import collectionAPI from '../../../API/collectionAPI';

import { getUserSignIn, setSessionWithExpiry} from '../../share/sharedFunction';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { wait, getSession } from '../../share/sharedFunction';


//  export to pdf
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// download multiple link in zip file
import JSZip from 'jszip'; // npm install jszip

function ListAppliedCV() {
    const [stateArrAll, setStateArrAll] = useState<any[]>([])
    const [stateArrAllFinal, setStateArrAllFinal] = useState<any[]>([])
    const [stateBackShadow, setStateBackShadow] = useState(false);

    // -------------------------------------------------------dropdown menu start

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
 // -------------------------------------------------------dropdown menu end
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
    }
 // -------------------------------------------------------search end
 // -------------------------------------------------------sort start
    const [stateSortIcon, setStateSortIcon] = useState(19); // boolean
    const onSortValueAnalyze = (type:number) => {
        const arr =  stateArrFinal.slice(0);
        if(type == 19){
            setStateSortIcon(91);
    
            arr.sort((a:any, b:any) => {
                // Sort based on skill property in descending order
                return a.average - b.average;
                // If you want to sort based on other properties, replace 'skill' with the desired property
            });

            setStateArrFinal(arr)
        }
        else if(type == 91){
            setStateSortIcon(19);
            arr.sort((a:any, b:any) => {
                // Sort based on skill property in descending order
                return b.average - a.average;
                // If you want to sort based on other properties, replace 'skill' with the desired property
            });
            setStateArrFinal(arr)
        }
    }
 // -------------------------------------------------------sort end

    const [stateView, setStateView] = React.useState('all');
    const handleChangeView = (event: React.MouseEvent<HTMLElement>, kindOfView: string) => {
        // kindOfView nó sẽ lấy giá trị value="module" value="list" value="quilt" từ ToggleButton nào đc click vào
        if(kindOfView != ""){
            setStateView(kindOfView);
        }
    };

    const [stateArrJobOriginal, setStateArrJobOriginal] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end
    const [stateArrJobUnique, setStateArrJobUnique] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end
    const [stateArrJobUniquePending, setStateArrJobUniquePending] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end
    const [stateArrJobUniqueApprove, setStateArrJobUniqueApprove] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end
    const [stateArrJobUniqueComplete, setStateArrJobUniqueComplete] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end
    const [stateArrJobUniquePaid, setStateArrJobUniquePaid] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end
    const [stateArrTestResuilt, setStateArrTestResuilt] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end
    const [stateArrCVByIdjob, setStateArrCVByIdjob] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end
    const [stateArrAnalyze, setStateArrAnalyze] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end
    const [stateArrFinal, setStateArrFinal] = useState<any[]>([]); // đây là state chứa data toàn bộ job lấy từ back end
        
    const getData = async () => {

        // resulkt
        const responseResult: any = await collectionAPI!.findAllTestresult(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
        // setStateArrTestResuilt(responseResult.data);
        // console.log('response.data: ', responseResult.data);
        const testresult = responseResult.data;

        // await wait(300);
        // data
        const responseResumedigitaleachjob: any = await collectionAPI!.findAllResumedigitaleachjob(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
        // setStateArrTestResuilt(responseResumedigitaleachjob.data);
        // console.log('responseResumedigitaleachjob.data: ', responseResumedigitaleachjob.data);
        const resumedigitaleachjob = responseResumedigitaleachjob.data;
        // await wait(300);
        // pdf
        const responseResumeeachjob: any = await collectionAPI!.findAllResumeeachjob(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
        // console.log('responseResumeeachjob.data: ', responseResumeeachjob.data);
        const resumeeachjob = responseResumeeachjob.data;

        // candidate
        const responseCandidate: any = await collectionAPI!.findallcandidate(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
        // console.log('responseCandidate.data: ', responseCandidate.data);
        const candidates = responseCandidate.data;

        const mergedMap:any = {};
        [testresult, resumeeachjob, resumedigitaleachjob, candidates].forEach(arr => {
            arr.forEach((item:any) => {
            const key = `${item.idcandidate}-${item.idjob}`;
            if (!mergedMap[key]) {
                mergedMap[key] = { ...item };
            } else {
                mergedMap[key] = { ...mergedMap[key], ...item };
            }
            });
        });
        
        // Convert the mergedMap object to an array
        const mergedArray = Object.values(mergedMap);

        const idjobSelected = getSession("idjobSelected");

        const mergeArrayByIdjobTempt = mergedArray.filter((obj:any) => obj.idjob == idjobSelected); // lúc này chưa có thông tin cá nhấn của candidate đó
        // console.log('mergedArray: ', mergeArrayByIdjob);

        // Create an object to map by idcandidate
        const finalMap:any = {};

    // Merge data from mergedArray and candidates
        [...mergedArray, ...candidates].forEach(item => {
            const { idcandidate, ...rest } = item;
            if (!finalMap[idcandidate]) {
            finalMap[idcandidate] = { idcandidate, ...rest };
            } else {
            finalMap[idcandidate] = { ...finalMap[idcandidate], ...rest };
            }
        });
        
        // Convert the finalMap object to an array
        const finalArray = Object.values(finalMap);
        // console.log('finalArray: ', finalArray);
        // do merge với thông tin cá nhân nên sẽ dư dôi ra các candidate chưa có nộp cv hay làm bài test này nọ, nên phải lọc ra theo idjob
        let mergeArrayByIdjob = finalArray.filter((obj:any) => obj.idjob == idjobSelected)

        mergeArrayByIdjob.sort((a:any, b:any) => {
            // Sort based on skill property in descending order
            return a.idresume - b.idresume;
            // If you want to sort based on other properties, replace 'skill' with the desired property
        });

        let arrIdresume:any = [];
        mergeArrayByIdjob.forEach((obj:any)=> {
            arrIdresume.push(obj.idresume);
        })
        setStateArrCVByIdjob(mergeArrayByIdjob);
        // console.log('mergeArrayByIdjob: ', mergeArrayByIdjob);
        const responseResumetemplate: any = await collectionAPI!.findAllResumetemplate(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
        const resumes = responseResumetemplate.data;

        let arrResumesFilter:any = [];
        resumes.forEach((obj:any)=> {
            if(arrIdresume.includes(obj.idresume)){
                arrResumesFilter.push(obj);
            }
        })
        // console.log('arrResumesFilter: ', arrResumesFilter);

        const responseJob: any = await collectionAPI!.findAllJob(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
        const jobs = responseJob.data;
        const jobselected = responseJob.data.find((obj:any)=> obj.idjob == idjobSelected)
        // console.log('jobselected: ', jobselected);
        

        const responseSkills: any = await collectionAPI!.findAllSkills(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
        const arrSkills = responseSkills.data;
        const responseJobskills: any = await collectionAPI!.findAllJobskill(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
        const arrJobskills = responseJobskills.data;

        let skills:any = [];
        arrJobskills.forEach((obj:any)=> {
            if(obj.idjob == idjobSelected){
                skills.push(obj.idskill);
            }
        })
        // console.log('skills: ', skills);
        let skillsName:any = [];
        arrSkills.forEach((obj:any)=> {
            if(skills.includes(obj.idskill)){
                skillsName.push(obj.skill);
            }
        })

        const responseEmployer: any = await collectionAPI!.findAllEmployer(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
        const arrEmployer = responseEmployer.data;

        const responseCompany: any = await collectionAPI!.findAllCompany(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
        const arrCompany = responseCompany.data;

        const obj = getUserSignIn();
        const idemployer = obj.idemployer;
        const empObj = arrEmployer.find((obj:any)=> obj.idemployer == idemployer)

        const idcompany = empObj.idcompany;

        const objCompany = arrCompany.find((obj:any)=> obj.idcompany == idcompany)
        const companyName = objCompany.companyname;
        
        // console.log('skillsName: ', skillsName);
        // console.log('companyName: ', companyName);

        /*
        so cái gì:
        1. jobtitle
        2. level
        3. skill
        4. companyapply
        */
        const jobtitle = jobselected.jobtitle;
        const level = jobselected.level;
        const skill = skillsName;
        const companyapply = companyName;
        // console.log('jobtitle: ', jobtitle);
        // console.log('level: ', level);
        // console.log('skill: ', skill);
        // console.log('companyapply: ', companyapply);

        const stringSimilarity = require('string-similarity');

        // const string1 = "javascript";
        // const string2 = "typescript javascript reactjs";

        // const similarity = stringSimilarity.compareTwoStrings(string1, string2);
        // console.log(similarity); // Returns a value between 0 and 1 indicating similarity

        let arrAnalyze:any = [];
        arrResumesFilter.forEach((obj:any)=> {
            let cvJobtitle = obj.jobapply;
            let cvlevel = obj.level;
            let cvSkill1 = obj.skill1;
            let cvSkill2 = obj.skill2;
            let cvSkill3 = obj.skill3;
            let cvCompanyapply = obj.companyapply;
            // console.log('cvJobtitle: ', cvJobtitle); 
            // console.log('cvlevel: ', cvlevel);
            // console.log('cvSkill1: ', cvSkill1);
            // console.log('cvSkill2: ', cvSkill2); 
            // console.log('cvSkill3: ', cvSkill3);
            // console.log('cvCompanyapply: ', cvCompanyapply);
            const similarity_Jobtitle = jobtitle ? stringSimilarity.compareTwoStrings(jobtitle.toLowerCase(), cvJobtitle.toLowerCase()) : 0;
            const similarity_level = level ? stringSimilarity.compareTwoStrings(level.toLowerCase(), cvlevel.toLowerCase()) : 0;
            const similarity_companyapply = companyapply ? stringSimilarity.compareTwoStrings(companyapply.toLowerCase(), cvCompanyapply.toLowerCase()) : 0;
            const similarity_skill1 = skill ? stringSimilarity.compareTwoStrings(skill[0].toLowerCase(), cvSkill1.toLowerCase()) : 0;
            const similarity_skill2 = skill ? stringSimilarity.compareTwoStrings(skill[0].toLowerCase(), cvSkill2.toLowerCase()) : 0;
            const similarity_skill3 = skill ? stringSimilarity.compareTwoStrings(skill[0].toLowerCase(), cvSkill3.toLowerCase()) : 0;
            const similarity_skill4 = skill ? stringSimilarity.compareTwoStrings(skill[1].toLowerCase(), cvSkill1.toLowerCase()) : 0;
            const similarity_skill5 = skill ? stringSimilarity.compareTwoStrings(skill[1].toLowerCase(), cvSkill2.toLowerCase()) : 0;
            const similarity_skill6 = skill ? stringSimilarity.compareTwoStrings(skill[1].toLowerCase(), cvSkill3.toLowerCase()) : 0;
            let maxSkill = Math.max(similarity_skill1, similarity_skill2, similarity_skill3,similarity_skill4,similarity_skill5,similarity_skill6);
            const skillFinal = maxSkill > 0.3 ? 1 : maxSkill;

            const average = (similarity_Jobtitle + similarity_level + similarity_companyapply + skillFinal)/4;
            let data = {
                analyzejobtitle:(similarity_Jobtitle * 100).toFixed(0),
                analyzelevel:(similarity_level * 100).toFixed(0),
                analyzeskill:(skillFinal * 100).toFixed(0),
                analyzecompanyapply:(similarity_companyapply * 100).toFixed(0),
                average: (average * 100).toFixed(0)
            }
            arrAnalyze.push(data);
        })
        // console.log('arrAnalyze: ', arrAnalyze);

        // merge 2 array lại với nhau, đổ hết property của object của array arrAnalyze vào mỗi object arrResumesFilter tương ứng theo index
        for (let i = 0; i < arrResumesFilter.length; i++) {
            Object.assign(arrResumesFilter[i], arrAnalyze[i]);
        }
        arrResumesFilter.sort((a:any, b:any) => {
            // Sort based on skill property in descending order
            return a.idresume - b.idresume;
            // If you want to sort based on other properties, replace 'skill' with the desired property
        });
        // console.log('arrResumesFilter: ', arrResumesFilter);

        // merge 2 array,đổ ptu cua array arrResumesFilter vào array mergeArrayByIdjob, object nào có property exist thì ignore
        for (let i = 0; i < mergeArrayByIdjob.length; i++) {
            const objA:any = mergeArrayByIdjob[i];
            const objB:any = arrResumesFilter[i];
        
            for (const prop in objB) {
                if (!objA.hasOwnProperty(prop)) {
                    objA[prop] = objB[prop];
                }
            }
        }
        // console.log('mergeArrayByIdjob: ', mergeArrayByIdjob);
        setStateArrAnalyze(arrResumesFilter);
        setStateArrFinal(mergeArrayByIdjob);
    }
    // console.log('StateArrAnalyze: ', stateArrAnalyze);

    // console.log('stateArrFinal: ', stateArrFinal);

    const [stateItemsPerPage, setStateItemsPerPage] = useState(50);
    const [pagination, setPagination] = React.useState(1);
    const [stateFrom, setStateFrom] = useState(0);
    const [stateTo, setStateTo] = useState(50);

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
    const onClearBackShadow = () => {
        setStateBackShadow(false);

    }
    // console.log('stateArrJobUnique: ', stateArrJobUnique);
    
    const [stateObjClicked, setStateObjClicked] = useState<stateObj>({}); // chứa data của job được click vào
    const [stateIsViewDetailsAppear, setStateIsViewDetailsAppear] = useState(false);
    const onView = (idcontroller: number) => {
        setStateIsViewDetailsAppear(true);
        setStateBackShadow(true);
        // console.log("idcontroller: " + idcontroller);
        // console.log(stateArrAll);
        // const obj = stateArrAll.find((item) => item.idcontroller === idcontroller); //lấy một object đầu tiên được tìm thấy mà thoả điều kiện
        // obj.dob = obj.dob.split("T")[0];
        // // console.log(obj);
        // setStateObjClicked(obj)
    }
    type stateObj = {
        [key: string]: any;
    };
    // đặt trong hàm
    const [stateUserSignIn, setStateUserSignIn] = useState<stateObj>({})
    useEffect(() => {
        const obj = getUserSignIn()
        setStateUserSignIn(obj);
        getData();
    },[]);

   const [stateJobclicked, setStateJobClicked] = useState<stateObj>({}); // chứa data của job được click vào
   const [stateIdJobClicked, setStateIdJobClicked] = useState(0); // number

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

    const onDownloadPDFSingleCV = (urlfile:string) => {
    
        const fileUrl = urlfile;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', 'downloaded-file.pdf');
        link.target = '_blank'; // Open in a new tab/window
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
    }

    type stateObjType = {
        [key: string]: any;
    };
    const [stateObjCV, setStateObjCV] = useState<stateObjType>({})
    const [stateArrSkill1, setStateArrSkill1] = useState<any[]>([]);
    const [stateArrSkill2, setStateArrSkill2] = useState<any[]>([]);
    const [stateArrSkill3, setStateArrSkill3] = useState<any[]>([]);

    const onViewDigital = (idresume:string) => {
        setStateBackShadow(true);
    
        const obj = stateArrFinal.find((obj:any)=> obj.idresume == idresume);
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
        setStateObjCV(obj);

    }
    
    const handleDownloadCSV = (idresume:number) => {

        const objectToDownload = stateArrFinal.find((obj:any)=> obj.idresume == idresume)
        // console.log('objectToDownload: ' + JSON.stringify(objectToDownload, null, 4));
        const csvContent = Object.keys(objectToDownload).map((key) => {
            return `"${key}","${objectToDownload[key]}"`;
        }).join('\n');
    
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={clsx(styles.component_ListAppliedCV)}>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.headerWrapper)}>
                    <h1>LIST CV APPLIED FOR THIS JOB</h1>
                    <div className={clsx(styles.miniMenu)}>
                        {/* <ToggleButtonGroup
                        orientation="horizontal"
                        value={stateView}
                        exclusive
                        size="small"
                        onChange={handleChangeView}
                        className={clsx(styles.left)}
                        >
                            <ToggleButton value="all" aria-label="all">
                                <span className={clsx(styles.kind)}>All</span>
                            </ToggleButton>
                            <ToggleButton value="pending" aria-label="pending">
                                <span className={clsx(styles.kind)}>pending</span>
                            </ToggleButton>
                            <ToggleButton value="approve" aria-label="approve">
                                <span className={clsx(styles.kind)}>approve</span>
                            </ToggleButton>
                            <ToggleButton value="complete" aria-label="complete">
                                <span className={clsx(styles.kind)}>complete</span>
                            </ToggleButton>
                            <ToggleButton value="paid" aria-label="paid">
                                <span className={clsx(styles.kind)}>paid</span>
                            </ToggleButton>
                        </ToggleButtonGroup> */}
                        <div className={clsx(styles.searchWrapper)}>
                            {/* <input type="text" value={stateSearchInput} onChange={handleChangeSearch} placeholder='Search anything here...'></input> */}
                        </div>
                        <Box
                            sx={{
                            display: 'flex',
                            // flexDirection: 'column',
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
                                    if (stateSortIcon == 19) {
                                        return (
                                            <>
                                                <img src="../assets/picture/19.png" className={clsx(styles.icon)} alt="avatar" onClick={()=>onSortValueAnalyze(19)}/>
                                            </>
                                        )
                                    }
                                    else if (stateSortIcon == 91) {
                                        return (
                                            <>
                                                <img src="../assets/picture/91.png" className={clsx(styles.icon)} alt="avatar" onClick={()=>onSortValueAnalyze(91)}/>
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
                {/* <button onClick={handleDownloadAllPDF}>Download ZIP</button> */}
                    </div>
                </div>


                <div className={clsx(styles.container)} >
                    <div className={clsx(styles.printPDF)} id="pdfAll">
                        <div className={clsx(styles.heading)}>
                            <p className={clsx(styles.item)}>No.</p>
                            <p className={clsx(styles.item)}>full name</p>
                            <p className={clsx(styles.item)}>PDF</p>
                            <p className={clsx(styles.item)}>Test Result</p>
                            <p className={clsx(styles.item)}>Digital CV</p>
                            <div className={clsx(styles.analyzeHeading)}>
                                <p className={clsx(styles.con)}>Analyze digital CV</p>
                                <div className={clsx(styles.subRow)}>
                                    <p className={clsx(styles.chau)}>job title</p>                                           
                                    <p className={clsx(styles.chau)}>company apply</p>                                           
                                    <p className={clsx(styles.chau)}>level</p>                                           
                                    <p className={clsx(styles.chau)}>skill</p>                                           
                                    <p className={clsx(styles.chau)}>average</p>                                           
                                </div>
                            </div>
                        </div>   
                        <div className={clsx(styles.viewWrapper)}>
                            {
                                stateArrFinal.slice(stateFrom, stateTo).map((obj, index) => {
                                    return ( 
                                    <div className={clsx(styles.row)} key={obj.idcandidate}>
                                        <p>{index + 1}</p>
                                        <p>{obj.fullname}</p>
                                        {(() => {
                                            if (obj.urlfile !== undefined) {
                                                return (
                                                    <div className={clsx(styles.box)}>
                                                        <p className={clsx(styles.download)} onClick={()=>onDownloadPDFSingleCV(obj.urlfile)}>Download</p>

                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <p>Empty</p>
                                                )
                                            }
                                        })()}
                                        {(() => {
                                            if (obj.result !== undefined) {
                                                return (
                                                    <p>{obj.result}</p>
                                                )
                                            }
                                            else {
                                                return (
                                                    <p></p>
                                                )
                                            }
                                        
                                        })()}
                                        {(() => {
                                            if (obj.idresume !== undefined) {
                                                return (
                                                    <div className={clsx(styles.box)}>
                                                        <p className={clsx(styles.view)} onClick={()=>onViewDigital(obj.idresume)}>view</p>
                                                        <p className={clsx(styles.download)} onClick={()=>handleDownloadCSV(obj.idresume)}>Download</p>

                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <p></p>
                                                )
                                            }
                                            
                                        })()}
                                        <div className={clsx(styles.analyzeWrapper)}>
                                            <p>{obj.analyzejobtitle} %</p>
                                            <p>{obj.analyzelevel} %</p>
                                            <p>{obj.analyzeskill} %</p>
                                            <p>{obj.analyzecompanyapply} %</p>
                                            <p className={clsx(styles.box,{[styles.high]: obj.average >= 80},{[styles.average]: obj.average >= 50 && obj.average <= 79},{[styles.low]: obj.average < 50})}>{obj.average} %</p>
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
                </div>
            </div>
            
            <div className={clsx(styles.backShadow, {[styles.appear]: stateBackShadow})} onClick={onClearBackShadow}>
            </div>
            <div id="PDFViewPostedCV">
                <div className={clsx(styles.outerContainerViewPostedPRINT, {[styles.appear]: stateBackShadow})}>
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
            </div>
        </div>
    )
}
export default ListAppliedCV