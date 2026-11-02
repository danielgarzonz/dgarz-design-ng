import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { DgarzButton } from 'dgarz-design-react';
import 'dgarz-design/tokens';

function App() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  return <>
    <DgarzButton variant="secondary" disabled={disabled} loading={loading} onDgarzClick={() => setCount(value => value + 1)}>Guardar</DgarzButton>
    <button onClick={() => setDisabled(value => !value)}>Alternar deshabilitado</button>
    <button onClick={() => setLoading(value => !value)}>Alternar carga</button>
    <output id="count">{count}</output>
  </>;
}
createRoot(document.getElementById('app')!).render(<App />);
