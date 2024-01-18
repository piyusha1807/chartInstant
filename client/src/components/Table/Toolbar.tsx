import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {
  GridApiRef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid-pro';
import { randomId } from '@mui/x-data-grid-generator';
import { Stack } from '@mui/material';

interface CustomToolbarProps {
  apiRef: GridApiRef;
  columns: any;
}

export default function CustomToolbar(props: CustomToolbarProps) {
  const { apiRef, columns } = props;

  const handleClick = () => {
    const id = randomId();
    apiRef.current.updateRows([{ id, isNew: true }]);
    apiRef.current.setRowMode(id, 'edit');
    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      });
      apiRef.current.setPage(apiRef.current.state.pagination.pageCount);
      apiRef.current.setCellFocus(id, columns[0].field || '');
    });
  };

  return (
    <GridToolbarContainer>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={0}
        width="100%"
      >
        <div>
          <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
            Add record
          </Button>
        </div>
        <div>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </div>
      </Stack>
    </GridToolbarContainer>
  );
}
