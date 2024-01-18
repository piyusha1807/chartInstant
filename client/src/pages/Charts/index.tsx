import React, { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import UploadData from './components/UploadData';
import PrepareData from './components/PrepareData';
import ConfigChart from './components/ConfigChart';
import ExportPublish from './components/ExportPublish';
import Page from '../../components/Page';

const steps = ['Upload Data', 'Prepare Data', 'Config Chart', 'Export & Publish'];

function getStepComponent(stepName: string, chartId: string, data: any, setData: any) {
  switch (stepName) {
    case 'upload':
      return {
        step: 0,
        component: <UploadData chartId={chartId} data={data} setData={setData} />,
      };
    case 'prepare':
      return {
        step: 1,
        component: <PrepareData chartId={chartId} data={data} setData={setData} />,
      };
    case 'config':
      return {
        step: 2,
        component: <ConfigChart chartId={chartId} data={data} setData={setData} />,
      };
    case 'export':
      return {
        step: 3,
        component: <ExportPublish chartId={chartId} data={data} setData={setData} />,
      };
    default:
      return {
        step: 0,
        component: <UploadData chartId={chartId} data={data} setData={setData} />,
      };
  }
}

export default function Charts() {
  const params = useParams();
  const { chartId = 'new', stepName = '' } = params;

  const [data, setData] = useState({});
  const [activeStep, setActiveStep] = useState(1);
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(
    <UploadData chartId={chartId} data={data} setData={setData} />
  );

  useEffect(() => {
    const { step, component } = getStepComponent(stepName, chartId, data, setData);

    setActiveStep(step);
    setActiveComponent(component);
  }, [stepName, chartId]);

  return (
    <Page title="Create charts - ChartInstant">
      {/* <Card sx={{ padding: '1rem', marginTop: '1rem' }}>{activeComponent}</Card> */}
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeComponent}
      </Box>
    </Page>
  );
}
