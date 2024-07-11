import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DepartmentList from "./DepartmentList.tsx";
import departments from "../data/data.ts";
interface ResType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Comp: React.FC = () => {
  const [data, setData] = useState<ResType[]>([]);
  const [selectedRow, setSelectedRow] = useState<ResType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    const phone = localStorage.getItem("phoneNumber");
    const email = localStorage.getItem("email");
    if (!name || !phone || !email) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row as ResType);
  };

  const handleClose = () => {
    setSelectedRow(null);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      sortable: true,
      width: 80,
    },
    {
      field: "userId",
      headerName: "User ID",
      sortable: true,
      width: 80,
    },
    {
      field: "title",
      headerName: "Title",
      sortable: true,
      flex: 1,
    },
    {
      field: "body",
      headerName: "Body",
      sortable: true,
      flex: 2,
    },
  ];

  return (
    <div className="h-screen w-full p-4">
      <div className="h-full w-full">
        <DataGrid
          rows={data}
          columns={columns}
          onRowClick={handleRowClick}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          className="h-full"
        />
      </div>
      <Dialog
        open={selectedRow !== null}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Row Details</DialogTitle>
        {selectedRow && (
          <DialogContent>
            <DialogContentText>
              <strong>ID:</strong> {selectedRow.id}
              <br />
              <strong>User ID:</strong> {selectedRow.userId}
              <br />
              <strong>Title:</strong> {selectedRow.title}
              <br />
              <strong>Body:</strong> {selectedRow.body}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        { departments.map((dept:any, idx:number) => {
          return (<DepartmentList department={dept}  key={idx}/>);
        })}
      </div>
    </div>
  );
};

export default Comp;
