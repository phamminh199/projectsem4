import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './salary.module.scss' 

import collectionAPI from '../../../API/collectionAPI';

function PredictSalary() {
   const arrTitle = [
      {title:".NET Application Developer",value:0.702786378},
      {title:".NET Developer",value:0.705882353},
      {title:".NET Development ",value:0.690402477},
      {title:".NET Full Stack Developer",value:0.712074303},
      {title:".NET ",value:0.681114551},
      {title:".NET Software Architect",value:0.708978328},
      {title:".NET Software Engineer",value:0.721362229},
      {title:".NET Software Engineering ",value:0.693498452},
      {title:".NET Solutions Architect",value:0.718266254},
      {title:".NET Technical Lead",value:0.715170279},
      {title:"AI Architect",value:0.953560372},
      {title:"AI Consultant",value:0.981424149},
      {title:"AI Data Analyst",value:0.962848297},
      {title:"AI Data Science ",value:0.972136223},
      {title:"AI Developer",value:0.93498452},
      {title:"AI Engineer",value:0.99380805},
      {title:"AI Engineer ",value:0.925696594},
      {title:"AI ",value:0.956656347},
      {title:"AI Machine Learning ",value:0.969040248},
      {title:"AI Research Assistant",value:0.959752322},
      {title:"AI Research Engineer",value:0.944272446},
      {title:"AI Researcher",value:0.990712074},
      {title:"AI Scientist",value:0.996904025},
      {title:"AI Software Development ",value:0.965944272},
      {title:"AI Solutions Architect",value:0.987616099},
      {title:"AI Team Lead",value:1},
      {title:"Android Application Architect",value:0.294117647},
      {title:"Android Application Tester",value:0.26625387},
      {title:"Android Developer",value:0.287925697},
      {title:"Android Developer ",value:0.26006192},
      {title:"Android Development ",value:0.269349845},
      {title:"Android Development Manager",value:0.303405573},
      {title:"Android Technical Lead",value:0.297213622},
      {title:"Android UI/UX Designer",value:0.284829721},
      {title:"Art Director",value:0.900928793},
      {title:"Associate Java Developer",value:0.080495356},
      {title:"Associate iOS Developer",value:0.325077399},
      {title:"Automation Test Engineer",value:0.6625387},
      {title:"Backend Developer (Node.js)",value:0.845201238},
      {title:"Backend Developer (Node.js) ",value:0.832817337},
      {title:"Business Analyst",value:0.761609907},
      {title:"Business Analyst ",value:0.73374613},
      {title:"Business Analyst ",value:0.72755418},
      {title:"Business Intelligence Analyst",value:0.247678019},
      {title:"Creative Director",value:0.904024768},
      {title:"Data Analyst",value:0.755417957},
      {title:"Data Analyst (Python)",value:0.517027864},
      {title:"Data Analyst ",value:0.736842105},
      {title:"Data Architect",value:0.386996904},
      {title:"Data Engineer",value:0.256965944},
      {title:"Data Engineer (Python)",value:0.535603715},
      {title:"Data Entry Specialist",value:0.219814241},
      {title:"Data Management ",value:0.365325077},
      {title:"Data Science ",value:0.919504644},
      {title:"Data Scientist",value:0.938080495},
      {title:"Data Scientist (Python)",value:0.523219814},
      {title:"Database Administrator",value:0.380804954},
      {title:"Database Administrator (DBA)",value:0.253869969},
      {title:"Database Administrator (DBA) ",value:0.216718266},
      {title:"Database Analyst",value:0.356037152},
      {title:"Database Consultant",value:0.39628483},
      {title:"Database Developer",value:0.244582043},
      {title:"Database Engineer",value:0.393188854},
      {title:"Database ",value:0.362229102},
      {title:"Database Support ",value:0.368421053},
      {title:"Design ",value:0.873065015},
      {title:"Design Manager",value:0.907120743},
      {title:"DevOps Engineer (Linux)",value:0.814241486},
      {title:"Entry-Level Java Developer",value:0.06501548},
      {title:"Entry-level Business Analyst",value:0.730650155},
      {title:"Financial Analyst ",value:0.73993808},
      {title:"Frontend Developer",value:0.207430341},
      {title:"Frontend Developer (ReactJS)",value:0.034055728},
      {title:"Frontend Developer (ReactJS) ",value:0.003095975},
      {title:"Frontend Development ",value:0.176470588},
      {title:"Frontend Development  (ReactJS)",value:0.012383901},
      {title:"Frontend Development Lead",value:0.20123839},
      {title:"Frontend Engineer (ReactJS)",value:0.052631579},
      {title:"Full Stack Developer",value:0.198142415},
      {title:"Full Stack Developer (Node.js)",value:0.848297214},
      {title:"Graphic Design ",value:0.879256966},
      {title:"Graphic Designer",value:0.891640867},
      {title:"Java Application Developer",value:0.095975232},
      {title:"Java Application Development ",value:0.07120743},
      {title:"Java Application Support Engineer",value:0.086687307},
      {title:"Java Backend Developer",value:0.099071207},
      {title:"Java Developer",value:0.105263158},
      {title:"Java Developer ",value:0.058823529},
      {title:"Java Development Manager",value:0.114551084},
      {title:"Java Full Stack Developer",value:0.102167183},
      {title:"Java Programmer",value:0.061919505},
      {title:"Java Programmer Analyst",value:0.083591331},
      {title:"Java Software Engineer",value:0.092879257},
      {title:"Java Software Engineering ",value:0.068111455},
      {title:"Java Solutions Architect",value:0.111455108},
      {title:"Java Technical Lead",value:0.108359133},
      {title:"JavaScript Developer",value:0.204334365},
      {title:"JavaScript Developer ",value:0.167182663},
      {title:"JavaScript Software Engineering ",value:0.179566563},
      {title:"Lead Data Analyst",value:0.764705882},
      {title:"Lead Frontend Developer (ReactJS)",value:0.046439628},
      {title:"Lead PHP Developer",value:0.160990712},
      {title:"Lead Ruby Developer",value:0.489164087},
      {title:"Lead Ruby on Rails Developer",value:0.628482972},
      {title:"Lead iOS Developer",value:0.346749226},
      {title:"Linux Administrator",value:0.808049536},
      {title:"Linux Architect",value:0.811145511},
      {title:"Linux DevOps Engineer",value:0.80495356},
      {title:"Linux Infrastructure Specialist",value:0.801857585},
      {title:"Linux ",value:0.780185759},
      {title:"Linux Network Administrator ",value:0.786377709},
      {title:"Linux Support Engineer",value:0.792569659},
      {title:"Linux System Administrator",value:0.770897833},
      {title:"Linux System Support ",value:0.783281734},
      {title:"Linux Systems Engineer",value:0.79876161},
      {title:"Linux Technical Support Engineer",value:0.773993808},
      {title:"Machine Learning",value:0.910216718},
      {title:"Machine Learning Engineer",value:0.92879257},
      {title:"Machine Learning Engineer ",value:0.916408669},
      {title:"Machine Learning Manager",value:0.950464396},
      {title:"Machine Learning Research ",value:0.922600619},
      {title:"Machine Learning Specialist",value:0.941176471},
      {title:"Mobile App Architect",value:0.578947368},
      {title:"Mobile App Developer",value:0.575851393},
      {title:"Mobile App Developer (Android)",value:0.300309598},
      {title:"Mobile App Developer (iOS)",value:0.3374613},
      {title:"Mobile App Developer ",value:0.547987616},
      {title:"Mobile App Developer ",value:0.53869969},
      {title:"Mobile App Development  (Android)",value:0.27244582},
      {title:"Mobile App Development  (iOS)",value:0.318885449},
      {title:"Mobile App Marketing ",value:0.554179567},
      {title:"Mobile App Product Manager",value:0.572755418},
      {title:"Mobile App Project Manager",value:0.582043344},
      {title:"Mobile App Quality Assurance ",value:0.551083591},
      {title:"Mobile App Support Specialist",value:0.563467492},
      {title:"Mobile App Team Lead (Android)",value:0.291021672},
      {title:"Mobile App Tester",value:0.541795666},
      {title:"Mobile App UI/UX Designer",value:0.569659443},
      {title:"MySQL Developer",value:0.359133127},
      {title:"Node.js Architect",value:0.860681115},
      {title:"Node.js Developer",value:0.854489164},
      {title:"Node.js ",value:0.823529412},
      {title:"Operations Analyst",value:0.749226006},
      {title:"PHP Application Developer",value:0.145510836},
      {title:"PHP Architect",value:0.164086687},
      {title:"PHP Backend ",value:0.13622291},
      {title:"PHP Developer",value:0.157894737},
      {title:"PHP Developer ",value:0.120743034},
      {title:"PHP Development ",value:0.13003096},
      {title:"PHP Programmer",value:0.126934985},
      {title:"PHP Software Engineer",value:0.154798762},
      {title:"PHP Web Developer",value:0.151702786},
      {title:"Principal Analyst",value:0.767801858},
      {title:"Principal Data Scientist",value:0.947368421},
      {title:"Principal Database Administrator",value:0.390092879},
      {title:"Principal Java Engineer",value:0.117647059},
      {title:"Python Developer",value:0.529411765},
      {title:"Python ",value:0.498452012},
      {title:"Python Programmer",value:0.495356037},
      {title:"Python Software Developer",value:0.520123839},
      {title:"Python Software Engineer",value:0.513931889},
      {title:"Python Team Lead",value:0.53250774},
      {title:"Python Web Developer",value:0.526315789},
      {title:"QA Analyst",value:0.637770898},
      {title:"QA Engineer",value:0.66873065},
      {title:"QA Manager",value:0.436532508},
      {title:"QA Tester",value:0.650154799},
      {title:"QA/QC ",value:0.640866873},
      {title:"Quality Assurance Engineer",value:0.427244582},
      {title:"Quality Assurance ",value:0.634674923},
      {title:"Quality Assurance Tester",value:0.399380805},
      {title:"Quality Assurance ",value:0.647058824},
      {title:"ReactJS Architect",value:0.055727554},
      {title:"ReactJS Developer",value:0.043343653},
      {title:"ReactJS Developer ()",value:0},
      {title:"ReactJS Development ",value:0.009287926},
      {title:"ReactJS Software Developer",value:0.040247678},
      {title:"ReactJS Software Engineer",value:0.024767802},
      {title:"ReactJS Software Engineering ",value:0.015479876},
      {title:"ReactJS Technical Lead",value:0.049535604},
      {title:"Ruby Application Developer",value:0.476780186},
      {title:"Ruby Developer",value:0.482972136},
      {title:"Ruby Developer ",value:0.458204334},
      {title:"Ruby ",value:0.455108359},
      {title:"Ruby Mobile Developer",value:0.473684211},
      {title:"Ruby Programmer",value:0.448916409},
      {title:"Ruby Programming ",value:0.46130031},
      {title:"Ruby Software Architect",value:0.486068111},
      {title:"Ruby Software Developer",value:0.46749226},
      {title:"Ruby Software Engineer",value:0.452012384},
      {title:"Ruby Web Developer",value:0.470588235},
      {title:"Ruby on Rails Application Developer",value:0.609907121},
      {title:"Ruby on Rails Architect",value:0.625386997},
      {title:"Ruby on Rails Developer",value:0.622291022},
      {title:"Ruby on Rails Development ",value:0.59752322},
      {title:"Ruby on Rails Engineer",value:0.60371517},
      {title:"Ruby on Rails Full Stack Developer",value:0.619195046},
      {title:"Ruby on Rails ",value:0.591331269},
      {title:"Ruby on Rails Software Engineer",value:0.616099071},
      {title:"Ruby on Rails Web Developer",value:0.606811146},
      {title:"SQL Analyst",value:0.213622291},
      {title:"SQL Developer",value:0.250773994},
      {title:"SQL Developer ",value:0.222910217},
      {title:"SQL Engineer",value:0.241486068},
      {title:"Software Test Engineer",value:0.430340557},
      {title:"Software Tester",value:0.40247678},
      {title:"Software Testing ",value:0.643962848},
      {title:"Systems Analyst",value:0.758513932},
      {title:"Technical Lead",value:0.210526316},
      {title:"Technical Lead (Node.js)",value:0.857585139},
      {title:"Test Analyst",value:0.424148607},
      {title:"Test Architect",value:0.674922601},
      {title:"Test Automation Architect",value:0.439628483},
      {title:"Test Consultant",value:0.442724458},
      {title:"Test Lead",value:0.433436533},
      {title:"Testing Analyst ",value:0.414860681},
      {title:"UI/UX Design ",value:0.876160991},
      {title:"UI/UX Designer",value:0.894736842},
      {title:"Web Application Development ",value:0.182662539},
      {title:"Web Designer",value:0.897832817},
      {title:"Web Developer (PHP)",value:0.142414861},
      {title:"Web Development ",value:0.173374613},
      {title:"Web Development  (PHP)",value:0.133126935},
      {title:"Web Development  (Ruby on Rails)",value:0.600619195},
      {title:"iOS Application Engineer",value:0.340557276},
      {title:"iOS Developer",value:0.343653251},
      {title:"iOS Developer ",value:0.321981424},
      {title:"iOS Developer ",value:0.306501548},
      {title:"iOS Development ",value:0.315789474},
      {title:"iOS ",value:0.309597523},
      {title:"iOS Technical Lead",value:0.349845201}
   ]

   const arrSkill = [
      {skill:".NET",value:0.7},
      {skill:"AI",value:1},
      {skill:"Android",value:0.25},
      {skill:"Business Analyst",value:0.75},
      {skill:"Designer",value:0.9},
      {skill:"Linux",value:0.8},
      {skill:"Machine learning",value:0.95},
      {skill:"Mobile Apps",value:0.55},
      {skill:"MySQL",value:0.35},
      {skill:"NodeJS",value:0.85},
      {skill:"Python",value:0.5},
      {skill:"QA QC",value:0.65},
      {skill:"ReactJS",value:0},
      {skill:"Ruby",value:0.45},
      {skill:"Ruby on Rails",value:0.6},
      {skill:"SQL",value:0.2},
      {skill:"Tester",value:0.4},
      {skill:"iOS",value:0.3},
      {skill:"java",value:0.05},
      {skill:"javascript",value:0.15},
      {skill:"php",value:0.1}
   ]

   const arrLevel = [
      {level:"Fresher",value:0},
      {level:"Internship",value:0.25},
      {level:"Junior",value:0.5},
      {level:"Mid",value:0.75},
      {level:"Senior",value:1},
   ]
   const arrField = [
      {field:"Back-end",value:0},
      {field:"Data",value:0.166666667},
      {field:"Design",value:0.333333333},
      {field:"Front-end",value:0.5},
      {field:"Mobile",value:0.666666667},
      {field:"operating system",value:1},
      {field:"Other",value:0.833333333}
   ]
   const arrCity = [
      {city:"Da Nang",value:0},
      {city:"Ha Noi",value:0.5},
      {city:"Ho Chi Minh",value:1}
   ]
   const arrWorkmode = [
      {mode:"flexible",value:0.25},
      {mode:"remote",value:1},
      {mode:"hybrid",value:0.5},
      {mode:"office",value:0.75}
   ]
   const arrSize = [
      {size:"50",value:0.833333333},
      {size:"100",value:0},
      {size:"150",value:0.5},
      {size:"200",value:0.666666667},
      {size:"500",value:1},
      {size:"1000",value:0.166666667},
      {size:"1000+",value:0.333333333}
   ]
   const arrCountry = [
      {country:"Viet Nam",value:1},
      {country:"International",value:0.222222222},
    
   ]
   const [groupState, setGroupState] = useState({
      idtitle: "",
      level: "",
      idskill: "",
      field: "",
      city: "",
      workmode: "",
      size: "",
      country: ""
   });
   
   const [stateTitle, setStateTitle] = useState<string>('');
   const [stateLevel, setStateLevel] = useState<string>('');
   const [stateSkill, setStateSkill] = useState<string>('');
   const [stateField, setStateField] = useState<string>('');
   const [stateCity, setStateCity] = useState<string>('');
   const [stateWorkMode, setStateWorkMode] = useState<string>('');
   const [stateSize, setStateSize] = useState<string>('');
   const [stateCountry, setStateCountry] = useState<string>('');

   const [stateTitle_number, setStateTitle_number] = useState(0);
   const [stateLevel_number, setStateLevel_number] = useState(0);
   const [stateSkill_number, setStateSkill_number] = useState(0);
   const [stateField_number, setStateField_number] = useState(0);
   const [stateCity_number, setStateCity_number] = useState(0);
   const [stateWorkMode_number, setStateWorkMode_number] = useState(0);
   const [stateSize_number, setStateSize_number] = useState(0);
   const [stateCountry_number, setStateCountry_number] = useState(0);
   
   const [stateResult, setStateResult] = useState(0);

   
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            
      const {name, value} = e.target; //gộp 2 dòng trên làm 1, name là attribute name của thẻ <input type="text" name="email"
      setGroupState((prev)=>{
         return {...prev, [name]: value};
      });

      console.log(name);
      console.log(value);

      if (name == "idtitle"){
         console.log("269: ",name);

         const searchText = value.toLowerCase();
   
         for (let i = 0; i < arrTitle.length; i++) {
            const title = arrTitle[i].title.toLowerCase();
            if (title.includes(searchText)) {
               // console.log("1",arrTitle[i]);
               // console.log("2",arrTitle[i].title);
               setStateTitle(arrTitle[i].title);
               setStateTitle_number(arrTitle[i].value)
               break;
            }
         }
      }

      if (name == "idskill"){
         const searchText = value.toLowerCase();
   
         for (let i = 0; i < arrSkill.length; i++) {
            const skill = arrSkill[i].skill.toLowerCase();
            if (skill.includes(searchText)) {
               // console.log("1",arrTitle[i]);
               // console.log("2",arrTitle[i].title);
               setStateSkill(arrSkill[i].skill);
               setStateSkill_number(arrSkill[i].value);
      
               break;
            }
         }
      }





            
   }

   const handleSubmitAdd = async (e:any) => {
      e.preventDefault();
      
      const data = {
         "idtitle": stateTitle_number,
         "level": stateLevel_number,
         "idskill": stateSkill_number,
         "field": stateField_number,
         "city": stateCity_number,
         "workmode": stateWorkMode_number,
         "size": stateSize_number,
         "country": stateCountry_number
      }
      console.log(data);
      // const response: any = await collectionAPI.predict(data); //phải có await nghĩa là khi nào có data rồi thì mới lấy
      console.log(         {
         "idtitle": stateTitle_number,
         "level": stateLevel_number,
         "idskill": stateSkill_number,
         "field": stateField_number,
         "city": stateCity_number,
         "workmode": stateWorkMode_number,
         "size": stateSize_number,
         "country": stateCountry_number
      });
      let response: any;
      try {
         response = await collectionAPI.predictSalary(
            {
               "idtitle": stateTitle_number,
               "level": stateLevel_number,
               "idskill": stateSkill_number,
               "field": stateField_number,
               "city": stateCity_number,
               "workmode": stateWorkMode_number,
               "size": stateSize_number,
               "country": stateCountry_number
            }
         );
         console.log(response.data.prediction);
         let salary = response.data.prediction * 6200;
         setStateResult(salary);
      }catch(err){
         console.log('err:', err);
      }
   }

   // yêu cầu hàm getData() chạy 1 lần mỗi khi component Home mount, để lấy dữ liệu mảng products từ  nodejs để đổ ra frontend reactjs
   useEffect(() => {
      // postData();
   }, []);

   const onReset = () => {
      setGroupState({
         idtitle: "",
         level: "",
         idskill: "",
         field: "",
         city: "",
         workmode: "",
         size: "",
         country: ""
      })
   }

   const handleChangeLevel = (e: any) => {

         const searchText = e.target.value.toLowerCase();
   
         for (let i = 0; i < arrLevel.length; i++) {
            const level = arrLevel[i].level.toLowerCase();
            if (level.includes(searchText)) {
               // console.log("1",arrTitle[i]);
               // console.log("2",arrTitle[i].title);
               setStateLevel(arrLevel[i].level);
               setStateLevel_number(arrLevel[i].value);
      
               break;
            }
         }

      setStateLevel(e.target.value); // update state này để nó thay đổi nội dung ô select sau khi ta select

      //update vào groupState
      setGroupState({
         ...groupState,
         level: e.target.value
      })   
   }
   const handleChangefield = (e: any) => {

      const searchText = e.target.value.toLowerCase();
   
      for (let i = 0; i < arrField.length; i++) {
         const field = arrField[i].field.toLowerCase();
         if (field.includes(searchText)) {
            // console.log("1",arrTitle[i]);
            // console.log("2",arrTitle[i].title);
            setStateField(arrField[i].field);
            setStateField_number(arrField[i].value);
   
            break;
         }
      }

      setStateField(e.target.value); // update state này để nó thay đổi nội dung ô select sau khi ta select

      //update vào groupState
      setGroupState({
         ...groupState,
         field: e.target.value
      })   
   }
   const handleChangeCity = (e: any) => {

      const searchText = e.target.value.toLowerCase();
   
      for (let i = 0; i < arrCity.length; i++) {
         const city = arrCity[i].city.toLowerCase();
         if (city.includes(searchText)) {
            // console.log("1",arrTitle[i]);
            // console.log("2",arrTitle[i].title);
            setStateCity(arrCity[i].city);
            setStateCity_number(arrCity[i].value);
   
            break;
         }
      }

      setStateCity(e.target.value); // update state này để nó thay đổi nội dung ô select sau khi ta select

      //update vào groupState
      setGroupState({
         ...groupState,
         city: e.target.value
      })   
   }
   const handleChangeWorkmode = (e: any) => {

      const searchText = e.target.value.toLowerCase();
   
      for (let i = 0; i < arrWorkmode.length; i++) {
         const mode = arrWorkmode[i].mode.toLowerCase();
         if (mode.includes(searchText)) {
            // console.log("1",arrTitle[i]);
            // console.log("2",arrTitle[i].title);
            setStateWorkMode(arrWorkmode[i].mode);
            setStateWorkMode_number(arrWorkmode[i].value);
   
            break;
         }
      }

      setStateWorkMode(e.target.value); // update state này để nó thay đổi nội dung ô select sau khi ta select

      //update vào groupState
      setGroupState({
         ...groupState,
         workmode: e.target.value
      })   
   }
   const handleChangeWorkSize = (e: any) => {

      const searchText = e.target.value.toLowerCase();
   
      for (let i = 0; i < arrSize.length; i++) {
         const size = arrSize[i].size.toLowerCase();
         if (size.includes(searchText)) {
            // console.log("1",arrTitle[i]);
            // console.log("2",arrTitle[i].title);
            setStateSize(arrSize[i].size);
            setStateSize_number(arrSize[i].value);
   
            break;
         }
      }

      setStateSize(e.target.value); // update state này để nó thay đổi nội dung ô select sau khi ta select

      //update vào groupState
      setGroupState({
         ...groupState,
         size: e.target.value
      })   
   }
   const handleChangeCountry = (e: any) => {

      const searchText = e.target.value.toLowerCase();
   
      for (let i = 0; i < arrCountry.length; i++) {
         const country = arrCountry[i].country.toLowerCase();
         if (country.includes(searchText)) {
            // console.log("1",arrTitle[i]);
            // console.log("2",arrTitle[i].title);
            setStateCountry(arrCountry[i].country);
            setStateCountry_number(arrCountry[i].value);

            break;
         }
      }

      setStateCountry(e.target.value); // update state này để nó thay đổi nội dung ô select sau khi ta select

      //update vào groupState
      setGroupState({
         ...groupState,
         country: e.target.value
      })   
   }
   return (
      <div className={clsx(styles.component_PredictSalary)}>
         <h1>PREDICT SALARY</h1>
         <div className={clsx(styles.inputWrapper)}>
            <form onSubmit = {handleSubmitAdd} className={clsx(styles.formAdd)}>
               <div className={clsx(styles.inputGroup)}>
                        
                  <div className={clsx(styles.left)}>
                     <div className={clsx(styles.row)}>

                        <label>Title: </label>
                        <input type="text" name="idtitle" value={groupState.idtitle} onChange={handleChange} required placeholder='data engineer...'/>

                     </div>
                     <div className={clsx(styles.row)}>

                        <label>Level: </label>
                        {/* <input type="text" name="level" value={groupState.level} onChange={handleChange} required placeholder='Intern or Fresher or junior...'/> */}
                        <select name="level" value={groupState.level}  onChange={handleChangeLevel} className={clsx(styles.selectOption)} >
                           <option value="Fresher">Fresher</option>
                           <option value="Internship">Internship</option>
                           <option value="Junior">Junior</option>
                           <option value="Mid">Mid</option>
                           <option value="Senior">Senior</option>
                        </select>
                     </div>
                     {/* <select name="level" value={groupState.level}  onChange={handleChangeLevel} className={clsx(styles.selectOption)}>
                           <option value="Ho Chi Minh">Ho Chi Minh</option>
                           <option value="Ha Noi">Ha Noi</option>
                           <option value="Da Nang">Da Nang</option>
                        </select> */}
                     <div className={clsx(styles.row)}>

                        <label>Skill: </label>
                        <input type="text" name="idskill" value={groupState.idskill} onChange={handleChange} required placeholder='python...'/>

                     </div>
                     <div className={clsx(styles.row)}>

                        <label>Field: </label>
                        {/* <input type="text" name="field" value={groupState.field} onChange={handleChange} required placeholder='Data or Back-end...'/> */}
                        <select name="field" value={groupState.field}  onChange={handleChangefield} className={clsx(styles.selectOption)} >
                           <option value="Data">Data</option>
                           <option value="Back-end">Back-end</option>
                           <option value="Front-end">Junior</option>
                           <option value="Design">Design</option>
                           <option value="Mobile">Mobile</option>
                           <option value="operating system">operating system</option>
                           <option value="Other">Other</option>
                        </select>
                     </div>
                  </div>
                  <div className={clsx(styles.right)}>
                     <div className={clsx(styles.row)}>

                        <label>City: </label>
                        {/* <input type="text" name="city" value={groupState.city} onChange={handleChange} required placeholder='Ho Chi Minh or Ha Noi...'/> */}
                        <select name="city" value={groupState.city}  onChange={handleChangeCity} className={clsx(styles.selectOption)} >
                           <option value="Ho Chi Minh">Ho Chi Minh</option>
                           <option value="Ha Noi">Ha Noi</option>
                           <option value="Da Nang">Da Nang</option>
                        </select>
                     </div>
                     <div className={clsx(styles.row)}>

                        <label>Work mode: </label>
                        {/* <input type="text" name="workmode" value={groupState.workmode} onChange={handleChange} required placeholder='Hybrid or remote...'/> */}
                        <select name="workmode" value={groupState.workmode}  onChange={handleChangeWorkmode} className={clsx(styles.selectOption)} >
                           <option value="office">office</option>
                           <option value="hybrid">hybrid</option>
                           <option value="remote">remote</option>
                           <option value="flexible">flexible</option>
                        </select>
                     </div>
                     <div className={clsx(styles.row)}>

                        <label>Size: </label>
                        {/* <input type="text" name="size" value={groupState.size} onChange={handleChange} required placeholder='50 or 100 or 1000...'/> */}
                        <select name="size" value={groupState.size}  onChange={handleChangeWorkSize} className={clsx(styles.selectOption)} >
                           <option value="50">50</option>
                           <option value="100">100</option>
                           <option value="150">150</option>
                           <option value="200">200</option>
                           <option value="500">500</option>
                           <option value="1000">1000</option>
                           <option value="1000+">1000+</option>
                        </select>
                     </div>
                     <div className={clsx(styles.row)}>

                        <label>Country: </label>
                        {/* <input type="text" name="country" value={groupState.country} onChange={handleChange} required placeholder='Viet Nam or America...'/> */}
                        <select name="country" value={groupState.country}  onChange={handleChangeCountry} className={clsx(styles.selectOption)} >
                           <option value="Viet Nam">Viet Nam</option>
                           <option value="international">international</option>
                        </select>
                     </div>
                  </div>
               </div>

               <div className={clsx(styles.btnWrapper)}>
                  
                  <button type="submit" >Submit</button>
                  <button type="reset" onClick={onReset}>Reset</button>
               </div>
            </form>
            <div className={clsx(styles.inputInfo)}>
               <h3>Your input information are: </h3>
               <div className={clsx(styles.wrapper)}>
                        
                  <div className={clsx(styles.left)}>
                     <p><span>Title:</span> {stateTitle}  </p>
                     <p><span>Level:</span> {stateLevel}</p>
                     <p><span>Skill:</span> {stateSkill}</p>
                     <p><span>Field:</span> {stateField}</p>
                           
                  </div>
                  <div className={clsx(styles.right)}>
                     <p><span>City:</span> {stateCity}</p>
                     <p><span>Work Mode:</span> {stateWorkMode}</p>
                     <p><span>Size:</span> {stateSize}</p>
                     <p><span>Country:</span> {stateCountry}</p>
                           
                  </div>
               </div>
            </div>
            {/* {stateTitle}
            <p></p>
            {stateLevel}
            {groupState.level }
            <p></p>  
            {stateSkill}
            {groupState.idskill}
            <p></p>  
            {groupState.field}
            <p></p>  
            {groupState.city}
            <p></p>  
            {groupState.workmode}
            <p></p>  
            {groupState.size}
            <p></p>  
            {groupState.country} */}
            {/* {stateTitle_number}
            <p></p>
            {stateLevel_number}
            <p></p>
            {stateSkill_number}
            <p></p>
            {stateField_number}
            <p></p>
            {stateCity_number}
            <p></p>
            {stateWorkMode_number}
            <p></p>
            {stateSize_number}
            <p></p>
            {stateCountry_number} */}
         </div>
         <div className={clsx(styles.result)}>
            <h3>Your salary prediction based on your input information is:</h3>
            {/* <h1>$ {stateResult.toFixed(2).toLocaleString('en-US')}</h1> */}
            <h1>${stateResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h1>

         </div>
         {/* <div className={clsx(styles.history)}>
            <img src="./assets/images/deploy.png" className={clsx(styles.imgHorizontal, styles.sql)} alt="machine learning" />
         </div> */}
      </div>
   )
}
export default PredictSalary