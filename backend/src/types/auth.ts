export interface Signup {
    email: string;
    password: string;
    is_member: boolean;//기본값 = false
}
export interface Login {
    email: string;
    password: string;
}