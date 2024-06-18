export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:w-5/12">
                        <img className="rounded-lg shadow-lg"
                            src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                            alt="image"
                        />
                    </div>
                    <div className="md:w-7/12">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                            RxRelief: A Better Way to Manage Your Pharmacy Store
                        </h2>
                        <p className="mt-6 text-gray-600">
                            RxRelief, a web app designed for pharmacies, simplifies inventory management by providing essential features such as low stock alerts and expiry date tracking. Update existing medicine details and add new ones effortlessly, ensuring efficient inventory control from anywhere, anytime.
                        </p>
                        <div className="mt-8">
                            <h4 className="text-xl md:text-3xl font-bold text-gray-900">
                                Key Features
                            </h4>
                            <ul className="list-disc list-inside mt-4 text-gray-600">
                                <li>Low stock alerts for medicines.</li>
                                <li>Expiry date tracking to prevent wasted medication.</li>
                                <li>Easy updates for existing medicine details.</li>
                                <li>Effortless addition of new medicines to the inventory.</li>
                                <li>Accessible from anywhere for remote inventory management.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
