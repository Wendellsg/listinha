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
       console.log(list.data)
        return list.data[0]
    } catch (error) {
        console.log(error)
    }
}