import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Search from "@mui/icons-material/Search";

function UserTable({ data }) {
  return (
    <Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Joined</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                    {user.name[0]}
                  </Avatar>
                  {user.name}
                </Box>
              </TableCell>
              <TableCell>{user.joined}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={user.score}
                  color={user.score > 50 ? "success" : "warning"}
                />
              </TableCell>
              <TableCell>
                <Switch checked={user.active} size="small" readOnly />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default function UsersTab({ filteredUsers, searchQuery, setSearchQuery }) {
  return (
    <Box>
      <TextField
        label="Search users"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
        sx={{ mb: 2 }}
      />
      <UserTable data={filteredUsers} />
      <Box sx={{ mt: 2 }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
}
