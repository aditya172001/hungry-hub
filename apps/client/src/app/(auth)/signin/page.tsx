import { FormSignin, ProgressBar } from "ui";

export const dynamic = "force-dynamic";

export default function SigninPage() {
  return (
    <>
      <div className="h-1 w-full ">
        <ProgressBar />
      </div>
      <main className="flex items-center justify-center h-screen bg-purple-50">
        <div className="border border-transparent rounded-md shadow-lg p-8 sm:p-16 bg-white">
          <div className="w-48 sm:w-96">
            <div className="sm:text-xl font-medium pb-2 sm:pb-5">
              Sign in to your account
            </div>
            <FormSignin
              googleicon="/google-icon.svg"
              erroricon="/error-icon.svg"
            />
          </div>
        </div>
      </main>
    </>
  );
}
