import csvDownload from 'json-to-csv-export';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState } from 'react';

import Dropdown from '../Dropdown';

interface PROPS {
  tableData: {}[];
}
export default function TableGrid({ tableData }: PROPS) {
  const [selected, setSelected] = useState<{ id: number; value: string }>();

  const outputType = [
    { id: 1, value: 'PDF' },
    { id: 2, value: 'CSV' },
  ];

  const handleExporrt = () => {
    if (selected?.value === 'CSV') {
      const data = {
        data: tableData,
        filename: 'table.csv',
        delimiter: ',',
      };
      csvDownload(data);
    } else {
      // eslint-disable-next-line
      const doc = new jsPDF();
      autoTable(doc, { html: '#my-table' });
      doc.save('tableData.pdf');
    }
  };

  if (!tableData) {
    return <>No data</>;
  }
  return (
    <div className="px-4 sm:px-6 lg:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Results</h1>
        </div>
        <div className="mt-4 flex gap-2 sm:mt-0 sm:ml-16 sm:flex-none">
          <Dropdown
            title={''}
            values={outputType}
            selected={selected}
            setSelected={setSelected}
          />
          <button
            type="button"
            onClick={() => handleExporrt()}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Export
          </button>
        </div>
      </div>
      <div className="-mx-4 mt-8 overflow-x-scroll shadow ring-1 ring-black/5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table
          id="my-table"
          className="min-w-full divide-y divide-gray-300 overflow-x-scroll"
        >
          <thead className="bg-gray-50">
            <tr>
              {tableData.length > 0 &&
                Object.keys(tableData[0] || {})?.map(
                  (header: string, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      {header}
                    </th>
                  )
                )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {tableData.length > 0 &&
              tableData?.map((values: {}, index) => (
                <>
                  <tr key={index}>
                    {Object.keys(values).map((item, i) => (
                      <td
                        key={i}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                      >
                        {values[item as keyof typeof values]}
                      </td>
                    ))}
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
