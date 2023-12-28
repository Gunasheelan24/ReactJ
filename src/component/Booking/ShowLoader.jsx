import React from 'react';
import { LinearProgress } from '@mui/material';

const ShowLoader = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <LinearProgress />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowLoader;
