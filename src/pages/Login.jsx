import React from "react";
import {
  Link,
  useNavigation,
  useLoaderData,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { logIn } from "../api/firebase";

export async function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  const path = new URL(request.url).searchParams.get('redirectTo') || '/dashboard'
  try {
    await logIn(email, password)
    return redirect(`${path}?user=${email}`)
  } catch (error) {
    console.log(error.message)
    return error
  }
}

const Login = () => {

  const error = useActionData()

  const navigation = useNavigation()
  
  const message = useLoaderData()
  console.log(message)

  return (
    <div className=" h-ful w-[1152px] mx-auto bg[#ffddb2] pb-10 rounded-xl ">
      <div className="p-5 pt-20 max-w-3xl mx-auto mt-24">
        <h1 className="text-center font-bold text-3xl">
          Sign in to your account
        </h1>
        {message && !error && (
          <h1 className="text-center pt-4 font-semibold text-[#cc0000] text-2xl">
            {message}
          </h1>
        )}
        {error && (
          <h1 className="text-center pt-4 font-semibold text-[#cc0000] text-2xl">
            {error.message}
          </h1>
        )}
        <Form method="post" className="flex flex-col mt-8 rounded " replace>
          <input
            className="indent-2 border border-[#d1d5db] rounded-t p-2 placeholder:text-[#4d4d4d]"
            type="email"
            name="email"
            placeholder="Email address"
          />
          <input
            className="indent-2 border border-[#d1d5db] rounded-b p-2 placeholder:text-[#4d4d4d]"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button disabled={navigation.state === 'submitting'} className="bg-indigo-400 hover:bg-indigo-500 text-indigo-100 hover:text-indigo-200 font-semibold mt-5 p-4 rounded">
            {navigation.state === 'submitting' ? 'Logging in...' : 'Log in'}
          </button>
        </Form>
        <h5 className="font-medium text-base mt-10 text-center">
          Don't have an account?{" "}
          <Link to={'/signup'} className="text-indigo-500 font-bold">Create one now</Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
