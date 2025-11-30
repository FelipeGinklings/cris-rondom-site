import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { supabase, Anamnesis } from '../lib/supabase';
import colors from '../constants/colors';
import ConfirmDialog from './PopUp';
import AddAnamnesisDialog from './AddAnamnesisDialog';

interface ViewAnamnesisDialogProps {
    isOpen: boolean;
    onClose: () => void;
    clientId: string;
    clientName: string;
}

export default function ViewAnamnesisDialog({
    isOpen,
    onClose,
    clientId,
    clientName,
}: ViewAnamnesisDialogProps) {
    const [anamnesis, setAnamnesis] = useState<Anamnesis[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [anamnesisToDelete, setAnamnesisToDelete] = useState<Anamnesis | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadAnamnesis();
        }
    }, [isOpen, clientId]);

    useEffect(() => {
        // Recarregar anamneses quando o dialog de adicionar fecha
        if (isOpen && !isAddDialogOpen) {
            loadAnamnesis();
        }
    }, [isAddDialogOpen]);

    const loadAnamnesis = async () => {
        try {
            setLoading(true);
            console.log('Carregando anamneses para clientId:', clientId);
            const { data, error } = await supabase
                .from('anamnesis')
                .select('*')
                .eq('client_id', clientId)
                .order('created_at', { ascending: false });

            console.log('Dados retornados:', data);
            console.log('Erro na query:', error);

            setAnamnesis(data || []);
        } catch (error) {
            console.error('Erro ao carregar anamneses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (item: Anamnesis) => {
        try {
            const { error } = await supabase
                .from('anamnesis')
                .delete()
                .eq('id', item.id);

            if (error) throw error;
            await loadAnamnesis();
        } catch (error) {
            console.error('Erro ao excluir anamnese:', error);
            alert('Erro ao excluir anamnese. Tente novamente.');
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (!isOpen) return null;

    return (
        <>
            <AddAnamnesisDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onSuccess={loadAnamnesis}
                clientId={clientId}
                clientName={clientName}
            />

            {anamnesisToDelete && (
                <ConfirmDialog
                    isVisible={showConfirmDialog}
                    title="Excluir anamnese?"
                    message={`Tem certeza que deseja excluir "${anamnesisToDelete.title}"?`}
                    onConfirm={() => {
                        handleDelete(anamnesisToDelete);
                        setAnamnesisToDelete(null);
                        setShowConfirmDialog(false);
                    }}
                    onCancel={() => {
                        setAnamnesisToDelete(null);
                        setShowConfirmDialog(false);
                    }}
                />
            )}

            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                        <h2
                            className="text-2xl font-bold"
                            style={{
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            Anamneses - {clientName}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6">
                        <button
                            onClick={() => setIsAddDialogOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity mb-6"
                            style={{
                                backgroundColor: colors.texto.claro,
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            <Plus className="w-5 h-5" />
                            Adicionar Anamnese
                        </button>

                        {loading ? (
                            <div className="text-center py-12 text-gray-500">
                                Carregando...
                            </div>
                        ) : anamnesis.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    Nenhuma anamnese adicionada ainda.
                                </p>
                                <p className="text-gray-400 mt-2">
                                    Clique em "Adicionar Anamnese" para começar.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {anamnesis.map(item => (
                                    <div
                                        key={item.id}
                                        className="border-l-4 pl-6 py-4 hover:shadow-md transition-shadow bg-gray-50 rounded-r-lg p-4"
                                        style={{
                                            borderColor:
                                                colors.tonsEscuros.escuro,
                                        }}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3
                                                    className="text-xl font-semibold"
                                                    style={{
                                                        color: colors
                                                            .tonsEscuros.escuro,
                                                    }}
                                                >
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {formatDate(item.created_at)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setAnamnesisToDelete(item);
                                                    setShowConfirmDialog(true);
                                                }}
                                                className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-600 ml-2"
                                                title="Excluir anamnese"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Display all anamnesis fields */}
                                        <div className="space-y-3 mt-4">
                                            {item.chief_complaint && (
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        Queixa Principal:
                                                    </p>
                                                    <p className="text-gray-600 whitespace-pre-wrap">
                                                        {item.chief_complaint}
                                                    </p>
                                                </div>
                                            )}

                                            {item.medical_history && (
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        Histórico de Doenças e Lesões:
                                                    </p>
                                                    <p className="text-gray-600 whitespace-pre-wrap">
                                                        {item.medical_history}
                                                    </p>
                                                </div>
                                            )}

                                            {item.current_medical_treatment && (
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        Tratamento Médico Atual:
                                                    </p>
                                                    <p className="text-gray-600 whitespace-pre-wrap">
                                                        {item.current_medical_treatment}
                                                    </p>
                                                </div>
                                            )}

                                            {item.previous_procedures && (
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        Procedimentos Anteriores:
                                                    </p>
                                                    <p className="text-gray-600 whitespace-pre-wrap">
                                                        {item.previous_procedures}
                                                    </p>
                                                </div>
                                            )}

                                            {item.medications && (
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        Medicamentos:
                                                    </p>
                                                    <p className="text-gray-600 whitespace-pre-wrap">
                                                        {item.medications}
                                                    </p>
                                                </div>
                                            )}

                                            {item.recent_symptoms && (
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        Sintomas Recentes:
                                                    </p>
                                                    <p className="text-gray-600 whitespace-pre-wrap">
                                                        {item.recent_symptoms}
                                                    </p>
                                                </div>
                                            )}

                                            {item.pain_location && (
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        Região com Dor/Desconforto:
                                                    </p>
                                                    <p className="text-gray-600 whitespace-pre-wrap">
                                                        {item.pain_location}
                                                    </p>
                                                </div>
                                            )}

                                            {item.additional_observations && (
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        Observações Adicionais:
                                                    </p>
                                                    <p className="text-gray-600 whitespace-pre-wrap">
                                                        {item.additional_observations}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
