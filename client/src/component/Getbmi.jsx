import React from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'

const Getbmi = ({data}) => {
    console.log(data)

  return (
    <div>
          {data?.length != 0 ? (
              <>
               <TableContainer className="" style={{border: "1px solid white", marginTop: "2rem"}}  component={Paper}>
      <Table sx={{ minWidth: 800 }} style={{border: "1px solid white"}} aria-label="simple table">
        <TableHead >
          <TableRow style={{border: "1px solid white"}}>
            <TableCell align="center">FirstName</TableCell>
            <TableCell align="center">LastName</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">PhoneNo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{border: "1px solid #7e22ce"}}>
          {data?.map((e) => (
            <TableRow
              key={e._id}
            >
              <TableCell align="center">{e?.firstName}</TableCell>
              <TableCell align="center">{e.lastName}</TableCell>
              <TableCell align="center">{e.email}</TableCell>
              <TableCell align="center">{e.type}</TableCell>
              <TableCell align="center">{e.phoneNo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
              </> 
            ) : (
              <div style={{ textAlign: "center", marginTop: '10rem' }}>
                {/* <img style={{ width: "70%" }} src={empty} alt="empty data" /> */}
                <h3 style={{ position: "relative", top: "-3.5rem" }}>
                  Loading.....
                </h3>
              </div>
            )}
    </div>
  )
}

export default Getbmi