import React from 'react';
import Form from 'devextreme-react/form';
import employee from './formdata.js';

const colCountByScreen = {
  sm: 2,
  md: 4,
};

function TraderForm() {
    return (
      <div>
        <Formsdfsdf
          id="form"
          formData={employee}
          colCountByScreen={colCountByScreen}
          labelLocation="top"
          minColWidth={233}
          colCount="auto"
          screenByWidth={screenByWidth}
        />
      </div>
    );
  }

function screenByWidth(width) {
  return width < 720 ? 'sm' : 'md';
}

export default TraderForm;