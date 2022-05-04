import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useTable, useSortBy } from 'react-table';

const PurchasesTable = ({ columns, data }) => {
  const tableInstance = useTable({ columns, data, disableMultiSort: false }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50 dark:bg-black">
          {
            // Loop over the header rows
            headerGroups.map((headerGroup, i) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column, i) => (
                    // Apply the header cell props
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={i}
                      scope="col"
                      className={`${
                        column.isSorted ? 'underline' : ''
                      } py-3.5 pl-3 pr-3 text-left align-middle text-sm font-semibold text-gray-900 dark:text-theo-cyan `}
                    >
                      {
                        // Render the header
                        column.render('Header')
                      }
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ChevronDownIcon width={25} className="inline w-6" />
                          ) : (
                            <ChevronUpIcon className="inline w-6" />
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 bg-white dark:bg-black">
          {
            // Loop over the table rows
            rows.map((row, i) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()} key={i}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, i) => {
                      // Apply the cell props
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="whitespace-nowrap px-3 py-4 text-sm text-theo-navy  dark:text-white"
                          key={i}
                        >
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default PurchasesTable;
