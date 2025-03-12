import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            fallback={<div>errror</div>}
            onReset={()=> window.location.replace('/')}
        >
            <App/>
        </ErrorBoundary>
    </StrictMode>,
)
