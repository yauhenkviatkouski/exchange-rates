import Footer from '../components/Footer';
import Header from '../components/Header';
import CurrencyTable from './CurrencyTable';

function App() {
  return (
    <>
      <main>
        <Header>
          <h1>Currency conversion app</h1>
        </Header>
        <CurrencyTable />
      </main>
      <Footer>
        <p>
          Application is getting rates from exchangerate.host
          <br />
          Free foreign exchange, crypto rates & EU VAT Rates API
        </p>
      </Footer>
    </>
  );
}

export default App;
