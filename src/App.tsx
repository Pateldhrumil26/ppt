import { FormProvider } from './context/FormContext';
import { SlideFinalizationProvider, useSlideFinalization } from './context/SlideFinalizationContext';
import StepperApp from './pages/StepperApp';
import './index.css';

/**
 * Inner component that wires the FormProvider's onSlideEdited callback
 * to the SlideFinalizationContext's markEditing action.
 * This must be inside SlideFinalizationProvider to access the context.
 */
function AppInner() {
  const { markEditing } = useSlideFinalization();

  return (
    <FormProvider onSlideEdited={markEditing}>
      <StepperApp />
    </FormProvider>
  );
}

function App() {
  return (
    <SlideFinalizationProvider>
      <AppInner />
    </SlideFinalizationProvider>
  );
}

export default App;