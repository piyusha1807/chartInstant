import React from 'react';
import { Select, MenuItem, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGridApiContext } from '@mui/x-data-grid-pro';

const RowsPerPageSelector = ({ rowsPerPageOptions, pageSize }: any) => {
  const [selectedOption, setSelectedOption] = React.useState<number>(pageSize);
  const { t } = useTranslation();
  const apiRef = useGridApiContext();

  React.useEffect(() => {
    setSelectedOption(pageSize);
    apiRef.current.setPageSize(pageSize);
  }, [pageSize]);

  const handleChange = (event: any) => {
    setSelectedOption(Number(event.target.value));
    apiRef.current.setPageSize(event.target.value);
  };

  return (
    <>
      <InputLabel shrink htmlFor="rows-per-page-selector" />
      <Select
        className="rows-per-page-selector"
        aria-label={t('table.rowsPerPage')}
        id="rows-per-page-selector"
        value={selectedOption}
        onChange={handleChange}
      >
        {React.Children.toArray(
          rowsPerPageOptions.map((option: number) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))
        )}
      </Select>
    </>
  );
};

export default RowsPerPageSelector;
