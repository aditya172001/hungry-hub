import { FormSingup } from "ui";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-purple-50">
      <div className="border border-transparent rounded-md shadow-lg p-16 bg-white">
        <div className="w-96">
          <div className="text-xl font-medium pb-5">
            Create your HungryHub account
          </div>
          <FormSingup
            googleicon="/google-icon.svg"
            erroricon="/error-icon.svg"
          />
        </div>
      </div>
    </div>
  );
}
