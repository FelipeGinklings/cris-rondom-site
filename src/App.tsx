import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import DayDetails from './pages/DayDetails';
import AddEntryDialog from './components/AddEntryDialog';
import Clients from './pages/Clients';

function AppContent() {
  const teste = "teste";
  const { user, loading } = useAuth();
  const [mainView, setMainView] = useState<'portfolio' | 'calendar'>('portfolio');
  const [view, setView] = useState<'calendar' | 'details' | 'clients'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setView('details');
  };

  const handleBackToCalendar = () => {
    setView('calendar');
  };

  const handleViewClients = () => {
    setView('clients');
  };

  const handleAddEntry = () => {
    setIsDialogOpen(true);
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
        <Calendar
          onDateClick={handleDateClick}
          onAddEntry={handleAddEntry}
          onViewClients={handleViewClients}
        />
      ) : view === 'details' ? (
        <DayDetails date={selectedDate} onBack={handleBackToCalendar} />
      ) : (
        <Clients onBack={handleBackToCalendar} />
      )}
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
