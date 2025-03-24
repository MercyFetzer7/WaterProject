function Privacy () {
    return (
    <>
        <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">Effective Date: [Insert Date]</p>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
            <ul className="list-disc pl-6 text-gray-700">
            <li><strong>Personal Information:</strong> Name, email, or other details provided through contact forms.</li>
            <li><strong>Usage Data:</strong> IP addresses, browser type, and pages visited.</li>
            <li><strong>Cookies and Tracking:</strong> Used to enhance user experience and analyze site traffic.</li>
            </ul>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-700">
            <li>Improve website functionality and user experience.</li>
            <li>Respond to inquiries and support requests.</li>
            <li>Monitor website traffic and analyze trends.</li>
            </ul>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">3. Data Sharing</h2>
            <p className="text-gray-700">
            We do not sell or share your personal data with third parties, except:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
            <li>When required by law.</li>
            <li>With service providers assisting in website operations (e.g., analytics, hosting).</li>
            </ul>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">4. Cookies</h2>
            <p className="text-gray-700">
            You can control cookie settings through your browser. Disabling cookies may affect website functionality.
            </p>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
            <p className="text-gray-700">
            Depending on your location, you may have rights to access, modify, or delete your data. Contact us for assistance.
            </p>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
            <p className="text-gray-700">
            If you have questions about this Privacy Policy, email us at <a href="mailto:[Your Contact Email]" className="text-blue-500">[Your Contact Email]</a>.
            </p>
        </section>
        </div>

    </>
    );
}

export default Privacy