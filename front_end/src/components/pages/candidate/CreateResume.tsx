import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import clsx from 'clsx';
import styles from './CreateResume.module.scss'   
import { read, utils } from 'xlsx';

//  export to pdf
import { pdfjs } from 'react-pdf';
// import { saveAs } from 'file-saver';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
//  export to pdf
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// MUI
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { projectStorage } from '../../share/firebase';
import { getUserSignIn, wait } from '../../share/sharedFunction';

import collectionAPI from '../../../API/collectionAPI';

function CreateResume() {
    type stateObj = {
        [key: string]: any;
    };
    const [stateUserSignIn, setStateUserSignIn] = useState<stateObj>(); // chứa object user sign in


    const sample = [
        [
            "name",
            "Jack Sparrow"
        ],
        [
            "phone",
            69544645
        ],
        [
            "email",
            "asdjfhbujhv@gmail.com"
        ],
        [
            "summary",
            "akshjfg alieuhf oeu owe oiywoeigwoeig oweigowei gowe gwoe woeigywo eowigwo; eig gwo;eigw;oi eo;wgwo;eig  wo eg"
        ],
        [
            "dob",
            "1990-05-20"
        ],
        [
            "skill1",
            "Reactjs",
            "Good"
        ],
        [
            "skill2",
            "Java",
            "Good"
        ],
        [
            "skill3",
            ".NET",
            "Good"
        ],
        [
            "skill4",
            "Data Engineer",
            "Good"
        ],
        [
            "skill5",
            "Machine learning",
            "Good"
        ],
        [
            "level",
            "junior"
        ],
        [
            "position1",
            "Full-stack developer"
        ],
        [
            "companyname1",
            "companyname1"
        ],
        [
            "duration1",
            "2020-01-15 to 2022-05-20"
        ],
        [
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis similique? Harum eum est iusto, architecto ab, voluptatum voluptate expedita optio magnam doloremque aspernatur nisi tempora quia possimus nemo minima!",
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis similique? Harum eum est iusto, architecto ab, voluptatum voluptate expedita optio magnam doloremque aspernatur nisi tempora quia possimus nemo minima!",
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis similique? Harum eum est iusto, architecto ab, voluptatum voluptate expedita optio magnam doloremque aspernatur nisi tempora quia possimus nemo minima!",
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis similique? Harum eum est iusto, architecto ab, voluptatum voluptate expedita optio magnam doloremque aspernatur nisi tempora quia possimus nemo minima!",
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis similique? Harum eum est iusto, architecto ab, voluptatum voluptate expedita optio magnam doloremque aspernatur nisi tempora quia possimus nemo minima!",
        ],
        [
            "projectjoin1",
            "projectjoin1"
        ],
        [
            "position2",
            "position2"
        ],
        [
            "companyname2",
            "companyname2"
        ],
        [
            "duration2",
            "duration2"
        ],
        [
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis similique? Harum eum est iusto, architecto ab, voluptatum voluptate expedita optio magnam doloremque aspernatur nisi tempora quia possimus nemo minima!",
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis similique? Harum eum est iusto, architecto ab, voluptatum voluptate expedita optio magnam doloremque aspernatur nisi tempora quia possimus nemo minima!",
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis similique? Harum eum est iusto, architecto ab, voluptatum voluptate expedita optio magnam doloremque aspernatur nisi tempora quia possimus nemo minima!",
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis similique? Harum eum est iusto, architecto ab, voluptatum voluptate expedita optio magnam doloremque aspernatur nisi tempora quia possimus nemo minima!",
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis similique? Harum eum est iusto, architecto ab, voluptatum voluptate expedita optio magnam doloremque aspernatur nisi tempora quia possimus nemo minima!",
        ],
        [
            "projectjoin2",
            "projectjoin2"
        ],
        [
            "education1",
            "education1"
        ],
        [
            "education2",
            "education2"
        ],
        [
            "education3",
            "education3"
        ],
        [
            "certificate1",
            "certificate1"
        ],
        [
            "certificate2",
            "certificate2"
        ],
        [
            "certificate3",
            "certificate3"
        ],
        [
            "certificate4",
            "certificate4"
        ],
        [
            "certificate5"
        ],
        [
            "address",
            "86/38 Ong Ich Khiem st, District 11, HCM city"
        ],
        [
            "language",
            "English Ielts 6.0"
        ],
        [
            "jobapply",
            "Fullstack Developer"
        ],
        [
            "companyapply",
            "ABC Software"
        ],
        [
            "achievement",
            "Win x competition"
        ]
    ];
    const [groupStateError, setGroupStateError] = useState(
        {
            name: {message:"Name (B1) can not be empty", status: false},
            phone:{message:"Phone (B2) must contain only numbers, have a length between 7 and 15 characters, all digits cannot be the same, and cannot contain empty spaces.", status: false},
            email:{message:"Mail (B3) must have correct format", status: false},
            summary:{message:"must (B4) have a length between 10 and 3500 characters and cannot contain only spaces.", status: false},
            dob:{message:"Day of Birth (B5) must have 10 characters in the format yyyy-mm-dd and cannot contain only spaces.", status: false},
            skill:{message:"First skill (B6) must not be empty and must contain a maximum of 40 characters.", status: false},
            other:{message: " B7 to B34 cannot contain only spaces and must have a maximum of 3500 characters when not empty.", status: false},
        }
    );
    
    const setErrorStatus = (key:any, status:any) => {
        const newGroupStateError:any = {...groupStateError};
        newGroupStateError[key].status = status;
        setGroupStateError(newGroupStateError);
    };

    const [stateErrorAppear, setStateErrorAppear] = useState(false);
    const [cv, setCv] = useState<any[]>(sample); // cho sample vào để ban đầu nó load cv mẫu lên
    const [stateExcelFile, setStateExcelFile] = useState(null);
    type stateObjType = {
        [key: string]: any;
    };
        // đặt trong hàm
    const [stateObjDigitalCVWithOutAvatar, setStateObjDigitalCVWithOutAvatar] = useState<stateObjType>({})
    const handleFileUpload = (event:any) => {
        const file = event.target.files[0];
        console.log("test");
            // Check file type
        if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            console.log('Invalid file type. Please select an XLSX file.');
            setStateExcelFile(null);
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
            const cv:any = utils.sheet_to_json(worksheet, { header: 1 });
        
            // Validate row count
            if (cv.length > 34) {
                console.log('File contains more than 33 rows.');
                return;
            }

            // Validate column count
            // for (const row of cv) {
            //     if ((row as any[]).length > 2) {
            //         console.log('File contains more than 2 columns in some rows.');
            //     return;
            //     }
            // }

            // Check each cell
            const exceededCells = [];
            for (let rowIndex = 0; rowIndex < cv.length; rowIndex++) {
                const row:any = cv[rowIndex];
                for (let colIndex = 0; colIndex < row.length; colIndex++) {
                const cell = row[colIndex];
                if (String(cell).length > 3500) {
                    const cellName = utils.encode_cell({ r: rowIndex, c: colIndex });
                    exceededCells.push(cellName);
                }
                }
            }

            // Report exceeded cells
            if (exceededCells.length > 0) {
                console.log('The following cells exceed the character limit of 3500:', exceededCells);
            }

            // Check cv[0][1] name
            // I want the cell can not be undefined, null, empty, have at least 5 characters, and maximum 30 characters and can not contain only space
            const firstRowSecondCell = cv[0][1];
            if (
                typeof firstRowSecondCell !== 'string' ||
                !firstRowSecondCell.trim() || // Check for empty or only whitespace
                firstRowSecondCell.trim().length < 5 ||
                firstRowSecondCell.trim().length > 30
            ) {
                console.log('cv[0][1] must have between 5 and 30 non-empty characters.');
                setErrorStatus('name',true)
            }
            else {
                setErrorStatus('name',false)
            }

            // Check cv[1][1] phone
            const secondRowSecondCell:any = cv[1][1];
            const secondRowSecondCellString = String(secondRowSecondCell);

            if (
                !/^\d{7,15}$/.test(secondRowSecondCellString) ||
                secondRowSecondCellString.length < 7 ||
                secondRowSecondCellString.length > 15 ||
                /^(\d)\1*$/.test(secondRowSecondCellString) ||
                /\s/.test(secondRowSecondCellString)
            ) {
                console.log('cv[1][1] must contain only numbers, have a length between 7 and 15 characters, all digits cannot be the same, and cannot contain empty spaces.');
                setErrorStatus('phone',true)
            }
            else {
                setErrorStatus('phone',false)
            }

            // Check cv[2][1] email
            const thirdRowSecondCell = cv[2][1];
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(thirdRowSecondCell))) {
                console.log('cv[2][1] must match the email format /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/');
                setErrorStatus('email',true)
            }
            else {
                setErrorStatus('email',false)
            }

            // Check cv[3][1] summary
            const fourthRowSecondCell = cv[3][1];
            const cellLength = String(fourthRowSecondCell).trim().length;

            if (cellLength === 0 || cellLength < 10 || cellLength > 3500) {
                console.log('cv[4][1] must have a length between 10 and 3500 characters and cannot contain only spaces.');
                setErrorStatus('summary',true)
            }
            else {
                setErrorStatus('summary',false)
            }
            // Check cv[4][1] dob
            const fifthRowSecondCell = cv[4][1];
            const cellValue = String(fifthRowSecondCell).trim();

            if (cellValue.length !== 10 || !/^\d{4}-\d{2}-\d{2}$/.test(cellValue)) {
                console.log('Day of Birth must have 10 characters in the format "yyyy-mm-dd" and cannot contain only spaces.');
                setErrorStatus('dob',true)
            }
            else {
                setErrorStatus('dob',false)
            }

        // Check cv[5][1]
            const sixthRowSecondCell = cv[5][1];
            if (typeof sixthRowSecondCell === 'undefined' || String(sixthRowSecondCell).trim().length > 40) {
                console.log('Skill1 must not be undefined and must contain a maximum of 40 characters.');
                setErrorStatus('skill',true)
            }
            else {
                setErrorStatus('skill',false)
            }

            // Check cv[10][1] through cv[28][1]
            for (let i = 6; i <= 33; i++) {
                const cellValue = String(cv[i][1]).trim();
                if (cellValue.length > 0 && (cellValue.length > 3500 || /^\s+$/.test(cellValue))) {
                    console.log(`cv[${i}][1] cannot contain only spaces and must have a maximum of 3500 characters when not empty.`);
                    setErrorStatus('other',true)
                    break;
                }
                else {
                    setErrorStatus('skill',false)
                }
            }

            let flag = false; 
            for (const key in groupStateError) {
                if (groupStateError[key as keyof typeof groupStateError].status === true) {
                    flag = true;
                }
            }
            if(flag == false){
                setStateErrorAppear(false)
            } else {
                setStateErrorAppear(true)
                return;
            }
            /*
            cv[10][1]
            cv[11][1]
            cv[12][1]
            cv[13][1]
            cv[14][1]
            can not be empty and maximum 3500 characters
            */
            // const cellsToCheck2 = [
            //     cv[10][1],
            //     cv[11][1],
            //     cv[12][1],
            //     cv[13][1],
            //     cv[14][1]
            // ];
            // const labels = ['cv[10][1]', 'cv[11][1]', 'cv[12][1]', 'cv[13][1]', 'cv[14][1]'];

            // for (let i = 0; i < cellsToCheck2.length; i++) {
            //     const cellValue = String(cellsToCheck2[i]).trim();
            //     if (cellValue.length === 0 || cellValue.length > 3500) {
            //         console.log(`${labels[i]} cannot be empty and must have a maximum of 3500 characters.`);
            //         return;
            //     }
            // }

            // Process the data as needed
            console.log(cv);
            // console.log('cv: ' + JSON.stringify(cv, null, 4));
            setCv(cv);
            let skill1 = cv[5];
            let skill1_string = ""
            for (let i = 1; i < skill1.length; i++){
                skill1_string += skill1[i] + "_";
            }
            let skill2 = cv[6];
            let skill2_string = ""
            for (let i = 1; i < skill2.length; i++){
                skill2_string += skill2[i] + "_";
            }
            let skill3 = cv[7];
            let skill3_string = ""
            for (let i = 1; i < skill3.length; i++){
                skill3_string += skill3[i] + "_";
            }
            // console.log('cv: ' + JSON.stringify(cv, null, 4));
            // console.log('cv[32][1]: ' + JSON.stringify(cv[32][1], null, 4));
            const data2 = {
                idcandidate: stateUserSignIn!.idcandidate,
                fullname: cv[0][1],
                phone: cv[1][1],
                email: cv[2][1],
                summary: cv[3][1],
                dob: cv[4][1],
                skill1: skill1_string,
                skill2: skill2_string,
                skill3: skill3_string,
                level: cv[10][1],
                position1: cv[11][1],
                companyname1: cv[12][1],
                duration1: cv[13][1],
                describeyourwork1: cv[14][1],
                projectjoin1: cv[15][1],
                position2: cv[16][1],
                companyname2: cv[17][1],
                duration2: cv[18][1],
                describeyourwork2: cv[19][1],
                projectjoin2: cv[20][1],
                education1: cv[21][1],
                education2: cv[22][1],
                education3: cv[23][1],
                certificate1: cv[24][1],
                certificate2: cv[25][1],
                certificate3: cv[26][1],
                address: cv[29][1],
                language: cv[30][1],
                jobapply: cv[31][1],
                companyapply: cv[32][1],
                achievement: cv[33][1]
                // urlavatar: stateUrlAvatar
            }
            console.log('data2: ', data2);
            setStateObjDigitalCVWithOutAvatar(data2); // lư tạm vào state này, vì mình cần phải bổ sung avatar vào nữa mới post về backend đc
            
            
        };
    
        reader.readAsArrayBuffer(file);
    };
    const fileInputRef = useRef<HTMLInputElement>(null);
    const clearFileInput = () => {
        setStateExcelFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input value to clear the selection
        }
    }
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const clearFileAvartar = () => {
        setAvatarFile(null);
        if (avatarInputRef.current) {
            avatarInputRef.current.value = ''; // Reset the file input value to clear the selection
        }
    }
    const submitDigitalCV = async () => {
        let data = stateObjDigitalCVWithOutAvatar;
        
        if(Object.keys(data).length === 0){
            alert("your data is empty, thus can not post to the system");
        }
        
        if(stateUrlAvatar === ""){
            alert("your avatar is empty, thus can not post to the system");
        }
        console.log('stateUrlAvatar: ', stateUrlAvatar);
        data.urlavatar = stateUrlAvatar;
        console.log('data: ' + JSON.stringify(data, null, 4));

        let response: any;
        try {
            response = await collectionAPI.addResumetemplate(data);
            console.log("response: " + JSON.stringify(response, null, 4));
            const idcandidate = stateUserSignIn!.idcandidate;
            let foundObjInArray = response.data.filter((item:any) => item.idcandidate === idcandidate);//tìm thấy sẽ trả ra mảng chứa object được tìm thấy, có thể tìm thấy nhiều object thoả điều kiện, còn ko nó sẽ trả ra -1
            setStateArrResume(foundObjInArray);
            console.log('foundObjInArray: ' + JSON.stringify(foundObjInArray, null, 4));
            alert("Your resume successfully add to the system, you can can review your posted CV in tab 'POSTED CV'");
        }catch(err){
            console.log('err:', err);
        }
    
    }
    // console.log('cv: ' + JSON.stringify(cv, null, 4));
    const downloadPDFViewCreateCV = async () => {
        
        const pdf = new jsPDF('portrait', 'pt', 'a4');
        const pdfElement:any = document.querySelector('#PDFViewCreateCV');
        if (!pdfElement) {
            return;
        }
        const data = await html2canvas(pdfElement);
        const img = data.toDataURL('image/png');
        const imgProperties = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('sample_resume.pdf');
    };
    const downloadPDFViewPostedCV = async () => {
        
        const pdf = new jsPDF('portrait', 'pt', 'a4');
        const pdfElement:any = document.querySelector('#PDFViewPostedCV');
        if (!pdfElement) {
            return;
        }

        const data = await html2canvas(pdfElement);
        await wait(300);
        const img = data.toDataURL('image/png');
        const imgProperties = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        
        pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('sample_resume.pdf');
    };
    // hàm này dùng để download file excel resume.xlsx mẫu cho ng dùng fill vào
    const handleDownloadSample = () => {
        const url = 'https://docs.google.com/spreadsheets/d/1UPG7CQ6XkUodYwRtjKpQYBzMpvzwxl3W/edit?usp=sharing&ouid=111297545235436232824&rtpof=true&sd=true';
        const fileName = 'sample.xlsx';
    
        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.log('Error downloading the file:', error);
            });
    };
    const [stateView, setStateView] = React.useState('template1');

    const [stateStringViewTemplate2, setStateStringViewTemplate2] = useState(false);
    const [stateStringViewTemplate3, setStateStringViewTemplate3] = useState(false);
    const handleChangeViewTemplate = (event: React.MouseEvent<HTMLElement>, kindOfView: string) => {
       // kindOfView nó sẽ lấy giá trị value="module" value="list" value="quilt" từ ToggleButton nào đc click vào
        if(kindOfView === "template1"){
            setStateStringViewTemplate2(false)
            setStateStringViewTemplate3(false)
        }
        else if(kindOfView === "template2"){
            setStateStringViewTemplate2(true)
            setStateStringViewTemplate3(false)
        }
        else if(kindOfView === "template3"){
            setStateStringViewTemplate2(false)
            setStateStringViewTemplate3(true)
        }
        setStateView(kindOfView);
    };
    const [stateViewControl, setStateViewControl] = React.useState('createCV');

    const handleChangeViewControl = (event: React.MouseEvent<HTMLElement>, kindOfView: string) => {
       // kindOfView nó sẽ lấy giá trị value="module" value="list" value="quilt" từ ToggleButton nào đc click vào
        setStateViewControl(kindOfView);
    };

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
    
            //   // tắt báo lỗi 
            //   setGroupStateError({
            //      ...groupStateError,
            //      urlavatar: "noError"
            //   })
    
        } else {
            setAvatarFile(null); // cái này nó để hiện cái file trong thẻ input
            // hiện báo lỗi
            //   setGroupStateError({
            //      ...groupStateError,
            //      urlavatar: "error"
            //   })
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
            // setGroupState({
            //     ...groupState,
            //     urlavatar: urlAvatar
            // })
            setStateUrlAvatar(urlAvatar);
            console.log('success post image to storage firebase and update stateUrlAvatar',urlAvatar);

        })
        // return {progress, urlAvatar, error}
    }

    const [stateArrResume, setStateArrResume] = useState<any[]>([]);
    const getData_AllCVPosted = async () => {
        let response: any;
        try {
                response = await collectionAPI.findAllResumetemplate();
                // console.log("response: " + JSON.stringify(response, null, 4));
                const obj = getUserSignIn(); // phải lấy từ gốc ra, ko lấy từ state, vì nó chưa cập nhật kịp;
                const idcandidate = obj!.idcandidate;
                let foundObjInArray = response.data.filter((item:any) => item.idcandidate === idcandidate);//tìm thấy sẽ trả ra mảng chứa object được tìm thấy, có thể tìm thấy nhiều object thoả điều kiện, còn ko nó sẽ trả ra -1
                setStateArrResume(foundObjInArray);
        }catch(err){
            console.log('err:', err);
        }
    }

        // đặt trong hàm
    const [stateObjCV, setStateObjCV] = useState<stateObjType>({})
    const [stateArrSkill1, setStateArrSkill1] = useState<any[]>([]);
    const [stateArrSkill2, setStateArrSkill2] = useState<any[]>([]);
    const [stateArrSkill3, setStateArrSkill3] = useState<any[]>([]);
    const viewDetailsResume = (idresume:number) => {

        const obj = stateArrResume.find((item) => item.idresume === idresume);
        setStateObjCV(obj);
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
    const deleteResume = async (idresume:number) => {

        if (window.confirm("Are you sure you want to delete ?") == false) {
            return
        }

        let response: any;
        try {
            response = await collectionAPI.deleteResumetemplate(idresume);
            // console.log("response: " + JSON.stringify(response, null, 4));
            const obj = getUserSignIn(); // phải lấy từ gốc ra, ko lấy từ state, vì nó chưa cập nhật kịp;
            const idcandidate = obj!.idcandidate;
            let foundObjInArray = response.data.filter((item:any) => item.idcandidate === idcandidate);//tìm thấy sẽ trả ra mảng chứa object được tìm thấy, có thể tìm thấy nhiều object thoả điều kiện, còn ko nó sẽ trả ra -1
            setStateArrResume(foundObjInArray);
        }catch(err){
            console.log('err:', err);
        }
    
    }

    const convertObjectToCSV = (objectData:any) => {
        // Convert the object data to CSV format
        const headers = Object.keys(objectData);
        const csvRows = [headers.map((header) => '"' + objectData[header] + '"').join(',')];
        return csvRows.join('\n');
    };

    // console.log('stateObjCV: ' + JSON.stringify(stateObjCV, null, 4));
    const downloadObjectAsCSV = (objectData:any, fileName:any) => {
        const csvString = convertObjectToCSV(objectData);
    
        // Create a Blob from the CSV string
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    
        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);
    
        // Create a link element
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.setAttribute('download', fileName);
    
        // Append the link to the body and click it
        document.body.appendChild(downloadLink);
        downloadLink.click();
    
        // Clean up
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
    };

    const handleDownload = () => {

        // downloadObjectAsCSV(data, 'example.csv');
    };
    const downloadCSV = (idresume:number) => {
    
        downloadObjectAsCSV(stateObjCV, 'example.csv');
    
    }

    useEffect(() => {
        const obj = getUserSignIn();
        setStateUserSignIn(obj);
        getData_AllCVPosted();
    },[]);
    return (
        <div className={clsx(styles.component_CreateResume)}>

            
            <div className={clsx(styles.viewController)}>
                <ToggleButtonGroup
                    orientation="horizontal"
                    value={stateViewControl}
                    exclusive
                    onChange={handleChangeViewControl}
                >
                    <ToggleButton value="createCV" aria-label="createCV">
                        <span>Create CV</span>
                    </ToggleButton>
                    <ToggleButton value="postedCV" aria-label="postedCV">
                        <span>Posted CV</span>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            {(() => {
                if (stateViewControl === "createCV") {
                    return (
                        <div className={clsx(styles.viewCreateCV)}>
                            
                            <div className={clsx(styles.stepWrapper)}>
                                <p className={clsx(styles.step)}>Step 1:</p>
                                <p className={clsx(styles.explain)}>Please click on file to download sample excel file</p>
                                <div className={clsx(styles.btnWrapper)}>
                                    <button onClick={handleDownloadSample} className={clsx(styles.blue)}>
                                        Download sample
                                    </button>
                                </div>
                            </div>
                            <div className={clsx(styles.stepWrapper)}>
                                <p className={clsx(styles.step)}>Step 2:</p>
                                <p className={clsx(styles.explain)}>Please fill in your info in the column B of the excel file you just downloaded</p>
                                <div className={clsx(styles.btnWrapper)}>
                                
                                </div>
                            </div>
                            <div className={clsx(styles.stepWrapper2)}>
                                <p className={clsx(styles.step)}>Step 3:</p>
                                <div className={clsx(styles.rows)}>
                                    <div className={clsx(styles.line)}>
                                        <p className={clsx(styles.explain)}>After completion of step 2, please upload your excel file here</p>
                                        
                                        <div className={clsx(styles.btnGroup)}>
                                            <input type="file" 
                                            name="stateExcelFile" 
                                            accept=".xlsx, .xls" 
                                            onChange={handleFileUpload}
                                            ref={fileInputRef}
                                            />
                                            <button type="button" onClick={clearFileInput}>Clear File</button>
                                        </div>
                                    </div>
                                    <div className={clsx(styles.line)}>
                                        <p className={clsx(styles.explain)}>Upload your picture avatar here</p>
                                        <div className={clsx(styles.btnGroup)}>
                                            <input type="file" name="avatarFile" onChange={handleChangeAvatar} 
                                            ref={avatarInputRef}
                                            />
                                            <button type="button" onClick={clearFileAvartar}>Clear File</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(styles.errorWrapper)}>
                                {Object.entries(groupStateError).map(([key, value]) => {
                                    if (value.status) {
                                        return <p key={key} style={{ color: 'red' }}>{value.message}</p>;
                                    }
                                        return null;
                                })}
                            </div>
                            <div className={clsx(styles.stepWrapper)}>
                                <p className={clsx(styles.step)}>Step 4:</p>
                                <p className={clsx(styles.explain)}>Check below preview CV in different template, if you want to change any info, kindly redo from step 2. Otherwise you can download it now.</p>
                                <div className={clsx(styles.btnWrapper)}>
                                    <button onClick={downloadPDFViewCreateCV} type="button" className={clsx(styles.green)}>Download your CV</button>
                                    
                                </div>
                            </div>
                            <div className={clsx(styles.stepWrapper)}>
                                <p className={clsx(styles.step)}>Step 5:</p>
                                <p className={clsx(styles.explain)}>Submit your digital CV data into system, you can use this digital data to submit directly on any particular job</p>
                                <div className={clsx(styles.btnWrapper)}>
                                    <button onClick={submitDigitalCV} type="button" className={clsx(styles.green)}>Submit digital CV</button>
                                </div>
                            </div>
                            <div className={clsx(styles.templateMenuWrapper)}>
                                <div className={clsx(styles.left)}>
                                <p>Your CV would look the same below:</p>
                                </div>
                                <div className={clsx(styles.right)}>
                                    <div className={clsx(styles.btnWrapper)}>
                                        <ToggleButtonGroup
                                            orientation="horizontal"
                                            value={stateView}
                                            exclusive
                                            onChange={handleChangeViewTemplate}
                                        >
                                            <ToggleButton value="template1" aria-label="template1">
                                                <span>Template 1</span>
                                            </ToggleButton>
                                            <ToggleButton value="template2" aria-label="template2">
                                                <span>Template 2</span>
                                            </ToggleButton>
                                            <ToggleButton value="template3" aria-label="template3">
                                                <span>Template 3</span>
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(styles.main)}>
                                {/* <div id="PDFViewCreateCV"> */}
                                <div>
                                    <div className={clsx(styles.outerContainer)}>
                                        <div className={clsx(styles.innerContainer)}>
                                            <div className={clsx(styles.leftRight)}>
                                                <div className={clsx(styles.left, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
                                                    <div className={clsx(styles.avatarWrapper)}>
                                                        <img src={stateUrlAvatar} className="avatar" alt="avatar" />
                                                    </div>
                                                    <div className={clsx(styles.contactWrapper)}>
                                                        <h1>General info</h1>
                                                        <p className={clsx(styles.key)}>Name</p>
                                                        <p className={clsx(styles.value)}>{cv[0][1]}</p>
                                                        <p className={clsx(styles.key)}>Address</p>
                                                        <p className={clsx(styles.value)}>{cv[29][1]}</p>
                                                        <p className={clsx(styles.key)}>Phone</p>
                                                        <p className={clsx(styles.value)}>{cv[1][1]}</p>
                                                        <p className={clsx(styles.key)}>Email</p>
                                                        <p className={clsx(styles.value)}>{cv[2][1]}</p>
                                                        <p className={clsx(styles.key)}>Birth</p>
                                                        <p className={clsx(styles.value)}>{cv[4][1]}</p>
                                                        <p className={clsx(styles.key)}>Language</p>
                                                        <p className={clsx(styles.value)}>{cv[30][1]}</p>
                                                    </div>
                                                </div>
                                                <div className={clsx(styles.right)}>
                                                    <div className={clsx(styles.jobapply)}>
                                                        <h1 className={clsx(styles.title)}>Apply</h1>
                                                        <p className={clsx(styles.key)}>Position</p>
                                                        <p className={clsx(styles.value)}>{cv[31][1]}</p>
                                                        <p className={clsx(styles.key)}>Company</p>
                                                        <p className={clsx(styles.value)}>{cv[32][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.summaryWrapper)}>
                                                        <h1 className={clsx(styles.title)}>Summary</h1>
                                                        <p className={clsx(styles.value)}>{cv[3][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.education)}>
                                                        <h1 className={clsx(styles.title)}>Skill </h1>
                                                        <div className={clsx(styles.skillwrapper)}>
                                                            <div className={clsx(styles.col)}>
                                                                <p className={clsx(styles.key)}>{cv[5][1]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][2]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][3]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][4]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][5]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][6]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][7]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][8]}</p>
                                                            </div>
                                                            <div className={clsx(styles.col, styles.middle)}>
                                                                <p className={clsx(styles.key)}>{cv[6][1]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][2]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][3]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][4]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][5]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][6]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][7]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][8]}</p>
                                                            </div>
                                                            <div className={clsx(styles.col)}>
                                                                <p className={clsx(styles.key)}>{cv[7][1]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][2]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][3]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][4]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][5]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][6]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][7]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][8]}</p>
                                                            </div>
                                                        </div>
                                                        <h1 className={clsx(styles.title)}>Education </h1>
                                                        <div className={clsx(styles.row)}>
                                                            <p className={clsx(styles.key)}>University/College</p>
                                                            <p className={clsx(styles.value)}>{cv[21][1]}</p>
                                                        </div>
                                                        <div className={clsx(styles.row)}>
                                                            <p className={clsx(styles.key)}>Achievement</p>
                                                            <p className={clsx(styles.value)}>{cv[33][1]}</p>
                                                        </div>
                                                        <h1 className={clsx(styles.title)}>Certification </h1>
                                                        <ol>
                                                            <li>{cv[24][1]}</li>
                                                            <li>{cv[25][1]}</li>
                                                            <li>{cv[26][1]}</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={clsx(styles.experiencesWrapper)}>
                                                        
                                                <h1 className={clsx(styles.title)}>Experiences</h1>
                                                <div className={clsx(styles.row)}>
                                                    <div className={clsx(styles.left, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
                                                        <p className={clsx(styles.key)}>Position</p>
                                                        <p className={clsx(styles.value)}>{cv[11][1]}</p>
                                                        <p className={clsx(styles.key)}>Duration</p>
                                                        <p className={clsx(styles.value)}>{cv[13][1]}</p>
                                                        <p className={clsx(styles.key)}>Comany name</p>
                                                        <p className={clsx(styles.value)}>{cv[12][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.right)}>
                                                        <p className={clsx(styles.key)}>Describe</p>
                                                        <ul>
                                                            <li>{cv[14][0]}</li>
                                                            <li>{cv[14][1]}</li>
                                                            <li>{cv[14][2]}</li>
                                                            <li>{cv[14][3]}</li>
                                                            <li>{cv[14][4]}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <h1 className={clsx(styles.title)}>&nbsp;</h1>
                                                <div className={clsx(styles.row)}>
                                                    <div className={clsx(styles.left, styles.lastLeft, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
                                                        <p className={clsx(styles.key)}>Position</p>
                                                        <p className={clsx(styles.value)}>{cv[11][1]}</p>
                                                        <p className={clsx(styles.key)}>Duration</p>
                                                        <p className={clsx(styles.value)}>{cv[13][1]}</p>
                                                        <p className={clsx(styles.key)}>Comany name</p>
                                                        <p className={clsx(styles.value)}>{cv[12][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.right)}>
                                                        <p className={clsx(styles.key)}>Describe</p>
                                                        <ul>
                                                            <li>{cv[14][0]}</li>
                                                            <li>{cv[14][1]}</li>
                                                            <li>{cv[14][2]}</li>
                                                            <li>{cv[14][3]}</li>
                                                            <li>{cv[14][4]}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div>
                                    <div className={clsx(styles.outerContainer)}>
                                        <div className={clsx(styles.innerContainer)}>
                                            <div className={clsx(styles.leftRight)}>
                                                <div className={clsx(styles.left, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
                                                    <div className={clsx(styles.avatarWrapper)}>
                                                        <img src={stateUrlAvatar} className="avatar" alt="avatar" />
                                                    </div>
                                                    <div className={clsx(styles.contactWrapper)}>
                                                        <h1>General info</h1>
                                                        <p className={clsx(styles.key)}>Name</p>
                                                        <p className={clsx(styles.value)}>{cv[0][1]}</p>
                                                        <p className={clsx(styles.key)}>Address</p>
                                                        <p className={clsx(styles.value)}>{cv[29][1]}</p>
                                                        <p className={clsx(styles.key)}>Phone</p>
                                                        <p className={clsx(styles.value)}>{cv[1][1]}</p>
                                                        <p className={clsx(styles.key)}>Email</p>
                                                        <p className={clsx(styles.value)}>{cv[2][1]}</p>
                                                        <p className={clsx(styles.key)}>Birth</p>
                                                        <p className={clsx(styles.value)}>{cv[4][1]}</p>
                                                        <p className={clsx(styles.key)}>Language</p>
                                                        <p className={clsx(styles.value)}>{cv[30][1]}</p>
                                                    </div>
                                                </div>
                                                <div className={clsx(styles.right)}>
                                                    <div className={clsx(styles.jobapply)}>
                                                        <h1 className={clsx(styles.title)}>Apply</h1>
                                                        <p className={clsx(styles.key)}>Position</p>
                                                        <p className={clsx(styles.value)}>{cv[31][1]}</p>
                                                        <p className={clsx(styles.key)}>Company</p>
                                                        <p className={clsx(styles.value)}>{cv[32][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.summaryWrapper)}>
                                                        <h1 className={clsx(styles.title)}>Summary</h1>
                                                        <p className={clsx(styles.value)}>{cv[3][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.education)}>
                                                        <h1 className={clsx(styles.title)}>Skill </h1>
                                                        <div className={clsx(styles.skillwrapper)}>
                                                            <div className={clsx(styles.col)}>
                                                                <p className={clsx(styles.key)}>{cv[5][1]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][2]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][3]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][4]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][5]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][6]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][7]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][8]}</p>
                                                            </div>
                                                            <div className={clsx(styles.col, styles.middle)}>
                                                                <p className={clsx(styles.key)}>{cv[6][1]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][2]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][3]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][4]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][5]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][6]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][7]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][8]}</p>
                                                            </div>
                                                            <div className={clsx(styles.col)}>
                                                                <p className={clsx(styles.key)}>{cv[7][1]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][2]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][3]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][4]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][5]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][6]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][7]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][8]}</p>
                                                            </div>
                                                        </div>
                                                        <h1 className={clsx(styles.title)}>Education </h1>
                                                        <div className={clsx(styles.row)}>
                                                            <p className={clsx(styles.key)}>University/College</p>
                                                            <p className={clsx(styles.value)}>{cv[21][1]}</p>
                                                        </div>
                                                        <div className={clsx(styles.row)}>
                                                            <p className={clsx(styles.key)}>Achievement</p>
                                                            <p className={clsx(styles.value)}>{cv[33][1]}</p>
                                                        </div>
                                                        <h1 className={clsx(styles.title)}>Certification </h1>
                                                        <ol>
                                                            <li>{cv[24][1]}</li>
                                                            <li>{cv[25][1]}</li>
                                                            <li>{cv[26][1]}</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={clsx(styles.experiencesWrapper)}>
                                                        
                                                <h1 className={clsx(styles.title)}>Experiences</h1>
                                                <div className={clsx(styles.row)}>
                                                    <div className={clsx(styles.left, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
                                                        <p className={clsx(styles.key)}>Position</p>
                                                        <p className={clsx(styles.value)}>{cv[11][1]}</p>
                                                        <p className={clsx(styles.key)}>Duration</p>
                                                        <p className={clsx(styles.value)}>{cv[13][1]}</p>
                                                        <p className={clsx(styles.key)}>Comany name</p>
                                                        <p className={clsx(styles.value)}>{cv[12][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.right)}>
                                                        <p className={clsx(styles.key)}>Describe</p>
                                                        <ul>
                                                            <li>{cv[14][0]}</li>
                                                            <li>{cv[14][1]}</li>
                                                            <li>{cv[14][2]}</li>
                                                            <li>{cv[14][3]}</li>
                                                            <li>{cv[14][4]}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <h1 className={clsx(styles.title)}>&nbsp;</h1>
                                                <div className={clsx(styles.row)}>
                                                    <div className={clsx(styles.left, styles.lastLeft, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
                                                        <p className={clsx(styles.key)}>Position</p>
                                                        <p className={clsx(styles.value)}>{cv[11][1]}</p>
                                                        <p className={clsx(styles.key)}>Duration</p>
                                                        <p className={clsx(styles.value)}>{cv[13][1]}</p>
                                                        <p className={clsx(styles.key)}>Comany name</p>
                                                        <p className={clsx(styles.value)}>{cv[12][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.right)}>
                                                        <p className={clsx(styles.key)}>Describe</p>
                                                        <ul>
                                                            <li>{cv[14][0]}</li>
                                                            <li>{cv[14][1]}</li>
                                                            <li>{cv[14][2]}</li>
                                                            <li>{cv[14][3]}</li>
                                                            <li>{cv[14][4]}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div id="PDFViewCreateCV">
                                    <div className={clsx(styles.outerContainerViewCreatePRINT)}>
                                        <div className={clsx(styles.innerContainer)}>
                                            <div className={clsx(styles.leftRight)}>
                                                <div className={clsx(styles.left, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
                                                    <div className={clsx(styles.avatarWrapper)}>
                                                        <img src={stateUrlAvatar} className="avatar" alt="avatar" />
                                                    </div>
                                                    <div className={clsx(styles.contactWrapper)}>
                                                        <h1>General info</h1>
                                                        <p className={clsx(styles.key)}>Name</p>
                                                        <p className={clsx(styles.value)}>{cv[0][1]}</p>
                                                        <p className={clsx(styles.key)}>Address</p>
                                                        <p className={clsx(styles.value)}>{cv[29][1]}</p>
                                                        <p className={clsx(styles.key)}>Phone</p>
                                                        <p className={clsx(styles.value)}>{cv[1][1]}</p>
                                                        <p className={clsx(styles.key)}>Email</p>
                                                        <p className={clsx(styles.value)}>{cv[2][1]}</p>
                                                        <p className={clsx(styles.key)}>Birth</p>
                                                        <p className={clsx(styles.value)}>{cv[4][1]}</p>
                                                        <p className={clsx(styles.key)}>Language</p>
                                                        <p className={clsx(styles.value)}>{cv[30][1]}</p>
                                                    </div>
                                                </div>
                                                <div className={clsx(styles.right)}>
                                                    <div className={clsx(styles.jobapply)}>
                                                        <h1 className={clsx(styles.title)}>Apply</h1>
                                                        <p className={clsx(styles.key)}>Position</p>
                                                        <p className={clsx(styles.value)}>{cv[31][1]}</p>
                                                        <p className={clsx(styles.key)}>Company</p>
                                                        <p className={clsx(styles.value)}>{cv[32][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.summaryWrapper)}>
                                                        <h1 className={clsx(styles.title)}>Summary</h1>
                                                        <p className={clsx(styles.value)}>{cv[3][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.education)}>
                                                        <h1 className={clsx(styles.title)}>Skill </h1>
                                                        <div className={clsx(styles.skillwrapper)}>
                                                            <div className={clsx(styles.col)}>
                                                                <p className={clsx(styles.key)}>{cv[5][1]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][2]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][3]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][4]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][5]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][6]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][7]}</p>
                                                                <p className={clsx(styles.value)}>{cv[5][8]}</p>
                                                            </div>
                                                            <div className={clsx(styles.col, styles.middle)}>
                                                                <p className={clsx(styles.key)}>{cv[6][1]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][2]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][3]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][4]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][5]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][6]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][7]}</p>
                                                                <p className={clsx(styles.value)}>{cv[6][8]}</p>
                                                            </div>
                                                            <div className={clsx(styles.col)}>
                                                                <p className={clsx(styles.key)}>{cv[7][1]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][2]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][3]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][4]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][5]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][6]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][7]}</p>
                                                                <p className={clsx(styles.value)}>{cv[7][8]}</p>
                                                            </div>
                                                        </div>
                                                        <h1 className={clsx(styles.title)}>Education </h1>
                                                        <div className={clsx(styles.row)}>
                                                            <p className={clsx(styles.key)}>University/College</p>
                                                            <p className={clsx(styles.value)}>{cv[21][1]}</p>
                                                        </div>
                                                        <div className={clsx(styles.row)}>
                                                            <p className={clsx(styles.key)}>Achievement</p>
                                                            <p className={clsx(styles.value)}>{cv[33][1]}</p>
                                                        </div>
                                                        <h1 className={clsx(styles.title)}>Certification </h1>
                                                        <ol>
                                                            <li>{cv[24][1]}</li>
                                                            <li>{cv[25][1]}</li>
                                                            <li>{cv[26][1]}</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={clsx(styles.experiencesWrapper)}>
                                                        
                                                <h1 className={clsx(styles.title)}>Experiences</h1>
                                                <div className={clsx(styles.row)}>
                                                    <div className={clsx(styles.left, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
                                                        <p className={clsx(styles.key)}>Position</p>
                                                        <p className={clsx(styles.value)}>{cv[11][1]}</p>
                                                        <p className={clsx(styles.key)}>Duration</p>
                                                        <p className={clsx(styles.value)}>{cv[13][1]}</p>
                                                        <p className={clsx(styles.key)}>Comany name</p>
                                                        <p className={clsx(styles.value)}>{cv[12][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.right)}>
                                                        <p className={clsx(styles.key)}>Describe</p>
                                                        <ul>
                                                            <li>{cv[14][0]}</li>
                                                            <li>{cv[14][1]}</li>
                                                            <li>{cv[14][2]}</li>
                                                            <li>{cv[14][3]}</li>
                                                            <li>{cv[14][4]}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <h1 className={clsx(styles.title)}>&nbsp;</h1>
                                                <div className={clsx(styles.row)}>
                                                    <div className={clsx(styles.left, styles.lastLeft, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
                                                        <p className={clsx(styles.key)}>Position</p>
                                                        <p className={clsx(styles.value)}>{cv[11][1]}</p>
                                                        <p className={clsx(styles.key)}>Duration</p>
                                                        <p className={clsx(styles.value)}>{cv[13][1]}</p>
                                                        <p className={clsx(styles.key)}>Comany name</p>
                                                        <p className={clsx(styles.value)}>{cv[12][1]}</p>
                                                    </div>
                                                    <div className={clsx(styles.right)}>
                                                        <p className={clsx(styles.key)}>Describe</p>
                                                        <ul>
                                                            <li>{cv[14][0]}</li>
                                                            <li>{cv[14][1]}</li>
                                                            <li>{cv[14][2]}</li>
                                                            <li>{cv[14][3]}</li>
                                                            <li>{cv[14][4]}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                else if (stateViewControl === "postedCV") {
                    return (
                        <div className={clsx(styles.viewPostedCV)}>
                            <div className={clsx(styles.listResume)}>
                                <div className={clsx(styles.heading)}>
                                    <p>#</p>
                                    <p>fullname</p>
                                    <p>email</p>
                                    <p>level</p>
                                    <p>companyapply</p>
                                    <p>jobapply</p>
                                    <p>action</p>
                                </div>
                                {
                                    stateArrResume.map((obj, index) => {
                                        return ( 
                                            <div className={clsx(styles.row)} key={obj.idresume}>
                                                <p>{index+1}</p>
                                                <p>{obj.fullname}</p>
                                                <p>{obj.email}</p>
                                                <p>{obj.level}</p>
                                                <p>{obj.companyapply}</p>
                                                <p>{obj.jobapply}</p>
                                                <div className={clsx(styles.btnWrapper)}>
                                                    <button onClick={()=>viewDetailsResume(obj.idresume)} className={clsx(styles.view)}>View</button>
                                                    <button onClick={()=>deleteResume(obj.idresume)} className={clsx(styles.delete)}>Delete</button>
                                                    <button onClick={()=>downloadCSV(obj.idresume)} className={clsx(styles.csv)}>download CSV</button>
                                                    <button onClick={()=>downloadPDFViewPostedCV()} className={clsx(styles.pdf)}>download PDF</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/* <div id="PDFViewPostedCV"> */}
                            <div>
                                <div className={clsx(styles.outerContainer)}>
                                    <div className={clsx(styles.innerContainer)}>
                                        <div className={clsx(styles.leftRight)}>
                                            <div className={clsx(styles.left, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
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
                                            <div className={clsx(styles.left, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
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
                                                <div className={clsx(styles.left, styles.lastLeft, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
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
                            <div id="PDFViewPostedCV">
                                <div className={clsx(styles.outerContainerViewPostedPRINT)}>
                                    <div className={clsx(styles.innerContainer)}>
                                        <div className={clsx(styles.leftRight)}>
                                            <div className={clsx(styles.left, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
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
                                            <div className={clsx(styles.left, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
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
                                                <div className={clsx(styles.left, styles.lastLeft, {[styles.template2]: stateStringViewTemplate2}, {[styles.template3]: stateStringViewTemplate3})}>
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
            })()}
        </div>
    )
}
export default CreateResume
