import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Testes = () => {
    const generatePDF = async (id: string) => {
        const element = document.getElementById(id);

        const canvas = await html2canvas(element!, {
            scale: 2, // Higher quality
            useCORS: true, // For external images
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('document.pdf');
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div id="content-to-export" className="bg-white p-8 shadow-lg rounded-lg">
            <div className="border-b-4 border-blue-600 pb-4 mb-6">
                <h1 className="text-4xl font-bold text-gray-800">Professional Document</h1>
                <p className="text-gray-500 text-sm mt-2">Generated on {new Date().toLocaleDateString()}</p>
            </div>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-blue-600 mb-3">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="John Doe" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="john@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="+1 234 567 8900" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                </div>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-blue-600 mb-3">Address Details</h2>
                <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="123 Main St" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="New York" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="NY" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="10001" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="USA" />
                </div>
                </div>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-blue-600 mb-3">Additional Information</h2>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={4} placeholder="Enter any additional information..."></textarea>
                </div>
            </section>

            <div className="mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-500">
                <p>© 2024 - This is an auto-generated document</p>
            </div>
            </div>
            
            <button 
            onClick={generatePDF}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
            >
            Download PDF
            </button>
        </div>
    );
};

export default Testes;
