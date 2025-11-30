import { useState, useEffect } from 'react';
import {
    ArrowLeft,
    User,
    Phone,
    Mail,
    Calendar,
    Plus,
    MapPin,
    Cake,
    Edit2,
    Trash2,
    Eye,
    FileText,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import AddClientDialog from '../components/AddClientDialog';
import EditClientDialog from '../components/EditClientDialog';
import colors from '../constants/colors';
import ConfirmDialog from '../components/PopUp';
import useNavigation from '../hooks/useNavigation';
import ViewAnamnesisDialog from '../components/ViewAnamnesisDialog';
import { generateClientPDF } from '../lib/generatePDF';

interface Client {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    birth_date?: string;
    address?: string;
    total_entries: number;
    last_entry_date?: string;
    next_consultation_date?: string;
    next_consultation_time?: string;
}

export default function Clients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedClientForAnamnesis, setSelectedClientForAnamnesis] = useState<Client | null>(null);
    const { navigate } = useNavigation();

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const { data: clientsData } = await supabase
                .from('clients')
                .select('*')
                .order('name', { ascending: true });

            if (clientsData) {
                const clientsWithStats = await Promise.all(
                    clientsData.map(async client => {
                        // Buscar número de atendimentos
                        const { count } = await supabase
                            .from('day_entries')
                            .select('date', { count: 'exact' })
                            .eq('client_name', client.name);

                        // Buscar última visita
                        const { data: entries } = await supabase
                            .from('day_entries')
                            .select('date')
                            .eq('client_name', client.name)
                            .order('date', { ascending: false })
                            .limit(1);

                        // Buscar próximo atendimento agendado
                        const today = new Date().toISOString().split('T')[0];
                        const { data: futureConsultations } = await supabase
                            .from('day_entries')
                            .select('date, start_time')
                            .eq('client_id', client.id)
                            .gte('date', today)
                            .order('date', { ascending: true })
                            .limit(1);

                        let nextConsultationDate: string | undefined;
                        let nextConsultationTime: string | undefined;

                        if (futureConsultations && futureConsultations.length > 0) {
                            nextConsultationDate = futureConsultations[0].date;
                            if (futureConsultations[0].start_time) {
                                nextConsultationTime = new Date(
                                    futureConsultations[0].start_time
                                ).toLocaleTimeString('pt-BR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                });
                            }
                        }

                        return {
                            id: client.id,
                            name: client.name,
                            phone: client.phone,
                            email: client.email,
                            birth_date: client.birth_date,
                            address: client.address,
                            total_entries: count || 0,
                            last_entry_date: entries?.[0]?.date,
                            next_consultation_date: nextConsultationDate,
                            next_consultation_time: nextConsultationTime,
                        };
                    })
                );

                setClients(clientsWithStats);
            }
        } catch (error) {
            console.error('Error loading clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const handleEdit = (client: Client) => {
        setSelectedClient(client);
        setIsEditDialogOpen(true);
    };

    const handleDelete = async (client: Client) => {
        try {
            const { error } = await supabase
                .from('clients')
                .delete()
                .eq('id', client.id);

            if (error) throw error;

            await loadClients();
        } catch (error) {
            console.error('Error deleting client:', error);
            alert('Erro ao excluir cliente. Tente novamente.');
        }
    };
const handleGeneratePDF = async (client: Client) => {
        try {
            // Buscar anamneses do cliente
            const { data: anamnesisData } = await supabase
                .from('anamnesis')
                // Adicionamos todos os campos que o generateClientPDF espera receber
                .select(`
                    id, 
                    title, 
                    description, 
                    created_at,
                    chief_complaint,
                    medical_history,
                    current_medical_treatment,
                    previous_procedures,
                    medications,
                    recent_symptoms,
                    pain_location,
                    additional_observations
                `)
                .eq('client_id', client.id)
                .order('created_at', { ascending: false });
                
            const clientData = {
                ...client,
                anamnesis: anamnesisData || [],
            };

            generateClientPDF(clientData);
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar PDF. Tente novamente.');
        }
    };

    const navigateBackToCalendarHandler = () => {
        navigate('/calendar');
    };

    return (
        <div
            className="min-h-screen p-8"
            style={{
                background: colors.gradiente.suave,
            }}
        >
            <AddClientDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSuccess={loadClients}
            />
            <EditClientDialog
                isOpen={isEditDialogOpen}
                onClose={() => {
                    setIsEditDialogOpen(false);
                    setSelectedClient(null);
                }}
                onSuccess={loadClients}
                client={selectedClient}
            />
            {selectedClientForAnamnesis && (
                <ViewAnamnesisDialog
                    isOpen={!!selectedClientForAnamnesis}
                    onClose={() => setSelectedClientForAnamnesis(null)}
                    clientId={selectedClientForAnamnesis.id}
                    clientName={selectedClientForAnamnesis.name}
                />
            )}
            {clientToDelete && (
                <ConfirmDialog
                    isVisible={showConfirmDialog}
                    title="Excluir cliente?"
                    message={`Tem certeza que deseja excluir ${clientToDelete.name}?`}
                    onConfirm={() => {
                        handleDelete(clientToDelete);
                        setClientToDelete(null);
                        setShowConfirmDialog(false);
                    }}
                    onCancel={() => {
                        setClientToDelete(null);
                        setShowConfirmDialog(false);
                    }}
                />
            )}
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={navigateBackToCalendarHandler}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                            style={{
                                backgroundColor: colors.texto.claro,
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Voltar
                        </button>
                        <h1
                            className="text-4xl font-bold"
                            style={{
                                color: colors.texto.claro,
                            }}
                        >
                            Clientes
                        </h1>
                    </div>
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                        style={{
                            backgroundColor: colors.texto.claro,
                            color: colors.tonsEscuros.escuro,
                        }}
                    >
                        <Plus className="w-5 h-5" />
                        Adicionar Cliente
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-2xl p-8">
                    {loading ? (
                        <div className="text-center py-12">
                            <p
                                className="text-xl"
                                style={{
                                    color: colors.tonsEscuros.escuro,
                                }}
                            >
                                Carregando...
                            </p>
                        </div>
                    ) : clients.length === 0 ? (
                        <div className="text-center py-12">
                            <User
                                className="w-16 h-16 mx-auto mb-4 opacity-30"
                                style={{
                                    color: colors.tonsEscuros.escuro,
                                }}
                            />
                            <p
                                className="text-xl"
                                style={{
                                    color: colors.tonsEscuros.escuro,
                                }}
                            >
                                Nenhum cliente encontrado
                            </p>
                            <p
                                className="text-sm text-gray-500 mt-2"
                                style={{
                                    color: colors.texto.secundario,
                                }}
                            >
                                Clique em "Adicionar Cliente" para começar
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {clients.map(client => (
                                <div
                                    key={client.id}
                                    className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                                    style={{
                                        borderColor:
                                            colors.background.terciario,
                                    }}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <User
                                                    className="w-6 h-6"
                                                    style={{
                                                        color: colors
                                                            .tonsEscuros.escuro,
                                                    }}
                                                />
                                                <h3
                                                    className="text-xl font-semibold"
                                                    style={{
                                                        color: colors
                                                            .tonsEscuros.escuro,
                                                    }}
                                                >
                                                    {client.name}
                                                </h3>
                                            </div>
                                            <div className="space-y-2 ml-9">
                                                {client.phone && (
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Phone className="w-4 h-4" />
                                                        <span>
                                                            {client.phone}
                                                        </span>
                                                    </div>
                                                )}
                                                {client.email && (
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Mail className="w-4 h-4" />
                                                        <span>
                                                            {client.email}
                                                        </span>
                                                    </div>
                                                )}
                                                {client.birth_date && (
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Cake className="w-4 h-4" />
                                                        <span>
                                                            Nascimento:{' '}
                                                            {formatDate(
                                                                client.birth_date
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                {client.address && (
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>
                                                            {client.address}
                                                        </span>
                                                    </div>
                                                )}
                                                {client.total_entries > 0 && (
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>
                                                            Última visita:{' '}
                                                            {formatDate(
                                                                client.last_entry_date
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                {client.next_consultation_date && (
                                                    <div className="flex items-center gap-2 rounded-lg p-2"
                                                        style={{
                                                            backgroundColor: colors.background.terciario + '20',
                                                        }}
                                                    >
                                                        <Calendar className="w-4 h-4"
                                                            style={{
                                                                color: colors.background.terciario,
                                                            }}
                                                        />
                                                        <span
                                                            style={{
                                                                color: colors.tonsEscuros.escuro,
                                                                fontWeight: '500',
                                                            }}
                                                        >
                                                            Próx. atendimento:{' '}
                                                            {formatDate(client.next_consultation_date)}
                                                            {client.next_consultation_time && (
                                                                <span> às {client.next_consultation_time}</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-4">
                                            <div className="text-right">
                                                <div
                                                    className="text-3xl font-bold"
                                                    style={{
                                                        color: colors
                                                            .tonsEscuros.escuro,
                                                    }}
                                                >
                                                    {client.total_entries}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {client.total_entries === 1
                                                        ? 'visita'
                                                        : 'visitas'}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 w-full">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(client)
                                                        }
                                                        className="flex-1 p-2 border rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                                        style={{
                                                            borderColor:
                                                                colors.background
                                                                    .terciario,
                                                            color: colors
                                                                .tonsEscuros.escuro,
                                                        }}
                                                        title="Editar cliente"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                        <span className="text-sm font-medium">Editar</span>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleGeneratePDF(
                                                                client
                                                            )
                                                        }
                                                        className="flex-1 p-2 border rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                                                        style={{
                                                            borderColor:
                                                                colors.background
                                                                    .terciario,
                                                            color: '#22c55e',
                                                        }}
                                                        title="Gerar PDF"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                        <span className="text-sm font-medium">PDF</span>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setSelectedClientForAnamnesis(
                                                                client
                                                            )
                                                        }
                                                        className="flex-1 p-2 border rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                                                        style={{
                                                            borderColor:
                                                                colors.background
                                                                    .terciario,
                                                            color: colors.background
                                                                .terciario,
                                                        }}
                                                        title="Visualizar anamneses"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        <span className="text-sm font-medium">Anamnese</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setClientToDelete(
                                                                client
                                                            );
                                                            setShowConfirmDialog(
                                                                true
                                                            );
                                                        }}
                                                        className="p-2 border rounded-lg hover:bg-red-50 transition-colors"
                                                        title="Excluir cliente"
                                                        style={{
                                                            borderColor:
                                                                colors.background
                                                                    .terciario,
                                                            color: colors.texto
                                                                .chamativo,
                                                        }}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
