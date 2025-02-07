export default function Welcome() {
    return (
        <main className="w-full h-screen flex flex-col justify-between px-5 items-center py-10">
            <div>
                <h1>Welcome!</h1>
            </div>

            <div className="flex flex-col">
                <h2>Train.</h2>
                <h2>Track.</h2>
                <h2>Transform.</h2>
            </div>

            <div className="flex flex-col">
                <button>Create Account</button>
                <button>Sign In</button>
            </div>

        </main>
    )
}