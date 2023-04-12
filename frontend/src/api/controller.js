import axios from "axios";

export default class Controller {
    constructor() {
        this.httpClient = axios.create({
            baseURL: 'http://localhost.com:3010/'
        })
    }

    async join(object) {
        axios.post('http://localhost:3010/api/users/signUp', {
            account: object.account,
            password: object.password,
            name: object.name,
            nickName: object.nickName,
            phone: object.phone,
            email: object.email,
            address1: object.address1,
            address2: object.address2,
            address3: object.address3,
        }).then((result) => {
            console.log(result);
        })
    }
}