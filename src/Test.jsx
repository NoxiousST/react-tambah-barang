import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useReactTable} from '@tanstack/react-table';

const Tester = () => {
    const { register, handleSubmit } = useForm();
    const [tableData, setTableData] = useState([]);

    const onSubmit = (data) => {
        setTableData((prevData) => [...prevData, data]);
    };

    const columns = React.useMemo<[]>(
        () => [
            {
                header: 'First Name',
                accessorKey: 'firstName',
            },
            {
                header: 'Last Name',
                accessorKey: 'lastName',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
        ],
            []
    );

    const tableInstance = useReactTable({
        data: tableData,
        columns,
    });

    const {
        getHeaderGroups,
        getRowModel,
    } = tableInstance;

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>First Name</label>
                    <input {...register('firstName')} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input {...register('lastName')} />
                </div>
                <div>
                    <label>Email</label>
                    <input {...register('email')} />
                </div>
                <button type="submit">Submit</button>
            </form>

            <table style={{ border: 'solid 1px blue' }}>
                <thead>
                {getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(column => (
                            <th
                                key={column.id}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.renderHeader()}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td
                                key={cell.id}
                                style={{
                                    padding: '10px',
                                    border: 'solid 1px gray',
                                    background: 'papayawhip',
                                }}
                            >
                                {cell.renderCell()}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tester;
