
import 'bootstrap/dist/css/bootstrap.css';
import { ReactQueryDevtools } from 'react-query/devtools'

import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store';
import { Provider } from 'react-redux';
import Layout from '../components/layout';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {

  return  (
 
  <Provider store={store}>
  <QueryClientProvider client={queryClient}> 
  <Layout>
  <Component {...pageProps} />
  <ReactQueryDevtools initialIsOpen={false} />
  </Layout>
 
  </QueryClientProvider>  
  </Provider>
  )
}

export default MyApp
