import { Authenticator, ThemeProvider, Theme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import AppFlow from './app-flow';

const theme: Theme = {
  name: 'musette-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '#F5F5F5',
          80: '#9D5465',
          90: '#8A4757',
          100: '#8A4757'
        }
      }
    }
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <AppFlow signOut={signOut} user={user} />
            <button 
              onClick={signOut} 
              className="fixed top-4 right-4 bg-[#9D5465] hover:bg-[#8A4757] text-white p-2 rounded"
            >
              Sign Out
            </button>
          </div>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;
