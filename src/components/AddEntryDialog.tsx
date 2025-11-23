import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import colors from '../constants/colors';
import { useAuth } from '../hooks/useAuth';

interface AddEntryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialDate?: string;
}

export default function AddEntryDialog({
    isOpen,
    onClose,
    onSuccess,
    initialDate,
}: AddEntryDialogProps) {
    const { user } = useAuth();
    const [date, setDate] = useState(
        initialDate || new Date().toISOString().split('T')[0]
    );
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [notas, setNotas] = useState('');
    const [service, setService] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr + "T00:00:00");

        const dia = String(d.getDate()).padStart(2, "0");
        const mes = String(d.getMonth() + 1).padStart(2, "0");
        const ano = d.getFullYear();

        return `${dia}/${mes}/${ano}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error: insertError } = await supabase
                .from('day_entries')
                .insert([
                            {
                                user_id: user?.id,
                                date,
                                name,
                                phone,
                                notas,
                                service,
                            },
                        ]);

            if (insertError) throw insertError;

            setName('');
            setPhone('');
            setNotas('');
            setService('');
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to create entry');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <h2
                        className="text-2xl font-bold"
                        style={{
                            color: colors.tonsEscuros.escuro,
                        }}
                    >
                        Adicionar nova entrada em {formatDate(date)}
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
                    <div>
                        <label
                            htmlFor="date"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Data <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
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

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Nome
                        </label>
                        <input
                            id="name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Insira o nome da pessoa..."
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

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Telefone
                        </label>
                        <input
                            id="phone"
                                type="text"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder="Insira o telefone da cliente..."
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

                    <div>
                        <label
                            htmlFor="service"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Serviço
                        </label>
                        <select
                            id="service"
                                value={service}
                                onChange={e => setService(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                            style={
                                {
                                    '--tw-ring-color':
                                        colors.background.terciario,
                                    borderColor: colors.background.terciario,
                                } as any
                            }
                        >
                            <option value="">Escolha um serviço...</option>
                            <option value="Drenagem linfática">Drenagem linfática</option>
                            <option value="Pedras quentes">Pedras quentes</option>
                            <option value="Velas terapêuticas">Velas terapêuticas</option>
                            <option value="Relaxante">Relaxante</option>
                            <option value="Ventosa">Ventosa</option>
                            <option value="Massagem">Massagem</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="notas"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Notas
                        </label>
                        <textarea
                            id="notas"
                            value={notas}
                            onChange={e => setNotas(e.target.value)}
                            placeholder="Notas adicionais da cliente..."
                            rows={6}
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
                            {loading ? 'Salvando...' : 'Salvar Entrada'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function FloatingActionButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40"
            style={{
                backgroundColor: colors.tonsEscuros.escuro,
            }}
        >
            <Plus className="w-8 h-8 text-white" />
        </button>
    );
}
