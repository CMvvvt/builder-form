import FieldService from '../service/MockService';
import QuickBaseForm from './QuickBaseForm';
import { FormData } from '../types/index';

function Builder() {
  const values: FormData = FieldService.getField();
  return (
    <div className="builder">
      <h1>Builder Form</h1>
      <QuickBaseForm formData={values} />
    </div>
  );
}

export default Builder;
