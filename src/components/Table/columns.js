
export const COLUMNS = [
    {
        Header: 'TR#',
        Footer: 'TR#',
        accessor:'reqId'
    },
    {
        Header: 'Cwid',
        Footer: 'Cwid',
        accessor:'reqCwid'
    },
    {
        Header: 'Types',
        Footer: 'Types',
        accessor:'reqTypes'
    },
    {
        Header: 'Amount',
        Footer: 'Amount',
        accessor:'reqAmount'
    },
    {
        Header: 'Pickup Time',
        Footer: 'Pickup',
        accessor:'reqTime'
    },
    {
        Header: 'Date',
        Footer: 'Date',
        accessor:'reqDate',
        // Cell: ({value})=>{ return format(new Date (value), 'dd/MM/yyyy')}
    },
    {
        Header: 'Status',
        accessor:''
    },
    {
        Header: 'Submit',
        accessor:'submit',
        Cell: ({value}) => <button  type='button'>OK</button>
    },
]


// reqCwid, reqTypes, reqAmount, reqTime, reqDate