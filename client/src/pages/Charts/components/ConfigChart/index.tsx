import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Card, Grid, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router';
import Plot from 'react-plotly.js';
import Structure from './Structure';
import Common from './Common';
import '../../styles/configChart.scss';
import { convertArrayToObject, generateRandomChartColor } from '../../../../utils/utils';
import SelectChart from './SelectChart';

interface TabPanelProps {
  children?: React.ReactNode;
  value: string;
  selValue: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, selValue, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== selValue}
      id={`tabpanel-${selValue}`}
      aria-labelledby={`tab-${selValue}`}
      {...other}
    >
      {value === selValue && children}
    </div>
  );
}

const ConfigChart: React.FC<any> = ({ data, setData }) => {
  const navigate = useNavigate();
  const { prepareData } = data;
  const { result, dataTypes } = convertArrayToObject(prepareData);

  const [tabOption, setTabOption] = useState('selectChart');
  const [stringColumnKey, setStringColumnKey] = useState<any>();
  const [numberColumnKeys, setNumberColumnKeys] = useState<Object[]>([]);
  const [trace, setTrace] = useState<any>([]);
  const [layout, setLayout] = useState<any>({
    width: 650,
    height: 450,
    title: {
      text: 'Enter Chart Title',
      font: {
        size: 22,
        family: 'Open Sans',
        color: '#000000',
      },
      x: 0.5,
      y: 0.9,
    },
    xaxis: {
      title: {
        text: 'X Axis',
        font: {
          size: 16,
          family: 'Open Sans',
          color: '#000000',
        },
      },
      showgrid: false,
      showline: false,
      visible: true,
      gridwidth: '1',
      gridcolor: '#eeeeee',
    },
    yaxis: {
      title: {
        text: 'Y Axis',
        font: {
          size: 16,
          family: 'Open Sans',
          color: '#000000',
        },
      },
      showgrid: true,
      showline: false,
      visible: true,
      gridwidth: '1',
      gridcolor: '#eeeeee',
    },
    showlegend: true,
    legend: {
      x: 1.0,
      y: 1.0,
    },
    plot_bgcolor: '#ffffff',
    paper_bgcolor: '#ffffff',
  });

  const config = {
    displaylogo: false,
    responsive: true,
  };

  const handleBack = () => {
    navigate('/chart/new/prepare');
  };

  const handleNext = () => {
    setData({
      ...data,
      trace,
      layout,
      config,
    });
    navigate('/chart/new/export');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabOption(newValue);
  };

  const handleChartChange = (chartType?: any) => {
    let updatedLayout = {};
    const chartName = chartType ?? trace[0]?.typeValue ?? 'stackedColumn';
    const updatedTrace = numberColumnKeys.map((numberKey: any, idx: any) => {
      if (chartName === 'scatterPlot') {
        return {
          x: result[stringColumnKey] || [],
          y: result[numberKey] || [],
          type: 'scatter',
          mode: 'markers',
          marker: { color: generateRandomChartColor(idx) },
          typeValue: chartName,
        };
      } else if (chartName === 'lines') {
        return {
          x: result[stringColumnKey] || [],
          y: result[numberKey] || [],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: generateRandomChartColor(idx) },
          typeValue: chartName,
        };
      } else if (chartName === 'pieChart') {
        return {
          labels: result[stringColumnKey] || [],
          values: result[numberKey] || [],
          type: 'pie',
          marker: { color: generateRandomChartColor(idx) },
          typeValue: chartName,
        };
      } else if (chartName === 'donutChart') {
        return {
          labels: result[stringColumnKey] || [],
          values: result[numberKey] || [],
          type: 'pie',
          hole: '.4',
          marker: { color: generateRandomChartColor(idx) },
          typeValue: chartName,
        };
      } else if (chartName.includes('Column')) {
        updatedLayout = {
          barmode: chartName === 'stackedColumn' ? 'stack' : 'group',
        };

        return {
          x: result[stringColumnKey] || [],
          y: result[numberKey] || [],
          type: 'bar',
          mode: 'markers',
          marker: { color: generateRandomChartColor(idx) },
          typeValue: chartName,
        };
      } else if (chartName.includes('Bar')) {
        updatedLayout = {
          barmode: chartName === 'stackedBar' ? 'stack' : 'group',
        };

        return {
          y: result[stringColumnKey] || [],
          x: result[numberKey] || [],
          type: 'bar',
          mode: 'markers',
          marker: { color: generateRandomChartColor(idx) },
          orientation: 'h',
          typeValue: chartName,
        };
      }

      return {};
    });

    setLayout({ ...layout, ...updatedLayout });
    setTrace(updatedTrace);
  };

  useEffect(() => {
    const tempStringColumnKey = Object.keys(dataTypes).find(
      (key: string) => dataTypes[key] === 'string'
    );
    const tempNumberColumnKeys = Object.keys(dataTypes).filter(
      (key: string) => dataTypes[key] === 'number'
    );

    setStringColumnKey(tempStringColumnKey);
    setNumberColumnKeys(tempNumberColumnKeys);
    handleChartChange('stackedColumn');
  }, []);

  useEffect(() => {
    handleChartChange();
  }, [stringColumnKey, numberColumnKeys]);

  return (
    <Box sx={{ px: '1rem' }}>
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 2 }}
        style={{ margin: 'unset', width: '100%', height: '75vh' }}
      >
        <Grid item sm={12} md={8}>
          {trace.length > 0 && <Plot data={trace} layout={layout} config={config} />}
        </Grid>
        <Grid item sm={12} md={4}>
          <Card sx={{ padding: '1rem' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabOption}
                onChange={handleTabChange}
                allowScrollButtonsMobile
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Configuration tabs"
              >
                <Tab label="Select Chart" value="selectChart" />
                <Tab label="Structure" value="structure" />
                <Tab label="Common" value="common" />
              </Tabs>
            </Box>
            <Box style={{ height: '62vh', overflow: 'auto' }}>
              <TabPanel value={tabOption} selValue="selectChart">
                <SelectChart trace={trace} onChartChange={handleChartChange} />
              </TabPanel>
              <TabPanel value={tabOption} selValue="structure">
                <Structure
                  result={result}
                  stringColumnKey={stringColumnKey}
                  onStringColumnKey={setStringColumnKey}
                  numberColumnKeys={numberColumnKeys}
                  onNumberColumnKeys={setNumberColumnKeys}
                  chartType={trace[0]?.typeValue ?? 'stackedColumn'}
                />
              </TabPanel>
              <TabPanel value={tabOption} selValue="common">
                <Common layout={layout} setLayout={setLayout} />
              </TabPanel>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Button color="primary" variant="contained" onClick={handleNext}>
                Generate
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfigChart;
