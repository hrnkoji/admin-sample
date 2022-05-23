import { Box, Typography } from '@mui/material';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import React from 'react';

import useRequest from 'hooks/useRequest';

function Users({ className }: { className?: string }) {

  const { request } = useRequest();
  const [users, setUsers] = React.useState<any[]>([]);
  async function fetchData() {
    const res: any = await request('api/users');
    setUsers(res);
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box className={className} mx={3}>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
          ユーザー一覧
        </Typography>
        {users.length > 0 && (
          <Box mt={3}>
            <MuiTable aria-label="simple table">
              <TableHead>
                <TableRow>
                  {Object.keys(users[0]).map((key, index) => (
                    <TableCell key={`key-${index}`}>{key}</TableCell>
                  ))}
                  <TableCell key={`key-${Object.keys(users[0]).length + 1}`} />
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row, index) => (
                  <TableRow
                    key={`users-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {Object.values(row).map((value: any, i) => (
                      <TableCell key={`users-${index}-${i}`}>
                        {value}
                      </TableCell>
                    ))}
                    <TableCell key={`users-${index}-${Object.values(row).length + 1}`}>
                      <Link to={`/user/${row.id}`}>編集</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </Box>
        )}
      </Box>
    </>
  );
}

export default styled(Users)``;
