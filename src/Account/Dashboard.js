import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import './Dashboard.css';
import authFetch from '../axios/Intercepter';
import FormDialog from './FormDialog';
import { Backdrop, CircularProgress } from '@mui/material';



export const Dashboard = () => {
    const [data, setData] = useState([]);
    const [editData, seteditData] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (index) => {
        let upData = [...data];
        seteditData(upData[index]);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        authFetch.get("/accounts").then(y => {
            if (y.status == 200 || y.status == 201) {
                setData(y.data);
            }
        })
    }

    const dltData = (index) => {
        let dlt = [...data];

        authFetch.delete("/accounts/" + dlt[index].id).then(y => {
            if (y.status == 200 || y.status == 201) {
                toast.success("Sucessfully Deleted");
                // console.log(y);
                getData();
            }
        }).catch(y => {
            toast.error("Error");
        })
    }


    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>

                {
                    data.length > 0 ?


                        <tbody>
                            {
                                data?.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{element.id}</td>
                                            <td>{element.title}</td>
                                            <td>{element.firstName}</td>
                                            <td>{element.lastName}</td>
                                            <td>{element.email}</td>
                                            <td><button className='btn' onClick={() => dltData(index)}>Delete</button>
                                                <button className='btn' onClick={() => handleClickOpen(index)}>Edit</button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                        :<Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open='true'
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                }
            </table>


            <FormDialog close={handleClose} opn={open} edtData={editData} dataLoad={getData} />
        </>
    )
}
