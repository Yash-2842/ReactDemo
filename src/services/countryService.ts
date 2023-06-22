import axios from "axios"
import { string } from "yup";
import { countryDataType } from "../components/CountryData";
import { FormValues } from "../components/CountryForm";

const url= 'https://apit1.web2.anasource.com/'

export const getAllCountries = async (path:string,pageNumber:number,pageSize:number,sortOrder?:string,sortColumn?:string,searchQuery?:string) => {
    let result ;
    await axios.post(url+path, {
        "pageNumber": pageNumber,
        "pageSize": pageSize,
        "sortOrder": sortOrder,
        "sortBy": sortColumn,
        "searchKey": searchQuery
    }).then(response => {
        result = response.data
        console.log(response.data)
    }).catch(err => console.log(err.message))
    return result
}

export const getCountry =async (path:string) => {
    let result;
    await axios.get(url+path).then(response => {
        result = response.data.data
    }).catch(err => console.log(err.message))
    return result
}

export const addCountry = async (path:string,data:FormValues) => {
    const obj = {
        ...data,
        status:data.status==='Active'?2:1
    }
    console.log(obj)
    let message
    await axios.post(url+path,obj)
        .then(response =>{
            console.log(response.data.message)
            message = response.data.message
        }).catch(err =>{
            console.log(err.message)
            message = err.message
        })
        return message
}

export const editCountry = async (path:string,data:FormValues) => {
    const obj = {
        ...data,
        status:data.status==='Active'?2:1
    }
    let message;
    await axios.put(url+path,obj)
        .then(response =>{
            message =  response.data.message
        }).catch(err =>{
            console.log(err.message)
            message =  err.message
        })
        return message
}

export const deleteCountry = async (path:string) => {
    let message;
    await axios.delete(url+path).then(response =>{
        message = response.data.message
    }).catch(err => {
        message = err.response.data.Message
    })
    return message
}


