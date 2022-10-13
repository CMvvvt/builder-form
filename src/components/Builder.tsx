import FieldService from '../service/MockService';
import QuickBaseForm from './QuickBaseForm';
import { FormData } from '../types/index';
import { useEffect, useState } from 'react';

function Builder() {
  const [formData, setFormData] = useState<FormData>();
  useEffect(() => {
    setFormData(FieldService.getField());
  }, []);

  return (
    <div className="builder">
      <h1>Builder Form</h1>
      {formData ? (
        <QuickBaseForm formData={formData} />
      ) : (
        <div className="spinner-border" role="status"></div>
      )}
    </div>
  );
}

export default Builder;
