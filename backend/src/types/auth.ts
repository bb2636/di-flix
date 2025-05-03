export interface Signup {
  email: string;
  password: string;
  is_member: boolean; // 멤버십 유무 판단(기본값 = false)
  is_deleted: boolean; //탈퇴한 유저 판단(기본값 = false / 탈퇴시 true)
}
export interface Login {
  email: string;
  password: string;
}
