import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import Dropdown from '../Dropdown';

interface PROPS {
  setTableData: Dispatch<SetStateAction<any>>;
}
export default function InputBox({ setTableData }: PROPS) {
  const [queryText, setQueryText] = useState('');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<{ id: number; value: string }>();

  console.log(selected);

  const queryArray = [
    { id: 1, value: 'SELECT * FROM user_details WHERE last_name = "john";' },
    { id: 2, value: "SELECT * FROM user_details WHERE first_name = 'john';" },
    { id: 3, value: 'SELECT * FROM user_details LIMIT 5;' },
    {
      id: 4,
      value: 'SELECT * FROM user_details ORDER BY first_name DESC LIMIT 10;',
    },
  ];
  const handleText = (e: any) => {
    setQueryText(e.target.value);
  };

  const handleQuery = async () => {
    let qID = selected?.id;
    let isCorrect;
    if (queryText === '' && qID) {
      setError('');
      isCorrect = true;
    } else {
      isCorrect = queryArray.map((e) => {
        if (e.value.trim().toLowerCase() === queryText.trim().toLowerCase()) {
          setError('');
          qID = e.id;
          return true;
        }
        setError('Query Syntax Incorrect');
        qID = undefined;
        return false;
      });
    }
    if (isCorrect) {
      const data = await fetch('/api/custom', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          query: qID,
        }),
      });
      const res = await data.json();
      setTableData(res);
    }
  };

  const addToFav = () => {
    queryArray.push({
      id: queryArray.length + 1,
      value: queryText,
    });
  };
  return (
    <div className="mb-5">
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700"
      >
        Enter Your Query
      </label>
      <div className="mt-1 mb-3">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          onChange={(e) => handleText(e)}
          className="block w-full rounded-md border-gray-700 p-4 font-medium shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
        <pre className="mt-2 text-red-600">{(error || '').toString()}</pre>
      </div>
      <Dropdown
        title={'Select Query'}
        values={queryArray}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => handleQuery()}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Run Query
        </button>
        <button
          type="button"
          onClick={() => addToFav()}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add to Fav
        </button>
      </div>
    </div>
  );
}
