import { FormEditItem } from "ui";

export default async function EditItem() {
  return (
    <main className="flex items-center justify-center bg-violet-50 min-h-screen">
      <div className="border border-transparent rounded-md shadow-lg px-16 py-10 bg-white">
        <div className="w-96">
          <div className="text-xl font-medium pb-5">Edit item</div>
          <FormEditItem erroricon="/error-icon.svg" />
        </div>
      </div>
    </main>
  );
}
