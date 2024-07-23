export interface User {
   
    id: number;
    username: string;
    name: string;
   age: number;
}
export interface CreateUserRequest {
    username: string;
    name: string;
    age: number;
    email?:string
}
export interface DeleteUserRequest {
    id: number;
}
export interface PingResponse {
    message: string;
}
export interface UpdateUserRequest {
    id: number;
    username?: string;
    name?: string;
    age?: number;
}