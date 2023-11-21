// recft_clsx_module_scss
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from './share.module.scss'     //file scss cùng cấp
import { useSelector, useDispatch} from 'react-redux';
import { ROUTE_NAME, MenuRoute, SubMenuAccount } from './route-option';
import { selectSkillClicked, selectReduxStateUserSignedIn, reduxFunctionSkillclick } from '../../features/jobSlice';
import collectionAPI from '../../API/collectionAPI';

// Mui library
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CategoryIcon from '@mui/icons-material/Category';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MicIcon from '@mui/icons-material/Mic';

//
import { getIconByName } from './AppIcon';
import { getSession,getUserSignIn } from './sharedFunction';


type stateObj = {
   [key: string]: any;
};

type propType = {
   stateParentUserSignIn: any;
}

// function SignIn(props: propType) {
function MenuBar(props: propType) {
   const {stateParentUserSignIn} = props;

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };


   const navigate = useNavigate(); //hook dùng để chuyển trang web

   const handleSignOut = () => {
      sessionStorage.clear(); // remove tất cả
      // sessionStorage.removeItem('sessionusersignin'); // Remove the expired session
               
      navigate("/signin", { replace: true }); //chuyển đến trang login <Route path="/" element={<SignIn/> } />
   }

   // +++++++++++++++++++++++++++++++++++++++++++++++++++++++submenu của All Jobs start
   const initialStateGroup = [
      {
         id: 1,
         title: 'Jobs by skill',
         status: true,


      }
      // ,
      // {
      //    id: 2,
      //    title: 'Jobs by city',
      //    status: false,


      // }
      // ,
      // {
      //    id: 3,
      //    title: 'orderStatus',
      //    status: false,


      // }
   ];
   const initialStateSkill = ["ReactJS",
   "java",
   "php",
   "javascript",
   "SQL",
   "Android",
   "iOS",
   "MySQL",
   "Tester",
   "Ruby",
   "Python",
   "Mobile Apps",
   "Ruby on Rails",
   "QA QC",
   ".NET",
   "Business Analyst",
   "Linux",
   "NodeJS",
   "Designer",
   "Machine learning",
   "AI"]
   const [stateGroup, setSateGroup] = useState<any[]>(initialStateGroup);
   const [stateSkill, setStateSkill] = useState<any[]>(initialStateSkill);
   const [x, setX] = useState<stateObj>({})
   const obj = useSelector(selectReduxStateUserSignedIn);//hook lấy state từ jobSlice.js

   // let userSignIn: any = getSession('sessionusersignin'); //Cách 1: lấy value của localStorage có key là userSignIn, và gán value đó cho biến userSignIn, userSignIn có kiểu object
   // console.log("userSignIn menubar: " + JSON.stringify(userSignIn, null, 4));
   // if (userSignIn != null || userSignIn != undefined) userSignIn = JSON.parse(userSignIn);  //Hàm chuyển từ chuỗi text qua dạng array object json, sau khi lấy từ localstorage (dạng string) ra ngoài thì phải chuyển thành object thì mới dùng được, phải cho userSignIn khác null thì mới parse để nó không lỗi nữa (nếu dùng typescript)
   
   
   const makeSelectedItemBlueAndSetSateGroup = () => {

      let selectedSideBarItem = localStorage.getItem('selectGroupItem');

      //cho tất cả status về false lại như ban đầu
      stateGroup.forEach((obj, index, arr) => {
         obj.status = false;
      });
      //object nào có title trùng với selectedSideBarItem thì cho status là true
      const newStateGroup = stateGroup.map(obj => {
         if (obj.title === selectedSideBarItem) {
            return {...obj, status: true};
         }
         return obj;
      });
      setSateGroup(newStateGroup); //cập nhật lại state toggle bằng cái mảng mới đã chuyển cái status của title đc click vào thành true
   }
   // mục đích của hàm này là mỗi khi nhấn chọn một trong các item bên trái là nó sẽ tô màu cho item đó và chuyển giá trị status của item đó thành true, gián tiếp làm cho component bên phải hiện ra tương ứng với item bên trái
   const selectGroupItem = async (item:string) => {
      localStorage.setItem('selectGroupItem', item); //lưu vào local storage cái title đc click vào, nếu ko lưu thì mỗi lần refresh lại nó mất

      makeSelectedItemBlueAndSetSateGroup(); //chạy hàm này để set cho cái title nào đc click vào nó chuyển status thành true
   }

   const dispatch = useDispatch(); //hook phát đi đến jobSlice.js
   
   // mục đích của hàm này là chọn skill và lưu vào session, để nó lưu giá trị skill được chọn, khi qua component ShowJob thì nó sẽ hiện ra các job ứng với skill được chọn
   const selectSkillAndShowRelatedJobInComponentShowJob = (skill: string) => {
      dispatch(reduxFunctionSkillclick(skill));
      setIsSubMenuAllJobsOpen(!isSubMenuAllJobsOpen); // sau khi bấm vào 1 skill nào đó thì cái submenu phải ẩn đi để còn thấy các job phía sau

   }

   // +++++++++++++++++++++++++++++++++++++++++++++++++++++++submenu của All Jobs end
   // +++++++++++++++++++++++++++++++++++++++++++++++++++++++ submenu của All Jobs end

   const [isSubMenuAllJobsOpen, setIsSubMenuAllJobsOpen] = useState(false);
   const selectMenuItem = (title: string) => {
      if (title == "All Jobs"){ // nếu click vào cái item All Jobs của menuBar thì mới hiện ra cái submenu, còn click vào những cái khác thì ko hiện ra
         setIsSubMenuAllJobsOpen(!isSubMenuAllJobsOpen);
      }
   }
   const [stateUserSignIn, setStateUserSignIn] = useState<stateObj>({})
   const [stateUserSignInFinal, setStateUserSignInFinal] = useState<stateObj>({})

   useEffect(() => {
      // nếu state từ parent MainVIew chuyển xuống là ko rỗng thì update
      // if(Object.keys(stateParentUserSignIn).length !== 0 && stateParentUserSignIn != null){
      //    setStateUserSignInFinal(stateParentUserSignIn);
      // }

      const obj = getUserSignIn();

      if(obj != null  && obj != undefined){
         setStateUserSignInFinal(obj);
      }
   },[stateParentUserSignIn]); // nếu stateParentUserSignIn có thay đổi thì chạy các code trong useEffect, dĩ nhiên khi sign in xong thì component cha MainView truyền stateParentUserSignIn vào component MenuBar
   
   // -------------------------------------------------------chatbot start
   const listCategories = [
      "Type of Skills",
      "ReactJS",
      "java",
      "php",
      "javascript",
      "SQL",
      "Android",
      "iOS",
      "MySQL",
      "Tester",
      "Ruby",
      "Python",
      "Mobile Apps",
      "Ruby on Rails",
      "QA QC",
      ".NET",
      "Business Analyst",
      "Linux",
      "NodeJS",
      "Designer",
      "Machine learning",
      "AI"
   ]
   const generalQuestions = [
      "Submit CV",
      "Create CV",
      "Do the test",
      "Search job",
      "add job to favourite",
      "Predict salary"
   ]
   const customerDetails = [
      "create account",
      "sign in",
      "sign out",
      "change password",
      "change email",
      "change account information",
      "account blocked",
      "recover account",
      "my account"
   ]
   const orderList = [
      "my order",
      "Delivery cost",
      "Delivery duration",
      
   ]
 

   const [stateArrCategories, setStateArrCategories] = useState(listCategories);
   const [stateArrGeneralQuestions, setStateArrGeneralQuestions] = useState(generalQuestions);
   const [stateArrCustomerDetails, setStateArrCustomerDetails] = useState(customerDetails);
   const [stateArrOrderList, setStateArrOrderList] = useState(orderList);

   const inputRef = useRef<HTMLInputElement | null>(null); // dùng để focus về ô input

   const [stateStringInput, setStateStringInput] = useState("");
   const handleChange = (event:any) => { setStateStringInput(event.target.value) };//trên return

   const [stateBoolIsOpenDialogChatSmall, setStateBoolIsOpenDialogChatSmall] = useState(false);
   const [stateBoolIsOpenDialogSuggestSmall, setStateBoolIsOpenDialogSuggestSmall] = useState(false);
   const [stateBoolIsOpenDialogChatBig, setStateBoolIsOpenDialogChatBig] = useState(false);
   const [stateBoolBackShadow, setStateBoolBackShadow] = useState(false);

   const wait = (ms:any) => new Promise((resolve) => setTimeout(resolve, ms));

   const openDialogChatSmall = () => {
      setStateBoolIsOpenDialogChatSmall(true);
      setStateBoolIsOpenDialogChatBig(false);
      
      setStateBoolIsOpenDialogSuggestSmall(true);
      toggleDialogSuggestSmall()
      openShadow();

      setStateBoolIsOpenDialogSuggestSmall(true);
      setStateBoolSuggestModeSmall(true);
      setStateBoolIsOpenDialogChatBig(false);
   }

   const openDialogChatBig = () => {
      openShadow();
      setStateBoolIsOpenDialogChatSmall(false);
      setStateBoolIsOpenDialogChatBig(true);
      
      setStateBoolIsOpenDialogSuggestSmall(true);
      // toggleDialogSuggestBig()
      setStateBoolSuggestModeSmall(false);
      setStateBoolIsOpenDialogSuggestSmall(true);
      setStateBoolIsOpenDialogChatBig(true);
   
   }
   const openShadow = () => {
      setStateBoolBackShadow(true);

   }
   const closeShadow = () => {
      setStateBoolBackShadow(false);
      setStateBoolIsOpenDialogChatSmall(false);
      setStateBoolIsOpenDialogChatBig(false);
      setStateBoolIsOpenDialogSuggestSmall(false);

   }

   const [stateBoolSuggestModeSmall, setStateBoolSuggestModeSmall] = useState(false);
   const toggleDialogSuggestSmall = () => {
   
      setStateBoolIsOpenDialogSuggestSmall(!stateBoolIsOpenDialogSuggestSmall);
      setStateBoolSuggestModeSmall(true);
   }
   // console.log('stateBoolSuggestModeSmall: ', stateBoolSuggestModeSmall);
   // console.log('stateBoolIsOpenDialogSuggestSmall: ', stateBoolIsOpenDialogSuggestSmall);
   const toggleDialogSuggestBig = () => {
   
      setStateBoolIsOpenDialogSuggestSmall(!stateBoolIsOpenDialogSuggestSmall);
      setStateBoolSuggestModeSmall(false);
   
   }
   
   const promptSelected = (prompt:string) => {
      console.log('prompt: ', prompt);
      setStateStringInput(prompt);
      onSendWithParameter(prompt);

      dispatch(reduxFunctionSkillclick(prompt));
   }
   // console.log('stateStringInput: ', stateStringInput);
   const [stateStringGroupSelected, setStateStringGroupSelected] = useState<string>('category');
   const switchGroupPrompt = (group:string) => {
      setStateStringGroupSelected(group);
   }
   
   const sampleConversation = [
      {
         "idgroup": 0
      },
      {
         "idmessage": 1,
         "owner": "bot",
         "message": "hello !"
      }
   ]

   function getCurrentDateTimeWithTimezoneOffset() {
      const date = new Date();
      const timezoneOffset = 7 * 60 * 60 * 1000; // +7 timezone offset in milliseconds
      const adjustedDate = new Date(date.getTime() + timezoneOffset);
      const formattedDate = adjustedDate.toISOString().replace("Z", "+07:00");
   
      return formattedDate;
   }
   const [stateArrConversations, setStateArrConversations] = useState<any[]>(sampleConversation);
   const [stateArrGroupConversations, setStateArrGroupConversations] = useState<any[]>([]);

   // ĐÂY LÀ CÁI CHỨA TOKEN GỬI KÈM THEO CÁC TRUY VẤN API GỬI ĐẾN BACK END
   // NHỮNG API NÀO MÀ CẦN PHẢI CÓ TOKEN THÌ MỚI TRUY CẤN ĐƯỢC THÌ PHẢI CÓ CÁI NÀY GỬI KÈM THEO
   // VÍ DỤ: response1 = await collectionAPI.predict(data, config);
   const config = {
      headers: { Authorization: getSession("tokenSignIn")}
   }
// I want to know game and toys
// I want to know game and books
   const arrWrong = [
      "The syntax of your message might be incorrect or not relevant to our e-commerce data. Kindly review it, and thank you!",
      "Your message could potentially have incorrect syntax or may not pertain to our e-commerce data. Please double-check, and thanks!",
      "It's possible that your message contains incorrect syntax or isn't related to our e-commerce data. Please verify and accept our gratitude!",
      "There's a chance your message has the wrong syntax or isn't connected to our e-commerce data. Please reconsider. Thanks!",
      "The syntax in your message might be wrong, or it might not be related to our e-commerce data. Take a look again, and thank you!",
      "It's likely that your message's syntax is incorrect or unrelated to our e-commerce data. We kindly ask you to review it. Thanks!",
      "There's the possibility of incorrect syntax or the message not being relevant to our e-commerce data. Kindly check again. Thank you!",
      "Your message's syntax could be off or not tied to our e-commerce data. Please take another look. Thanks!",
      "It's possible that the syntax in your message is incorrect or not aligned with our e-commerce data. Please review it. Thank you!",
      "Your message may have incorrect syntax or might not be pertinent to our e-commerce data. Kindly verify. Thanks!"
   ];
   const arrRefuse = [
      "You haven't logged in yet, so I won't respond to your query.",
      "Since you haven't signed in, I won't provide an answer to your question.",
      "Your login is pending; hence, I won't address your inquiry.",
      "Due to your absence of authentication, I won't reply to your query.",
      "In the absence of your login, I won't give a response to your question.",
      "you have not signed in yet, therefore I will not answer to your question"
   ]


   const onSend = async () => {
      if(stateStringInput.trim() == ""){
         alert("input can not be empty");
         setStateStringInput('');
         if (inputRef.current) {
            inputRef.current.focus();
         }
         return;
      }
      console.log('stateStringInput: ', stateStringInput);
      let token = getSession("tokenSignIn"); // lấy token từ session mà sau khi sign in thành công có đc
      console.log('token: ', token);
      // nếu token == null tức chưa sign in thì báo chưa sign in

      // sdfjhLKhl349(*&)


      const lengthOfArrConversations = stateArrConversations.length;
      const lengthOfGroupConversations = stateArrGroupConversations.length;
      const newMessage = {
         "idmessage": stateArrConversations.length,
         "owner": "user",
         "message": stateStringInput 
      };

      // option yêu cầu phải sign in có JWT, sign in thành công thì có token gửi kèm mỗi lần truy vấn về back end
      // if(token == null){
      //    const chatbotMessage = {
      //       "idmessage": lengthOfArrConversations + 1,
      //       "owner": "bot",
      //       "message": arrRefuse[Math.floor(Math.random() * arrRefuse.length)]
      //    };

      //    let updatedConversations = [...stateArrConversations,newMessage, chatbotMessage];
      //    updatedConversations[0].idgroup = lengthOfGroupConversations;
      //    setStateArrConversations(updatedConversations);
         
      //    setStateStringInput(""); // cho ô input về rỗng ban đầu
      //    return;
      // }



      
      let tagFromPython = "";

      let arrCopy_stateArrConversations = stateArrConversations.slice(0); 
      arrCopy_stateArrConversations.push(newMessage); // thêm message của user vừa nhắn vào 

      // xử lý nếu mảng rỗng
      let data = {};
      let length_arrCopy_stateArrConversations = arrCopy_stateArrConversations.length;

      // xử lý khi có chữ my account cho nó chỉ đến account
      const username = getSession("username");
      console.log('username: ', username);
      if (stateStringInput == "my account"){
         data ={
            "message": username
         }
      }
      else if(stateStringInput == "my order"){
         data ={
            "message": 'order'+username
         }
      }
      else {

         data ={
            "message": stateStringInput
         }
      }

      console.log('data: ', data);
      let response1: any;
      try {
         response1 = await collectionAPI.chatbotPredict(data); // API này có jwt nên phải có token gửi kèm bên trong config
         // console.log("response: " + JSON.stringify(response1.data, null, 4));

         tagFromPython = response1.data.answer.tag; // lấy cái tag củ câu hỏi từ python gửi đến

         let botAnswerDontKnow = response1.data.answer;
         let botAnswerKnow = response1.data.answer.response;
         console.log('botAnswerDontKnow: ', botAnswerDontKnow);
         console.log('botAnswerKnow: ', botAnswerKnow);
         let message = botAnswerKnow != undefined ? botAnswerKnow : botAnswerDontKnow;
         console.log('message: ', message);
         const chatbotMessage = {
            "idmessage": length_arrCopy_stateArrConversations + 1,
            "owner": "bot",
            "message": message
         };

         arrCopy_stateArrConversations.push(chatbotMessage);

      
         
         setStateStringInput(""); // cho ô input về rỗng ban đầu

         // -------------------------------------------------------đọc message trả về start

         if ('speechSynthesis' in window) {
   
            // Get the available voices
            const availableVoices = speechSynthesis.getVoices();
      
            // Find a voice containing "female" in its name
            const femaleVoice = availableVoices.find(voice => voice.name.toLowerCase().includes('female'));
      
            if (femaleVoice) {
               // Create a new SpeechSynthesisUtterance instance
               const utterance = new SpeechSynthesisUtterance(message);
      
               // Use the selected female voice
               utterance.voice = femaleVoice;
      
               // Speak the text
               speechSynthesis.speak(utterance);
            } else {
               console.log("No suitable female voice found.");
            }
         } else {
               console.log("Speech synthesis is not supported in this browser.");
         }
         // -------------------------------------------------------đọc message trả về end

      
      }catch(err){
         console.log('err:', err);
      }
      
            await wait(100); // đợi 0.3 giây
            
            // post vào bảng searchmonitor --------------------------------------------------------------------
            let currentTimeSend = getCurrentDateTimeWithTimezoneOffset();
            const dataSeachmonitor = {
               "search": stateStringInput,
               "tag": tagFromPython,
               "searchtime": currentTimeSend
            }
            let response2: any;
            try {
               response2 = await collectionAPI.chatbotaddsearchmonitor(dataSeachmonitor);
               console.log("response: " + JSON.stringify(response2.data, null, 4));
      
            }catch(err){
               console.log('err:', err);
            }
            await wait(100); // đợi 0.3 giây

      arrCopy_stateArrConversations[0].idgroup = lengthOfGroupConversations;
      setStateArrConversations(arrCopy_stateArrConversations);

   } // end onSend
   
   // tại sao phải có hàm này, hàm này khác gì với onSend ?
   // Vì hàm onSend lấy stateStringInput để gửi đi, tuy nhiên khi cần xử lý cùng lúc như hàm promptSelected thì stateStringInput chưa kịp update nên nó sẽ báo lỗi
   // vì vậy mình cần gán tham số prompt truyền vào trực tiếp cho hàm luôn
   const onSendWithParameter = async (prompt:string) => {

      let token = getSession("tokenSignIn"); // lấy token từ session mà sau khi sign in thành công có đc
      // console.log('token: ', token);
      // nếu token == null tức chưa sign in thì báo chưa sign in

      // sdfjhLKhl349(*&)


      const lengthOfArrConversations = stateArrConversations.length;
      const lengthOfGroupConversations = stateArrGroupConversations.length;
      const newMessage = {
         "idmessage": stateArrConversations.length,
         "owner": "user",
         "message": prompt 
      };

      // if(token == null){
      //    const chatbotMessage = {
      //       "idmessage": lengthOfArrConversations + 1,
      //       "owner": "bot",
      //       "message": arrRefuse[Math.floor(Math.random() * arrRefuse.length)]
      //    };

      //    let updatedConversations = [...stateArrConversations,newMessage, chatbotMessage];
      //    updatedConversations[0].idgroup = lengthOfGroupConversations;
      //    setStateArrConversations(updatedConversations);
         
      //    setStateStringInput(""); // cho ô input về rỗng ban đầu
      //    return;
      // }



      
      let tagFromPython = "";

      let arrCopy_stateArrConversations = stateArrConversations.slice(0); 
      arrCopy_stateArrConversations.push(newMessage); // thêm message của user vừa nhắn vào 

      // xử lý nếu mảng rỗng
      let data = {};
      let length_arrCopy_stateArrConversations = arrCopy_stateArrConversations.length;

      // xử lý khi có chữ my account cho nó chỉ đến account
      const username = getSession("username");
      console.log('username: ', username);
      if (prompt == "my account"){
         data ={
            "message": username
         }
      }
      else if(prompt == "my order"){
         data ={
            "message": 'order'+username
         }
      }
      else {

         data ={
            "message": prompt
         }
      }

      console.log('data: ', data);
      let response1: any;
      try {
         response1 = await collectionAPI.chatbotPredict(data); // API này có jwt nên phải có token gửi kèm bên trong config
         console.log("response: " + JSON.stringify(response1.data, null, 4));

         tagFromPython = response1.data.answer.tag; // lấy cái tag củ câu hỏi từ python gửi đến

         let botAnswerDontKnow = response1.data.answer;
         let botAnswerKnow = response1.data.answer.response;

         let message = botAnswerKnow != undefined ? botAnswerKnow : botAnswerDontKnow;

         const chatbotMessage = {
            "idmessage": length_arrCopy_stateArrConversations + 1,
            "owner": "bot",
            "message": message
         };

         arrCopy_stateArrConversations.push(chatbotMessage);

      
         
         setStateStringInput(""); // cho ô input về rỗng ban đầu
         // -------------------------------------------------------đọc message trả về start

         if ('speechSynthesis' in window) {

            // Get the available voices
            const availableVoices = speechSynthesis.getVoices();
      
            // Find a voice containing "female" in its name
            const femaleVoice = availableVoices.find(voice => voice.name.toLowerCase().includes('female'));
      
            if (femaleVoice) {
               // Create a new SpeechSynthesisUtterance instance
               const utterance = new SpeechSynthesisUtterance(message);
      
               // Use the selected female voice
               utterance.voice = femaleVoice;
      
               // Speak the text
               speechSynthesis.speak(utterance);
            } else {
               console.log("No suitable female voice found.");
            }
         } else {
               console.log("Speech synthesis is not supported in this browser.");
         }
         // -------------------------------------------------------đọc message trả về end
      }catch(err){
         console.log('err:', err);
      }
      
            await wait(100); // đợi 0.3 giây
            
            // post vào bảng searchmonitor --------------------------------------------------------------------
            let currentTimeSend = getCurrentDateTimeWithTimezoneOffset();
            const dataSeachmonitor = {
               "search": stateStringInput,
               "tag": tagFromPython,
               "searchtime": currentTimeSend
            }
            let response2: any;
            try {
               response2 = await collectionAPI.chatbotaddsearchmonitor(dataSeachmonitor);
               console.log("response: " + JSON.stringify(response2.data, null, 4));
      
            }catch(err){
               console.log('err:', err);
            }
            await wait(100); // đợi 0.3 giây

      arrCopy_stateArrConversations[0].idgroup = lengthOfGroupConversations;
      setStateArrConversations(arrCopy_stateArrConversations);

   }

   const onEditConversation = async () => {
      console.log("test");
      const idgroupSelected = stateArrConversations[0].idgroup;
      const lengthOfArrConversations = stateArrConversations.length; // lấy chiều dài của mảng đế gán cho idmessage tiếp theo 
      const newMessage = {
         "idmessage": lengthOfArrConversations,
         "owner": "user",
         "message": stateStringInput  // giá trị mà user mới nhập vào ô input
      };

      const data ={"message": stateStringInput }
      let response: any;
      try {
         response = await collectionAPI.chatbotPredict(data); // API này có jwt nên phải có token gửi kèm bên trong config
         console.log("response: " + JSON.stringify(response.data, null, 4));
         
         let botAnswerDontKnow = response.data.answer;
         let botAnswerKnow = response.data.answer.response;

         let message = botAnswerKnow != undefined ? botAnswerKnow : botAnswerDontKnow;

         const chatbotMessage = {
            "idmessage": lengthOfArrConversations + 1,
            "owner": "bot",
            "message": message
         };
      

         let updatedConversations = [...stateArrConversations,newMessage, chatbotMessage];
         // updatedConversations[0].idgroup = lengthOfGroupConversations;
         setStateArrConversations(updatedConversations);
         let arrGroup = stateArrGroupConversations.slice(0); //copy state stateArrGroupConversations
         
         for (let i = 0; i < arrGroup.length; i++) {
            if(arrGroup[i][0].idgroup == idgroupSelected){
               arrGroup[i] = updatedConversations
               break;
            }
         }

         setStateArrGroupConversations(arrGroup);
         
         setStateStringInput(""); // cho ô input về rỗng ban đầu
      }catch(err){
         console.log('err:', err);
      }
   }

   const newChat = () => {

      // ------------------------------------------------------------------dành cho update cái group START
      const idgroupCurrent = stateArrConversations[0].idgroup;

      var arrGroup = stateArrGroupConversations.slice(0); // copy cái group
      for(let i = 0; i < arrGroup.length; i++){
         if(i === idgroupCurrent){

            arrGroup[i] = stateArrConversations;
            setStateArrGroupConversations(arrGroup); // update group
            setStateArrConversations(sampleConversation); //cho conversation về trạng thái ban đầu
            setStateBoolSend(true); // khi nhấn vào new chat thì nút send sẽ chuyển thành nút gọi hàm onSend, tức là tạo cái chat mới

            return; // thoát hàm luôn
         }
      }
      // ------------------------------------------------------------------dành cho update cái group END
      // ------------------------------------------------------------------dành cho ADD NEW cái group START

      // nếu thoát khỏi vòng lặp mà i vẫn ko bằng idgroupCurrent, nghĩa là stateArrConversations là một mảng với idgroup mới, vì vậy lúc này phải thêm vào
      const newArray = [...stateArrGroupConversations, stateArrConversations]; // Add an empty array

      setStateArrGroupConversations(newArray); // Update the state
      
      setStateArrConversations(sampleConversation);

      setStateBoolSend(true); // khi nhấn vào new chat thì nút send sẽ chuyển thành nút gọi hàm onSend, tức là tạo cái chat mới
      // ------------------------------------------------------------------dành cho ADD NEW cái group END

   }
   // console.log('stateArrGroupConversations: ', stateArrGroupConversations);

   const [stateBoolSend, setStateBoolSend] = useState(true);
   const selectGroup = (id:number) => {
      console.log('id: ', id);

      for(let i = 0; i < stateArrGroupConversations.length; i++){
         if(i === id){
            console.log('stateArrGroupConversations[i]: ', stateArrGroupConversations[i]);
            setStateArrConversations(stateArrGroupConversations[i]);
            break;
         }
      }

      setStateBoolSend(false); // khi nhấn vào 1 group nào đó thì nút send sẽ chuyển thành nút gọi hàm onEditConversation, tức là edit cái conversation cũ, chứ ko phải tạo cái mới
      
   }

   const [stateNumIdmessageToEdit, setStateNumIdmessageToEdit] = useState(0);

   const editObjMessage = (idmessage:number) => {
   
      let messageNeedToEdit = stateArrConversations[idmessage].message;
      setStateStringInputEdit(messageNeedToEdit);
      setStateNumIdmessageToEdit(idmessage)
      if (inputRef.current) {
         inputRef.current.focus();
      }

   }
   const [stateStringInputEdit, setStateStringInputEdit] = useState("");
   const handleChangeEdit = (event:any) => { setStateStringInputEdit(event.target.value) };//trên return

   const saveAndSubmit = async () => {
   
      const editMessage = {
         "idmessage": stateNumIdmessageToEdit,
         "owner": "user",
         "message": stateStringInputEdit  // giá trị mà user mới nhập vào ô input
      };

      const data ={"message": stateStringInputEdit }
   
      let response: any;
      try {
         response = await collectionAPI.chatbotPredict(data); // API này có jwt nên phải có token gửi kèm bên trong config

         let botAnswerDontKnow = response.data.answer;
         let botAnswerKnow = response.data.answer.response;

         let message = botAnswerKnow != undefined ? botAnswerKnow : botAnswerDontKnow;

         const chatbotMessage = {
            "idmessage": stateNumIdmessageToEdit + 1,
            "owner": "bot",
            "message": message
         };
         let arrConversation:any = stateArrConversations.slice(0); // copy array
         
         for(let i = 1; i <= arrConversation.length; i++){
            if( i < stateNumIdmessageToEdit){
               continue;
            }
            else if(i == stateNumIdmessageToEdit){
               arrConversation[i] = editMessage;
            }
            else if (i == stateNumIdmessageToEdit+1){
               arrConversation[i] = chatbotMessage;
            }
            else if(i > stateNumIdmessageToEdit+1) {
               break;
            }
         }

         //thằng edit là stateNumIdmessageToEdit, còn bot trả lời là stateNumIdmessageToEdit + 1, 
         // vì vậy phải gữ cái element stateNumIdmessageToEdit + 1, và bỏ các element sau nó
         let lastIndexToKeep = stateNumIdmessageToEdit + 1; 
         const elementsToDelete = stateArrConversations.length - lastIndexToKeep - 1;
         arrConversation.splice(lastIndexToKeep + 1, elementsToDelete);
         setStateArrConversations(arrConversation);

         // cho về lại trạng thái ban đầu
         setStateNumIdmessageToEdit(0);
         setStateStringInputEdit("")

      }catch(err){
         console.log('err:', err);
      }
   }
   const cancelEditMessage = () => {
   
      setStateNumIdmessageToEdit(0)
   
   }
   const handleKeyDown = (event:any) => {
      if (event.keyCode === 13 && stateBoolSend == true) {
         onSend();
      }
      else if(event.keyCode === 13 && stateBoolSend == false){
         onEditConversation();
      }
   };

   const clearChat = () => {
   
      setStateArrConversations(sampleConversation);
   
   }

// -------------------------------------------------------scrolldown auto when new message come start
   const bottomRef = useRef<HTMLDivElement | null>(null); // Define with proper type
   const [messages, setMessages] = useState<string[]>([]);

   useEffect(() => {
   // Simulate chat messages flowing in
   const intervalId = setInterval(
      () =>
         setMessages(current => [
         ...current,
         'Lorem ipsum do',
         ]),
      1000,
   );

   // Clear the interval on component unmount
   return () => clearInterval(intervalId);
   }, []);

   useEffect(() => {
   // Scroll to bottom every time messages change
   bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);
// -------------------------------------------------------scrolldown auto when new message come end
   // -------------------------------------------------------chatbot end
   // -------------------------------------------------------speech recognition start
   const [transcript, setTranscript] = useState('');
   // `$ {id}` ép id thành string
   //@ts-ignore
   let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
   const stringSimilarity = require('string-similarity');

   recognition.onresult = (event:any) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      setTranscript(text);
      setStateStringInput(text);
      onSendWithParameter(text);
      console.log('text: ', text);
      const words = text.split(" "); // Split the text by space

      for(let i = 0; i < words.length;i++){

         const { bestMatch } = stringSimilarity.findBestMatch(words[i], initialStateSkill);
         console.log("Most similar skill:", bestMatch.target); // Out
      }




      // const selectSkillAndShowRelatedJobInComponentShowJob = (skill: string) => {
      //    dispatch(reduxFunctionSkillclick(skill));
      //    setIsSubMenuAllJobsOpen(!isSubMenuAllJobsOpen); // sau khi bấm vào 1 skill nào đó thì cái submenu phải ẩn đi để còn thấy các job phía sau

      // }

      // Check if the browser supports the SpeechSynthesis API


      // if ('speechSynthesis' in window) {
   
      //    // Get the available voices
      //    const availableVoices = speechSynthesis.getVoices();
   
      //    // Find a voice containing "female" in its name
      //    const femaleVoice = availableVoices.find(voice => voice.name.toLowerCase().includes('female'));
   
      //    if (femaleVoice) {
      //       // Create a new SpeechSynthesisUtterance instance
      //       const utterance = new SpeechSynthesisUtterance(text);
   
      //       // Use the selected female voice
      //       utterance.voice = femaleVoice;
   
      //       // Speak the text
      //       speechSynthesis.speak(utterance);
      //    } else {
      //       console.log("No suitable female voice found.");
      //    }
      // } else {
      //       console.log("Speech synthesis is not supported in this browser.");
      // }
   };

   const startRecognition = () => {
      recognition.start();
   };

   
   // -------------------------------------------------------speech recognition end
   return (
      <div className={clsx(styles.component_MenuBar)}>
         <ul>
            {/* logo */}
            <li>
               <img className={clsx(styles.logo)} src="../assets/logo/logo.png" alt="logo" />
            </li>
            {
               MenuRoute.map((object, index) => {
                  return (
                     <li key={object.id} onClick={()=>selectMenuItem(object.title)}>
                        <Link to={object.path} >
                           <span className={clsx(styles.item)}>{object.title}</span>
                           
                        </Link>
                     </li>
                  )
               })
            }

            <li>
               {/* <React.Fragment> */}
                  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                     <Tooltip title="Account settings" >
                        <IconButton
                           onClick={handleClick}
                           size="small"
                           sx={{ ml: 2 }}
                           aria-controls={open ? 'account-menu' : undefined}
                           aria-haspopup="true"
                           aria-expanded={open ? 'true' : undefined}
                           >
                              {
                                 stateUserSignInFinal ? 
                                    <Avatar alt="Remy Sharp" src={stateUserSignInFinal.urlavatar} />
                                    :
                                    <AccountCircleIcon className={clsx(styles.accountIcon)}/>
                              }
                              
                        </IconButton>
                     </Tooltip>
                  </Box>
                  <Menu
                     anchorEl={anchorEl}
                     id="account-menu"
                     open={open}
                     onClose={handleClose}
                     onClick={handleClose}
                     PaperProps={{
                        elevation: 0,
                        sx: {
                           overflow: 'visible',
                           filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                           mt: 1.5,
                           '& .MuiAvatar-root': {
                           width: 32,
                           height: 32,
                           ml: -0.5,
                           mr: 1,
                           },
                           '&:before': {
                           content: '""',
                           display: 'block',
                           position: 'absolute',
                           top: 0,
                           right: 14,
                           width: 10,
                           height: 10,
                           bgcolor: 'background.paper',
                           transform: 'translateY(10%) rotate(45deg)',
                           zIndex: 0,
                           },
                        },
                     }}
                     transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                     anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                     className={clsx(styles.Menu)}
                     
                     >
{/* TRƯỜNG HỢP CHƯA SIGN IN THÌ HIỆN RA COMPONENT NÀY */}
                     {
                           Object.keys(stateUserSignInFinal).length === 0  ? 
                              (
                                 <MenuItem  >
                                    <Link to="/signin" style={{ textDecoration: 'none' }}>
                                       <ListItemIcon>
                                          {getIconByName("signin")}
                                       </ListItemIcon>
                                       Sign in
                                    </Link>
                                 </MenuItem>
                              )
                              :
                              (
                                 // <MenuItem onClick={handleSignOut} >
                                 <MenuItem onClick={handleSignOut}>
                                    <Link to="/signin" style={{ textDecoration: 'none' }}>
                                       <ListItemIcon>
                                          {getIconByName("signout")}
                                       </ListItemIcon>
                                       Sign out
                                    </Link>
                                 </MenuItem>
                              )
                     }
                     <MenuItem   >
                        <Link to="/signup"  style={{ textDecoration: 'none' }}>
                           <ListItemIcon>
                              {getIconByName("signup")}
                           </ListItemIcon>
                           <span>Sign up</span>
                           
                        </Link>
                     </MenuItem>
                     {/* <MenuItem >
                        <Link to="/customeraccount" style={{ textDecoration: 'none' }}>
                           <ListItemIcon>
                              {getIconByName("account")}
                           </ListItemIcon>
                           Account
                        </Link>
                     </MenuItem> */}
                  {/* TRƯỜNG HỢP SIGN IN RỒI THÌ HIỆN RA COMPONENT NÀY */}

                  {
                     Object.keys(stateUserSignInFinal).length !== 0  &&
                     (stateUserSignInFinal.role === "admin" || stateUserSignInFinal.role === "staff") ?
                        (
                           <>
                           <MenuItem >
                              <Link to="/controller" style={{ textDecoration: 'none' }}>
                                 <ListItemIcon>
                                    {getIconByName("dashboard")}
                                 </ListItemIcon>
                                 Controller Dashboard
                              </Link>
                           </MenuItem>
                           <MenuItem >
                              <Link to="/employer" style={{ textDecoration: 'none' }}>
                                 <ListItemIcon>
                                    {getIconByName("dashboard")}
                                 </ListItemIcon>
                                 Employer Dashboard
                              </Link>
                           </MenuItem>
                           </>
                        ): ""
                        
                  }
                  {
                     stateUserSignInFinal != null &&
                     (stateUserSignInFinal.status === "active") ?
                        (
                           <MenuItem >
                              <Link to="/" style={{ textDecoration: 'none' }}> 
                              {/* chuyển về component ShowJob, vì chỗ này database ko có thuộc tính phân biệt giữa candidate và employer, 
                              nhưng may sao thằng status của candidate là active còn status của employer là enable
                              Nên nếu status là active thì chuyển về component ShowJob
                              */}
                                 <ListItemIcon>
                                    {getIconByName("dashboard")}
                                 </ListItemIcon>
                                 Candidate Dashboard
                              </Link>
                           </MenuItem>
                        ): ""
                        
                  }
                  {
                     stateUserSignInFinal != null &&
                     (stateUserSignInFinal.status === "enable") ?
                        (
                           <MenuItem >
                              <Link to="/employer" style={{ textDecoration: 'none' }}> 
                              {/* chuyển về component EmployerHome có route là /employer, vì chỗ này database ko có thuộc tính phân biệt giữa candidate và employer, 
                              nhưng may sao thằng status của candidate là active còn status của employer là enable
                              Nên nếu status là enable thì chuyển về component ShowJob
                              */}
                                 <ListItemIcon>
                                    {getIconByName("dashboard")}
                                 </ListItemIcon>
                                 Employer Dashboard
                              </Link>
                           </MenuItem>
                        ): ""
                        
                  }
                        
                  </Menu>
               {/* </React.Fragment> */}
            </li>
         </ul>
         <div className={clsx(styles.backShadow,{[styles.appear]: isSubMenuAllJobsOpen})} onClick={()=>setIsSubMenuAllJobsOpen(!isSubMenuAllJobsOpen)}>
         </div>

         <div className={clsx(styles.allJobSubMenu, {[styles.appear]: isSubMenuAllJobsOpen})}>
            <div className={clsx(styles.leftRightWrapper)}>
               <div className={clsx(styles.left)}>
                  {/* {
                     stateGroup.map((obj, index) => {
                        return (
                           <p key={obj.id} 
                           onClick={()=>selectGroupItem(obj.title)} 
                           className={clsx({[styles.selected]: obj.status}, styles.leftItem)} // dùng để hiện màu xanh cho item được chọn
                           >
                              {obj.title}
                           </p>
                        )
                     })
                  } */}
                  <h3>Select job by skill</h3>
               </div>
               <div className={clsx(styles.right)}>
                  {(() => {
                     if (stateGroup[0].status) {
                        return (
                           <div className={clsx(styles.skillWrapper)}>
                              {
                                 stateSkill.map((element, index) => {
                                    return ( 
                                       <p 
                                       key={element.toString()} 
                                       className={clsx(styles.item)} 
                                       onClick={()=>selectSkillAndShowRelatedJobInComponentShowJob(element)}
                                       >
                                          {element}
                                       </p>
                                    )
                                 })
                              }
                           </div>
                        );
                     } else if (stateGroup[1].status) {
                        return (
                           <div className={clsx(styles.cityWrapper)}>
                              <p className={clsx(styles.item)}>Ho Chi Minh</p>
                              <p className={clsx(styles.item)}>Ha Noi</p>
                              <p className={clsx(styles.item)}>Da Nang</p>
                           </div>
                        );
                     }

                     return null; // Fallback return when neither toggle[0] nor toggle[1] is true
                  })()}
               </div>
            </div>
                  
         </div>

         <div className={clsx(styles.iconWrapper)} onClick={openDialogChatSmall}>
            <img src="../assets/icon/chatboticon.png" className="avatar" alt="avatar" />
         </div>
         <div className={clsx(styles.backShadow,{[styles.appear]: stateBoolBackShadow})} onClick={closeShadow}>
         </div>
{/* start small */}
         <div className={clsx(styles.dialogChatSmall,{[styles.appear]: stateBoolIsOpenDialogChatSmall})}>
            <div className={clsx(styles.header)}>
               <div className={clsx(styles.left)}>
                  <div className={clsx(styles.iconwrapper)}>
                     
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={clsx(styles.icon)}>
                     <path d="M86.344,197.834a51.767,51.767,0,0,0-41.57,20.058V156.018a8.19,8.19,0,0,0-8.19-8.19H8.19A8.19,8.19,0,0,0,0,156.018V333.551a8.189,8.189,0,0,0,8.19,8.189H36.584a8.189,8.189,0,0,0,8.19-8.189v-8.088c11.628,13.373,25.874,19.769,41.573,19.769,34.6,0,61.922-26.164,61.922-73.843C148.266,225.452,121.229,197.834,86.344,197.834ZM71.516,305.691c-9.593,0-21.221-4.942-26.745-12.5V250.164c5.528-7.558,17.152-12.791,26.745-12.791,17.734,0,31.107,13.082,31.107,34.013C102.623,292.609,89.25,305.691,71.516,305.691Zm156.372-59.032a17.4,17.4,0,1,0,17.4,17.4A17.4,17.4,0,0,0,227.888,246.659ZM273.956,156.7V112.039a13.308,13.308,0,1,0-10.237,0V156.7a107.49,107.49,0,1,0,10.237,0Zm85.993,107.367c0,30.531-40.792,55.281-91.112,55.281s-91.111-24.75-91.111-55.281,40.792-55.281,91.111-55.281S359.949,233.532,359.949,264.062Zm-50.163,17.4a17.4,17.4,0,1,0-17.4-17.4h0A17.4,17.4,0,0,0,309.786,281.466ZM580.7,250.455c-14.828-2.617-22.387-3.78-22.387-9.885,0-5.523,7.268-9.884,17.735-9.884a65.56,65.56,0,0,1,34.484,10.1,8.171,8.171,0,0,0,11.288-2.468c.07-.11.138-.221.2-.333l8.611-14.886a8.2,8.2,0,0,0-2.867-11.123,99.863,99.863,0,0,0-52.014-14.138c-38.956,0-60.179,21.514-60.179,46.225,0,36.342,33.725,41.864,57.563,45.642,13.373,2.326,24.13,4.361,24.13,11.048,0,6.4-5.523,10.757-18.9,10.757-13.552,0-30.994-6.222-42.623-13.579a8.206,8.206,0,0,0-11.335,2.491c-.035.054-.069.108-.1.164l-10.2,16.891a8.222,8.222,0,0,0,2.491,11.066c15.224,10.3,37.663,16.692,59.441,16.692,40.409,0,63.957-19.769,63.957-46.515C640,260.63,604.537,254.816,580.7,250.455Zm-95.928,60.787a8.211,8.211,0,0,0-9.521-5.938,23.168,23.168,0,0,1-4.155.387c-7.849,0-12.5-6.106-12.5-14.245V240.28h20.349a8.143,8.143,0,0,0,8.141-8.143V209.466a8.143,8.143,0,0,0-8.141-8.143H458.594V171.091a8.143,8.143,0,0,0-8.143-8.143H422.257a8.143,8.143,0,0,0-8.143,8.143h0v30.232H399a8.143,8.143,0,0,0-8.143,8.143h0v22.671A8.143,8.143,0,0,0,399,240.28h15.115v63.667c0,27.037,15.408,41.282,43.9,41.282,12.183,0,21.383-2.2,27.6-5.446a8.161,8.161,0,0,0,4.145-9.278Z"/></svg>
                     
                  </div>
                  <FormatListBulletedIcon className={clsx(styles.menu)} onClick={toggleDialogSuggestSmall}/>   
               </div>
               <div className={clsx(styles.right)}>
                  <p className={clsx(styles.clearChat)} onClick={clearChat}>Clear chat</p>
                  <OpenInFullIcon className={clsx(styles.icon)} onClick={openDialogChatBig}/>
               </div>
            </div>
            <div className={clsx(styles.conversation)} >
               {
                  stateArrConversations.slice(1, stateArrConversations.length).map((obj, index) => {
                     if(obj.owner == "bot" && obj.hasOwnProperty('idgroup') == false ){
                        return ( 
                           <div className={clsx(styles.rowLeft)} key={obj.idmessage}>
                              <SmartToyIcon/>
                              <p className={clsx(styles.message)}>
                              {
                                 obj.message.split('/n').map((line:any, index:any) => (
                                 <React.Fragment key={line}>
                                    {line}
                                    <br />
                                 </React.Fragment>
                                 ))
                              }
                              
                              
                              </p>
                           </div>
                        )
                     }
                     else if(obj.owner == "user" && obj.hasOwnProperty('idgroup') == false) {
                        if(stateNumIdmessageToEdit === obj.idmessage){
                           return ( 
                              <>
                                 <div className={clsx(styles.rowRightEdit)} key={obj.idmessage}>
                                    <input type="text" name="input" 
                                       value={stateStringInputEdit} 
                                       onChange={handleChangeEdit} ref={inputRef} onKeyDown={handleKeyDown}  required/>
                                    <div className={clsx(styles.btnWrapper)}>
                                       <button onClick={saveAndSubmit} className={clsx(styles.submit)}>Save & Submit</button>
                                       <button onClick={cancelEditMessage} className={clsx(styles.cancel)}>Cancel</button>
                                       
                                    </div>
                              
                                 </div>
                                 <div className={clsx(styles.clearFloat)}>
                                    
                                 </div>
                              </>
                           )

                        }
                        else {
                           return ( 
                              <>
                                 <div className={clsx(styles.rowRight)} key={obj.idmessage}>
                                    <p className={clsx(styles.message)}>{obj.message}</p>
                                    <EditNoteIcon onClick={()=>editObjMessage(obj.idmessage)} className={clsx(styles.iconEdit)}/>

                                 </div>
                                 <div className={clsx(styles.clearFloat)}>
                                    
                                 </div>
                              </>
                           )
                        }
                     }
                  }) 
               } 
               <div ref={bottomRef} />
            </div>
            <div className={clsx(styles.inputWrapper)}>
               <input type="text" name="fullName" value={stateStringInput} onChange={handleChange} onKeyDown={handleKeyDown}/>
               <SendIcon className={clsx(styles.sendIcon)} onClick={onSend}/>
               <MicIcon className={clsx(styles.speechIcon)} onClick={startRecognition}/>
            </div>
         </div>
         {
            stateBoolIsOpenDialogSuggestSmall&&
            <div className={clsx(styles.suggestSmall,{[styles.appear]: stateBoolIsOpenDialogSuggestSmall}, {[styles.suggestBig]: !stateBoolSuggestModeSmall})}>
               <div className={clsx(styles.header)}>

                  <div className={clsx(styles.box,{[styles.selected]: stateStringGroupSelected === "category"})} onClick={()=>switchGroupPrompt('category')}>
                     <CategoryIcon className={clsx(styles.cat)}/>
                     <p className={clsx(styles.title)}>Skills</p>
                  </div>

                  <div className={clsx(styles.box,{[styles.selected]: stateStringGroupSelected === "general"})} onClick={()=>switchGroupPrompt('general')}>
                     <AllInboxIcon className={clsx(styles.general)}/>
                     <p className={clsx(styles.title)}>General questions</p>
                  </div>
                  <div className={clsx(styles.box,{[styles.selected]: stateStringGroupSelected === "account"})} onClick={()=>switchGroupPrompt('account')}>
                     <AccountCircleIcon className={clsx(styles.account)}/>
                     <p className={clsx(styles.title)}>Account Details</p>
                  </div>
                  {/* <div className={clsx(styles.box,{[styles.selected]: stateStringGroupSelected === "order"})} onClick={()=>switchGroupPrompt('order')}>
                     <ReceiptLongIcon className={clsx(styles.order)}/>
                     <p className={clsx(styles.title)}>Instructions</p>
                  </div> */}
               </div>
               <div className={clsx(styles.question)}>
                  <p className={clsx(styles.heading)}> <HelpIcon className={clsx(styles.icon)}/> You would like to ask about :</p>
                  <div className={clsx(styles.groupQuestions)}>
                     
                     {(() => {
                        if (stateStringGroupSelected === "category") {
                           return (
                              <ol>
                                 {
                                    
                                    stateArrCategories.map((obj, index) => {
                                       return ( 
                                          <li className={clsx(styles.item)} onClick={()=>promptSelected(obj)} key={obj}>{obj}</li>
                                       )
                                    })
                                 }
                              </ol>
                           )
                        }
                        else if (stateStringGroupSelected === "general") {
                           return (
                              <ol>
                                 {
                                    
                                    stateArrGeneralQuestions.map((obj, index) => {
                                       return ( 
                                          <li className={clsx(styles.item)} onClick={()=>promptSelected(obj)} key={obj}>{obj}</li>
                                       )
                                    })
                                 }
                              </ol>
                           )
                        }
                        else if (stateStringGroupSelected === "account"){
                           return (
                              <ol>
                                 {
                                    
                                    stateArrCustomerDetails.map((obj, index) => {
                                       return ( 
                                          <li className={clsx(styles.item)} onClick={()=>promptSelected(obj)} key={obj}>{obj}</li>
                                       )
                                    })
                                 }
                              </ol>
                           )
                        }
                        else if (stateStringGroupSelected === "order"){
                           return (
                              <ol>
                                 {
                                    
                                    stateArrOrderList.map((obj, index) => {
                                       return ( 
                                          <li className={clsx(styles.item)} onClick={()=>promptSelected(obj)} key={obj}>{obj}</li>
                                       )
                                    })
                                 }
                              </ol>
                           )
                        }
                     })()}
                  </div>
               </div>
               <div className={clsx(styles.keyword)}>
                  <p className={clsx(styles.title)} onClick={()=>promptSelected("delivery")}>delivery</p>
                  <p className={clsx(styles.title)} onClick={()=>promptSelected("account")}>account</p>
                  <p className={clsx(styles.title)} onClick={()=>promptSelected("problem")}>problem</p>
               </div>
            </div>
         }
{/* end small */}

{/* start big */}
         <div className={clsx(styles.dialogChatBig,{[styles.appear]: stateBoolIsOpenDialogChatBig})}>
            <div className={clsx(styles.header)}>
               <div className={clsx(styles.left)}>
                  <div className={clsx(styles.iconwrapper)}>
                     
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={clsx(styles.icon)}>
                     <path d="M86.344,197.834a51.767,51.767,0,0,0-41.57,20.058V156.018a8.19,8.19,0,0,0-8.19-8.19H8.19A8.19,8.19,0,0,0,0,156.018V333.551a8.189,8.189,0,0,0,8.19,8.189H36.584a8.189,8.189,0,0,0,8.19-8.189v-8.088c11.628,13.373,25.874,19.769,41.573,19.769,34.6,0,61.922-26.164,61.922-73.843C148.266,225.452,121.229,197.834,86.344,197.834ZM71.516,305.691c-9.593,0-21.221-4.942-26.745-12.5V250.164c5.528-7.558,17.152-12.791,26.745-12.791,17.734,0,31.107,13.082,31.107,34.013C102.623,292.609,89.25,305.691,71.516,305.691Zm156.372-59.032a17.4,17.4,0,1,0,17.4,17.4A17.4,17.4,0,0,0,227.888,246.659ZM273.956,156.7V112.039a13.308,13.308,0,1,0-10.237,0V156.7a107.49,107.49,0,1,0,10.237,0Zm85.993,107.367c0,30.531-40.792,55.281-91.112,55.281s-91.111-24.75-91.111-55.281,40.792-55.281,91.111-55.281S359.949,233.532,359.949,264.062Zm-50.163,17.4a17.4,17.4,0,1,0-17.4-17.4h0A17.4,17.4,0,0,0,309.786,281.466ZM580.7,250.455c-14.828-2.617-22.387-3.78-22.387-9.885,0-5.523,7.268-9.884,17.735-9.884a65.56,65.56,0,0,1,34.484,10.1,8.171,8.171,0,0,0,11.288-2.468c.07-.11.138-.221.2-.333l8.611-14.886a8.2,8.2,0,0,0-2.867-11.123,99.863,99.863,0,0,0-52.014-14.138c-38.956,0-60.179,21.514-60.179,46.225,0,36.342,33.725,41.864,57.563,45.642,13.373,2.326,24.13,4.361,24.13,11.048,0,6.4-5.523,10.757-18.9,10.757-13.552,0-30.994-6.222-42.623-13.579a8.206,8.206,0,0,0-11.335,2.491c-.035.054-.069.108-.1.164l-10.2,16.891a8.222,8.222,0,0,0,2.491,11.066c15.224,10.3,37.663,16.692,59.441,16.692,40.409,0,63.957-19.769,63.957-46.515C640,260.63,604.537,254.816,580.7,250.455Zm-95.928,60.787a8.211,8.211,0,0,0-9.521-5.938,23.168,23.168,0,0,1-4.155.387c-7.849,0-12.5-6.106-12.5-14.245V240.28h20.349a8.143,8.143,0,0,0,8.141-8.143V209.466a8.143,8.143,0,0,0-8.141-8.143H458.594V171.091a8.143,8.143,0,0,0-8.143-8.143H422.257a8.143,8.143,0,0,0-8.143,8.143h0v30.232H399a8.143,8.143,0,0,0-8.143,8.143h0v22.671A8.143,8.143,0,0,0,399,240.28h15.115v63.667c0,27.037,15.408,41.282,43.9,41.282,12.183,0,21.383-2.2,27.6-5.446a8.161,8.161,0,0,0,4.145-9.278Z"/></svg>
                     
                  </div>
                  <FormatListBulletedIcon className={clsx(styles.menu)} onClick={toggleDialogSuggestBig}/>   
               </div>
               <div className={clsx(styles.right)}>
                  <p className={clsx(styles.clearChat)} onClick={clearChat}>Clear chat</p>
                  <CloseFullscreenIcon className={clsx(styles.icon)} onClick={openDialogChatSmall}/>
               </div>
            </div>
            <div className={clsx(styles.main)}>
               <div className={clsx(styles.sideBarConversation)}>
                  <div className={clsx(styles.addNewWrapper)}>
                     <AddIcon/>
                     <button onClick={newChat}>New Chat</button>
                  </div>
                  <div className={clsx(styles.divider)}>
                     
                  </div>
                  <div className={clsx(styles.groupConversation)}>
                     <h3>Conversations List</h3>

                     {
                        stateArrGroupConversations.map((arr, index) => {
                           // console.log('arr: ', arr);
                           return ( 
                              <div className={clsx(styles.row)} key={arr[0].idgroup} onClick={()=>selectGroup(arr[0].idgroup)}>
                                 <ChatBubbleOutlineIcon className={clsx(styles.icon)}/>
                                 <p className={clsx(styles.item)}>{arr[2].message}</p>
                              </div>
                           )
                        })
                     }
                  </div>
               </div>
               <div className={clsx(styles.right)}>
                  <div className={clsx(styles.conversation)}>
                     
                     {
                        stateArrConversations.slice(1, stateArrConversations.length).map((obj, index) => {
                           if(obj.owner == "bot" && obj.hasOwnProperty('idgroup') == false ){
                              return ( 
                                 <div className={clsx(styles.rowLeft)} key={obj.idmessage}>
                                    <SmartToyIcon className={clsx(styles.icon)}/>
                                    <p className={clsx(styles.message)}>
                                       {
                                          obj.message.split('/n').map((line:any, index:any) => (
                                          <React.Fragment key={index}>
                                             {line}
                                             <br />
                                          </React.Fragment>
                                          ))
                                       }
                                    </p>
                                 </div>
                              )
                           }
                           else if(obj.owner == "user" && obj.hasOwnProperty('idgroup') == false) {
                              if(stateNumIdmessageToEdit === obj.idmessage){
                                 return ( 
                                    <>
                                       <div className={clsx(styles.rowRightEdit)} key={obj.idmessage}>
                                          <input type="text" name="input" 
                                          value={stateStringInputEdit} 
                                          onChange={handleChangeEdit} onKeyDown={handleKeyDown} ref={inputRef} required/>
                                          <div className={clsx(styles.btnWrapper)}>
                                             <button onClick={saveAndSubmit} className={clsx(styles.submit)}>Save & Submit</button>
                                             <button onClick={cancelEditMessage} className={clsx(styles.cancel)}>Cancel</button>
                                             
                                          </div>
      
                                       </div>
                                       <div className={clsx(styles.clearFloat)}>
                                          
                                       </div>
                                    </>
                                 )

                              }
                              else {
                                 return ( 
                                    <>
                                       <div className={clsx(styles.rowRight)} key={obj.idmessage}>
                                          <p className={clsx(styles.message)}>{obj.message}</p>
                                          <EditNoteIcon onClick={()=>editObjMessage(obj.idmessage)} className={clsx(styles.iconEdit)}/>
      
                                       </div>
                                       <div className={clsx(styles.clearFloat)}>
                                          
                                       </div>
                                    </>
                                 )
                              }
                           }
                        }) 
                     } 
                     <div ref={bottomRef} />

                  </div>
                  <div className={clsx(styles.inputWrapper)}>
                     
                     <input type="text" name="fullName" value={stateStringInput} onChange={handleChange} onKeyDown={handleKeyDown}  required/>
                     {
                        stateBoolSend == true ? 
                        <SendIcon className={clsx(styles.sendIcon)} onClick={onSend}/>
                        :
                        <SendIcon className={clsx(styles.sendIcon)} onClick={onEditConversation}/>

                     }
                     <MicIcon className={clsx(styles.speechIcon)} onClick={startRecognition}/>

                  </div>
               </div>
            </div>
         </div>
{/* end big */}
      </div>
   )
}
export default MenuBar

