import axios from "axios";


 export interface ResponseData {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: User[]
    support: Support
  }
  
 export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }
  
  export interface Support {
    url: string
    text: string
  }
  
export async function getUsers(page:number):Promise<ResponseData> {
  const res =  await axios.get("https://reqres.in/api/users?page=" + page);
  return res.data
}