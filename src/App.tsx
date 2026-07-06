import { FormProvider } from './context/FormContext';
import StepperApp from './pages/StepperApp';
import './index.css';

function App() {
  return (
    <FormProvider>
      <StepperApp />
    </FormProvider>
  );
}

export default App;