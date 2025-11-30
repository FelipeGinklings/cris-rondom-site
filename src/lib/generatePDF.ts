import jsPDF from 'jspdf';
import colors from '../constants/colors';

interface ClientPDFData {
    name: string;
    phone?: string;
    email?: string;
    birth_date?: string;
    address?: string;
    total_entries: number;
    last_entry_date?: string;
    anamnesis: Array<{
        id: string;
        title: string;
        description?: string;
        chief_complaint?: string;
        medical_history?: string;
        current_medical_treatment?: string;
        previous_procedures?: string;
        medications?: string;
        recent_symptoms?: string;
        pain_location?: string;
        additional_observations?: string;
        created_at: string;
    }>;
}

const addSectionTitle = (doc: jsPDF, title: string, yPosition: number, margin: number, pageHeight: number): number => {
    if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
    }

    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`${title}:`, margin + 5, yPosition);
    return yPosition + 6;
};

const addFieldContent = (doc: jsPDF, content: string | undefined, yPosition: number, margin: number, contentWidth: number): number => {
    if (!content || content.trim() === '') {
        return yPosition;
    }

    const lines = doc.splitTextToSize(content, contentWidth - 10);
    doc.setFontSize(9);
    doc.setFont('Helvetica', 'normal');
    doc.text(lines, margin + 10, yPosition);
    
    return yPosition + (lines.length * 4) + 3;
};

export const generateClientPDF = async (clientData: ClientPDFData) => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título
    doc.setFontSize(24);
    doc.setTextColor(colors.tonsEscuros.escuro.substring(1));
    doc.text('Ficha do Cliente', margin, yPosition);

    yPosition += 15;

    // Informações do Cliente
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const clientInfo = [
        { label: 'Nome:', value: clientData.name },
        { label: 'Telefone:', value: clientData.phone || 'N/A' },
        { label: 'Email:', value: clientData.email || 'N/A' },
        { label: 'Data de Nascimento:', value: clientData.birth_date ? new Date(clientData.birth_date).toLocaleDateString('pt-BR') : 'N/A' },
        { label: 'Endereço:', value: clientData.address || 'N/A' },
        { label: 'Total de Visitas:', value: clientData.total_entries.toString() },
        { label: 'Última Visita:', value: clientData.last_entry_date ? new Date(clientData.last_entry_date).toLocaleDateString('pt-BR') : 'N/A' },
    ];

    clientInfo.forEach(info => {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFont('Helvetica', 'bold');
        doc.text(info.label, margin, yPosition);

        doc.setFont('Helvetica', 'normal');
        const textX = margin + 43;
        const wrappedText = doc.splitTextToSize(info.value, contentWidth - 40);
        doc.text(wrappedText, textX, yPosition);

        yPosition += 8;
    });

    // Seção de Anamneses
    if (clientData.anamnesis && clientData.anamnesis.length > 0) {
        yPosition += 10;

        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setFont('Helvetica', 'bold');
        doc.text('Anamneses', margin, yPosition);
        yPosition += 12;

        clientData.anamnesis.forEach((anamnesis, index) => {
            if (yPosition > pageHeight - 30) {
                doc.addPage();
                yPosition = 20;
            }

            // Número da anamnese
            doc.setFontSize(11);
            doc.setFont('Helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(`Anamnese ${index + 1}: ${anamnesis.title}`, margin, yPosition);
            yPosition += 7;

            // Data
            doc.setFontSize(9);
            doc.setFont('Helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            const anamnesisDate = new Date(anamnesis.created_at).toLocaleDateString('pt-BR');
            doc.text(`Data: ${anamnesisDate}`, margin + 5, yPosition);
            yPosition += 6;

            // Queixa Principal
            if (anamnesis.chief_complaint) {
                yPosition = addSectionTitle(doc, 'Queixa Principal', yPosition, margin, pageHeight);
                yPosition = addFieldContent(doc, anamnesis.chief_complaint, yPosition, margin, contentWidth);
            }

            // Histórico de Doenças e Lesões
            if (anamnesis.medical_history) {
                yPosition = addSectionTitle(doc, 'Histórico de Doenças e Lesões', yPosition, margin, pageHeight);
                yPosition = addFieldContent(doc, anamnesis.medical_history, yPosition, margin, contentWidth);
            }

            // Tratamento Médico Atual
            if (anamnesis.current_medical_treatment) {
                yPosition = addSectionTitle(doc, 'Tratamento Médico Atual', yPosition, margin, pageHeight);
                yPosition = addFieldContent(doc, anamnesis.current_medical_treatment, yPosition, margin, contentWidth);
            }

            // Procedimentos Anteriores
            if (anamnesis.previous_procedures) {
                yPosition = addSectionTitle(doc, 'Procedimentos Anteriores', yPosition, margin, pageHeight);
                yPosition = addFieldContent(doc, anamnesis.previous_procedures, yPosition, margin, contentWidth);
            }

            // Medicamentos
            if (anamnesis.medications) {
                yPosition = addSectionTitle(doc, 'Medicamentos', yPosition, margin, pageHeight);
                yPosition = addFieldContent(doc, anamnesis.medications, yPosition, margin, contentWidth);
            }

            // Sintomas Recentes
            if (anamnesis.recent_symptoms) {
                yPosition = addSectionTitle(doc, 'Sintomas Recentes', yPosition, margin, pageHeight);
                yPosition = addFieldContent(doc, anamnesis.recent_symptoms, yPosition, margin, contentWidth);
            }

            // Região com Dor/Desconforto
            if (anamnesis.pain_location) {
                yPosition = addSectionTitle(doc, 'Região com Dor/Desconforto', yPosition, margin, pageHeight);
                yPosition = addFieldContent(doc, anamnesis.pain_location, yPosition, margin, contentWidth);
            }

            // Observações Adicionais
            if (anamnesis.additional_observations) {
                yPosition = addSectionTitle(doc, 'Observações Adicionais', yPosition, margin, pageHeight);
                yPosition = addFieldContent(doc, anamnesis.additional_observations, yPosition, margin, contentWidth);
            }

            yPosition += 8;
        });
    }

    // Footer
    const footerY = pageHeight - 10;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    const pageCount = (doc as any).internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(
            `Página ${i} de ${pageCount}`,
            pageWidth / 2,
            footerY,
            { align: 'center' }
        );
    }

    // Salvar PDF
    doc.save(`ficha_cliente_${clientData.name.replace(/\s+/g, '_')}.pdf`);
};
