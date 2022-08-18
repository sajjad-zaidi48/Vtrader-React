import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import GridData from './components/datagrid';
import TraderForm from './components/traderform';

function App() {
  return (
    <div >
      <div className='nav'>
        <h1>V-Trader App</h1>
      </div>
      <div className='dashBoard'>
      <div >
          <TraderForm/>
        </div>
        <div className='orderBlotter'>
          <GridData/>
        </div>
      </div>
        
        
    </div>
  );
}

export default App;
