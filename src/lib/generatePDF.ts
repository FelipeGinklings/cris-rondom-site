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
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth - margin, 22, { align: 'right' });

    yPosition = 50;

    // INFORMAÇÕES DO CLIENTE
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text('Informações do Cliente', margin, yPosition);
    yPosition += 10;
    doc.setTextColor(0, 0, 0);
    const col1X = margin;
    const col2X = pageWidth / 2 + 10;
    
    // Função auxiliar para desenhar campos
    const drawInfoField = (label: string, value: string, x: number, y: number) => {
        doc.setFontSize(9);
        doc.setFont('Helvetica', 'bold');
        doc.setTextColor(100, 100, 100); // Cinza para o label
        doc.text(label.toUpperCase(), x, y);
        
        doc.setFontSize(11);
        doc.setFont('Helvetica', 'normal');
        doc.setTextColor(0, 0, 0); // Preto para o valor
        const valueLines = doc.splitTextToSize(value || '-', (pageWidth / 2) - margin - 10);
        doc.text(valueLines, x, y + 5);
        
        return y + 5 + (valueLines.length * 5); // Retorna nova posição Y
    };

    // Coluna 1
    let yCol1 = yPosition;
    yCol1 = drawInfoField('Nome Completo', clientData.name, col1X, yCol1) + 8;
    yCol1 = drawInfoField('Data de Nascimento', clientData.birth_date ? new Date(clientData.birth_date).toLocaleDateString('pt-BR') : 'N/A', col1X, yCol1) + 8;
    yCol1 = drawInfoField('Endereço', clientData.address || 'N/A', col1X, yCol1) + 8;

    // Coluna 2
    let yCol2 = yPosition;
    yCol2 = drawInfoField('Telefone', clientData.phone || 'N/A', col2X, yCol2) + 8;
    yCol2 = drawInfoField('Email', clientData.email || 'N/A', col2X, yCol2) + 8;
    
    // Stats rápidos na Coluna 2
    doc.setFontSize(9);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text('RESUMO', col2X, yCol2);
    yCol2 += 5;
    
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(`Total de Visitas: ${clientData.total_entries}`, col2X, yCol2);
    doc.text(`Última Visita: ${clientData.last_entry_date ? new Date(clientData.last_entry_date).toLocaleDateString('pt-BR') : '-'}`, col2X + 40, yCol2);

    // Atualiza yPosition para o maior valor entre as colunas + margem
    yPosition = Math.max(yCol1, yCol2) + 15;

    // Linha divisória suave
    doc.setDrawColor(230, 230, 230);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // SEÇÃO DE ANAMNESES
    if (clientData.anamnesis && clientData.anamnesis.length > 0) {
        
        // Título da Seção
        doc.setFontSize(14);
        doc.setFont('Helvetica', 'bold');
        doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
        doc.text('Acompanhamento de sessões', margin, yPosition);
        yPosition += 10;
        

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

            const anamnesisDate = new Date(anamnesis.created_at).toLocaleDateString('pt-BR');
            doc.setFontSize(9);
            doc.setFont('Helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text(anamnesisDate, pageWidth - margin - 5, yPosition + 8, { align: 'right' });

            yPosition += 20;

            // Função para desenhar campos internos da anamnese
            const addAnamnesisField = (title: string, content?: string) => {
                if (!content || content.trim() === '') return;

                // Verifica quebra de página
                if (yPosition > pageHeight - 20) {
                    doc.addPage();
                    yPosition = 20;
                }

                // Título do campo
                doc.setFontSize(9);
                doc.setFont('Helvetica', 'bold');
                doc.setTextColor(80, 80, 80);
                doc.text(title, margin + 5, yPosition);
                yPosition += 5;

                // Conteúdo do campo
                doc.setFontSize(10);
                doc.setFont('Helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                const lines = doc.splitTextToSize(content, contentWidth - 10);
                doc.text(lines, margin + 5, yPosition);
                
                yPosition += (lines.length * 5) + 6; // Espaço após o campo
            };

            // Campos da Anamnese
            addAnamnesisField('Queixa Principal', anamnesis.chief_complaint);
            addAnamnesisField('Histórico de Doenças e Lesões', anamnesis.medical_history);
            addAnamnesisField('Tratamento Médico Atual', anamnesis.current_medical_treatment);
            addAnamnesisField('Procedimentos Anteriores', anamnesis.previous_procedures);
            addAnamnesisField('Medicamentos', anamnesis.medications);
            addAnamnesisField('Sintomas Recentes', anamnesis.recent_symptoms);
            addAnamnesisField('Região da Dor', anamnesis.pain_location);
            addAnamnesisField('Observações Adicionais', anamnesis.additional_observations);

            yPosition += 5; // Espaço extra entre anamneses
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