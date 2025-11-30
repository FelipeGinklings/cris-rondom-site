import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import colors from '../constants/colors';

interface AddClientDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddClientDialog({
    isOpen,
    onClose,
    onSuccess,
}: AddClientDialogProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        birth_date: '',
        address: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                alert('Você precisa estar logado para adicionar clientes');
                return;
            }

            const { error } = await supabase.from('clients').insert([
                {
                    user_id: user.id,
                    name: formData.name,
                    phone: formData.phone || null,
                    email: formData.email || null,
                    birth_date: formData.birth_date || null,
                    address: formData.address || null,
                },
            ]);

            if (error) throw error;

            setFormData({
                name: '',
                phone: '',
                email: '',
                birth_date: '',
                address: '',
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error adding client:', error);
            alert('Erro ao adicionar cliente. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
                className="rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                style={{
                    backgroundColor: colors.texto.claro,
                }}
            >
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <h2
                        className="text-2xl font-bold"
                        style={{
                            color: colors.tonsEscuros.escuro,
                        }}
                    >
                        Adicionar Cliente
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        style={{
                            color: colors.tonsEscuros.escuro,
                        }}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            Nome *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                            style={{
                                borderColor: colors.background.terciario,
                            }}
                            placeholder="Nome completo do cliente"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            Telefone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                            style={{
                                borderColor: colors.background.terciario,
                            }}
                            placeholder="(00) 00000-0000"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                            style={{
                                borderColor: colors.background.terciario,
                            }}
                            placeholder="email@exemplo.com"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            Data de Nascimento
                        </label>
                        <input
                            type="date"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                            style={{
                                borderColor: colors.background.terciario,
                            }}
                        />
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{
                                color: colors.tonsEscuros.escuro,
                            }}
                        >
                            Endereço
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                            style={{
                                borderColor: colors.background.terciario,
                            }}
                            placeholder="Endereço completo"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
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
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                            style={{
                                backgroundColor: colors.tonsEscuros.escuro,
                            }}
                        >
                            {isSubmitting ? 'Salvando...' : 'Adicionar Cliente'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
