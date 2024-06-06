import React from 'react';
import ChipAuto from './ChipAuto';

const ParentComponent = () => {
  const dynamincarr = ['dog', 'deer', 'cat'];

  return (
    <div>
       
      <ChipAuto suggestions={dynamincarr} />
    </div>
  );
};

export default ParentComponent;
