import { useContext, useEffect } from 'react';
import Login from './components/Login.jsx';
import { AppContext } from './context/AppContext.jsx';

function App() {
    const { showLogin, setShowLogin } = useContext(AppContext);

    useEffect(() => {
        setShowLogin(true); // Show Login by default for testing
    }, [setShowLogin]);

    return (
        <div>
            {showLogin && <Login />}
        </div>
    );
}

export default App;