import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --primary-color: #2563eb;
        --secondary-color: #059669;
        --background-color: #f9fafb;
        --text-primary: #1e293b;
        --heading-text: #111827;
        --text-secondary: #64748b;
        --border-color: #cbd5e1;
        --folder-text: #333; /* Darker text color for folder names */
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', Neue Haas Unica;
    }

    body {
        background-color: var(--background-color);
        color: var(--text-primary);
        line-height: 1.8;
        font-weight: 400;
        letter-spacing: -0.015em;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 16px;
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
        color: var(--heading-text);
        margin-bottom: 1rem;
        line-height: 1.4;
    }

    p {
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
        font-size: 1rem;
    }

    /* Added folder text style */
    .folder-name {
        color: var(--folder-text); /* Darker color for better contrast */
        font-weight: 500;
        font-size: 1.1rem;
        letter-spacing: 0.015em;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Add subtle text shadow for more legibility */
    }

    a {
        color: var(--primary-color);
        text-decoration: none;
        transition: color 0.2s ease-in-out;
        font-weight: 600;

        &:hover {
            color: #1d4ed8;
            text-decoration: underline;
        }
    }

    button {
        font-size: 1rem;
        font-weight: 600;
        border-radius: 0.5rem;
        padding: 0.8rem 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        background-color: var(--primary-color);
        color: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        &:hover {
            background-color: #1d4ed8;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(1px);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        &:focus {
            outline: 2px solid var(--secondary-color);
            outline-offset: 2px;
        }
    }

    input, select, textarea {
        font-size: 1rem;
        font-weight: 400;
        padding: 0.9rem 1.2rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        background-color: white;
        color: var(--text-primary);
        transition: all 0.3s ease;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);

        &:focus {
            border-color: var(--primary-color);
            outline: none;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.125);
        }

        &:disabled {
            background-color: var(--background-color);
            cursor: not-allowed;
            opacity: 0.7;
        }
    }

    textarea {
        min-height: 140px;
        resize: vertical;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: var(--background-color);
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--border-color);
        border-radius: 5px;
    }

    @media (max-width: 640px) {
        body {
            font-size: 15px;
        }

        button {
            width: 100%;
        }
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --background-color: #1e293b;
            --text-primary: #e2e8f0;
            --text-secondary: #cbd5e1;
            --border-color: #475569;
            --folder-text: #e2e8f0; /* Lighter folder text for dark mode */
        }

        body {
            background-color: var(--background-color);
            color: var(--text-primary);
        }

        p, label {
            color: var(--text-secondary);
        }

        .folder-name {
            color: var(--folder-text); /* Folder text color in dark mode */
        }
    }
`;
