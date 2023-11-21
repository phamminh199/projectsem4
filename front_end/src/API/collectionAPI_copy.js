import instance from "./axios";

//collectionAPI là 1 object chứa tất cả đường dẫn API
const collectionAPI = {

    findAllViewjobskillemployercompany : () => {
        const url = "/findAllViewjobskillemployercompany";
        return instance.get(url);
    },
    postJob : (data) => {
        const url = "/postjob";
        return instance.post(url, data);
    },
    addtablejobskill : (data) => {
        const url = "/addtablejobskill";
        return instance.post(url, data);
    },
    addtablereasonstojoin : (data) => {
        const url = "/addtablereasonstojoin";
        return instance.post(url, data);
    },
    addtablejobdescription : (data) => {
        const url = "/addtablejobdescription";
        return instance.post(url, data);
    },
    addtableskillexperience : (data) => {
        const url = "/addtableskillexperience";
        return instance.post(url, data);
    },
    addtablewhyyouloveworkinghere : (data) => {
        const url = "/addtablewhyyouloveworkinghere";
        return instance.post(url, data);
    },
    findAllController : () => {
        const url = "/findallcontroller";
        return instance.get(url);
    },
    checkSignInCandidate : (data) => {
        const url = "/checkSignInCandidate";
        return instance.post(url, data);
    },
    checkSignInController : (data) => {
        const url = "/checkSignInController";
        return instance.post(url, data);
    },
    checkSignInEmployer : (data) => {
        const url = "/checkSignInEmployer";
        return instance.post(url, data);
    },

    switchStatusUser : (idUser) => {
        const url = "/showroom/SwitchStatusUser/" + idUser;
        return instance.post(url);
    },
    getUser : (idUser) => {
        const url = "/showroom/GetUser/" + idUser;
        return instance.get(url);
    },
    editUser : (data) => {
        const url = "/showroom/EditUser";
        return instance.put(url, data);
    },
    SignIn : (email, password) => {
        const url = "/showroom/SignIn/" + email + "/" + password;
        return instance.post(url);
    },
    GetUserByEmail : (email) => {
        const url = "/showroom/GetUserByEmail/" + email;
        return instance.get(url);
    },
    SignUp : (data) => {
        const url = "/showroom/SignUp";
        return instance.post(url, data);
    },
    // car start-------------------------------------------
    getAllCars : () => {
        const url = "/showroom/GetAllCars";
        return instance.get(url);
    },
    addCar : (data) => {
        const url = "/showroom/AddCar";
        return instance.post(url, data);
    },
    switchStatusCar : (idCar) => {
        const url = "/showroom/SwitchStatusCar/" + idCar;
        return instance.post(url);
    },
    getCar : (idCar) => {
        const url = "/showroom/GetCar/" + idCar;
        return instance.get(url);
    },
    editCar : (data) => {
        const url = "/showroom/EditCar";
        return instance.put(url, data);
    },
    //cart---------
    addToCart : (data) => {
        const url = "/showroom/AddToCart";
        return instance.post(url, data);
    },
    getCartsByIdCustomer : (idCustomer) => {
        const url = "/showroom/GetCartsByIdCustomer/"+idCustomer;
        return instance.get(url);
    },
    removeCartItem : (idCart) => {
        const url = "/showroom/RemoveCartItem/" + idCart;
        return instance.delete(url);
    },
    addTotableOrderItems : (data) => {
        const url = "/showroom/AddTotableOrderItems";
        return instance.post(url, data);
    },
    addTotableOrders : (data) => {
        const url = "/showroom/AddTotableOrders";
        return instance.post(url, data);
    },
    // CustomerAccount---------------
    updateCustomerPassword : (email,oldPass,newPass) => {
        const url = "/showroom/UpdateCustomerPassword/"+ email+"/"+oldPass+"/"+newPass;
        return instance.put(url);
    },
    getOrdersByIdCustomer : (idCustomer) => {
        const url = "/showroom/GetOrdersByIdCustomer/"+idCustomer;
        return instance.get(url);
    },
    customerCancelOrder : (idOrder) => {
        const url = "/showroom/CustomerCancelOrder/" + idOrder;
        return instance.post(url);
    },
    //orders---------------------------------
    getRangeRowsFromOrders : (page) => {
        const url = "/showroom/GetRangeRowsFromOrders/"+page;
        return instance.get(url);
    },
    switchStatusOrder : (idOrder, status, page) => {
        const url = "/showroom/SwitchStatusOrder/" + idOrder+"/"+status+"/"+page;
        return instance.post(url);
    },
    getOrderByStatus : (status) => {
        const url = "/showroom/GetOrderByStatus/"+status;
        return instance.get(url);
    },
    //accessories--------------------------
    getAllAccessoryByQuery : () => {
        const url = "/showroom/GetAllAccessoryByQuery";
        return instance.get(url);
    },
    getAccessoriesById : (id_accessories) => {
        const url = "/showroom/GetAccessoriesById/"+id_accessories;
        return instance.get(url);
    },
    searchByName : (name) => {
        const url = "/showroom/SearchByName/"+name;
        return instance.get(url);
    }
}

export default collectionAPI;
    // "start": "react-scripts start",
