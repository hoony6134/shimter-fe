import { SignUpForm } from './components/sign-up-form'

function SignUp() {
  return (
    <section className="pt-28 pb-16 flex flex-col items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-10">회원가입</h1>
        <SignUpForm />
      </div>
    </section>
  )
}

export default SignUp
