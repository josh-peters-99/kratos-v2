import Link from "next/link";

export default function Welcome() {
    return (
        <section className="w-full flex flex-col">
            <div className="relative bg-[url(/img-1.jpg)] bg-center bg-cover bg-no-repeat h-[800px] flex items-center justify-center">
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10 flex flex-col items-center text-center px-6 py-12 h-full justify-between">
                    <h1 className="text-4xl text-white mt-40 font-bold">Need a way to track your strength training?</h1>

                    
                    <div className="flex flex-col items-center">
                        <Link href="/auth/signup">
                            <button className="bg-auburn rounded-full px-12 py-6 font-medium text-xl text-white sm:px-8 sm:py-4 sm:text-base">Join Now</button>
                        </Link>
                        <p className="text-sm text-white mt-4">Explore Company Name</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 text-white fill-current mt-8">
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                        </svg>
                    </div>

                </div>
            </div>

            <div className="bg-black h-[800px] flex flex-col py-20 justify-center items-center">
                <div className="flex justify-center items-center">
                    <h2 className="text-white text-xl font-semibold">Explore our features.</h2>
                </div>

                <div className="flex flex-col justify-between items-center mt-12 px-24 md:w-[500px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 text-auburn fill-current">
                        <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/>
                    </svg>
                    <h3 className="text-white mt-5 font-medium text-lg">Customizable Training</h3>
                    <p className="text-white text-sm mt-3 text-center font-thin">Already have a good routine? No worries. You can completely customize every aspect of your workout or choose from a public library of strength training plans.</p>
                </div>

                <div className="flex flex-col justify-between items-center mt-12 px-24 md:w-[500px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 text-auburn fill-current">
                        <path d="M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                    </svg>
                    <h3 className="text-white mt-5 font-medium text-lg">Set Goals</h3>
                    <p className="text-white text-sm mt-3 text-center font-thin">Need somthing to aim for? Kratos allows user to create their own goals and will help you reach them!</p>
                </div>

                <div className="flex flex-col justify-between items-center mt-12 px-24 md:w-[500px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 text-auburn fill-current">
                    <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/>
                </svg>
                    <h3 className="text-white mt-5 font-medium text-lg">Track & Analyze</h3>
                    <p className="text-white text-sm mt-3 text-center font-thin">Record your workouts in real-time. Keep a record of all your workout data. See your progress and receive training analytics.</p>
                </div>
            </div>
        </section>
    );
}
