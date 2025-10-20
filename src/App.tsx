import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import DayDetails from './pages/DayDetails';
import AddEntryDialog, { FloatingActionButton } from './components/AddEntryDialog';

const teste = ''

function AppContent() {
  const { user, loading } = useAuth();
  const [mainView, setMainView] = useState<'portfolio' | 'calendar'>('portfolio');
  const [view, setView] = useState<'calendar' | 'details'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setView('details');
  };

  const handleBackToCalendar = () => {
    setView('calendar');
  };

  const handleNavigateToCalendar = () => {
    setMainView('calendar');
  };

  const handleDialogSuccess = () => {
    if (view === 'calendar') {
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'rgb(193, 124, 85)' }}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (mainView === 'portfolio') {
    return <Portfolio onNavigateToCalendar={handleNavigateToCalendar} />;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <>
      {view === 'calendar' ? (
        <Calendar onDateClick={handleDateClick} />
      ) : (
        <DayDetails date={selectedDate} onBack={handleBackToCalendar} />
      )}
      <FloatingActionButton onClick={() => setIsDialogOpen(true)} />
      <AddEntryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleDialogSuccess}
        initialDate={view === 'details' ? selectedDate : undefined}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
