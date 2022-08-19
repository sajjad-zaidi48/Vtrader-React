import React from 'react';
import Form from 'devextreme-react/form';
import Employe from '../data/formdata';
import '../css/formData.css';
import { Button } from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
const colCountByScreen = {
  sm: 2,
  md: 2,
};

function TraderForm() {
  const [form,, setForm] = useState('')

    return (
      <div className='Orderform'>
        <div>Order Form</div>
        <Form
          id="form"
          formData={Employe}
          colCountByScreen={colCountByScreen}
          labelLocation="top"
          minColWidth={533}
          colCount="auto"
          screenByWidth={screenByWidth}
          onValueChanged={handle}
        />
        <div className="buttons-demo">
        <div className="buttons">
        <Button
                  width={120}
                  text="BUY"
                  type="default"
                  stylingMode="contained"
                  // onClick={this.onClick}
                />
        </div>
        </div>
      </div>
    );
  }

function screenByWidth(width) {
  return width < 720 ? 'md' : 'md';
}

export default TraderForm;