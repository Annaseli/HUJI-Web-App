import useResetPassword from "../../hooks/useResetPassword";

export default function ForgotPassword() {
    // if the error is null then its a success
    const { error } = useResetPassword('annasel195@gmail.com')
}