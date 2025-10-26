import { useState, useEffect } from 'react';
import { ArrowLeft, Smile, Calendar as CalendarIcon, Clock, Edit2, Trash2 } from 'lucide-react';
import { supabase, DayEntry } from '../lib/supabase';

interface DayDetailsProps {
  date: string;
  onBack: () => void;
}

export default function DayDetails({ date, onBack }: DayDetailsProps) {
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', mood: '' });

  useEffect(() => {
    loadEntries();
  }, [date]);

  const loadEntries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('day_entries')
      .select('*')
      .eq('date', date)
      .order('created_at', { ascending: false });

    setEntries(data || []);
    setLoading(false);
  };

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

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar essa entrada?')) {
      const { error } = await supabase
        .from('day_entries')
        .delete()
        .eq('id', id);

      if (!error) {
        loadEntries();
      }
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: 'linear-gradient(135deg, rgb(178, 108, 72) 0%, rgb(193, 124, 85) 25%, rgb(205, 140, 100) 50%, rgb(193, 124, 85) 75%, rgb(185, 115, 78) 100%)'
      }}
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-white hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg font-semibold">Voltar para o Calendário</span>
        </button>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <CalendarIcon className="w-8 h-8" style={{ color: 'rgb(100, 53, 34)' }} />
            <h1 className="text-3xl font-bold" style={{ color: 'rgb(100, 53, 34)' }}>
              {formatDate(date)}
            </h1>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Carregando...</div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Sem entradas para esse dia ainda.</p>
              <p className="text-gray-400 mt-2">Aperte o botão + para adicionar uma!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="border-l-4 pl-6 py-4 relative"
                  style={{ borderColor: 'rgb(100, 53, 34)' }}
                >
                  {editingId === entry.id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        placeholder="Title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
                        style={{ '--tw-ring-color': 'rgb(193, 124, 85)' } as any}
                      />
                      <select
                        value={editForm.mood}
                        onChange={(e) => setEditForm({ ...editForm, mood: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
                        style={{ '--tw-ring-color': 'rgb(193, 124, 85)' } as any}
                      >
                        <option value="">Select a mood...</option>
                        <option value="Happy">Happy</option>
                        <option value="Excited">Excited</option>
                        <option value="Calm">Calm</option>
                        <option value="Thoughtful">Thoughtful</option>
                        <option value="Energetic">Energetic</option>
                        <option value="Relaxed">Relaxed</option>
                        <option value="Anxious">Anxious</option>
                        <option value="Tired">Tired</option>
                        <option value="Grateful">Grateful</option>
                        <option value="Motivated">Motivated</option>
                      </select>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="Description"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none resize-none"
                        style={{ '--tw-ring-color': 'rgb(193, 124, 85)' } as any}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(entry.id)}
                          className="px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90"
                          style={{ backgroundColor: 'rgb(100, 53, 34)' }}
                        >
                          Salvar
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 rounded-lg border-2 font-semibold hover:bg-gray-50"
                          style={{ borderColor: 'rgb(193, 124, 85)', color: 'rgb(100, 53, 34)' }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-semibold" style={{ color: 'rgb(100, 53, 34)' }}>
                          {entry.title || 'Entrada sem Título'}
                        </h2>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Clock className="w-4 h-4" />
                            {formatTime(entry.created_at)}
                          </div>
                          <button
                            onClick={() => handleEdit(entry)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            style={{ color: 'rgb(193, 124, 85)' }}
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {entry.mood && (
                        <div className="flex items-center gap-2 mb-3">
                          <Smile className="w-5 h-5" style={{ color: 'rgb(193, 124, 85)' }} />
                          <span className="text-gray-700 font-medium">Mood: {entry.mood}</span>
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
