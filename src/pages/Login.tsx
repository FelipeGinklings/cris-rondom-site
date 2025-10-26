import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar } from 'lucide-react';
import colors from '../constants/colors';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        // background: 'linear-gradient(135deg, rgb(178, 108, 72) 0%, rgb(193, 124, 85) 25%, rgb(205, 140, 100) 50%, rgb(193, 124, 85) 75%, rgb(185, 115, 78) 100%)'
        background: colors.gradiente.principal
      }}
    > 
      <div className="rounded-lg shadow-xl p-8 w-full max-w-md"
        style={{
            backgroundColor: colors.background.principal,
            boxShadow: `0 4px 10px ${colors.sombra.media}`,
        }}
      >
        <div className="flex items-center justify-center mb-8"> 
          <Calendar
            className="w-12 h-12"
            style={{ color: colors.texto.escuro }}
          />
        </div>
        <h1 
          className="text-3xl font-bold text-center mb-8" 
          style={{ 
            color: colors.texto.escuro 
          }}
        >
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>

        {error && (
          <div 
            className="mb-4 p-3 border rounded"
            style={{
              backgroundColor: colors.tonsClaros.suave,
              borderColor: colors.tonsClaros.medio,
              color: colors.texto.escuro,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: colors.texto.secundario }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
              style={{
                borderColor: colors.tonsClaros.suave,
                '--tw-ring-color': colors.tonsClaros.medio,
              } as any}
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium mb-2"
              style={{ 
                color: colors.texto.secundario 
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
              style={{ 
                borderColor: colors.tonsClaros.suave,
                '--tw-ring-color': colors.tonsClaros.medio, 
              } as any}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{          
              backgroundColor: colors.tonsEscuros.medio,
              color: colors.texto.claro
            }}
          >
            {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm hover:underline"
            style={{ 
              color: colors.texto.secundario 
            }}
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
