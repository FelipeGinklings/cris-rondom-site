import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, LogOut, Plus, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, DayEntry } from '../lib/supabase';

interface CalendarProps {
  onDateClick: (date: string) => void;
  onAddEntry: () => void;
  onViewClients: () => void;
}

const colorVariations = [
  'rgb(193, 124, 85)',
  // 'rgb(200, 135, 95)',
  // 'rgb(185, 115, 78)',
  // 'rgb(205, 140, 100)',
  // 'rgb(178, 108, 72)',
  // 'rgb(195, 128, 88)',
  // 'rgb(188, 118, 80)',
];

export default function Calendar({ onDateClick, onAddEntry, onViewClients }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [animatedDays, setAnimatedDays] = useState<Set<number>>(new Set());
  const { signOut } = useAuth();

  useEffect(() => {
    loadEntries();
  }, [currentDate]);

  const loadEntries = async () => {
    setAnimatedDays(new Set());
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const { data } = await supabase
      .from('day_entries')
      .select('*')
      .gte('date', startOfMonth.toISOString().split('T')[0])
      .lte('date', endOfMonth.toISOString().split('T')[0]);

    setEntries(data || []);

    const { daysInMonth } = getDaysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      setTimeout(() => {
        setAnimatedDays(prev => new Set([...prev, i]));
      }, i * 30);
    }
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const hasEntry = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return entries.some(entry => entry.date === dateStr);
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateClick(dateStr);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getColorForDay = (day: number) => {
    return colorVariations[day % colorVariations.length];
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: 'linear-gradient(135deg, rgb(178, 108, 72) 0%, rgb(193, 124, 85) 25%, rgb(205, 140, 100) 50%, rgb(193, 124, 85) 75%, rgb(185, 115, 78) 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Calendar</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={onViewClients}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ color: 'rgb(100, 53, 34)' }}
            >
              <Users className="w-5 h-5" />
              Clientes
            </button>
            <button
              onClick={onAddEntry}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ color: 'rgb(100, 53, 34)' }}
            >
              <Plus className="w-5 h-5" />
              Adicionar
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ color: 'rgb(100, 53, 34)' }}
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={previousMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: 'rgb(100, 53, 34)' }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <h2 className="text-3xl font-bold" style={{ color: 'rgb(100, 53, 34)' }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: 'rgb(100, 53, 34)' }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-4 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const hasData = hasEntry(day);
              const isAnimated = animatedDays.has(day);
              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className="aspect-square rounded-lg flex items-center justify-center text-xl font-semibold transition-all hover:scale-105 hover:shadow-lg relative overflow-hidden"
                  style={{
                    backgroundColor: getColorForDay(day),
                    color: 'white',
                    border: '4px solid transparent',
                    backgroundImage: hasData
                      ? `linear-gradient(${getColorForDay(day)}, ${getColorForDay(day)}), linear-gradient(135deg, rgb(100, 53, 34), rgb(150, 80, 50), rgb(100, 53, 34), rgb(120, 65, 40))`
                      : 'none',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'scale(1)' : 'scale(0.8)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
