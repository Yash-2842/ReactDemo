import axios from "axios"
import { string } from "yup";
import { countryDataType } from "../interface/countryInterface";
import http from './base-service'
import {toast} from 'react-toastify'

const url = 'https://apit1.web2.anasource.com/'

export const getAllCountries = async (path: string, pageNumber: number, pageSize: number, sortOrder?: string, sortColumn?: string, searchQuery?: string) => {
    let result;
    const payload = {
        "pageNumber": pageNumber,
        "pageSize": pageSize,
        "sortOrder": sortOrder,
        "sortBy": sortColumn,
        "searchKey": searchQuery
    }
    await http.post(url + path, payload).then(response => {
        result = response.data
        console.log(response)
    }).catch(err => console.log(err.response.data.message))
    return result
}

export const getCountry = async (path: string) => {
    let result;
    await http.get(url + path).then(response => {
        result = response.data.data
    }).catch(err => console.log(err.response.data.message))
    return result
}

export const addCountry = async (path: string, data: countryDataType) => {
    const obj = {
        ...data,
        status: data.status === 'Active' ? 2 : 1
    }
    let response
    await http.post(url + path, obj)
        .then(res => {
            console.log('service',res.data)
            response = res.data
        }).catch(err => {
            console.log('service',err.response.data)
            response = err.response.data
        })
    return response
}

export const editCountry = async (path: string, data: countryDataType) => {
    const obj = {
        ...data,
        status: data.status === 'Active' ? 2 : 1
    }
    let response;
    await http.put(url + path, obj)
        .then(res => {
            response = res.data
        }).catch(err => {
            response =  err.response.data
        })
    return response
}

export const deleteCountry = async (path: string) => {
    let response = {
        status : 0,
        message : ''
    }
    await http.delete(url + path).then(res => {
        // response = res.data
        response.status = res.data.statusCode
        response.message = res.data.message
        // toast.success(res.data.message, {
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        //     });
    }).catch(err => {
        console.log(err)
        response.message = err.response ? err.response.data.Errors.Country : err.message 
        response.status = err.response ? err.response.data.statusCode : response.status
        // toast.error(err.response ? err.response.data.Errors.Country : err.message , {
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        //     });
        //     response = err.data 
    })
    console.log(response)
    return response
}


