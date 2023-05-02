import './bootstrap';
import '../css/app.css';

import {createRoot, Root} from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from "react";
import {createTheme, Theme, ThemeProvider} from "@mui/material";

const appName: string = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

const darkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

createInertiaApp({
    title: (title: string): string => `${title} - ${appName}`,
    resolve: (name: string) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({el, App, props}) {
        const root: Root = createRoot(el);
        root.render(
            <ThemeProvider theme={darkTheme}>
                <App {...props} />
            </ThemeProvider>
        );
    },
});
