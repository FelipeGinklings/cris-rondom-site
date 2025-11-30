import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import colors from '../constants/colors';
import { useAuth } from '../hooks/useAuth';

interface Client {
    id: string;
    name: string;
}

interface AddConsultationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialDate?: string;
}

export default function AddConsultationDialog({
    isOpen,
    onClose,
    onSuccess,
    initialDate,
}: AddConsultationDialogProps) {
    const { user } = useAuth();
    const [date, setDate] = useState(
        initialDate || new Date().toISOString().split('T')[0]
    );
    const [procedure, setProcedure] = useState('');
    const [consultationType, setConsultationType] = useState('');
    const [address, setAddress] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [clientSearch, setClientSearch] = useState('');
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showClientDropdown, setShowClientDropdown] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadClients();
        }
    }, [isOpen]);

    const loadClients = async () => {
        try {
            const { data } = await supabase
                .from('clients')
                .select('id, name')
                .order('name', { ascending: true });

            setClients(data || []);
        } catch (err) {
            console.error('Erro ao carregar clientes:', err);
        }
    };

    // Filtrar clientes baseado na busca
    const filteredClients = useMemo(() => {
        if (!clientSearch.trim()) {
            return clients;
        }
        return clients.filter(client =>
            client.name.toLowerCase().includes(clientSearch.toLowerCase())
        );
    }, [clients, clientSearch]);

    // Obter nome do cliente selecionado
    const selectedClientName = useMemo(() => {
        if (!clientId) return '';
        const client = clients.find(c => c.id === clientId);
        return client?.name || '';
    }, [clientId, clients]);

    if (!isOpen) return null;

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr + 'T00:00:00');
        const dia = String(d.getDate()).padStart(2, '0');
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const ano = d.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validar campos obrigatórios
        if (
            !date ||
            !procedure ||
            !consultationType ||
            !address ||
            !startTime ||
            !endTime ||
            !clientId
        ) {
            setError('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        setLoading(true);

        try {
            // Criar horário completo combinando data e hora
            const startDateTime = new Date(
                `${date}T${startTime}`
            ).toISOString();
            const endDateTime = new Date(`${date}T${endTime}`).toISOString();

            const { error: insertError } = await supabase
                .from('day_entries')
                .insert([
                    {
                        user_id: user?.id,
                        date,
                        title: `${procedure} - ${selectedClientName}`,
                        description: `Tipo: ${consultationType}\nEndereço: ${address}\nHorário: ${startTime} - ${endTime}${
                            description ? `\n\nObs: ${description}` : ''
                        }`,
                        client_id: clientId,
                        client_name: selectedClientName,
                        procedure,
                        consultation_type: consultationType,
                        address,
                        start_time: startDateTime,
                        end_time: endDateTime,
                    },
                ]);

            if (insertError) throw insertError;

            // Limpar formulário
            setProcedure('');
            setConsultationType('');
            setAddress('');
            setStartTime('');
            setEndTime('');
            setDescription('');
            setClientId('');
            setClientSearch('');

            onSuccess();
            onClose();
        } catch (err: unknown) {
            setError(
                (err as { message: string }).message ||
                    'Erro ao criar atendimento'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClientSelect = (client: Client) => {
        setClientId(client.id);
        setClientSearch(client.name);
        setShowClientDropdown(false);
    };

    const handleClientSearchChange = (value: string) => {
        setClientSearch(value);
        setClientId(''); // Limpar seleção quando o usuário digita
        setShowClientDropdown(true);
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
                        Agendar Consulta em {formatDate(date)}
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
                    <div className="grid grid-cols-2 gap-6">
                        {/* Data */}
                        <div className="col-span-2 md:col-span-1">
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
                                        borderColor:
                                            colors.background.terciario,
                                    } as unknown as never
                                }
                            />
                        </div>

                        {/* Procedimento */}
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="procedure"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Procedimento{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="procedure"
                                type="text"
                                value={procedure}
                                onChange={e => setProcedure(e.target.value)}
                                placeholder="Ex: Limpeza de pele, massagem, etc."
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                style={
                                    {
                                        '--tw-ring-color':
                                            colors.background.terciario,
                                        borderColor:
                                            colors.background.terciario,
                                    } as unknown as never
                                }
                            />
                        </div>

                        {/* Tipo de Consulta */}
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="consultationType"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Tipo de Consulta{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="consultationType"
                                value={consultationType}
                                onChange={e =>
                                    setConsultationType(e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                style={
                                    {
                                        '--tw-ring-color':
                                            colors.background.terciario,
                                        borderColor:
                                            colors.background.terciario,
                                    } as unknown as never
                                }
                            >
                                <option value="">Selecione...</option>
                                <option value="Primeira Consulta">
                                    Primeira Consulta
                                </option>
                                <option value="Retorno">Retorno</option>
                                <option value="Última Consulta">
                                    Última Consulta
                                </option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        {/* Horário de Início */}
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="startTime"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Horário de Início{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="startTime"
                                type="time"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                style={
                                    {
                                        '--tw-ring-color':
                                            colors.background.terciario,
                                        borderColor:
                                            colors.background.terciario,
                                    } as unknown as never
                                }
                            />
                        </div>

                        {/* Horário de Fim */}
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="endTime"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Horário de Fim{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="endTime"
                                type="time"
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                style={
                                    {
                                        '--tw-ring-color':
                                            colors.background.terciario,
                                        borderColor:
                                            colors.background.terciario,
                                    } as unknown as never
                                }
                            />
                        </div>

                        {/* Endereço */}
                        <div className="col-span-2">
                            <label
                                htmlFor="address"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Endereço <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="address"
                                type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                placeholder="Endereço do atendimento"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                style={
                                    {
                                        '--tw-ring-color':
                                            colors.background.terciario,
                                        borderColor:
                                            colors.background.terciario,
                                    } as unknown as never
                                }
                            />
                        </div>

                        {/* Cliente com Busca */}
                        <div className="col-span-2">
                            <label
                                htmlFor="client"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Cliente <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="client"
                                    type="text"
                                    value={clientSearch}
                                    onChange={e =>
                                        handleClientSearchChange(e.target.value)
                                    }
                                    onFocus={() => setShowClientDropdown(true)}
                                    placeholder="Digite o nome da cliente para buscar..."
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                                    style={
                                        {
                                            '--tw-ring-color':
                                                colors.background.terciario,
                                            borderColor:
                                                colors.background.terciario,
                                        } as unknown as never
                                    }
                                />

                                {/* Dropdown de clientes */}
                                {showClientDropdown &&
                                    filteredClients.length > 0 && (
                                        <div
                                            className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto"
                                            style={{
                                                borderColor:
                                                    colors.background.terciario,
                                            }}
                                        >
                                            {filteredClients.map(client => (
                                                <button
                                                    key={client.id}
                                                    type="button"
                                                    onClick={() =>
                                                        handleClientSelect(
                                                            client
                                                        )
                                                    }
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors border-b last:border-b-0"
                                                    style={{
                                                        borderBottomColor:
                                                            colors.background
                                                                .terciario,
                                                    }}
                                                >
                                                    {client.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                {showClientDropdown &&
                                    clientSearch.trim() &&
                                    filteredClients.length === 0 && (
                                        <div
                                            className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 p-4 text-gray-500 text-sm"
                                            style={{
                                                borderColor:
                                                    colors.background.terciario,
                                            }}
                                        >
                                            Nenhuma cliente encontrada
                                        </div>
                                    )}
                            </div>

                            {/* Indicador de seleção */}
                            {clientId && (
                                <p className="mt-2 text-sm text-green-600 font-medium">
                                    ✓ {selectedClientName} selecionada
                                </p>
                            )}
                        </div>

                        {/* Descrição */}
                        <div className="col-span-2">
                            <label
                                htmlFor="description"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Descrição
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Adicionar observações sobre o atendimento..."
                                rows={4}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none"
                                style={
                                    {
                                        '--tw-ring-color':
                                            colors.background.terciario,
                                        borderColor:
                                            colors.background.terciario,
                                    } as unknown as never
                                }
                            />
                        </div>
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
                            {loading ? 'Salvando...' : 'Agendar Consulta'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
