import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import GridData from './components/datagrid';
import TraderForm from './components/traderform';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <GridData/>
        </div>
        <div>
          <TraderForm/>
        </div>
      </header>
    </div>
  );
}

export default App;
