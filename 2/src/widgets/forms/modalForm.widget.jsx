import { useState } from 'react';

export const ModalFormWidget = ({ saveBtn }) => {
  const [title, setTitle] = useState('');

  return (
    <div>
      <label className="block text-sm font-semibold">Название приложения</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название"
        type="text"
        className="block w-full px-2 py-2 placeholder:text-xs mt-2 bg-white dark:bg-root-bgDark border border-root-greyLight rounded-md focus:border-gray-500 focus:dark:border-purple-400 focus:outline-none"
      />

      <div className="mt-6">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!title) alert('U need to write some title');
            else saveBtn(title);
          }}
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};
