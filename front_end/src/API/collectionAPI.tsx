import instance from "./axios";
import instance_ML from "./axios_ML";

import { AxiosResponse } from "axios";

interface CollectionAPI {
    findAllViewjobskillemployercompany: () => Promise<AxiosResponse<any>>;
    postJob: (data: any) => Promise<AxiosResponse<any>>;
    addtablejobskill: (data: any) => Promise<AxiosResponse<any>>;
    addtablereasonstojoin: (data: any) => Promise<AxiosResponse<any>>;
    addtablejobdescription: (data: any) => Promise<AxiosResponse<any>>;
    addtableskillexperience: (data: any) => Promise<AxiosResponse<any>>;
    addtablewhyyouloveworkinghere: (data: any) => Promise<AxiosResponse<any>>;
    findAllController: () => Promise<AxiosResponse<any>>;
    checkSignInCandidate: (data: any) => Promise<AxiosResponse<any>>;
    checkSignInController: (data: any) => Promise<AxiosResponse<any>>;
    checkSignInEmployer: (data: any) => Promise<AxiosResponse<any>>;
    signUpAddCandidate: (data: any) => Promise<AxiosResponse<any>>;
    findCandidateEmail: (data: any) => Promise<AxiosResponse<any>>;
    findControllerEmail: (data: any) => Promise<AxiosResponse<any>>;
    findEmployerEmail: (data: any) => Promise<AxiosResponse<any>>;
    addToFavorite: (data: any) => Promise<AxiosResponse<any>>;
    findAllViewFavorite: (data: any) => Promise<AxiosResponse<any>>;
    addResumeeachjob: (data: any) => Promise<AxiosResponse<any>>;
    removeJobFavorite: (data: any) => Promise<AxiosResponse<any>>;
    addReview: (data: any) => Promise<AxiosResponse<any>>;
    removeReview: (idreview: number) => Promise<AxiosResponse<any>>;
    editReview: (data: any) => Promise<AxiosResponse<any>>;
    findAllReview: () => Promise<AxiosResponse<any>>;
    findAllViewReview: () => Promise<AxiosResponse<any>>;
    addController: (data:any) => Promise<AxiosResponse<any>>;
    editController: (data: any) => Promise<AxiosResponse<any>>;
    addCandidate: (data:any) => Promise<AxiosResponse<any>>;
    editCandidate: (data: any) => Promise<AxiosResponse<any>>;
    findallcandidate: () => Promise<AxiosResponse<any>>;
    addEmployer: (data:any) => Promise<AxiosResponse<any>>;
    editEmployer: (data: any) => Promise<AxiosResponse<any>>;
    findAllEmployer: () => Promise<AxiosResponse<any>>;
    findAllJob: () => Promise<AxiosResponse<any>>;
    editJob: (data: any) => Promise<AxiosResponse<any>>;
    findAllSearchMonitor: () => Promise<AxiosResponse<any>>;
    addSearchMonitor: (data: any) => Promise<AxiosResponse<any>>;
    findAllQuestion: () => Promise<AxiosResponse<any>>;
    findAllAnswer: () => Promise<AxiosResponse<any>>;
    addResumetemplate: (data: any) => Promise<AxiosResponse<any>>;
    findAllResumetemplate: () => Promise<AxiosResponse<any>>;
    deleteResumetemplate: (idresume: number) => Promise<AxiosResponse<any>>;
    findAllResumeeachjob: () => Promise<AxiosResponse<any>>;
    findAllTestresult: () => Promise<AxiosResponse<any>>;
    findAllResumedigitaleachjob: () => Promise<AxiosResponse<any>>;
    addTestresult: (data: any) => Promise<AxiosResponse<any>>;
    addResumedigitaleachjob: (data: any) => Promise<AxiosResponse<any>>;
    chatbotPredict: (data: any) => Promise<AxiosResponse<any>>;
    chatbotaddsearchmonitor: (data: any) => Promise<AxiosResponse<any>>;
    chatbotFindallsearchmonitor: () => Promise<AxiosResponse<any>>;
    predictSalary: (data: any) => Promise<AxiosResponse<any>>;
    findAllJobskill: () => Promise<AxiosResponse<any>>;
    findAllSkills: () => Promise<AxiosResponse<any>>;
    findAllCompany: () => Promise<AxiosResponse<any>>;

}
//collectionAPI là 1 object chứa tất cả đường dẫn API
const collectionAPI: CollectionAPI = {
    findAllViewjobskillemployercompany: () => {
        const url = "/findAllViewjobskillemployercompany";
        return instance.get(url);
    },

    addtablejobskill: (data) => {
        const url = "/addtablejobskill";
        return instance.post(url, data);
    },
    addtablereasonstojoin: (data) => {
        const url = "/addtablereasonstojoin";
        return instance.post(url, data);
    },
    addtablejobdescription: (data) => {
        const url = "/addtablejobdescription";
        return instance.post(url, data);
    },
    addtableskillexperience: (data) => {
        const url = "/addtableskillexperience";
        return instance.post(url, data);
    },
    addtablewhyyouloveworkinghere: (data) => {
        const url = "/addtablewhyyouloveworkinghere";
        return instance.post(url, data);
    },

    checkSignInCandidate: (data) => {
        const url = "/checkSignInCandidate";
        return instance.post(url, data);
    },
    checkSignInController: (data) => {
        const url = "/checkSignInController";
        return instance.post(url, data);
    },
    checkSignInEmployer: (data) => {
        const url = "/checkSignInEmployer";
        return instance.post(url, data);
    },
    signUpAddCandidate : (data) => {
        const url = "/signUpAddCandidate";
        return instance.post(url, data);
    },
    findCandidateEmail: (email) => {
        const url = "/findCandidateEmail/" + email;
        return instance.get(url);
    },
    findControllerEmail: (email) => {
        const url = "/findControllerEmail/" + email;
        return instance.get(url);
    },
    findEmployerEmail: (email) => {
        const url = "/findEmployerEmail/" + email;
        return instance.get(url);
    },
    addToFavorite : (data) => {
        const url = "/addToFavorite";
        return instance.post(url, data);
    },
    findAllViewFavorite: (idcandidate) => {
        const url = "/findAllViewFavorite/" + idcandidate;
        return instance.get(url);
    },

    removeJobFavorite: (idfavorite) => {
        const url = "/removeJobFavorite/" + idfavorite;
        return instance.delete(url);
    },
    // -----------------------------------------------------Review start
    addReview : (data) => {
        const url = "/addReview";
        return instance.post(url, data);
    },
    findAllReview: () => {
        const url = "/findAllReview";
        return instance.get(url);
    },
    removeReview: (idreview) => {
        const url = "/removeReview/" + idreview;
        return instance.delete(url);
    },
    editReview : (data) => {
        const url = "/editReview";
        return instance.put(url, data);
    },
    findAllViewReview: () => {
        const url = "/findAllViewReview";
        return instance.get(url);
    },
    // -----------------------------------------------------Review end
    // -----------------------------------------------------Controller start
    findAllController: () => {
        const url = "/findallcontroller";
        return instance.get(url);
    },
    addController : (data) => {
        const url = "/addController";
        return instance.post(url, data);
    },
    editController : (data) => {
        const url = "/editController";
        return instance.put(url, data);
    },
    // -----------------------------------------------------Controller end
    // -----------------------------------------------------Candidate start
    findallcandidate: () => {
        const url = "/findallcandidate";
        return instance.get(url);
    },
    addCandidate: (data) => {
        const url = "/addCandidate";
        return instance.post(url, data);
    },
    editCandidate: (data) => {
        const url = "/editCandidate";
        return instance.put(url, data);
    },
    // -----------------------------------------------------Candidate end
    // -----------------------------------------------------Employer start
    findAllEmployer: () => {
        const url = "/findAllEmployer";
        return instance.get(url);
    },
    addEmployer: (data) => {
        const url = "/addEmployer";
        return instance.post(url, data);
    },
    editEmployer: (data) => {
        const url = "/editEmployer";
        return instance.put(url, data);
    },
    // -----------------------------------------------------Employer end
    // -----------------------------------------------------job start
    editJob: (data) => {
        const url = "/editJob";
        return instance.put(url, data);
    },
    postJob: (data) => {
        const url = "/postjob";
        return instance.post(url, data);
    },
    findAllJob: () => {
        const url = "/findAllJob";
        return instance.get(url);
    },
    // -----------------------------------------------------job end
    // -----------------------------------------------------searchmonitor start
    addSearchMonitor: (data) => {
        const url = "/addSearchMonitor";
        return instance.post(url, data);
    },
    findAllSearchMonitor: () => {
        const url = "/findAllSearchMonitor";
        return instance.get(url);
    },
    // -----------------------------------------------------searchmonitor end
    // -----------------------------------------------------question start
    findAllQuestion: () => {
        const url = "/findAllQuestion";
        return instance.get(url);
    },
    // -----------------------------------------------------question end
    // -----------------------------------------------------answer start
    findAllAnswer: () => {
        const url = "/findAllAnswer";
        return instance.get(url);
    },
    // -----------------------------------------------------answer end
//    -------------------------------------------Resumetemplate start

    addResumetemplate: (data) => {
        const url = "/addResumetemplate";
        return instance.post(url, data);
    },
    findAllResumetemplate: () => {
        const url = "/findAllResumetemplate";
        return instance.get(url);
    },
    deleteResumetemplate: (idresume) => {
        const url = "/deleteResumetemplate/"+idresume;
        return instance.delete(url);
    },
    
//    -------------------------------------------Resumetemplate end
//    -------------------------------------------Resumeeachjob start
    addResumeeachjob : (data) => {
        const url = "/addResumeeachjob";
        return instance.post(url, data);
    },
    findAllResumeeachjob: () => {
        const url = "/findAllResumeeachjob";
        return instance.get(url);
    },
//    -------------------------------------------Resumeeachjob end
//    -------------------------------------------Testresult start
    addTestresult : (data) => {
        const url = "/addTestresult";
        return instance.post(url, data);
    },
    findAllTestresult: () => {
        const url = "/findAllTestresult";
        return instance.get(url);
    },
//    -------------------------------------------Testresult end
//    -------------------------------------------Resumedigitaleachjob start
    addResumedigitaleachjob : (data) => {
        const url = "/addResumedigitaleachjob";
        return instance.post(url, data);
    },
    findAllResumedigitaleachjob: () => {
        const url = "/findAllResumedigitaleachjob";
        return instance.get(url);
    },
//    -------------------------------------------Resumedigitaleachjob end
// -------------------------------------------------------chatbot start
    chatbotPredict : (data) => {
        const url = "/chatbotPredict";
        return instance_ML.post(url,data);
    }
    ,
    chatbotaddsearchmonitor : (data) => {
        const url = "/chatbotaddsearchmonitor";
        return instance_ML.post(url,data);
    }
    ,
    chatbotFindallsearchmonitor: () => {
        const url = "/chatbotFindallsearchmonitor";
        return instance_ML.get(url);
    },
    // -------------------------------------------------------chatbot end
    // -------------------------------------------------------salary start
    predictSalary : (data) => {
        const url = "/predictSalary";
        return instance_ML.post(url,data);
    }
    ,
    // -------------------------------------------------------salary end
    // -------------------------------------------------------skill end
    findAllJobskill: () => {
        const url = "/findAllJobskill";
        return instance.get(url);
    },
    findAllSkills: () => {
        const url = "/findAllSkills";
        return instance.get(url);
    }
    ,
    // -------------------------------------------------------skill end
    // -------------------------------------------------------company start
    findAllCompany: () => {
        const url = "/findAllCompany";
        return instance.get(url);
    }
    // -------------------------------------------------------company end
};

export default collectionAPI;
