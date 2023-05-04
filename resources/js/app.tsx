import '../css/app.css';
import {createRoot, Root} from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from "react";

const appName: string = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title: string): string => `${title} - ${appName}`,
    resolve: (name: string) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({el, App, props}: { el: HTMLElement, App: React.FC, props: any }): void
        {
        const root: Root = createRoot(el);
        root.render(
            <App {...props} />
        );
    },
});
