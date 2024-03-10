export type RegStatusT = {
    status: string; // error or success
    message?: string; // error --> message
    token?: string; //if success --> token
};
