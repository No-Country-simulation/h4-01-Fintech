import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
            <h1 className="text-5xl font-bold text-blue-600 animate-pulse">404</h1>
            <p className="mt-4 text-xl text-gray-600">
                Oops! No encontramos la página que buscas.
            </p>
                <Link href="/" className="mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Volver al inicio
            </Link>
        </div>
    );
};

export default NotFoundPage;
