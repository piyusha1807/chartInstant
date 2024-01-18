import React, { Suspense, Fragment } from 'react';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
// import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

const App = () => {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      {/* <BaseOptionChartStyle /> */}
      <Suspense fallback={<Fragment />}>
        <Router />
      </Suspense>
    </ThemeConfig>
  );
};

export default App;
