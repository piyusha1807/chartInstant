import { Box, Button, Card, Tooltip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  useGridApiRef,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridActionsCellItem,
  GridRowId,
} from '@mui/x-data-grid-pro';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import DataGridTable from '../../../../components/Table';

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    actions: {
      color: theme.palette.text.secondary,
    },
    textPrimary: {
      color: theme.palette.text.primary,
    },
  }),
  { defaultTheme },
);

const PrepareData = (props: any) => {
  const { data, setData } = props;
  const { upload } = data;
  const navigate = useNavigate();
  const classes = useStyles();
  const apiRef = useGridApiRef();

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, 'edit');
  };

  const handleSaveClick = (id: GridRowId) => (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    apiRef.current.commitRowChange(id);
    apiRef.current.setRowMode(id, 'view');

    const row = apiRef.current.getRow(id);
    apiRef.current.updateRows([{ ...row, isNew: false }]);
  };

  const handleDeleteClick = (id: GridRowId) => (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    apiRef.current.updateRows([{ id, _action: 'delete' }]);
  };

  const handleCancelClick = (id: GridRowId) => (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, 'view');

    const row = apiRef.current.getRow(id);
    if (row!.isNew) {
      apiRef.current.updateRows([{ id, _action: 'delete' }]);
    }
  };

  function getFormattedHeaders(csvData: any) {
    if (csvData === undefined) return [];

    const getRow = csvData.split('\n')[0];
    const headers = getRow.split(',');

    let headings: GridColumns = [];
    headings = headers.map((item: any) => {
      const header: any = {};
      header.field = item.toLowerCase();
      header.headerName = item;
      header.flex = 0.25;
      header.editable = true;
      return header;
    }
    );

    headings.push({
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.25,
      sortable: false,
      cellClassName: classes.actions,
      getActions: ({ id }: any) => {
        const isInEditMode = apiRef.current.getRowMode(id) === 'edit';

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <Tooltip title="Save">
                  <SaveIcon />
                </Tooltip>
              }
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={
                <Tooltip title="Cancel">
                  <CancelIcon />
                </Tooltip>
              }
              label="Cancel"
              className={classes.textPrimary}
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            }
            label="Edit"
            className={classes.textPrimary}
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Delete">
                <DeleteIcon />
              </Tooltip>
            }
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    })

    return headings;
  }

  function getFormattedRows(csvData: any, id = true) {
    if (csvData === undefined) return [];

    let getRows = csvData.split('\n');
    if (!id) {
      getRows = getRows.map((item: string) => {
        return (
          item.replace(/(\r\n|\n|\r)/gm, '')
          )
        })
      }
    const getRowHeader = getRows[0].split(',').map((item: string) => item.toLowerCase());
    
    let rows: GridRowsProp = [];
    getRows.shift();
    rows = getRows.map((item: any) => {
      const rowCell = item.split(',');
      const obj = _.zipObject(getRowHeader, rowCell);

      if (!id) return obj;
      
      return {
        ...obj,
        id: randomId()
      };
    })
    
    if (!id) {
      return {
        header: getRowHeader,
        rows,
      }
    }
    return rows;
  }

  const handleBack = () => {
    navigate('/chart/new/upload');
  };
  
  const handleNext = () => {
    setData({
      ...data,
      prepareData: getFormattedRows(apiRef.current.getDataAsCsv(), false)
    })
    navigate('/chart/new/config');
  };

  return (
    <Card sx={{ padding: '1rem', marginTop: '1rem' }}>
      <DataGridTable
        columns={getFormattedHeaders(upload?.csvData)}
        rows={getFormattedRows(upload?.csvData)}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        pagination
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button color="primary" variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Card>
  );
};

export default PrepareData;
