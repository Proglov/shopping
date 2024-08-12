import LoginComponent from "@/components/users/login/LoginComponent";


export default function Login({ searchParams }) {
  return <LoginComponent isUsernameParam={searchParams?.username === 'true'} type='seller' />;
}