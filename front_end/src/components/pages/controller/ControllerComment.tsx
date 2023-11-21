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
// import { onUserclick } from '../../../../features/showroomSlice';
import { getSession, getUserSignIn, getCurrentDateTimeWithTimezoneOffset, getTypeOfComment} from '../../share/sharedFunction';

type stateObj = { // đặt ngoài function
[key: string]: any;
};

// interface UserSignIn {
//     idcandidate: number;
//     fullname: string;
//     email: string;
//     password: string;
//     phone: string;
//     dob: string;
//     urlavatar: string;
//     status: string;
// }

function ManageComment() {

const [open, setOpen] = useState(true);
const [stateArrAll, setStateArrAll] = useState<any[]>([])
const [stateArrPositive, setStateArrPositive] = useState<any[]>([])
const [stateArrNegative, setStateArrNegative] = useState<any[]>([])
const [stateArrUnknown, setStateArrUnknown] = useState<any[]>([])
const [stateArrQuestionNotYetReply, setStateArrQuestionNotYetReply] = useState<any[]>([])
const [stateArrQuestionReplied, setStateArrQuestionReplied] = useState<any[]>([])
const [stateArrAnswer, setStateArrAnswer] = useState<any[]>([])
const [stateArrDangerous, setStateArrDangerous] = useState<any[]>([])
const [stateUserSignIn, setStateUserSignIn] = useState<stateObj>(); // chứa object user sign in

const splitController = (arr: any) => {
// hàm này dùng để phân rã controller thành all, admin và staff
    
    let arrPos: any[] = [];
    let arrNeg: any[] = [];
    let arrUnk: any[] = [];
    let arrQueNot: any[] = [];
    let arrQueReplied: any[] = [];
    let arrAns: any[] = [];
    let arrDag: any[] = [];
    arr.forEach((obj: any) => {
        
        if (obj.type === "positive"){
            arrPos.push(obj);
        }
        else if(obj.type === "negative"){
            arrNeg.push(obj);
        }
        else if(obj.type === "unknown"){
            arrUnk.push(obj);
        }
        else if(obj.type === "question" && obj.reply === "not yet"){
            arrQueNot.push(obj);
        }
        else if(obj.type === "question" && obj.reply === "replied"){
            arrQueReplied.push(obj);
        }
        else if(obj.type === "answer"){
            arrAns.push(obj);
        }
        else if(obj.type === "dangerous"){
            arrDag.push(obj);
        }
    });
    setStateArrAll(arr);
    setStateArrPositive(arrPos);
    setStateArrNegative(arrNeg);
    setStateArrUnknown(arrUnk);
    setStateArrQuestionNotYetReply(arrQueNot);
    setStateArrQuestionReplied(arrQueReplied);
    setStateArrAnswer(arrAns);
    setStateArrDangerous(arrDag);
}

const getData_allReview = async () => {
    try {
        const response: any = await collectionAPI.findAllReview(); //phải có await nghĩa là khi nào có data rồi thì mới lấy

        splitController(response.data);

    }catch(err){
        console.log('err:', err);
    }
}

const switchStatusReview = async (id: number,status:string) => {
    let switchStatus = "";
    if(status == "enable"){

        switchStatus = "disable";
    }
    else {
        switchStatus = "enable";
    }
    //js_fu_lambda_find_lay_object_dau_tien_duoc_tim_thay_thoa_dieu_kien
    
    //filter là trả ra mảng chứa nhiều object thoả điều kiện, còn find là trả ra object đầu tiên được tìm thấy thoả điều kiện
    
    let obj = stateArrAll.find((item) => item.id === id); //lấy một object đầu tiên được tìm thấy mà thoả điều kiện
    obj.status = switchStatus;
    console.log('obj: ', obj);

    try {
        const response: any = await collectionAPI.editReview(obj); //phải có await nghĩa là khi nào có data rồi thì mới lấy

        splitController(response.data);

    }catch(err){
        console.log('err:', err);
    }
        
}
// ------------------------------------------------------------------------edit review start

const [stateReviewNeedToEdit, setStateReviewNeedToEdit] = useState<stateObj>({}); // object
const [stateEdit, setStateEdit] = useState<string>('');
const [stateViewEditDialog, setStateViewEditDialog] = useState(false); // boolean

const onClearBackShadow = () => {
    setStateBackShadow(false);
    setStateViewReply(false);
    setStateViewAnswer(false);
    setStateViewEditDialog(false);
    setStateIsViewDetailsAppear(false);
}
const onEdit = (id: number) => {

    let reviewEdit = stateArrAll.find((item) => item.id === id); //lấy một object đc yêu cầu edit
    setStateReviewNeedToEdit(reviewEdit);
    if(reviewEdit.idcontroller !== stateUserSignIn!.idcontroller){
        return alert("You can not edit other people's review");
    }
    setStateEdit(reviewEdit.content);
    setStateViewEditDialog(true);
    setStateBackShadow(true);
}

const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateEdit(event.target.value);
}
const sendEdit = async () => {
    let currentPostdate = getCurrentDateTimeWithTimezoneOffset()

    let data = stateReviewNeedToEdit;
    data.content = stateEdit;
    data.postdate = currentPostdate;

    let response: any;

    try {
        response = await collectionAPI.editReview(data); // sau khi add xong thì thì bên java ta cho nó trả về viewreview luôn để nó cập nhật lại data về review
       // console.log("response: " + JSON.stringify(response, null, 4));
        splitController(response.data);

    }catch(err){
        console.log('err:', err);
    }

    onClearBackShadow();
}
// ------------------------------------------------------------------------edit review end

// ------------------------------------------------------------------------reply review start
const [stateBackShadow, setStateBackShadow] = useState(false);

const [stateReply, setStateReply] = useState<string>('');

const handleChangeReply = (event: React.ChangeEvent<HTMLInputElement>) => {
        
    setStateReply(event.target.value);
        
}

const [stateViewReply, setStateViewReply] = useState(false); // boolean
const [stateReviewClicked, setStateReviewClicked] = useState<stateObj>({}); // object
const onReply = (id: number) => {
    let obj = stateArrAll.find((item) => item.id === id); //lấy một object đầu tiên được tìm thấy mà thoả điều kiện
    setStateReviewClicked(obj);
    setStateViewReply(true);
    setStateBackShadow(true);

}
const sendReply = async () => {
    let idgroup = stateReviewClicked.idgroup;
    let idreview = stateReviewClicked.idreview+1;
    let idcompany = stateReviewClicked.idcompany;
    let idcontroller = stateUserSignIn!.idcontroller;
    let postdate = getCurrentDateTimeWithTimezoneOffset();
    let type = getTypeOfComment(stateReply);
    let status = "enable";
    if (type == "dangerous"){
        status = "disable"
    }

    const data1 = 
    {
        "idgroup": idgroup,
        "idreview": idreview,
        "idcandidate": 0,
        "idcontroller": idcontroller,
        "idemployer": 0,
        "idcompany": idcompany,
        "content": stateReply,
        "postdate": postdate,
        "type": "answer",
        "status": status,
        "reply": "replied"
    };
    console.log('data: ' + JSON.stringify(data1, null, 4));

    let response1: any;
    try {
       response1 = await collectionAPI.addReview(data1); // sau khi add xong thì thì bên java ta cho nó trả về viewreview luôn để nó cập nhật lại data về review
       // console.log("response: " + JSON.stringify(response, null, 4));
        splitController(response1.data);

    }catch(err){
        console.log('err:', err);
    }
    let response2: any;

    let data2 = stateReviewClicked
    data2.reply = "replied"
    try {
       response2 = await collectionAPI.editReview(data2); // sau khi add xong thì thì bên java ta cho nó trả về viewreview luôn để nó cập nhật lại data về review
       // console.log("response: " + JSON.stringify(response, null, 4));
        splitController(response2.data);

    }catch(err){
        console.log('err:', err);
    }
    setStateReply("");
    setStateViewReply(false);
    setStateBackShadow(false);
}

const [stateQuestion, setStateQuestion] = useState<stateObj>({}); // object
const [stateAnswer, setStateAnswer] = useState<stateObj>({}); // object
const [stateViewAnswer, setStateViewAnswer] = useState(false); // boolean

const onViewAnswer = (id:number) => {
    
    let questions = stateArrAll.find((item) => item.id === id); //lấy một object đầu tiên được tìm thấy mà thoả điều kiện
    setStateQuestion(questions);
    let idreview_of_answer = questions.idreview+1;
    let answer = stateArrAll.find((item) => item.idreview === idreview_of_answer); //lấy một object đầu tiên được tìm thấy mà thoả điều kiện

    setStateAnswer(answer);
    setStateViewAnswer(true);
    setStateBackShadow(true);
}
// ------------------------------------------------------------------------reply review end
// ------------------------------------------------------------------------view review start

const [stateObjClicked, setStateObjClicked] = useState<stateObj>({}); // chứa data của job được click vào
const [stateIsViewDetailsAppear, setStateIsViewDetailsAppear] = useState(false);
const onView = (id: number) => {
    // console.log("idcontroller: " + idcontroller);
    // console.log(stateArrAll);
    const obj = stateArrAll.find((item) => item.id === id); //lấy một object đầu tiên được tìm thấy mà thoả điều kiện
    setStateObjClicked(obj)
    setStateIsViewDetailsAppear(true);
    setStateBackShadow(true);

}

// ------------------------------------------------------------------------view review end

const onCancelDialog = () => {
    setStateIsViewDetailsAppear(!stateIsViewDetailsAppear);
    setStateObjClicked({}); // cho cái state object về rỗng
}

// const onAdd = () => {
            
//     localStorage.setItem('activeComponent', 'AddUser.tsx');//lưu vào localstorage để khi refresh nó ko mất, và vẫn giữ mình ở component này
//     setActiveComponent('AddUser.tsx')
// }
    // yêu cầu hàm getData() chạy 1 lần mỗi khi component Home mount, để lấy dữ liệu mảng products từ  nodejs để đổ ra frontend reactjs
useEffect(() => {
    getData_allReview();
}, []);
const [stateView, setStateView] = React.useState('all');

const handleChangeView = (event: React.MouseEvent<HTMLElement>, kindOfView: string) => {
    // kindOfView nó sẽ lấy giá trị value="module" value="list" value="quilt" từ ToggleButton nào đc click vào
    setStateView(kindOfView);
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

useEffect(() => {
    const obj = getUserSignIn();
    setStateUserSignIn(obj);
    console.log('obj: ', obj);
},[]);
return (
    <div className={clsx(styles.component_ManageComment)}>
        <div className={clsx(styles.main)}>
            <div className={clsx(styles.headerWrapper)}>
                <h1>MANAGE COMMENTS</h1>
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
                        <ToggleButton value="all" aria-label="all" className={clsx(styles.all)}>
                            {/* <ViewModuleIcon /> */}
                            <span className={clsx(styles.kind)}>all</span>
                        </ToggleButton>
                        <ToggleButton value="positive" aria-label="positive" className={clsx(styles.positive)}>
                            {/* <ViewListIcon /> */}
                            <span className={clsx(styles.kind)}>positive</span>
                        </ToggleButton>
                        <ToggleButton value="negative" aria-label="negative" className={clsx(styles.negative)}>
                            {/* <ViewQuiltIcon /> */}
                            <span className={clsx(styles.kind)}>negative</span>
                        </ToggleButton>
                        <ToggleButton value="unknown" aria-label="unknown" className={clsx(styles.unknown)}>
                            {/* <ViewQuiltIcon /> */}
                            <span className={clsx(styles.kind)}>unknown</span>
                        </ToggleButton>
                        <ToggleButton value="question not yet reply" aria-label="question not yet reply" className={clsx(styles.notyet)}>
                            {/* <ViewQuiltIcon /> */}
                            <span className={clsx(styles.kind)}>question not yet reply</span>
                        </ToggleButton>
                        <ToggleButton value="question replied" aria-label="question replied" className={clsx(styles.replied)}>
                            {/* <ViewQuiltIcon /> */}
                            <span className={clsx(styles.kind)}>question replied</span>
                        </ToggleButton>
                        <ToggleButton value="answer" aria-label="answer" className={clsx(styles.answer)}>
                            {/* <ViewQuiltIcon /> */}
                            <span className={clsx(styles.kind)}>answer</span>
                        </ToggleButton>
                        <ToggleButton value="dangerous" aria-label="dangerous" className={clsx(styles.dangerous)}>
                            {/* <ViewQuiltIcon /> */}
                            <span className={clsx(styles.kind, styles.dangerous)}>dangerous</span>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {/* <AddIcon fontSize='large' className={clsx(styles.right)} onClick={()=>onAdd()}/> */}
                </div>
            </div>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.heading)}>
                    <p>#</p>
                    <p>Content</p>
                    <p>Postdate</p>
                    <p>Type</p>
                    <p>Status</p>
                    <p>Action</p>
                </div>   
                {(() => {
                    if (stateView === "all") {
                        return (
                            <div className={clsx(styles.viewWrapper)}>
                                {
                                    stateArrAll.slice(stateFrom, stateTo).map((obj, index) => {
                                        let datePart = obj.postdate.split('T')[0];

                                    return ( 
                                        <div className={clsx(styles.row)} key={obj.idreview}>
                                            <p>{index+1}</p>
                                            <p className={clsx(styles.content)}>{obj.content}</p>
                                            <p>{datePart}</p>
                                            <p>{obj.type}</p>
                                            <p>{obj.status}</p>
                                        
                                    
                                            <div className={clsx(styles.actionWrapper)}>
                                                {(() => {
                                                if (obj.status === "enable") {
                                                    return (
                                                        <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnDisable)}>Disable</button>
                                                    )
                                                } else if (obj.status === "disable") {
                                                    return (
                                                        <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnActivate)}>Enable</button>
                                                    )
                                                }
                                                })()}
                                                <button onClick={()=>onEdit(obj.id)} className={clsx(styles.btnEdit)}>Edit</button>
                                                <button onClick={()=>onView(obj.id)} className={clsx(styles.btnView)}>View</button>
                                            </div> 
                                        </div>
                                    
                                    )
                                    })
                                }
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
                        )
                    }
                    else if (stateView === "positive") {
                        return (
                            <div className={clsx(styles.viewWrapper)}>
                            {
                                stateArrPositive.slice(stateFrom, stateTo).map((obj, index) => {
                                    let datePart = obj.postdate.split('T')[0];

                                return ( 
                                    <div className={clsx(styles.row)} key={obj.idreview}>
                                        <p>{index+1}</p>
                                        <p className={clsx(styles.content)}>{obj.content}</p>
                                        <p>{datePart}</p>
                                        <p>{obj.type}</p>
                                        <p>{obj.status}</p>
                                    
                                
                                        <div className={clsx(styles.actionWrapper)}>
                                            {(() => {
                                            if (obj.status === "enable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnDisable)}>Disable</button>
                                                )
                                            } else if (obj.status === "disable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnActivate)}>Enable</button>
                                                )
                                            }
                                            })()}
                                            <button onClick={()=>onEdit(obj.id)} className={clsx(styles.btnEdit)}>Edit</button>
                                            <button onClick={()=>onView(obj.id)} className={clsx(styles.btnView)}>View</button>
                                        </div> 
                                    </div>
                                
                                )
                                })
                            }
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
                        )
                    }
                    else if (stateView === "negative") {
                        return (
                            <div className={clsx(styles.viewWrapper)}>
                            {
                                stateArrNegative.slice(stateFrom, stateTo).map((obj, index) => {
                                    let datePart = obj.postdate.split('T')[0];

                                return ( 
                                    <div className={clsx(styles.row)} key={obj.idreview}>
                                        <p>{index+1}</p>
                                        <p className={clsx(styles.content)}>{obj.content}</p>
                                        <p>{datePart}</p>
                                        <p>{obj.type}</p>
                                        <p>{obj.status}</p>
                                    
                                
                                        <div className={clsx(styles.actionWrapper)}>
                                            {(() => {
                                            if (obj.status === "enable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnDisable)}>Disable</button>
                                                )
                                            } else if (obj.status === "disable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnActivate)}>Enable</button>
                                                )
                                            }
                                            })()}
                                            <button onClick={()=>onEdit(obj.id)} className={clsx(styles.btnEdit)}>Edit</button>
                                            <button onClick={()=>onView(obj.id)} className={clsx(styles.btnView)}>View</button>
                                        </div> 
                                    </div>
                                
                                )
                                })
                            }
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
                        )
                    }
                    else if (stateView === "unknown") {
                        return (
                            <div className={clsx(styles.viewWrapper)}>
                            {
                                stateArrUnknown.slice(stateFrom, stateTo).map((obj, index) => {
                                    let datePart = obj.postdate.split('T')[0];

                                return ( 
                                    <div className={clsx(styles.row)} key={obj.idreview}>
                                        <p>{index+1}</p>
                                        <p className={clsx(styles.content)}>{obj.content}</p>
                                        <p>{datePart}</p>
                                        <p>{obj.type}</p>
                                        <p>{obj.status}</p>
                                    
                                
                                        <div className={clsx(styles.actionWrapper)}>
                                            {(() => {
                                            if (obj.status === "enable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnDisable)}>Disable</button>
                                                )
                                            } else if (obj.status === "disable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnActivate)}>Enable</button>
                                                )
                                            }
                                            })()}
                                            <button onClick={()=>onEdit(obj.id)} className={clsx(styles.btnEdit)}>Edit</button>
                                            <button onClick={()=>onView(obj.id)} className={clsx(styles.btnView)}>View</button>
                                        </div> 
                                    </div>
                                
                                )
                                })
                            }
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
                        )
                    }
                    else if (stateView === "question not yet reply") {
                        return (
                            <div className={clsx(styles.viewWrapper)}>
                            {
                                stateArrQuestionNotYetReply.slice(stateFrom, stateTo).map((obj, index) => {
                                    let datePart = obj.postdate.split('T')[0];

                                return ( 
                                    <div className={clsx(styles.row)} key={obj.idreview}>
                                        <p>{index+1}</p>
                                        <p className={clsx(styles.content)}>{obj.content}</p>
                                        <p>{datePart}</p>
                                        <p>{obj.type}</p>
                                        <p>{obj.status}</p>
                                    
                                
                                        <div className={clsx(styles.actionWrapper)}>
                                            {(() => {
                                            if (obj.status === "enable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnDisable)}>Disable</button>
                                                )
                                            } else if (obj.status === "disable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnActivate)}>Enable</button>
                                                )
                                            }
                                            })()}
                                            <button onClick={()=>onReply(obj.id)} className={clsx(styles.btnEdit)}>Answer</button>
                                            <button onClick={()=>onView(obj.id)} className={clsx(styles.btnView)}>View</button>
                                        </div> 
                                    </div>
                                
                                )
                                })
                            }
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
                        )
                    }
                    else if (stateView === "question replied") {
                        return (
                            <div className={clsx(styles.viewWrapper)}>
                            {
                                stateArrQuestionReplied.slice(stateFrom, stateTo).map((obj, index) => {
                                    let datePart = obj.postdate.split('T')[0];

                                    return ( 
                                        <div className={clsx(styles.row)} key={obj.idreview}>
                                            <p>{index+1}</p>
                                            <p className={clsx(styles.content)}>{obj.content}</p>
                                            <p>{datePart}</p>
                                            <p>{obj.type}</p>
                                            <p>{obj.status}</p>
                                        
                                    
                                            <div className={clsx(styles.actionWrapper)}>
                                                {(() => {
                                                if (obj.status === "enable") {
                                                    return (
                                                        <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnDisable)}>Disable</button>
                                                    )
                                                } else if (obj.status === "disable") {
                                                    return (
                                                        <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnActivate)}>Enable</button>
                                                    )
                                                }
                                                })()}
                                                <button onClick={()=>onEdit(obj.id)} className={clsx(styles.btnEdit)}>Edit</button>
                                                <button onClick={()=>onViewAnswer(obj.id)} className={clsx(styles.btnView)}>View Answer</button>
                                            </div> 
                                        </div>
                                    )
                                })
                            }
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
                        )
                    }
                    else if (stateView === "answer") {
                        return (
                            <div className={clsx(styles.viewWrapper)}>
                            {
                                stateArrAnswer.slice(stateFrom, stateTo).map((obj, index) => {
                                    let datePart = obj.postdate.split('T')[0];

                                return ( 
                                    <div className={clsx(styles.row)} key={obj.idreview}>
                                        <p>{index+1}</p>
                                        <p className={clsx(styles.content)}>{obj.content}</p>
                                        <p>{datePart}</p>
                                        <p>{obj.type}</p>
                                        <p>{obj.status}</p>
                                    
                                
                                        <div className={clsx(styles.actionWrapper)}>
                                            {(() => {
                                            if (obj.status === "enable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnDisable)}>Disable</button>
                                                )
                                            } else if (obj.status === "disable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnActivate)}>Enable</button>
                                                )
                                            }
                                            })()}
                                            <button onClick={()=>onEdit(obj.id)} className={clsx(styles.btnEdit)}>Edit</button>
                                            <button onClick={()=>onView(obj.id)} className={clsx(styles.btnView)}>View</button>
                                        </div> 
                                    </div>
                                
                                )
                                })
                            }
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
                        )
                    }
                    else if (stateView === "dangerous") {
                        return (
                            <div className={clsx(styles.viewWrapper)}>
                            {
                                stateArrDangerous.slice(stateFrom, stateTo).map((obj, index) => {
                                    let datePart = obj.postdate.split('T')[0];

                                return ( 
                                    <div className={clsx(styles.row)} key={obj.idreview}>
                                        <p>{index+1}</p>
                                        <p className={clsx(styles.content)}>{obj.content}</p>
                                        <p>{datePart}</p>
                                        <p>{obj.type}</p>
                                        <p>{obj.status}</p>
                                    
                                
                                        <div className={clsx(styles.actionWrapper)}>
                                            {(() => {
                                            if (obj.status === "enable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnDisable)}>Disable</button>
                                                )
                                            } else if (obj.status === "disable") {
                                                return (
                                                    <button onClick={()=>switchStatusReview(obj.id,obj.status)} className={clsx(styles.btnActivate)}>Enable</button>
                                                )
                                            }
                                            })()}
                                            <button onClick={()=>onEdit(obj.id)} className={clsx(styles.btnEdit)}>Edit</button>
                                            <button onClick={()=>onView(obj.id)} className={clsx(styles.btnView)}>View</button>
                                        </div> 
                                    </div>
                                
                                )
                                })
                            }
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
                        )
                    }
                })()}
            </div>
        </div>
        <div className={clsx(styles.backShadow, {[styles.appear]: stateBackShadow})} onClick={onClearBackShadow}>
        </div>

        <div className={clsx(styles.viewDetailsDialog, {[styles.appear]: stateIsViewDetailsAppear})}>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>Content:</p><p className={clsx(styles.value)}>{stateObjClicked.content}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>Post date:</p><p className={clsx(styles.value)}>{stateObjClicked.postdate}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>Type:</p><p className={clsx(styles.value)}>{stateObjClicked.type}</p>
            </div>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>Status:</p><p className={clsx(styles.value)}>{stateObjClicked.status}</p>
            </div>
        </div>

        <div className={clsx(styles.viewReplyDialog, {[styles.appear]: stateViewReply})}>
            <div className={clsx(styles.row)}>
            <p className={clsx(styles.key)}>Question:</p><p className={clsx(styles.value)}>{stateReviewClicked.content}</p>
            </div>
            <b className={clsx(styles.reply)}>Reply:</b>
            <div className={clsx(styles.row2)}>
                <input type="text" name="stateReply" value={stateReply} onChange={handleChangeReply} required/>
                <div className={clsx(styles.btnWrapper)}>
                    <button onClick={sendReply}>Send</button>
                    
                </div>
            </div>
        </div>

        <div className={clsx(styles.viewEditDialog, {[styles.appear]: stateViewEditDialog})}>
            <div className={clsx(styles.row2)}>
                <input type="text" name="stateEdit" value={stateEdit} onChange={handleChangeEdit} required/>
                <div className={clsx(styles.btnWrapper)}>
                    <button onClick={sendEdit}>Send</button>
                    
                </div>
            </div>
        </div>

        <div className={clsx(styles.viewAnswerDialog, {[styles.appear]: stateViewAnswer})}>
            <div className={clsx(styles.row)}>
                <p className={clsx(styles.key)}>Question:</p><p className={clsx(styles.value)}>{stateQuestion.content}</p>
            </div>
            <div className={clsx(styles.row)}>
                <p className={clsx(styles.key)}>Answer:</p><p className={clsx(styles.value)}>{stateAnswer.content}</p>
            </div>

        </div>
    </div>
                

)
}
export default ManageComment

