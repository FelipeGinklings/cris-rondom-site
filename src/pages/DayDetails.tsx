import {
    ArrowLeft,
    Calendar as CalendarIcon,
    Clock,
    Edit2,
    Smile,
    Trash2,
    Plus,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import colors from '../constants/colors';
import ConfirmDialog from '../components/PopUp';
import { DayEntry, supabase } from '../lib/supabase';
import useNavigation from '../hooks/useNavigation';
import AddConsultationDialog from '../components/AddConsultationDialog';

export default function DayDetails() {
    const params = useParams();
    const date = params.date as string;
    const [entries, setEntries] = useState<DayEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({
        name: '',
        phone: '',
        notas: '',
        service: '',
    });
    const [entryToDelete, setEntryToDelete] = useState<DayEntry | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const { navigate } = useNavigation();
    const [isAddConsultationOpen, setIsAddConsultationOpen] = useState(false);

    const loadEntries = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase
            .from('day_entries')
            .select('*')
            .eq('date', date)
            .order('created_at', { ascending: false });

        setEntries(data || []);
        setLoading(false);
    }, [date]);

    const handleEdit = (entry: DayEntry) => {
        setEditingId(entry.id);
        setEditForm({
            name: entry.name,
            phone: entry.phone,
            notas: entry.notas,
            service: entry.service,
        });
    };

    const handleSaveEdit = async (id: string) => {
        const { error } = await supabase
            .from('day_entries')
                .update({
                name: editForm.name,
                phone: editForm.phone,
                notas: editForm.notas,
                service: editForm.service,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id);

        if (!error) {
            setEditingId(null);
            loadEntries();
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({ name: '', phone: '', notas: '', service: '' });
    };

    const handleDelete = async (entry: DayEntry) => {
        try {
            const { error } = await supabase
                .from('day_entries')
                .delete()
                .eq('id', entry.id);

            if (error) throw error;
            await loadEntries();
        } catch (error) {
            console.error('Erro ao excluir entrada:', error);
            alert('Erro ao excluir entrada. Tente novamente.');
        }
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const navigateBackToCalendarHandler = () => {
        navigate('/calendar');
    };

    useEffect(() => {
        loadEntries();
    }, [date, loadEntries]);

    return (
        <div
            className="min-h-screen p-8"
            style={{
                background: colors.gradiente.suave,
            }}
        >
            <AddConsultationDialog
                isOpen={isAddConsultationOpen}
                onClose={() => setIsAddConsultationOpen(false)}
                onSuccess={loadEntries}
                initialDate={date}
            />
            {entryToDelete && (
                <ConfirmDialog
                    isVisible={showConfirmDialog}
                    title="Excluir entrada?"
                    message={`Tem certeza que deseja excluir "${
                        entryToDelete.name || 'essa entrada'
                    }"?`}
                    onConfirm={() => {
                        handleDelete(entryToDelete);
                        setEntryToDelete(null);
                        setShowConfirmDialog(false);
                    }}
                    onCancel={() => {
                        setEntryToDelete(null);
                        setShowConfirmDialog(false);
                    }}
                />
            )}
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={navigateBackToCalendarHandler}
                        className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        <span className="text-lg font-semibold">
                            Voltar para o Calendário
                        </span>
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsAddConsultationOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                            style={{
                                backgroundColor: colors.texto.claro,
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            <Plus className="w-5 h-5" />
                            Agendar Consulta
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-2xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <CalendarIcon
                            className="w-8 h-8"
                            style={{
                                color: colors.tonsEscuros.escuro,
                            }}
                        />
                        <h1
                            className="text-3xl font-bold"
                            style={{
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            {formatDate(date)}
                        </h1>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-500">
                            Carregando...
                        </div>
                    ) : entries.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                Sem entradas para esse dia ainda.
                            </p>
                            <p className="text-gray-400 mt-2">
                                Aperte o botão + para adicionar uma!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {entries.map(entry => (
                                <div
                                    key={entry.id}
                                    className="border-l-4 pl-6 py-4 relative"
                                    style={{
                                        borderColor: colors.tonsEscuros.escuro,
                                    }}
                                >
                                    {editingId === entry.id ? (
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                value={editForm.name}
                                                onChange={e =>
                                                    setEditForm({
                                                        ...editForm,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="Nome"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                                style={
                                                    {
                                                        '--tw-ring-color':
                                                            colors.background
                                                                .terciario,
                                                        borderColor:
                                                            colors.background
                                                                .terciario,
                                                    } as never
                                                }
                                            />
                                            <input
                                                type="text"
                                                value={editForm.phone}
                                                onChange={e =>
                                                    setEditForm({
                                                        ...editForm,
                                                        phone: e.target.value,
                                                    })
                                                }
                                                placeholder="Telefone"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                                style={
                                                    {
                                                        '--tw-ring-color':
                                                            colors.background
                                                                .terciario,
                                                        borderColor:
                                                            colors.background
                                                                .terciario,
                                                    } as never
                                                }
                                            />
                                            <select
                                                value={editForm.service}
                                                onChange={e =>
                                                    setEditForm({
                                                        ...editForm,
                                                        service: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                                style={
                                                    {
                                                        '--tw-ring-color':
                                                            colors.background
                                                                .terciario,
                                                        borderColor:
                                                            colors.background
                                                                .terciario,
                                                    } as never
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
                                            <textarea
                                                value={editForm.notas}
                                                onChange={e =>
                                                    setEditForm({
                                                        ...editForm,
                                                        notas:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="Notas"
                                                rows={4}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none"
                                                style={
                                                    {
                                                        '--tw-ring-color':
                                                            colors.background
                                                                .terciario,
                                                        borderColor:
                                                            colors.background
                                                                .terciario,
                                                    } as never
                                                }
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleSaveEdit(entry.id)
                                                    }
                                                    className="px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90"
                                                    style={{
                                                        backgroundColor:
                                                            colors.tonsEscuros
                                                                .escuro,
                                                    }}
                                                >
                                                    Salvar
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="px-4 py-2 rounded-lg border-2 font-semibold hover:bg-gray-50"
                                                    style={{
                                                        borderColor:
                                                            colors.background
                                                                .terciario,
                                                        color: colors
                                                            .tonsEscuros.escuro,
                                                    }}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Verificar se é uma consulta ou nota */}
                                            {entry.client_id ? (
                                                // Layout para Consulta
                                                <div className="bg-blue-50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div>
                                                            <h2
                                                                className="text-2xl font-semibold"
                                                                style={{
                                                                    color: colors
                                                                        .tonsEscuros
                                                                        .escuro,
                                                                }}
                                                            >
                                                                {entry.title ||
                                                                    'Consulta sem Título'}
                                                            </h2>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                💙 Consulta Agendada
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        entry
                                                                    )
                                                                }
                                                                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                                                                style={{
                                                                    color: colors
                                                                        .background
                                                                        .terciario,
                                                                }}
                                                            >
                                                                <Edit2 className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setEntryToDelete(
                                                                        entry
                                                                    );
                                                                    setShowConfirmDialog(
                                                                        true
                                                                    );
                                                                }}
                                                                className="p-2 rounded-lg hover:bg-red-100 transition-colors text-red-600"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                                        {entry.client_name && (
                                                            <div className="font-medium">
                                                                <span className="text-gray-600">
                                                                    Cliente:{' '}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        color: colors
                                                                            .tonsEscuros
                                                                            .escuro,
                                                                    }}
                                                                >
                                                                    {
                                                                        entry.client_name
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {entry.procedure && (
                                                            <div className="font-medium">
                                                                <span className="text-gray-600">
                                                                    Procedimento:{' '}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        color: colors
                                                                            .tonsEscuros
                                                                            .escuro,
                                                                    }}
                                                                >
                                                                    {
                                                                        entry.procedure
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {entry.consultation_type && (
                                                            <div className="font-medium">
                                                                <span className="text-gray-600">
                                                                    Tipo:{' '}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        color: colors
                                                                            .tonsEscuros
                                                                            .escuro,
                                                                    }}
                                                                >
                                                                    {
                                                                        entry.consultation_type
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {entry.start_time &&
                                                            entry.end_time && (
                                                                <div className="font-medium">
                                                                    <span className="text-gray-600">
                                                                        Horário:{' '}
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            color: colors
                                                                                .tonsEscuros
                                                                                .escuro,
                                                                        }}
                                                                    >
                                                                        {formatTime(
                                                                            entry.start_time
                                                                        )}{' '}
                                                                        -{' '}
                                                                        {formatTime(
                                                                            entry.end_time
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        {entry.address && (
                                                            <div className="col-span-2 font-medium">
                                                                <span className="text-gray-600">
                                                                    Endereço:{' '}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        color: colors
                                                                            .tonsEscuros
                                                                            .escuro,
                                                                    }}
                                                                >
                                                                    {entry.address}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {entry.description && (
                                                        <div className="mt-4 pt-4 border-t border-blue-200">
                                                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                                {entry.description}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                // Layout para Nota
                                                <>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h2
                                                            className="text-2xl font-semibold"
                                                            style={{
                                                                color: colors
                                                                    .tonsEscuros
                                                                    .escuro,
                                                            }}
                                                        >
                                                            {entry.title ||
                                                                'Entrada sem Título'}
                                                        </h2>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                                <Clock className="w-4 h-4" />
                                                                {formatTime(
                                                                    entry.created_at
                                                                )}
                                                            </div>
                                                            <button
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        entry
                                                                    )
                                                                }
                                                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                                style={{
                                                                    color: colors
                                                                        .background
                                                                        .terciario,
                                                                }}
                                                            >
                                                                <Edit2 className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setEntryToDelete(
                                                                        entry
                                                                    );
                                                                    setShowConfirmDialog(
                                                                        true
                                                                    );
                                                                }}
                                                                className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {entry.mood && (
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Smile
                                                                className="w-5 h-5"
                                                                style={{
                                                                    color: colors
                                                                        .background
                                                                        .terciario,
                                                                }}
                                                            />
                                                            <span className="text-gray-700 font-medium">
                                                                Mood:{' '}
                                                                {entry.mood}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {entry.description && (
                                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                            {entry.description}
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
