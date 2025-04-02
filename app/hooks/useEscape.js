// custom hook for pressing escape button we have
// More event handler to be add here
import { useEffect } from "react";
export const useEscape = (onEscape) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onEscape()
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown)

    },[onEscape])
}