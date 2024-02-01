import { FormUpdateUser } from "ui";

export default async function UpdateUser() {
  return (
    <div className="flex items-center justify-center mt-10 sm:mt-12 bg-violet-50">
      <div className="border border-transparent rounded-md shadow-lg p-8 sm:p-16 bg-white">
        <div className="w-60 sm:w-96">
          <div className="sm:text-xl font-medium pb-2 sm:pb-5">
            Update User Info
          </div>
          <FormUpdateUser erroricon="/error-icon.svg" />
        </div>
      </div>
    </div>
  );
}
