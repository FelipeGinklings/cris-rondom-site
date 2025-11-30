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

// Função auxiliar para converter HEX para RGB (para o jsPDF)
const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
};

const addSectionTitle = (
    doc: jsPDF,
    title: string,
    yPosition: number,
    margin: number,
    pageHeight: number
): number => {
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

const addFieldContent = (
    doc: jsPDF,
    content: string | undefined,
    yPosition: number,
    margin: number,
    contentWidth: number
): number => {
    if (!content || content.trim() === '') {
        return yPosition;
    }

    const lines = doc.splitTextToSize(content, contentWidth - 10);
    doc.setFontSize(9);
    doc.setFont('Helvetica', 'normal');
    doc.text(lines, margin + 10, yPosition);

    return yPosition + lines.length * 4 + 3;
};

export const generateClientPDF = async (clientData: ClientPDFData) => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    // Configurações Globais
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    const primaryColor = hexToRgb(colors.tonsEscuros.escuro || '#000000');

    let yPosition = 0;

    // --- CABEÇALHO ---
    // Fundo colorido do cabeçalho
    doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.rect(0, 0, pageWidth, 35, 'F');

    // Título Principal (Branco)
    doc.setFontSize(22);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Ficha do Cliente', margin, 22);

    // Data de Geração (Canto direito, menor)
    doc.setFontSize(9);
    doc.setFont('Helvetica', 'normal');
    doc.text(
        `Gerado em: ${new Date().toLocaleDateString('pt-BR')}`,
        pageWidth - margin,
        22,
        { align: 'right' }
    );

    yPosition = 50;

    // INFORMAÇÕES DO CLIENTE
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Informações do Cliente', margin, yPosition);
    yPosition += 10;
    doc.setTextColor(0, 0, 0);

    const clientInfo = [
        { label: 'Nome:', value: clientData.name },
        { label: 'Telefone:', value: clientData.phone || 'N/A' },
        { label: 'Email:', value: clientData.email || 'N/A' },
        {
            label: 'Data de Nascimento:',
            value: clientData.birth_date
                ? new Date(clientData.birth_date).toLocaleDateString('pt-BR')
                : 'N/A',
        },
        { label: 'Endereço:', value: clientData.address || 'N/A' },
        {
            label: 'Total de Visitas:',
            value: clientData.total_entries.toString(),
        },
        {
            label: 'Última Visita:',
            value: clientData.last_entry_date
                ? new Date(clientData.last_entry_date).toLocaleDateString(
                      'pt-BR'
                  )
                : 'N/A',
        },
    ];

    clientInfo.forEach(info => {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFontSize(9);
        doc.setFont('Helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text(info.label.toUpperCase(), margin, yPosition);

        doc.setFontSize(11);
        doc.setFont('Helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        const textX = margin + 43;
        const wrappedText = doc.splitTextToSize(info.value, contentWidth - 40);
        doc.text(wrappedText, textX, yPosition);

        yPosition += wrappedText.length * 4 + 8;
    });

    // Linha divisória suave
    doc.setDrawColor(230, 230, 230);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    // SEÇÃO DE ANAMNESES
    if (clientData.anamnesis && clientData.anamnesis.length > 0) {
        // Título da Seção
        doc.setFontSize(14);
        doc.setFont('Helvetica', 'bold');
        doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
        doc.text('Acompanhamento de sessões', margin, yPosition);
        yPosition += 15;

        clientData.anamnesis.forEach((anamnesis, index) => {
            // Verifica quebra de página antes de começar um novo bloco
            if (yPosition > pageHeight - 50) {
                doc.addPage();
                yPosition = 20;
            }

            // CABEÇALHO DA ANAMNESE
            // Fundo cinza claro para o título da anamnese
            doc.setFillColor(248, 248, 248);
            doc.rect(margin, yPosition, contentWidth, 12, 'F');

            // Barra lateral colorida
            doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
            doc.rect(margin, yPosition, 2, 12, 'F');

            // Título e Data no cabeçalho cinza
            doc.setFontSize(11);
            doc.setFont('Helvetica', 'bold');
            doc.setTextColor(50, 50, 50);
            doc.text(`${anamnesis.title}`, margin + 5, yPosition + 8);

            const anamnesisDate = new Date(
                anamnesis.created_at
            ).toLocaleDateString('pt-BR');
            doc.setFontSize(9);
            doc.setFont('Helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text(anamnesisDate, pageWidth - margin - 5, yPosition + 8, {
                align: 'right',
            });

            yPosition += 20;

            // Campos da Anamnese usando as funções auxiliares
            if (anamnesis.chief_complaint) {
                yPosition = addSectionTitle(
                    doc,
                    'Queixa Principal',
                    yPosition,
                    margin,
                    pageHeight
                );
                yPosition = addFieldContent(
                    doc,
                    anamnesis.chief_complaint,
                    yPosition,
                    margin,
                    contentWidth
                );
            }

            if (anamnesis.medical_history) {
                yPosition = addSectionTitle(
                    doc,
                    'Histórico de Doenças e Lesões',
                    yPosition,
                    margin,
                    pageHeight
                );
                yPosition = addFieldContent(
                    doc,
                    anamnesis.medical_history,
                    yPosition,
                    margin,
                    contentWidth
                );
            }

            if (anamnesis.current_medical_treatment) {
                yPosition = addSectionTitle(
                    doc,
                    'Tratamento Médico Atual',
                    yPosition,
                    margin,
                    pageHeight
                );
                yPosition = addFieldContent(
                    doc,
                    anamnesis.current_medical_treatment,
                    yPosition,
                    margin,
                    contentWidth
                );
            }

            if (anamnesis.previous_procedures) {
                yPosition = addSectionTitle(
                    doc,
                    'Procedimentos Anteriores',
                    yPosition,
                    margin,
                    pageHeight
                );
                yPosition = addFieldContent(
                    doc,
                    anamnesis.previous_procedures,
                    yPosition,
                    margin,
                    contentWidth
                );
            }

            if (anamnesis.medications) {
                yPosition = addSectionTitle(
                    doc,
                    'Medicamentos',
                    yPosition,
                    margin,
                    pageHeight
                );
                yPosition = addFieldContent(
                    doc,
                    anamnesis.medications,
                    yPosition,
                    margin,
                    contentWidth
                );
            }

            if (anamnesis.recent_symptoms) {
                yPosition = addSectionTitle(
                    doc,
                    'Sintomas Recentes',
                    yPosition,
                    margin,
                    pageHeight
                );
                yPosition = addFieldContent(
                    doc,
                    anamnesis.recent_symptoms,
                    yPosition,
                    margin,
                    contentWidth
                );
            }

            if (anamnesis.pain_location) {
                yPosition = addSectionTitle(
                    doc,
                    'Região com Dor/Desconforto',
                    yPosition,
                    margin,
                    pageHeight
                );
                yPosition = addFieldContent(
                    doc,
                    anamnesis.pain_location,
                    yPosition,
                    margin,
                    contentWidth
                );
            }

            if (anamnesis.additional_observations) {
                yPosition = addSectionTitle(
                    doc,
                    'Observações Adicionais',
                    yPosition,
                    margin,
                    pageHeight
                );
                yPosition = addFieldContent(
                    doc,
                    anamnesis.additional_observations,
                    yPosition,
                    margin,
                    contentWidth
                );
            }

            yPosition += 10; // Espaço extra entre anamneses
        });
    }

    // RODAPÉ
    const pageCount = (doc as any).internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);

        // Linha fina no rodapé
        doc.setDrawColor(240, 240, 240);
        doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

        doc.text(
            `Página ${i} de ${pageCount} - ${clientData.name}`,
            pageWidth / 2,
            pageHeight - 8,
            { align: 'center' }
        );
    }

    // Salvar PDF
    doc.save(`ficha_${clientData.name.replace(/\s+/g, '_').toLowerCase()}.pdf`);
};
