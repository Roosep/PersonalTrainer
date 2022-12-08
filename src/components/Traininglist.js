import React, { useEffect, useState } from 'react';
import { AgGridReact} from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from 'dayjs';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (url) => {
        if (window.confirm('Do you want to delete this training?')) {
        fetch(url, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                setMsg('Training deleted succesfully.')
                setOpen(true);
            }
            else {
                alert('Something went wrong.');
            }
        })
        .catch(err => console.error(err))
        }
    }
    
    function fullNameGetter(params) {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname
    }

    function formattedDate(params) {
        return dayjs(params.data.date).format('DD.MM.YYYY HH:mm')
    }

    const columns = [
        {field: 'activity', sortable: true, filter: true},
        {  
            headerName: 'Date',
            field: 'date',
            valueGetter: formattedDate, 
            sortable: true, 
            filter: true
        },
        {field: 'duration', sortable: true, filter: true},
        {
            headerName: 'Customer', 
            field: 'fullname', 
            valueGetter: fullNameGetter, 
            sortable: true, 
            filter: true},
        {
            headerName: '',
            field: 'id',
            sortable: false,
            filter: false,
            width: 120,
            cellRendererFramework: params =>
             <Button 
                size="small" 
                onClick={() => deleteTraining(params.value)}
                color="error">Delete</Button>
        }
      
    ]

    return(
        <React.Fragment>
        <div className="ag-theme-material" style={{height: 600, width: '50%', margin:'auto'}}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
        </div>
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message={msg}
        />
        </React.Fragment>
    )
}

export default Traininglist;