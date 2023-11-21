import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from './EmployerListPostedJob.module.scss' 
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

import { wait } from '../../share/sharedFunction';

//  export to pdf
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function EmployerListPostedJob() {
    const [stateArrAll, setStateArrAll] = useState<any[]>([])
    const [stateArrAllFinal, setStateArrAllFinal] = useState<any[]>([])
    const [stateArrAdmin, setStateArrAdmin] = useState<any[]>([])
    const [stateArrAdminFinal, setStateArrAdminFinal] = useState<any[]>([])
    const [stateArrStaff, setStateArrStaff] = useState<any[]>([])
    const [stateArrStaffFinal, setStateArrStaffFinal] = useState<any[]>([])
    const [stateBackShadow, setStateBackShadow] = useState(false);
    const [stateRole, setStateRole] = useState('admin');

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
        // setStateViewDialogAdd(true);
        // setStateBackShadow(true);
        navigate("/employer/postjob", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />

    }

    const [stateUrlAvatar, setStateUrlAvatar] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const arrDefaultImageTypes = ['image/png','image/jpeg', 'image/jpg']

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

 // -------------------------------------------------------edit controller start
    // import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
    
    const navigate = useNavigate(); //hook dùng để chuyển trang web
    
    const [stateViewDialogEdit, setStateViewDialogEdit] = useState(false);

       // đặt trong hàm
    const [stateEditUser, setStateEditUser] = useState<stateObj>({})
    const [stateEmailEdit, setStateEmailEdit] = useState(""); // // tại sao lại phải lấy email của obj muốn edit ? giải thích ở chỗ handleChange validate cái email, kéo lên trên xem
    const onEdit = (idjob: number) => {
        const obj = {idjobTobeEdit: idjob}
        console.log('idjob list posted job: ', idjob);
        setSessionWithExpiry(obj,'sessionidjobTobeEdit',2); // lưu vào session

        navigate("/employer/updateJob", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />

        // setStateBackShadow(true);
        // setStateViewDialogEdit(true);
        // const obj = stateArrAllFinal.find((item) => item.idjob === idjob);
        // setGroupState(obj);
        // setStateEmailEdit(obj.email); // tại sao lại phải lấy email của obj muốn edit ? giải thích ở chỗ handleChange validate cái email, kéo lên trên xem

    }
    const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault(); // prevent the default form submission behavior from occurring. This allows you to handle the form submission in a custom way, such as making asynchronous API calls, performing validation, updating state, or executing other logic.
 
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
    }
 // -------------------------------------------------------search end
 // -------------------------------------------------------sort start
    const [stateSortIcon, setStateSortIcon] = useState("az"); // boolean
    const onSortFullName = (type:string) => {
    let arr = stateArrJobUnique;

    if(type == 'az'){
        setStateSortIcon('za');
        arr.sort((a, b) => a.jobtitle.localeCompare(b.jobtitle));
   
        const arrPending = arr.filter((obj:any) => obj.status == "pending")
        const arrApprove = arr.filter((obj:any) => obj.status == "approve" || obj.status == "approved")
        const arrComplete = arr.filter((obj:any) => obj.status == "complete")
        const arrPaid = arr.filter((obj:any) => obj.status == "paid")

        setStateArrJobUniquePending(arrPending);
        setStateArrJobUniqueApprove(arrApprove);
        setStateArrJobUniqueComplete(arrComplete);
        setStateArrJobUniquePaid(arrPaid);
    }
    else if(type == 'za'){
        setStateSortIcon('az');
        arr.sort((a, b) => b.jobtitle.localeCompare(a.jobtitle));
     
        const arrPending = arr.filter((obj:any) => obj.status == "pending")
        const arrApprove = arr.filter((obj:any) => obj.status == "approve" || obj.status == "approved")
        const arrComplete = arr.filter((obj:any) => obj.status == "complete")
        const arrPaid = arr.filter((obj:any) => obj.status == "paid")

        setStateArrJobUniquePending(arrPending);
        setStateArrJobUniqueApprove(arrApprove);
        setStateArrJobUniqueComplete(arrComplete);
        setStateArrJobUniquePaid(arrPaid);
    }
}
 // -------------------------------------------------------sort end
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

    const SwitchStatusUser = async (idcontroller: number) => {

    }

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
        
    const getData_findAllViewjobskillemployercompany = async () => {
        const response: any = await collectionAPI!.findAllViewjobskillemployercompany(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
        setStateArrJobOriginal(response.data);
        // console.log('response.data: ', response.data);

        const userSignIn = getUserSignIn(); //phải lấy user sign in trực tiếp ở đây, vì lấy thông qua state nó trễ nhịp
        // console.log('userSignIn.idcompany: ', userSignIn.idcompany);
        const arrJobOfThisCompany = response.data.filter((item:any) => item.idcompany === userSignIn.idcompany);//tìm thấy sẽ trả ra mảng chứa object được tìm thấy, có thể tìm thấy nhiều object thoả điều kiện, còn ko nó sẽ trả ra -1

        // Vì view đổ về nó có những object trùng idjob do mỗi idjob có nhiều skill, vì vậy mình chỉ lấy 1 cái idjob là đc
        let arrUniqueObject: any = [];
        arrJobOfThisCompany.forEach((obj:any) => {
            let flag = false;
            arrUniqueObject.forEach((item:any) => {
            
                if(obj.idjob === item.idjob){
                    flag = true;
                }
            });
            if(flag == false){
                arrUniqueObject.push(obj);
            }
        });
        setStateArrJobUnique(arrUniqueObject);

        const arrPending = arrUniqueObject.filter((obj:any) => obj.status == "pending")
        const arrApprove = arrUniqueObject.filter((obj:any) => obj.status == "approve" || obj.status == "approved")
        const arrComplete = arrUniqueObject.filter((obj:any) => obj.status == "complete")
        const arrPaid = arrUniqueObject.filter((obj:any) => obj.status == "paid")

        setStateArrJobUniquePending(arrPending);
        setStateArrJobUniqueApprove(arrApprove);
        setStateArrJobUniqueComplete(arrComplete);
        setStateArrJobUniquePaid(arrPaid);
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
        // setStateBackShadow(false);
        // setStateIsViewDetailsAppear(false);
        // setStateViewDialogAdd(false);
        // setStateViewDialogEdit(false);
        // onReset();

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
    getData_findAllViewjobskillemployercompany();
},[]);
// console.log('stateUserSignIn: ', stateUserSignIn);

   // input type checkbox ---------------------------------------------------start
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
        // splitData(response.data);
        }catch(err){
        console.log('err:', err);
    }
    }
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

   const [stateJobclicked, setStateJobClicked] = useState<stateObj>({}); // chứa data của job được click vào
   const [stateIdJobClicked, setStateIdJobClicked] = useState(0); // number

    const viewJobDetails = (idJobClicked: number) => {
        setStateIdJobClicked(idJobClicked);
        setStateIsViewDetailsAppear(!stateIsViewDetailsAppear);
        console.log("idJob: " + idJobClicked);

        const obj = stateArrJobUnique.find((item) => item.idjob === idJobClicked); //lấy một object đầu tiên được tìm thấy mà thoả điều kiện
        setStateJobClicked(obj)

    }//end viewJobDetails
    // console.log('stateJobclicked: ', stateJobclicked);
    const onCancelViewDetails = () => {
        setStateIsViewDetailsAppear(false);
        setStateJobClicked({}); // cho cái state object về rỗng
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
    
    const onViewCV = (idjob:number) => {
        // dẫn đến trang listAppliedCV
        setSessionWithExpiry(idjob,'idjobSelected',2)
        navigate("/employer/listappliedcv", { replace: true }); 
    }
    return (
        <div className={clsx(styles.component_EmployerListPostedJob)}>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.headerWrapper)}>
                    <h1>LIST POSTED JOB</h1>
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
                        <ToggleButton value="pending" aria-label="pending">
                            {/* <ViewListIcon /> */}
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
                    </ToggleButtonGroup>
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
                                        <p>Job Title</p>
                                        <p>salary</p>
                                        <p>Status</p>
                                        <div className={clsx(styles.heading_action)}>
                                            <p>Action</p>
                                        </div>
                                    </div>   
                                    <div className={clsx(styles.viewWrapper)}>
                                        {
                                            stateArrJobUnique.slice(stateFrom, stateTo).map((obj, index) => {
                                                return ( 
                                                <div className={clsx(styles.row)} key={obj.idcontroller}>
                                                    <p>{obj.jobtitle}</p>
                                                    <p>{obj.salary}</p>
                                                    <p>{obj.status}</p>
                                                
                                                    {/* {
                                                        obj.status === "disable" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                                    } */}
                                                    <div className={clsx(styles.actionWrapper)}>

                                                        <button onClick={()=>viewJobDetails(obj.idjob)} className={clsx(styles.btnView)}>View</button>
                                                        <button onClick={()=>onEdit(obj.idjob)} className={clsx(styles.btnView)}>Edit</button>
                                                        <button onClick={()=>onViewCV(obj.idjob)} className={clsx(styles.btnView)}>View applied CV</button>
                                                    
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
                        if (stateView === "pending") {
                            return (
                                <>
                                    <div className={clsx(styles.printPDF)} id="pdfAll">
                                    <div className={clsx(styles.heading)}>
                                        <p>Job Title</p>
                                        <p>salary</p>
                                        <p>Status</p>
                                        <div className={clsx(styles.heading_action)}>
                                            <p>Action</p>
                                        </div>
                                    </div>   
                                    <div className={clsx(styles.viewWrapper)}>
                                        {
                                            stateArrJobUniquePending.slice(stateFrom, stateTo).map((obj, index) => {
                                                console.log('stateView: ', stateView);
                                                // console.log('obj: ', obj);
                                                return ( 
                                                <div className={clsx(styles.row)} key={obj.idcontroller}>
                                                    <p>{obj.jobtitle}</p>
                                                    <p>{obj.salary}</p>
                                                
                                                    {
                                                        obj.status === "disable" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                                    }
                                                    <div className={clsx(styles.actionWrapper)}>
    
                                                        <button onClick={()=>viewJobDetails(obj.idjob)} className={clsx(styles.btnView)}>View</button>
                                                        <button onClick={()=>onEdit(obj.idjob)} className={clsx(styles.btnView)}>Edit</button>
                                                        {/* <div className={clsx(styles.checkbox)}>
                                                            <input
                                                                type="checkbox"
                                                                value={obj.idjob}
                                                                checked={checkedItems[obj.idjob] || false}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                        </div> */}
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
                        if (stateView === "approve") {
                            return (
                                <>
                                    <div className={clsx(styles.printPDF)} id="pdfAll">
                                    <div className={clsx(styles.heading)}>
                                        <p>Job Title</p>
                                        <p>salary</p>
                                        <p>Status</p>
                                        <div className={clsx(styles.heading_action)}>
                                            <p>Action</p>
                                        </div>
                                    </div>   
                                    <div className={clsx(styles.viewWrapper)}>
                                        {
                                            stateArrJobUniqueApprove.slice(stateFrom, stateTo).map((obj, index) => {
                                                return ( 
                                                <div className={clsx(styles.row)} key={obj.idcontroller}>
                                                    <p>{obj.jobtitle}</p>
                                                    <p>{obj.salary}</p>
                                                
                                                    {
                                                        obj.status === "disable" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                                    }
                                                    <div className={clsx(styles.actionWrapper)}>
    
                                                        <button onClick={()=>viewJobDetails(obj.idjob)} className={clsx(styles.btnView)}>View</button>
                                                        <button onClick={()=>onEdit(obj.idjob)} className={clsx(styles.btnView)}>Edit</button>
                                                        {/* <div className={clsx(styles.checkbox)}>
                                                            <input
                                                                type="checkbox"
                                                                value={obj.idjob}
                                                                checked={checkedItems[obj.idjob] || false}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                        </div> */}
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
                        if (stateView === "complete") {
                            return (
                                <>
                                    <div className={clsx(styles.printPDF)} id="pdfAll">
                                    <div className={clsx(styles.heading)}>
                                        <p>Job Title</p>
                                        <p>salary</p>
                                        <p>Status</p>
                                        <div className={clsx(styles.heading_action)}>
                                            <p>Action</p>
                                            {/* <div className={clsx(styles.switchStatusWrapper)}>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                    className={clsx(styles.menuGate)}
                                                    >
                                                    Switch status
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                    }}
                                                    className={clsx(styles.menuDialog)}
                                                    >
                                                    <MenuItem onClick={()=>switchStatusSelected('pending')} className={clsx(styles.item)}>pending</MenuItem>
                                                    <MenuItem onClick={()=>switchStatusSelected('approve')} className={clsx(styles.item)}>approve</MenuItem>
                                                    <MenuItem onClick={()=>switchStatusSelected('complete')} className={clsx(styles.item)}>complete</MenuItem>
                                                </Menu>
                                            </div> */}
                                        </div>
                                    </div>   
                                    <div className={clsx(styles.viewWrapper)}>
                                        {
                                            stateArrJobUniqueComplete.slice(stateFrom, stateTo).map((obj, index) => {
                                                return ( 
                                                <div className={clsx(styles.row)} key={obj.idcontroller}>
                                                    <p>{obj.jobtitle}</p>
                                                    <p>{obj.salary}</p>
                                                
                                                    {
                                                        obj.status === "disable" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                                    }
                                                    <div className={clsx(styles.actionWrapper)}>
    
                                                        <button onClick={()=>viewJobDetails(obj.idjob)} className={clsx(styles.btnView)}>View</button>
                                                        <button onClick={()=>onEdit(obj.idjob)} className={clsx(styles.btnView)}>Edit</button>
                                                        {/* <div className={clsx(styles.checkbox)}>
                                                            <input
                                                                type="checkbox"
                                                                value={obj.idjob}
                                                                checked={checkedItems[obj.idjob] || false}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                        </div> */}
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
                        if (stateView === "paid") {
                            return (
                                <>
                                    <div className={clsx(styles.printPDF)} id="pdfAll">
                                    <div className={clsx(styles.heading)}>
                                        <p>Job Title</p>
                                        <p>salary</p>
                                        <p>Status</p>
                                        <div className={clsx(styles.heading_action)}>
                                            <p>Action</p>
                                            {/* <div className={clsx(styles.switchStatusWrapper)}>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                    className={clsx(styles.menuGate)}
                                                    >
                                                    Switch status
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                    }}
                                                    className={clsx(styles.menuDialog)}
                                                    >
                                                    <MenuItem onClick={()=>switchStatusSelected('pending')} className={clsx(styles.item)}>pending</MenuItem>
                                                    <MenuItem onClick={()=>switchStatusSelected('approve')} className={clsx(styles.item)}>approve</MenuItem>
                                                    <MenuItem onClick={()=>switchStatusSelected('complete')} className={clsx(styles.item)}>complete</MenuItem>
                                                </Menu>
                                            </div> */}
                                        </div>
                                    </div>   
                                    <div className={clsx(styles.viewWrapper)}>
                                        {
                                            stateArrJobUniquePaid.slice(stateFrom, stateTo).map((obj, index) => {
                                                return ( 
                                                <div className={clsx(styles.row)} key={obj.idcontroller}>
                                                    <p>{obj.jobtitle}</p>
                                                    <p>{obj.salary}</p>
                                                
                                                    {
                                                        obj.status === "disable" ? <p style={{ color: 'red' }}>{obj.status}</p> : <p style={{ color: '#0d6efd' }}>{obj.status}</p>
                                                    }
                                                    <div className={clsx(styles.actionWrapper)}>
    
                                                        <button onClick={()=>viewJobDetails(obj.idjob)} className={clsx(styles.btnView)}>View</button>
                                                        <button onClick={()=>onEdit(obj.idjob)} className={clsx(styles.btnView)}>Edit</button>
                                                        {/* <div className={clsx(styles.checkbox)}>
                                                            <input
                                                                type="checkbox"
                                                                value={obj.idjob}
                                                                checked={checkedItems[obj.idjob] || false}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                        </div> */}
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
                    <button onClick={onCancelViewDetails} className={clsx(styles.cancel)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default EmployerListPostedJob