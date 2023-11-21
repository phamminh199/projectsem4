import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import { useSelector, useDispatch} from 'react-redux';
import styles from './test.module.scss';   

import { selectreduxStateIdjobForTest } from '../../../features/jobSlice';

// mui
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ListIcon from '@mui/icons-material/List';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import TimerIcon from '@mui/icons-material/Timer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import collectionAPI from '../../../API/collectionAPI';
import styled from 'styled-components';

import { getUserSignIn } from '../../share/sharedFunction';

import { wait} from '../../share/sharedFunction';

// apex chart
import ReactApexChart from 'react-apexcharts';

function Test() {
    // chart start -----------------------------------------------

    const [chartBarData, setChartBarData] = useState<any>({
        series: [
            {
                name: 'Correct answers',
                data: [7]
            }, {
                name: 'Wrong answer',
                data: [5]
            }, {
                name: 'Undone',
                data: [3]
            }       
        ],
        options: {
            chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            },
            plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                total: {
                    enabled: true,
                    offsetX: 0,
                    style: {
                    fontSize: '13px',
                    fontWeight: 900
                    }
                }
                }
            },
            },
            stroke: {
            width: 1,
            colors: ['#fff']
            },
            title: {
            text: 'Result analysis'
            },
            // xaxis: {
            // categories: [""],
            // labels: {
            //     formatter: function (val:any) {
            //     return val + "K"
            //     }
            // }
            // },
            yaxis: {
            title: {
                text: undefined
            },
            },
            tooltip: {
            y: {
                formatter: function (val:any) {
                return val + "K"
                }
            }
            },
            fill: {
            opacity: 1
            },
            legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
            }
        },
    
    });
    // chart end -----------------------------------------------
    // --------------------------------------------side bar start
    // Tạo state open, mặc định ban đầu cho true, tức là mở sẵn,
    const [open, setOpen] = useState(true);
//  Tạo ra 2 hàm openSidebar và closeSidebar dùng để cập nhật state open, nếu nhấn vào menu thì cho state open là true, nhấn vào close thì state open là false
    const openSidebar: any = () => {
        setOpen(true);
    }
    const closeSidebar: any = () => {
        setOpen(false);
    }
    // --------------------------------------------side bar end

    const questions = [
        {
            question: 1,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 2,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 3,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 4,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 5,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 6,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 7,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 8,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 9,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 10,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 11,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 12,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 13,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 14,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        },
        {
            question: 15,
            alreadyAnswered: false,
            point: 0,
            selectedAnswer: 0,
            questionDoingNow: false
        }
    ]

    const [stateCheckedRadio, setStateCheckedRadio] = useState(0);
    const [groupState, setGroupState] = useState(questions);

    // radio handle start-----------------------------------------------------------
    const selectRadio = (e:any) => {
        const { name, value } = e.target;
        // value là điểm số correct gán cho point (value={obj.correct} )
        // name là idanswer gán cho selectedAnswer (name={obj.idanswer})
        setGroupState((prev) => {
            return prev.map((questionObj) =>
            questionObj.question === stateQuestionIndex
                ? { ...questionObj, point: parseInt(value), alreadyAnswered: true, selectedAnswer: name}
                : questionObj
            );
        });
        setStateCheckedRadio(name);

    };
// radio handle end-----------------------------------------------------------
// progress bar start-----------------------------------------------------------

    const [stateNumprogress, setStateNumProgress] = useState(0); //đây là state tham số đầu vào dùng để thể hiện trên thanh progress bar
    const countHowManyQuestionsAnswered = () => { // đếm số câu đc làm để cập nhật progress bar
        
        let totalQuestionsAnswered = 0;
        groupState.forEach((obj:any,index:any) => {
            if(obj.alreadyAnswered == true){
                totalQuestionsAnswered += 1;
            }
        }) 
        setStateNumProgress(totalQuestionsAnswered);
    }

    useEffect(() => { // thực thi khối lệnh bên trong khi groupState có sự thay đổi
        countHowManyQuestionsAnswered();
        
    },[groupState]);
// progress bar end-----------------------------------------------------------
    type stateObjType = {
        [key: string]: any;
    };
        // đặt trong hàm
    const [stateQuestionIndex, setStateQuestionIndex] = useState(1);
    const [stateObjQuestionSelected, setStateObjQuestionSelected] = useState<stateObjType>({})
    
    const [stateArrAnswerSelected, setStateArrAnswerSelected] = useState<any[]>([]);
    const [stateNumPoint, setStateNumPoint] = useState(0); // dùng để chứa thông tin điểm của mỗi câu hỏi để render ra cho user biết câu này mấy điểm


    const [stateArrQuestion, setStateArrQuestion] = useState<any[]>([]);
    const getData_All_question = async () => {
        let response: any;
        try {
            response = await collectionAPI.findAllQuestion();
            setStateArrQuestion(response.data);

            const filteredArrayQ = response.data.filter((item:any) => item.idquestion.startsWith('ads'));

            filteredArrayQ.sort((a:any, b:any) => {
                const idA = parseInt(a.idquestion.slice(3));
                const idB = parseInt(b.idquestion.slice(3));
                return idA - idB;
            });
            // cho mỗi obj có thêm thuộc tính questionDoingNow = false và question là số thứ tự câu hỏi để sau này xác định câu nào đang đc nhấn, câu nào ko, dành riêng cho khu vực question list bên trái
            filteredArrayQ.forEach((obj:any,index:number)=>{
                obj.question = index+1;
                obj.questionDoingNow = false;
            })
            setStateArrQuestion(filteredArrayQ);

            setStateObjQuestionSelected(filteredArrayQ[0]); // Ban đầu cho câu đầu tiên câu 1 được hiện ra luôn

            // câu hỏi nào đang đc click vào tức đang hiện trên màn hình (questionObj.question === question) thì cho thuộc tính questionDoingNow thành true, các questionDoingNow ở các object khác là false, mục đích là ta cho tô đậm cái question đang đc click vào
            // áp dụng cho khu vực question list bên trái
            // BAN ĐẦU CHO NÓ HIỆN LÊN LÀ MÌNH ĐANG Ở CÂU 1
            setStateArrQuestion((prev) => {
                return prev.map((questionObj) =>
                questionObj.question === 1 ? { ...questionObj, questionDoingNow: true} : { ...questionObj, questionDoingNow: false}
                );
            });

            // câu hỏi nào đang đc click vào tức đang hiện trên màn hình (questionObj.question === question) thì cho thuộc tính questionDoingNow thành true, các questionDoingNow ở các object khác là false, mục đích là ta cho tô đậm cái question đang đc click vào
            // áp dụng cho khu vực các nút tròn pagination
            // BAN ĐẦU CHO NÓ HIỆN LÊN LÀ MÌNH ĐANG Ở CÂU 1
            setGroupState((prev) => {
                return prev.map((questionObj) =>
                questionObj.question === 1 ? { ...questionObj, questionDoingNow: true} : { ...questionObj, questionDoingNow: false}
                );
            });

        }catch(err){
            console.log('err:', err);
        }
    }
    // console.log('stateObjQuestionSelected: ', stateObjQuestionSelected);
    const [stateArrAnswer, setStateArrAnswer] = useState<any[]>([]);
    const getData_All_Answer = async () => {
        let response: any;
        try {
            response = await collectionAPI.findAllAnswer();
            
            const filteredArrayA = response.data.filter((item:any) => item.idquestion.startsWith('ads'));

            filteredArrayA.sort((a:any, b:any) => {
                const idA = parseInt(a.idquestion.slice(3));
                const idB = parseInt(b.idquestion.slice(3));
                return idA - idB;
            });

            // tách các câu trả lời thành từng nhóm, 4 câu đầu 1 nhóm tương ứng cho câu hỏi đầu tiên và tiếp tục, vì thế mình cho (i+1) % 4 == 0 để biết rằng đã đi đc 4 ptu rồi tách
            let arrGroupAnswer = [];
            let arr = [];
            for (let i = 0; i <= filteredArrayA.length; i++){
                arr.push(filteredArrayA[i]);
                if((i+1) % 4 == 0){
                    arrGroupAnswer.push(arr);
                    arr = [];
                }
            }  
            setStateArrAnswer(arrGroupAnswer)

            setStateArrAnswerSelected(arrGroupAnswer[0]);// Ban đầu cho mảng câu trả lời câu 1 được hiện ra luôn

        }catch(err){
            console.log('err:', err);
        }
    }

    const selectQuestion = (question:number) => {
        setStateQuestionIndex(question); // cập nhật số thứ tự câu hỏi được click vào để lưu kết quả tính toán khi click vào các nút radio
        console.log('stateArrQuestion: ', stateArrQuestion);
        console.log('question: ', question);
        setStateObjQuestionSelected(stateArrQuestion[question-1]); // cập nhật cái object chứa câu hỏi đc click vào để render ra jsx
        setStateArrAnswerSelected(stateArrAnswer[question-1]);// cập nhật cái array chứa các câu trả lời đc click vào để render ra jsx
        
        // tìm answer đã đc chọn ở lần làm trước để render ra cho user biết là mình đã tick vào radio nào, nếu là lần đầu thì nó là 0 vì selectedAnswer mặc định ban đầu là 0, 0 thì coi như chưa chọn gì hết
        groupState.forEach((obj:any)=>{
            if(obj.question == question){
                setStateCheckedRadio(obj.selectedAnswer)
            }
        })

        // câu hỏi nào đang đc click vào tức đang hiện trên màn hình (questionObj.question === question) thì cho thuộc tính questionDoingNow thành true, các questionDoingNow ở các object khác là false, mục đích là ta cho tô đậm cái question đang đc click vào
        // áp dụng cho khu vực các nút tròn pagination
        setGroupState((prev) => {
            return prev.map((questionObj) =>
            questionObj.question === question ? { ...questionObj, questionDoingNow: true} : { ...questionObj, questionDoingNow: false}
            );
        });
        
        // câu hỏi nào đang đc click vào tức đang hiện trên màn hình (questionObj.question === question) thì cho thuộc tính questionDoingNow thành true, các questionDoingNow ở các object khác là false, mục đích là ta cho tô đậm cái question đang đc click vào
        // áp dụng cho khu vực question list bên trái
        setStateArrQuestion((prev) => {
            return prev.map((questionObj) =>
            questionObj.question === question ? { ...questionObj, questionDoingNow: true} : { ...questionObj, questionDoingNow: false}
            );
        });

        // phải lấy thằng này stateArrAnswer[question-1] vì lúc này stateArrAnswerSelected mới update nên ra ngoài hàm mới ăn
        stateArrAnswer[question-1].forEach((obj:any)=>{
            if(obj.correct !== 0){
                setStateNumPoint(obj.correct);
            }
        })

    }

    // ---------------------------------------------------------handle finish start
    const onFinish = () => {
    
        if (window.confirm("Are you sure you want to submit ? ") == false) {
            return;
        } 
        else {
            handleFinish();
        }
    }
    const onClearBackShadow = () => {
        setStateBackShadow(false);
        setStateBoolViewResult(false);
    }

    const reduxStateIdjobForTest = useSelector(selectreduxStateIdjobForTest);//hook lấy state từ jobSlice.js

    const [stateBackShadow, setStateBackShadow] = useState(false);
    const [stateBoolViewResult, setStateBoolViewResult] = useState(false);
    const [stateNumTotalPoints, setStateNumTotalPoints] = useState(0); 
    const [stateNumTotalcorrectAnswer1Point, setStateNumTotalcorrectAnswer1Point] = useState(0); 
    const [stateNumTotalcorrectAnswer2Point, setStateNumTotalcorrectAnswer2Point] = useState(0); 
    const [stateNumTotalCorrectAnswer, setStateNumTotalCorrectAnswer] = useState(0); 
    const [stateNumTotalWrongAnswer, setStateNumTotalWrongAnswer] = useState(0); 
    const [stateNumTotalUndone, setStateNumTotalUndone] = useState(0); 

    const handleFinish = async () => {
    
        let totalPoints = 0;
        let totalCorrectAnswer = 0;
        let totalCorrectAnswer2Point = 0;
        let totalCorrectAnswer1Point = 0;
        let totalWrongAnswer = 0;
        let totalUnDone = 0;
        groupState.forEach((obj, index, arr) => {
            
            totalPoints += obj.point; // tính tổng cộng dồn có bao nhiêu point
            if(obj.alreadyAnswered === true){ // câu nào trả lời rồi thì mới đếm bao nhiêu câu đúng và sai

                if(obj.point !== 0){
                    totalCorrectAnswer += 1;
                    if(obj.point === 1){
                        totalCorrectAnswer1Point += 1;
                    }
                    else if(obj.point === 2){
                        totalCorrectAnswer2Point += 1;
                    }
                }
                else if(obj.point === 0) {
                    totalWrongAnswer += 1;
                }
            }
            else if(obj.alreadyAnswered == false){
                totalUnDone += 1;
            }
        });
        const obj2 = getUserSignIn(); // lấy user đang sign in
        const idcandidate = obj2.idcandidate;

        const data = 
        {
            "idcandidate": idcandidate,
            "idjob": reduxStateIdjobForTest,
            "result": totalPoints
        };

        let response: any;
        try {
            response = await collectionAPI.addTestresult(data);
            console.log("response: " + JSON.stringify(response, null, 4));
            
        }catch(err){
            console.log('err:', err);
        }

        setStateNumTotalcorrectAnswer1Point(totalCorrectAnswer1Point);
        setStateNumTotalcorrectAnswer2Point(totalCorrectAnswer2Point);
        setStateNumTotalPoints(totalPoints);
        setStateNumTotalCorrectAnswer(totalCorrectAnswer);
        setStateNumTotalWrongAnswer(totalWrongAnswer);
        setStateNumTotalUndone(totalUnDone);
        setStateBoolViewResult(true); // cho hiện dialog result lên
        setStateBackShadow(true);

        setChartBarData({
            series: [
                {
                    name: 'Correct answers',
                    data: [totalCorrectAnswer]
                }, {
                    name: 'Wrong answer',
                    data: [totalWrongAnswer]
                }, {
                    name: 'Undone',
                    data: [totalUnDone]
                }
            ],
            options: {
                chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                },
                plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                    total: {
                        enabled: true,
                        offsetX: 0,
                        style: {
                            fontSize: '20px',
                            fontWeight: 900
                        }
                    }
                    }
                },
                },
                stroke: {
                width: 1,
                colors: ['#fff']
                },
                title: {
                text: 'Result analysis'
                },
                // xaxis: {
                //     categories: [""],
                //     labels: {
                //         formatter: function (val:any) {
                //         return val + "K"
                //         }
                //     }
                // },
                // yaxis: {
                //     title: {
                //         text: undefined
                //     },
                // },
                tooltip: {
                    y: {
                        formatter: function (val:any) {
                        return val
                        }
                    }
                },
                fill: {
                opacity: 1
                },
                legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
                }
            },
        
        });
    }
    // ---------------------------------------------------------handle finish end

    useEffect(() => {
        getData_All_question();
        getData_All_Answer();
    },[]);

    const clearSelectedRadioOfCurrentAnswer = () => {
    
        setStateCheckedRadio(0)
        setGroupState((prev) => {
            return prev.map((questionObj) =>
            questionObj.question === stateQuestionIndex
                ? { ...questionObj, point: 0, selectedAnswer: 0, alreadyAnswered: false }
                : questionObj
            );
        });
    }

    // ---------------------------------------------------timer counter start
    const [minute, setMinute] = useState(40);
    const [second, setSecond] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {

            setSecond(seconds => seconds - 1);
    
        }, 1000)


        return () => clearInterval(timer);


    }, []);
    const [stateStringSecond, setStateStringSecond] = useState<string>('');
    const timeRunning = () => {
    
        if ((second === 0 || second === -1) && minute !== 0) {
            setMinute(minute - 1);
            setSecond(59);
    
        } else if (second === 0 && minute === 0) {
            setSecond(59);
            setMinute(minute-1);
    
        }else if (second === 0 && minute === 0 ) {
            alert("test time is over");
        }
    }
    timeRunning();
    // ---------------------------------------------------timer counter end

    const previousQuestion = () => {
        const currentQuestion = stateQuestionIndex;
        const prev = currentQuestion - 1;
        if(prev < 1){
            return;
        }
        selectQuestion(prev);
    
    }
    const nextQuestion = () => {
        const currentQuestion = stateQuestionIndex;
        const next = currentQuestion + 1
        if(next > 15){
            return;
        }
        selectQuestion(next);
    
    }
    const navigate = useNavigate(); //hook dùng để chuyển trang web
    
    const onExit = () => {
        setStateNumTotalcorrectAnswer1Point(0);
        setStateNumTotalcorrectAnswer2Point(0);
        setStateNumTotalPoints(0);
        setStateNumTotalCorrectAnswer(0);
        setStateNumTotalWrongAnswer(0);
        setStateNumTotalUndone(0);
        setStateBoolViewResult(false); // cho hiện dialog result lên
        setStateBackShadow(false);
        navigate("/alljobs", { replace: true }); //chuyển đến trang successLogin <Route path="/successLogin" element={<SuccessLogin/> } />
        
    }
    return (
        <div className={clsx(styles.component_Test)}>

            <div className={clsx(styles.heading)}>
                <h1>TEST</h1>
            </div>
            <div className={clsx(styles.separation)}>
                {/* Phải có lớp này để chặn cái heading ko cho nó chạy xuống dưới, vì heading là absolute, nên nó chạy lung tung */}
            </div>
            <div className={clsx(styles.info)}>
                <p className={clsx(styles.left)}><ArrowBackIcon/> ALL PROBLEMS</p>
                <div className={clsx(styles.center)}>
                    <div className={clsx(styles.row)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={clsx(styles.icon)} viewBox="0 0 512 512">
                            <path d="M112.91 128A191.85 191.85 0 0064 254c-1.18 106.35 85.65 193.8 192 194 106.2.2 192-85.83 192-192 0-104.54-83.55-189.61-187.5-192a4.36 4.36 0 00-4.5 4.37V152" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                            <path d="M233.38 278.63l-79-113a8.13 8.13 0 0111.32-11.32l113 79a32.5 32.5 0 01-37.25 53.26 33.21 33.21 0 01-8.07-7.94z"/>
                        </svg>
                        <p className={clsx(styles.time)}> 
                        {minute}
                        :
                        {(() => {
                            if (second < 10) {
                                return (
                                    <>
                                        0{second}
                                    </>
                                )
                            }
                            else {
                                return (
                                    <>
                                        {second}
                                    </>
                                )
                            }
                            
                        })()}
                        </p>
                    </div>
                    <p className={clsx(styles.text)}>TIME LEFT IN THIS TEST</p>
                </div>
                <div className={clsx(styles.right)}>
                    <ProgressBarContainer>
                        <Progress $progress={stateNumprogress} />
                    </ProgressBarContainer>
                        Questions attempted ({stateNumprogress}/15)
                </div>
            </div>

            <div className={clsx(styles.exam)}>
                <div className={clsx(styles.navigation)}>
                    <div className={clsx(styles.prev)} onClick={previousQuestion}>
                        <ArrowBackIosIcon/>
                        <p className={clsx(styles.text)}>PREV</p>
                    </div>
                    <div className={clsx(styles.pagination)}>
                        
                        {
                            groupState.map((obj) => {
                                return ( 
                                    <p 
                                    key={obj.question} 
                                    className={clsx(styles.circle, {[styles.answered]: obj.alreadyAnswered}, {[styles.beingSelected]: obj.questionDoingNow})} 
                                    
                                    onClick={()=>selectQuestion(obj.question)}>{obj.question}</p>
                                ) 
                            })
                        } 
                    </div>
                    <div className={clsx(styles.next)}>
                        <p className={clsx(styles.text)} onClick={nextQuestion}>NEXT</p>
                        <ArrowForwardIosIcon/>
                    </div>
                    <button className={clsx(styles.finish)} onClick={onFinish}>FINISH AND SUBMIT</button>
                </div>
                
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.questionList, {[styles.openSidebar]: open})}>
                        <div className={clsx(styles.iconWrapper)}>
                            <ArrowBackIosIcon onClick = {closeSidebar} className={clsx(styles.closeIcon)}/>
                        </div>
                        <h3 className={clsx(styles.title)}>Question list:</h3>
                        <ol>
                            {
                                stateArrQuestion.map((obj, index) => {
                                    return ( 
                                        <li className={clsx(styles.question, {[styles.beingSelected]: obj.questionDoingNow})} 
                                        key={obj.questioncontent} 
                                        onClick={()=>selectQuestion(index+1)}>{obj.questioncontent.slice(0, 35) + "..."}</li>
                                        
                                    )
                                })
                            }
                        </ol>
                    </div>
                    <div className={clsx(styles.main, {[styles.moveRight]: open})}>
                        <div className={clsx(styles.questionWrapper)}>
                            <MenuIcon onClick = {openSidebar} className={clsx(styles.menuIcon, {[styles.menuIconStatusOpen]: open})}/>
                            <h2 className={clsx(styles.field)}>Data Structure and Algorithms</h2>

                            {(() => {
                                if (stateNumPoint === 1) {
                                    return (
                                        <>
                                            <p className={clsx(styles.point)}>This question has {stateNumPoint} point</p>
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                            <p className={clsx(styles.point)}>This question has {stateNumPoint} points</p>
                                        </>
                                    )
                                }
                            })()}
                            <h3 className={clsx(styles.title)}>Question:</h3>

                            <p className={clsx(styles.question)}>{stateObjQuestionSelected.questioncontent}</p>

                        </div>
                        <div className={clsx(styles.answerWrapper)}>
                            <h3 className={clsx(styles.title)}>Please choose a correct answer</h3>
                            <div className={clsx(styles.iconClearWrapper)} onClick={clearSelectedRadioOfCurrentAnswer}>
                                <ClearAllIcon/> <span>Clear selected</span>
                            </div>
                            <div className={clsx(styles.answerList)}>
                            
                                {
                                    stateArrAnswerSelected.map((obj, index) => {
                                        // console.log(obj);
                                        
                                        return ( 
                                            <div className={clsx(styles.row)} key={obj.idanswer}>
                                                <div className={clsx(styles.radio)}>
                                                    <input 
                                                        type="radio" 
                                                        name={obj.idanswer}
                                                        checked={stateCheckedRadio == obj.idanswer} 
                                                        value={obj.correct} 
                                                        className={clsx(styles.item)} 
                                                        onChange={selectRadio} 
                                                        /> <span>{index+1}</span>
                                                </div>
                                                <div className={clsx(styles.answer)}>
                                                    
                                                    <div dangerouslySetInnerHTML={{ __html: obj.answercontent }} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
            <div className={clsx(styles.backShadow, {[styles.appear]: stateBackShadow})} >
            </div>
            <div className={clsx(styles.viewResult, {[styles.appear]: stateBoolViewResult})}>
                <h1>RESULT OF YOUR TEST</h1>
                <div className={clsx(styles.row)}>
                    <p className={clsx(styles.key)}>Total correct answer:</p><p className={clsx(styles.value)}>{stateNumTotalCorrectAnswer}</p>
                </div>
                <div className={clsx(styles.row)}>
                    <p className={clsx(styles.key)}>Total correct answer 1 point:</p><p className={clsx(styles.value)}>{stateNumTotalcorrectAnswer1Point}</p>
                </div>
                <div className={clsx(styles.row)}>
                    <p className={clsx(styles.key)}>Total correct answer 2 points:</p><p className={clsx(styles.value)}>{stateNumTotalcorrectAnswer2Point}</p>
                </div>
                <div className={clsx(styles.row)}>
                    <p className={clsx(styles.key)}>Total wrong questions:</p><p className={clsx(styles.value)}>{stateNumTotalWrongAnswer}</p>
                </div>
                <div className={clsx(styles.row)}>
                    <p className={clsx(styles.key)}>Total undone questions:</p><p className={clsx(styles.value)}>{stateNumTotalUndone}</p>
                </div>
                <div className={clsx(styles.row)}>
                    <p className={clsx(styles.key)}>Total point:</p><p className={clsx(styles.value)}>{stateNumTotalPoints}</p>
                </div>
                <div id="chartLine" className={clsx(styles.chartLine)}>
                    <ReactApexChart options={chartBarData.options} series={chartBarData.series} type="bar" height={200} />
                </div>
                <div className={clsx(styles.btnWrapper)}>
                    <button onClick={onExit} className={clsx(styles.cancel)}>Exit</button>
                </div>
                <div className={clsx(styles.note)}>
                    <p className={clsx(styles.note)}><b>Note: </b> This Test result already recored into the system, the employer of this job will review your CV and test result.</p>
                </div>
            </div>
        </div>
    )
}
export default Test

// progress bar -------------------------------------------------start
interface ProgressProps {
    $progress: number;
    }
const ProgressBarContainer = styled.div`
    width: 15rem;
    background-color: #e0e0e0;
    border-radius: 2rem;
    height: 20px;
    /* width: 70%; */
    margin: 0 auto;
`;

// có tham số đầu vào là progress
const Progress = styled.div<ProgressProps>`
    height: 100%;
    border-radius: 2rem;
    background-color: rgb(87, 185, 63);
    width: ${props => (props.$progress / 15) * 100}%;
`;
// progress bar -------------------------------------------------end



