
import 'bootstrap/dist/css/bootstrap.css';


// import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store';
import { Provider } from 'react-redux';
import Layout from '../components/layout';

// const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {

  return  (
 
  <Provider store={store}>
  <Layout>
  <Component {...pageProps} />
  </Layout>
  </Provider>
  )
}

export default MyApp
