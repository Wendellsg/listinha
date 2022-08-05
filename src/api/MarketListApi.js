import axios from 'axios'

const apiUrl ='http://localhost:9000'

export async function createList(list){
    let headers = {
        headers: { 
            'Content-Type': 'application/json'
          },
    }

    let body = JSON.stringify(list)

    try {
       const createdList =  await axios.post(`${apiUrl}/create-list`,body, headers)
        console.log(createdList);
    } catch (error) {
        console.log(error)
    }
}


export async function GetLists(ownerId){
    try {
       const userLists =  await axios.get(`${apiUrl}/get-lists?ownerId=${ownerId}`,)
        return userLists.data
    } catch (error) {
        console.log(error)
    }
}

export async function GetList(listId){
    try {
       const list =  await axios.get(`${apiUrl}/get-lists?listId=${listId}`)
        return list.data[0]
    } catch (error) {
        console.log(error)
    }
}


export async function RemoveList(listId){
    try {
        await axios.get(`${apiUrl}/remove-list?listId=${listId}`)
        return true
    } catch (error) {
        console.log(error)
        return false 
    }
}


export async function AddNewItem(item){
    let headers = {
        headers: { 
            'Content-Type': 'application/json'
          },
    }

    let body = JSON.stringify(item)
    try {
        const addResponse =  await axios.post(`${apiUrl}/add-item`,body, headers)
        console.log(addResponse)
         return true
     } catch (error) {
        console.log(error)
        return null
     }
}


export async function removeItem(item){
    let headers = {
        headers: { 
            'Content-Type': 'application/json'
          },
    }

    let body = JSON.stringify(item)
    try {
        const addResponse =  await axios.post(`${apiUrl}/remove-item`,body, headers)
        console.log(addResponse)
         return true
     } catch (error) {
        console.log(error)
        return null
     }
}


export async function UpdateItemBuyed(item){
    let headers = {
        headers: { 
            'Content-Type': 'application/json'
          },
    }

    let body = JSON.stringify(item)
    try {
        const addResponse =  await axios.post(`${apiUrl}/update-item-buyed`,body, headers)
        console.log(addResponse)
         return true
     } catch (error) {
        console.log(error)
        return null
     }
}