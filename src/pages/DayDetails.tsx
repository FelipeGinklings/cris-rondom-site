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
import AddEntryDialog from "../components/AddEntryDialog";

export default function DayDetails() {
    const params = useParams();
    const date = params.date as string;
    const [entries, setEntries] = useState<DayEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        mood: '',
    });
    const [entryToDelete, setEntryToDelete] = useState<DayEntry | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const { navigate } = useNavigation();
    const [isAddOpen, setIsAddOpen] = useState(false);

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
            title: entry.title,
            description: entry.description,
            mood: entry.mood,
        });
    };

    const handleSaveEdit = async (id: string) => {
        const { error } = await supabase
            .from('day_entries')
            .update({
                title: editForm.title,
                description: editForm.description,
                mood: editForm.mood,
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
        setEditForm({ title: '', description: '', mood: '' });
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
            <AddEntryDialog
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSuccess={loadEntries}
                initialDate={date}
            />
            {entryToDelete && (
                <ConfirmDialog
                    isVisible={showConfirmDialog}
                    title="Excluir entrada?"
                    message={`Tem certeza que deseja excluir "${
                        entryToDelete.title || 'essa entrada'
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

                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                        style={{
                        backgroundColor: colors.texto.claro,
                            color: colors.tonsEscuros.escuro,
                        }}
                    >
                        <Plus className="w-5 h-5" />
                        Adicionar
                    </button>
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
                                                value={editForm.title}
                                                onChange={e =>
                                                    setEditForm({
                                                        ...editForm,
                                                        title: e.target.value,
                                                    })
                                                }
                                                placeholder="Title"
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
                                                value={editForm.mood}
                                                onChange={e =>
                                                    setEditForm({
                                                        ...editForm,
                                                        mood: e.target.value,
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
                                                <option value="">
                                                    Select a mood...
                                                </option>
                                                <option value="Happy">
                                                    Happy
                                                </option>
                                                <option value="Excited">
                                                    Excited
                                                </option>
                                                <option value="Calm">
                                                    Calm
                                                </option>
                                                <option value="Thoughtful">
                                                    Thoughtful
                                                </option>
                                                <option value="Energetic">
                                                    Energetic
                                                </option>
                                                <option value="Relaxed">
                                                    Relaxed
                                                </option>
                                                <option value="Anxious">
                                                    Anxious
                                                </option>
                                                <option value="Tired">
                                                    Tired
                                                </option>
                                                <option value="Grateful">
                                                    Grateful
                                                </option>
                                                <option value="Motivated">
                                                    Motivated
                                                </option>
                                            </select>
                                            <textarea
                                                value={editForm.description}
                                                onChange={e =>
                                                    setEditForm({
                                                        ...editForm,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="Description"
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
                                            <div className="flex items-center justify-between mb-3">
                                                <h2
                                                    className="text-2xl font-semibold"
                                                    style={{
                                                        color: colors
                                                            .tonsEscuros.escuro,
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
                                                            handleEdit(entry)
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
                                                        Mood: {entry.mood}
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
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
