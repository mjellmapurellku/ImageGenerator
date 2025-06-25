import { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext.jsx';
import Login from './Login.jsx';

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