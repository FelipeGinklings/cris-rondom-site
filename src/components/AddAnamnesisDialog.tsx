import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import colors from '../constants/colors';
import { useAuth } from '../hooks/useAuth';

interface AddAnamnesisDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    clientId: string;
    clientName: string;
}

export default function AddAnamnesisDialog({
    isOpen,
    onClose,
    onSuccess,
    clientId,
    clientName,
}: AddAnamnesisDialogProps) {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [chiefComplaint, setChiefComplaint] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [currentMedicalTreatment, setCurrentMedicalTreatment] = useState('');
    const [previousProcedures, setPreviousProcedures] = useState('');
    const [medications, setMedications] = useState('');
    const [recentSymptoms, setRecentSymptoms] = useState('');
    const [painLocation, setPainLocation] = useState('');
    const [additionalObservations, setAdditionalObservations] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validar campos obrigatórios
        if (!title.trim()) {
            setError('Por favor, preencha o título da anamnese');
            return;
        }

        setLoading(true);

        try {
            console.log('Salvando anamnese para clientId:', clientId);
            console.log('Dados:', {
                user_id: user?.id,
                client_id: clientId,
                title: title.trim(),
                chief_complaint: chiefComplaint.trim(),
            });

            const { data, error: insertError } = await supabase
                .from('anamnesis')
                .insert([
                    {
                        user_id: user?.id,
                        client_id: clientId,
                        title: title.trim(),
                        description: '',
                        chief_complaint: chiefComplaint.trim(),
                        medical_history: medicalHistory.trim(),
                        current_medical_treatment: currentMedicalTreatment.trim(),
                        previous_procedures: previousProcedures.trim(),
                        medications: medications.trim(),
                        recent_symptoms: recentSymptoms.trim(),
                        pain_location: painLocation.trim(),
                        additional_observations: additionalObservations.trim(),
                    },
                ])
                .select();

            console.log('Resposta de inserção:', { data, insertError });

            if (insertError) throw insertError;

            // Limpar formulário
            setTitle('');
            setChiefComplaint('');
            setMedicalHistory('');
            setCurrentMedicalTreatment('');
            setPreviousProcedures('');
            setMedications('');
            setRecentSymptoms('');
            setPainLocation('');
            setAdditionalObservations('');

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Erro ao criar anamnese');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <h2
                        className="text-2xl font-bold"
                        style={{
                            color: colors.tonsEscuros.escuro,
                        }}
                    >
                        Adicionar Anamnese - {clientName}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {error && (
                    <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Título da Anamnese <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Ex: Avaliação Inicial, Acompanhamento, etc."
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                            style={
                                {
                                    '--tw-ring-color':
                                        colors.background.terciario,
                                    borderColor: colors.background.terciario,
                                } as any
                            }
                        />
                    </div>

                    {/* Chief Complaint */}
                    <div>
                        <label
                            htmlFor="chiefComplaint"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Queixa Principal
                        </label>
                        <textarea
                            id="chiefComplaint"
                            value={chiefComplaint}
                            onChange={e => setChiefComplaint(e.target.value)}
                            placeholder="Qual é o motivo principal da consulta?"
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none"
                            style={
                                {
                                    '--tw-ring-color':
                                        colors.background.terciario,
                                    borderColor: colors.background.terciario,
                                } as any
                            }
                        />
                    </div>

                    {/* Medical History */}
                    <div>
                        <label
                            htmlFor="medicalHistory"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Histórico de Doenças e Lesões
                        </label>
                        <textarea
                            id="medicalHistory"
                            value={medicalHistory}
                            onChange={e => setMedicalHistory(e.target.value)}
                            placeholder="Descreva qualquer doença ou lesão anterior..."
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none"
                            style={
                                {
                                    '--tw-ring-color':
                                        colors.background.terciario,
                                    borderColor: colors.background.terciario,
                                } as any
                            }
                        />
                    </div>

                    {/* Current Medical Treatment */}
                    <div>
                        <label
                            htmlFor="currentMedicalTreatment"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Está em Tratamento Médico no Momento?
                        </label>
                        <textarea
                            id="currentMedicalTreatment"
                            value={currentMedicalTreatment}
                            onChange={e => setCurrentMedicalTreatment(e.target.value)}
                            placeholder="Se sim, qual tratamento está realizando?"
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none"
                            style={
                                {
                                    '--tw-ring-color':
                                        colors.background.terciario,
                                    borderColor: colors.background.terciario,
                                } as any
                            }
                        />
                    </div>

                    {/* Previous Procedures */}
                    <div>
                        <label
                            htmlFor="previousProcedures"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Já Realizou Este Procedimento no Passado?
                        </label>
                        <textarea
                            id="previousProcedures"
                            value={previousProcedures}
                            onChange={e => setPreviousProcedures(e.target.value)}
                            placeholder="Se sim, com que frequência? Qual foi o resultado?"
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none"
                            style={
                                {
                                    '--tw-ring-color':
                                        colors.background.terciario,
                                    borderColor: colors.background.terciario,
                                } as any
                            }
                        />
                    </div>

                    {/* Medications */}
                    <div>
                        <label
                            htmlFor="medications"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Medicamentos Utilizados
                        </label>
                        <textarea
                            id="medications"
                            value={medications}
                            onChange={e => setMedications(e.target.value)}
                            placeholder="Quais medicamentos está tomando atualmente?"
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none"
                            style={
                                {
                                    '--tw-ring-color':
                                        colors.background.terciario,
                                    borderColor: colors.background.terciario,
                                } as any
                            }
                        />
                    </div>

                    {/* Recent Symptoms */}
                    <div>
                        <label
                            htmlFor="recentSymptoms"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Sintomas nos Últimos Dias/Meses
                        </label>
                        <textarea
                            id="recentSymptoms"
                            value={recentSymptoms}
                            onChange={e => setRecentSymptoms(e.target.value)}
                            placeholder="Descreva qualquer sintoma recente..."
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none"
                            style={
                                {
                                    '--tw-ring-color':
                                        colors.background.terciario,
                                    borderColor: colors.background.terciario,
                                } as any
                            }
                        />
                    </div>

                    {/* Pain Location */}
                    <div>
                        <label
                            htmlFor="painLocation"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Região com Dor ou Desconforto
                        </label>
                        <textarea
                            id="painLocation"
                            value={painLocation}
                            onChange={e => setPainLocation(e.target.value)}
                            placeholder="Qual região sente dor ou desconforto?"
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none"
                            style={
                                {
                                    '--tw-ring-color':
                                        colors.background.terciario,
                                    borderColor: colors.background.terciario,
                                } as any
                            }
                        />
                    </div>

                    {/* Additional Observations */}
                    <div>
                        <label
                            htmlFor="additionalObservations"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Observações Adicionais
                        </label>
                        <textarea
                            id="additionalObservations"
                            value={additionalObservations}
                            onChange={e => setAdditionalObservations(e.target.value)}
                            placeholder="Adicione qualquer outra informação relevante..."
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none"
                            style={
                                {
                                    '--tw-ring-color':
                                        colors.background.terciario,
                                    borderColor: colors.background.terciario,
                                } as any
                            }
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                            style={{
                                borderColor: colors.background.terciario,
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                            style={{
                                backgroundColor: colors.tonsEscuros.escuro,
                            }}
                        >
                            {loading ? 'Salvando...' : 'Salvar Anamnese'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
