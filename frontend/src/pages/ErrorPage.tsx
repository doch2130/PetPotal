import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error: unknown = useRouteError();

    return (
        <div>
            <h1>Error Page</h1>
            <p>
            <i>
            {(error as Error)?.message ||
            (error as { statusText?: string })?.statusText}
            </i>
            </p>
        </div>
    );
}

