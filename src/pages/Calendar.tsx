import { ChevronLeft, ChevronRight, LogOut, Plus, Users } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import AddConsultationDialog from '../components/AddConsultationDialog';
import colors from '../constants/colors';
import { useAuth } from '../hooks/useAuth';
import useNavigation from '../hooks/useNavigation';
import { DayEntry, supabase } from '../lib/supabase';

const colorVariations = [colors.background.terciario];

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [entries, setEntries] = useState<DayEntry[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [animatedDays, setAnimatedDays] = useState<Set<number>>(new Set());
    const { signOut } = useAuth();
    const { navigate } = useNavigation();

    const getDaysInMonth = useCallback(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    }, [currentDate]);

    const loadEntries = useCallback(async () => {
        setAnimatedDays(new Set());
        const startOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );
        const endOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        );

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
    }, [currentDate, getDaysInMonth]);

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth();

    const previousMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };

    const hasEntry = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
        ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return entries.some(entry => entry.date === dateStr);
    };

    const handleDayClick = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
        ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        navigate(`/calendar/${dateStr}`);
    };

    const monthNames = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    const getColorForDay = (day: number) => {
        return colorVariations[day % colorVariations.length];
    };

    const navigateToClientsHandler = () => {
        navigate('/clients');
    };

    useEffect(() => {
        loadEntries();
    }, [currentDate, loadEntries]);

    return (
        <div
            className="min-h-screen p-8"
            style={{
                background: colors.gradiente.suave,
            }}
        >
            <AddConsultationDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSuccess={() => loadEntries()}
            />
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1
                        className="text-4xl font-bold"
                        style={{
                            color: colors.texto.claro,
                        }}
                    >
                        Cris Rondon
                    </h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={navigateToClientsHandler}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                            style={{
                                backgroundColor: colors.texto.claro,
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            <Users className="w-5 h-5" />
                            Clientes
                        </button>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                            style={{
                                backgroundColor: colors.texto.claro,
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            <Plus className="w-5 h-5" />
                            Agendar Consulta
                        </button>
                        <button
                            onClick={signOut}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                            style={{
                                backgroundColor: colors.texto.claro,
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            <LogOut className="w-5 h-5" />
                            Sair
                        </button>
                    </div>
                </div>

                <div
                    className="rounded-xl shadow-2xl p-8"
                    style={{
                        backgroundColor: colors.texto.claro,
                    }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={previousMonth}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            style={{
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <h2
                            className="text-3xl font-bold"
                            style={{
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            {monthNames[currentDate.getMonth()]}{' '}
                            {currentDate.getFullYear()}
                        </h2>
                        <button
                            onClick={nextMonth}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            style={{
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-4 mb-4">
                        {dayNames.map(day => (
                            <div
                                key={day}
                                className="text-center font-semibold py-2"
                                style={{
                                    color: colors.tonsEscuros.medio,
                                }}
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        {Array.from({ length: startingDayOfWeek }).map(
                            (_, index) => (
                                <div key={`empty-${index}`} />
                            )
                        )}
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
                                        color: colors.texto.claro,
                                        border: '4px solid transparent',
                                        backgroundImage: hasData
                                            ? `linear-gradient(${getColorForDay(
                                                  day
                                              )}, ${getColorForDay(
                                                  day
                                              )}), linear-gradient(135deg, ${
                                                  colors.texto.escuro
                                              }, ${colors.tonsEscuros.medio}, ${
                                                  colors.texto.destaque
                                              })`
                                            : 'none',
                                        backgroundOrigin: 'border-box',
                                        backgroundClip:
                                            'padding-box, border-box',
                                        opacity: isAnimated ? 1 : 0,
                                        transform: isAnimated
                                            ? 'scale(1)'
                                            : 'scale(0.8)',
                                        transition:
                                            'opacity 0.3s ease, transform 0.3s ease',
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
