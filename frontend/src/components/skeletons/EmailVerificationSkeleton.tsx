const EmailVerificationSkeleton = () => {
    return (
        <div className="max-w-md mx-auto mt-8 px-6 py-4 bg-white shadow-md rounded-lg border border-gray-200 sm:max-w-lg md:max-w-xl">
            <div className="bg-[#608fb9] text-white font-bold p-4 rounded-t-lg text-center">
                Verificando correo...
            </div>
            <div className="p-4 bg-white rounded-b-lg">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationSkeleton;
