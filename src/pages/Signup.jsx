import React from "react";
import {
  useNavigation,
  useLoaderData,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { signUp } from "../api/firebase";

export async function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  const path = new URL(request.url).searchParams.get('redirectTo') || '/dashboard'
  try {
    await signUp(email, password)
    return redirect(`${path}?user=${email}`)
  } catch (error) {
    console.log(error.message)
    return error
  }
}

const SignUp = () => {

  const error = useActionData()

  const navigation = useNavigation()
  // console.log(navigation)

  const message = useLoaderData()

  return (
    // <div className=" h-ful w-[1152px] flex items-center justify-center bg-[#ffddb2] pb-10 rounded-xl ">
    // <div className="p-5 pt-20  mx-auto mt-24">

    <div className="bg-indigo200 mx-auto w-[1152px]  ">
      <div className="bg-indigo-200 px-16 py-20 mx-auto mt-24 max-w-3xl rounded-xl ">
        <h1 className="text-center font-bold text-3xl">
          Sign up
        </h1>
        {message && !error && (
          <h1 className="text-center pt-4 font-semibold text-indigo-400 text-2xl">
            {message}
          </h1>
        )}
        {error && (
          <h1 className="text-center pt-4 font-semibold text-indigo-400 text-2xl">
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
          <button disabled={navigation.state === 'submitting'} className="bg-indigo-400 hover:bg-indigo-500 text-indigo-100 font-semibold mt-5 p-4 rounded">
            {navigation.state === 'submitting' ? 'Signing in...' : 'Sign up'}
          </button>
        </Form>
        <h5 className="font-medium text-base mt-10 text-center">
          Create an account to purchase a product. 
        </h5>
      </div>

    </div>
  );
};

export default SignUp;
