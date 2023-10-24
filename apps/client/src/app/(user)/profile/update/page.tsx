import { FormUpdateUser } from "ui";

export default async function UpdateUser() {
  return (
    <div className="flex items-center justify-center mt-14 bg-violet-50">
      <div className="border border-transparent rounded-md shadow-lg p-16 bg-white">
        <div className="w-96">
          <div className="text-xl font-medium pb-5">Update User Info</div>
          <FormUpdateUser erroricon="/error-icon.svg" />
        </div>
      </div>
    </div>
  );
}
