import jsPDF from 'jspdf';

interface ClientEntry {
    id: string;
    date: string;
    title: string;
    description: string;
    mood?: string;
}

interface ClientData {
    name: string;
    phone?: string;
    email?: string;
    birth_date?: string;
    address?: string;
    entries: ClientEntry[];
}

export const generateClientPDF = async (clientData: ClientData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    let yPosition = margin;

    // Helper function to add a new page if needed
    const checkPageBreak = (height: number) => {
        if (yPosition + height > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
        }
    };

    // Title
    doc.setFontSize(20);
    doc.setFont('Helvetica', 'bold');
    doc.text(`Histórico de ${clientData.name}`, margin, yPosition);
    yPosition += 10;

    // Client info
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');

    const clientInfo = [];
    if (clientData.phone) clientInfo.push(`Telefone: ${clientData.phone}`);
    if (clientData.email) clientInfo.push(`Email: ${clientData.email}`);
    if (clientData.birth_date)
        clientInfo.push(
            `Data de Nascimento: ${new Date(clientData.birth_date).toLocaleDateString('pt-BR')}`
        );
    if (clientData.address) clientInfo.push(`Endereço: ${clientData.address}`);

    clientInfo.forEach(info => {
        checkPageBreak(5);
        doc.text(info, margin, yPosition);
        yPosition += 5;
    });

    yPosition += 5;

    // Entries
    if (clientData.entries.length > 0) {
        doc.setFontSize(14);
        doc.setFont('Helvetica', 'bold');
        checkPageBreak(10);
        doc.text('Visitas:', margin, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont('Helvetica', 'normal');

        clientData.entries.forEach((entry, index) => {
            checkPageBreak(25);

            // Entry number and date
            doc.setFont('Helvetica', 'bold');
            const entryDate = new Date(entry.date).toLocaleDateString('pt-BR');
            doc.text(`${index + 1}. ${entryDate}`, margin, yPosition);
            yPosition += 5;

            // Title
            if (entry.title) {
                doc.setFont('Helvetica', 'bold');
                doc.text('Título:', margin, yPosition);
                yPosition += 4;
                doc.setFont('Helvetica', 'normal');
                const titleLines = doc.splitTextToSize(
                    entry.title,
                    pageWidth - 2 * margin
                );
                doc.text(titleLines, margin + 2, yPosition);
                yPosition += titleLines.length * 4 + 2;
            }

            // Description
            if (entry.description) {
                doc.setFont('Helvetica', 'bold');
                doc.text('Descrição:', margin, yPosition);
                yPosition += 4;
                doc.setFont('Helvetica', 'normal');
                const descLines = doc.splitTextToSize(
                    entry.description,
                    pageWidth - 2 * margin
                );
                doc.text(descLines, margin + 2, yPosition);
                yPosition += descLines.length * 4 + 2;
            }

            // Mood
            if (entry.mood) {
                doc.setFont('Helvetica', 'bold');
                doc.text('Humor/Observações:', margin, yPosition);
                yPosition += 4;
                doc.setFont('Helvetica', 'normal');
                const moodLines = doc.splitTextToSize(
                    entry.mood,
                    pageWidth - 2 * margin
                );
                doc.text(moodLines, margin + 2, yPosition);
                yPosition += moodLines.length * 4 + 2;
            }

            yPosition += 3;
        });
    } else {
        doc.setFontSize(10);
        doc.setFont('Helvetica', 'italic');
        checkPageBreak(5);
        doc.text('Nenhuma visita registrada', margin, yPosition);
        yPosition += 5;
    }

    // Footer with generation date
    doc.setFontSize(8);
    doc.setFont('Helvetica', 'italic');
    doc.setTextColor(150);
    const generatedDate = new Date().toLocaleDateString('pt-BR');
    doc.text(
        `Gerado em: ${generatedDate}`,
        margin,
        pageHeight - margin
    );

    // Download PDF
    const filename = `${clientData.name.replace(/\s+/g, '_')}_historico.pdf`;
    doc.save(filename);
};
