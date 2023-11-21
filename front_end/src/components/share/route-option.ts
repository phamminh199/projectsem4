export const ROUTE_NAME = {
   ALLJOBS: "/alljobs",
   // TEST: "/test",
   CVTEMPLATE: "/cvtemplate",
   SALARYPREDICTION: "/predictsalary",
   INSTRUCTION: "/instruction",
   SIGNIN: "/signin",
   SIGNOUT: "/signout",
   SIGNUP: "/signup",
   CANDIDATEACCOUNT: "/candidateaccount",
   CONTROLLER:"/controller",
   EMPLOYER:"/employer",

 }
 export const MenuRoute = [
   {
      id: 1,
      path: ROUTE_NAME.ALLJOBS,
      title: "All Jobs"
      // iconName: "dashboard"
   }
   // ,
   // {
   //    id: 2,
   //    path: ROUTE_NAME.TEST,
   //    title: "Test"
   //    // iconName: "channel"
   // }
   ,
   {
      id: 3,
      path: ROUTE_NAME.CVTEMPLATE,
      title: "CV Templates"
      // iconName: "channel"
   }
   ,
   {
      id: 4,
      path: ROUTE_NAME.SALARYPREDICTION,
      title: "Salary Prediction"
      // iconName: "channel"
   }
   // ,
   // {
   //    id: 5,
   //    path: ROUTE_NAME.INSTRUCTION,
   //    title: "Instruction"
   //    // iconName: "channel"
   // }

]

export const SubMenuAccount = [
   {
      id: 11,
      path: ROUTE_NAME.SIGNIN,
      title: "Sign in",
      iconName: "signin",
      type: "linkTopage"
   },
   {
      id: 12,
      path: ROUTE_NAME.SIGNOUT,
      title: "Sign out",
      iconName: "signout",
      type: "actionSignOut"
   },
   {
      id: 13,
      path: ROUTE_NAME.SIGNUP,
      title: "Sign up",
      iconName: "signup",
      type: "linkTopage"
},
   {
      id: 14,
      path: ROUTE_NAME.CANDIDATEACCOUNT,
      title: "Account",
      iconName: "account",
      type: "linkTopage"
   },

]

 //tập hợp các đường dẫn trong component EmployerHome.tsx
export const ROUTE_NAME_EMPLOYER = {
   HOME: "", 
   // lưu ý đường dẫn đến trang home của employer phải để rỗng, vì bên trong còn có các Link dẫn đến các component khác, 
   // nên nếu ở đây mình để là "home" thì các link đến component kia nó sẽ có chữ /home/ ở trước đường dẫn, dẫn đến sai, 
   // vì các Link nằm bên trong component EmployerIntro nên các Link đó theo nguyên tắc là con của coponent EmployerIntro
   POSTJOB: "postjob",
   UPDATEJOB: "updatejob",
   LISTPOSTEDJOB: "listpostedjobs",
   LISTAPPLIEDCV: "listappliedcv",
   CREATEACCOUNTEMPLOYER: "createaccountemployer",
   REPORTS: "reports",
   INSTRUCTIONS: "instructions"
}

export const EmployerSidebarRoute = [
   {
      id: 1,
      path: ROUTE_NAME_EMPLOYER.HOME,
      title: "Home",
      status: true
   },
   {
      id: 2,
      path: ROUTE_NAME_EMPLOYER.POSTJOB,
      title: "Post new job",
      status: false
   },
   {
      id: 3,
      path: ROUTE_NAME_EMPLOYER.UPDATEJOB,
      title: "Update posted job",
      status: false
   },
   {
      id: 4,
      path: ROUTE_NAME_EMPLOYER.LISTPOSTEDJOB,
      title: "List posted jobs",
      status: false
   },
   // {
   //    id: 5,
   //    path: ROUTE_NAME_EMPLOYER.LISTAPPLIEDCV,
   //    title: "List applied CV",
   //    status: false
   // },
   {
      id: 6,
      path: ROUTE_NAME_EMPLOYER.CREATEACCOUNTEMPLOYER,
      title: "Create account",
      status: false
   }
   // {
   //    id: 7,
   //    path: ROUTE_NAME_EMPLOYER.REPORTS,
   //    title: "Reports",
   //    status: false
   // },
   // {
   //    id: 8,
   //    path: ROUTE_NAME_EMPLOYER.INSTRUCTIONS,
   //    title: "User instructions",
   //    status: false
   // }
]

 //tập hợp các đường dẫn trong component ControllerHome.tsx
export const ROUTE_NAME_CONTROLLER = {
   HOME: "",
      // lưu ý đường dẫn đến trang home của controller phải để rỗng, vì bên trong còn có các Link dẫn đến các component khác, 
   // nên nếu ở đây mình để là "home" thì các link đến component kia nó sẽ có chữ /home/ ở trước đường dẫn, dẫn đến sai, 
   // vì các Link nằm bên trong component ControllerIntro nên các Link đó theo nguyên tắc là con của coponent ControllerIntro
   // REVIEWANDAPPROVEPOSTJOBS: "reviewandapprovepostjobs",
   MANAGEJOB: "managejob",
   MANAGECONTROLLER: "/controller/managecontroller",
   MANAGEEMPLOYER: "manageemployer",
   MANAGECANDIDATE: "managecandidate",
   MANAGECOMMENT: "managecomment",
   MONITORBEHAVIOR: "monitorbehavior",
   REPORTS: "reports"
}

export const ControllerSidebarRoute = [
   // {
   //    id: 1,
   //    path: ROUTE_NAME_CONTROLLER.HOME,
   //    title: "Home",
   //    status: true
   // },
   // {
   //    id: 2,
   //    path: ROUTE_NAME_CONTROLLER.REVIEWANDAPPROVEPOSTJOBS,
   //    title: "Review & approve post jobs",
   //    status: false
   // },
   {
      id: 9,
      path: ROUTE_NAME_CONTROLLER.REPORTS,
      title: "Reports",
      status: true
   },
   {
      id: 3,
      path: ROUTE_NAME_CONTROLLER.MANAGEJOB,
      title: "Manage Job",
      status: false
   },
   {
      id: 4,
      path: ROUTE_NAME_CONTROLLER.MANAGECONTROLLER,
      title: "Manage Controller",
      status: false
   },
   {
      id: 5,
      path: ROUTE_NAME_CONTROLLER.MANAGEEMPLOYER,
      title: "Manage Employer",
      status: false
   },
   {
      id: 6,
      path: ROUTE_NAME_CONTROLLER.MANAGECANDIDATE,
      title: "Manage Candidate",
      status: false
   },
   {
      id: 7,
      path: ROUTE_NAME_CONTROLLER.MANAGECOMMENT,
      title: "Manage Comments",
      status: false
   },
   {
      id: 8,
      path: ROUTE_NAME_CONTROLLER.MONITORBEHAVIOR,
      title: "Monitor Behavior",
      status: false
   }
]