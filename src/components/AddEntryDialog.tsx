import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface AddEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialDate?: string;
}

export default function AddEntryDialog({ isOpen, onClose, onSuccess, initialDate }: AddEntryDialogProps) {
  const { user } = useAuth();
  const [date, setDate] = useState(initialDate || new Date().toISOString().split('T')[0]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from('day_entries')
        .insert([{
          user_id: user?.id,
          date,
          title,
          description,
          mood
        }]);

      if (insertError) throw insertError;

      setTitle('');
      setDescription('');
      setMood('');
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
          <h2 className="text-2xl font-bold" style={{ color: 'rgb(100, 53, 34)' }}>
            Adicionar Nova Entrada
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
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
              style={{ '--tw-ring-color': 'rgb(193, 124, 85)' } as any}
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
              style={{ '--tw-ring-color': 'rgb(193, 124, 85)' } as any}
            />
          </div>

          <div>
            <label htmlFor="mood" className="block text-sm font-semibold text-gray-700 mb-2">
              Mood
            </label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
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
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What happened today? Share your thoughts, experiences, or reflections..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none resize-none"
              style={{ '--tw-ring-color': 'rgb(193, 124, 85)' } as any}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'rgb(193, 124, 85)', color: 'rgb(100, 53, 34)' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: 'rgb(100, 53, 34)' }}
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
      style={{ backgroundColor: 'rgb(100, 53, 34)' }}
    >
      <Plus className="w-8 h-8 text-white" />
    </button>
  );
}
