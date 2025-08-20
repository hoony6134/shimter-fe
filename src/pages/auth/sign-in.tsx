import { SignInForm } from './components/sign-in-form'

function SignIn() {
  return (
    <section className="pt-28 pb-16 flex flex-col items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-10">로그인</h1>
        <SignInForm />
      </div>
    </section>
  )
}

export default SignIn
