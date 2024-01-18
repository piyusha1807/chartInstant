import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useGridApiContext, useGridState } from '@mui/x-data-grid-pro';
import RowsPerPageSelector from './RowsPerPageSelector';

const CustomPagination = ({ rowsPerPageOptions, pageSize }: any) => {
  const apiRef = useGridApiContext();
  const [state] = useGridState(apiRef);
  
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1rem',
      }}
    >
      <RowsPerPageSelector
        rowsPerPageOptions={rowsPerPageOptions}
        pageSize={pageSize}
      />
      <Pagination
        color="primary"
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    </div>
  );
};

export default CustomPagination;
