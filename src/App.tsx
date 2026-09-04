import { useEffect } from 'react';

import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

import reactLogo from './assets/react.svg';

import './App.css';

function App() {
    async function loadFiles() {
        const msg = await invoke('load_files');
        console.log(msg);
    }

    useEffect(() => {
        const unlisten = listen('file-loaded', (file) => {
            console.log(file);
        });

        invoke('load_files');

        return () => {
            unlisten.then((fn) => fn());
        };
    }, []);

    return (
        <main className="container">
            <h1>Welcome to Tauri + React</h1>

            <div className="row">
                <a href="https://vite.dev" target="_blank">
                    <img src="/vite.svg" className="logo vite" alt="Vite logo" />
                </a>
                <a href="https://tauri.app" target="_blank">
                    <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <p>Click on the Tauri, Vite, and React logos to learn more.</p>

            <form
                className="row"
                onSubmit={(e) => {
                    e.preventDefault();
                    loadFiles();
                }}
            >
                <button type="submit">Greet</button>
            </form>
        </main>
    );
}

export default App;
