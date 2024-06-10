
export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img className="photoo"
                            src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                            alt="image"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                RxRelief : A better way to manage your Pharmacy Store
                        </h2>
                        <p className="mt-6 text-gray-600">
                RxRelief, a web app built for pharmacies, removes the stress of inventory management. Stay informed with low stock alerts and expiry date tracking, all while easily updating existing medicine details and adding new ones. Manage your inventory efficiently, anywhere, anytime, and say goodbye to stockouts and wasted medication.
                        </p>
                        <h4 className="text-xl text-gray-900 font-bold md:text-4xl">
                         Key Features
                        </h4>
                        <p className="mt-4 text-gray-600">
                            <ul >
                                <li>Low stock alerts for medicines.</li>
                                <li>Expiry date tracking to prevent wasted medicatio</li>
                                <li>Easy updates for existing medicine details.</li>
                                <li>Effortless addition of new medicines to the inventory.</li>
                                <li>Accessible from anywhere for remote inventory management.</li>
                            </ul>
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}