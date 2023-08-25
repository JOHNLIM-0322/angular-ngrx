import { AssociateModel } from "./associate.model";

export const AssociateState: AssociateModel= {
    list: [],
    associate:{
        id: 0,
        name: "",
        email: "",
        phone: "",
        type: "CUSTOMER",
        address: "",
        associategroup: "level1",
        status: true
    },
    errorMessage: '',
   // isLoaded: false
}