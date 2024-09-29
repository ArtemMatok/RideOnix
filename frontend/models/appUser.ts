export type RegisterDto = {
    userName:string;
    email:string;
    password:string;
}

export type newUserGet ={
    email:string;
    userName:string;
    token:string;   
}

export type LoginDto = {
    email: string;
    password: string;
}

export type UserGet = {
    email:string;
    username:string;
}