import { FormAddItem } from "ui";

export default async function AddItem() {
  return (
    <div className="flex items-center justify-center bg-violet-50 h-[90vh] py-3">
      <div className="border border-transparent rounded-md shadow-lg p-8 sm:px-16 sm:py-10 bg-white">
        <div className="w-60 sm:w-96">
          <div className="sm:text-xl font-medium pb-2  sm:pb-5">
            Add new item in menu
          </div>
          <FormAddItem erroricon="/error-icon.svg" />
        </div>
      </div>
    </div>
  );
}
