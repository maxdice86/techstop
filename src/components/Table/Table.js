import React, {useEffect, useMemo, useRef,useState} from 'react';
import { useSortBy, useTable, useRowSelect } from 'react-table';
import {COLUMNS} from './columns';
import {Checkbox} from './Checkbox'
import { getAllRequests } from '../services/services';
import axios from 'axios';
import './table.css';

function Table(props) {

    // const [reserves,setReserves] = useState([])
    const columns = useMemo(()=> COLUMNS,[])
    //const data = useMemo(()=> reserves,[reserves])

    // const selection = useRef([])

    const data = useMemo(()=> props.data,[])

   const{
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    selectedFlatRows

} = useTable({
    columns:columns,
    data: data
},useSortBy,useRowSelect, (hooks)=> {
    hooks.visibleColumns.push((columns)=>{
        return [
            {
                id:'select',
                Header: ({getToggleAllRowsSelectedProps}) => (<Checkbox {...getToggleAllRowsSelectedProps()}/>
                ),
                Cell: ({row})=> (<Checkbox {...row.getToggleRowSelectedProps()}/>
                )
    },
        ...columns
    ]})
})

    // useEffect(()=>{

    //     const cancelToken =axios.CancelToken.source();
    
    //     getAllRequests().then((res)=>{

    //         setReserves(()=> res.data)
    
    //     })

    // },[])

    return (
        <div>
             <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                    
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column)=> (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                             {column.render('Header')}
                             <span>{ column.isSorted ? (column.isSortedDesc ? '🔽':'🔼'): ''}</span>
                        </th>
                   ))}
                 </tr>
                   ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row)
                            return (

                            <tr {...row.getRowProps()}>
                               {
                                row.cells.map((cell) => {
                                    
                                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    
                                })
                               }
                            </tr>
                            )
                        })}
                </tbody>
                <tfoot>
                    {
                        footerGroups.map((footerGroup) => (
                    
                <tr {...footerGroup.getFooterGroupProps()}>
                    {
                        footerGroup.headers.map((column)=> (
                        <td {...column.getFooterProps()}> {column.render('Footer')}</td>
                   ))}
                 </tr>
                   ))}
                </tfoot>
            </table>
            <div>
                {
                   // console.log(selectedFlatRows)
                //   selection.current = selectedFlatRows.map((row) => row.original)
                }
            </div>
            
        </div>
    );
}

export default Table;