type User = {
    id?:  string | number;
    name: string;
    email: string;
    password: string;
    image?: string | undefined;
    date_created?: Date | undefined;
    date_updated?: Date | undefined;
}

type LoginRequest = {
    email: string;
    password: string;
}

export {
    User,
    LoginRequest
}