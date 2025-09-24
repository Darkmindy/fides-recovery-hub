import { useState } from 'react';
import { 
  Banknote, 
  TrendingDown, 
  Clock, 
  Target, 
  Building2, 
  Phone, 
  Mail, 
  Search,
  ArrowUpRight,
  Zap,
  Shield,
  Users2,
  FileText,
  ChevronRight,
  Star,
  AlertTriangle
} from 'lucide-react';

interface DebtRecord {
  id: string;
  debtor: string;
  originalAmount: number;
  remainingAmount: number;
  daysPastDue: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastContact: string;
  contactMethod: 'phone' | 'email' | 'letter';
  recoveryStage: 'early' | 'formal' | 'legal' | 'collection';
  assignedAgent: string;
}

const FidesRecoveryPlatform = () => {
  const [debts] = useState<DebtRecord[]>([
    { id: 'FID-2025-001', debtor: 'Mediterraneo Logistics SRL', originalAmount: 45000, remainingAmount: 45000, daysPastDue: 15, riskLevel: 'medium', lastContact: '2025-09-20', contactMethod: 'phone', recoveryStage: 'early', assignedAgent: 'Marco Rossi' },
    { id: 'FID-2025-002', debtor: 'Sicilian Trade Export', originalAmount: 78500, remainingAmount: 62800, daysPastDue: 85, riskLevel: 'high', lastContact: '2025-09-10', contactMethod: 'email', recoveryStage: 'formal', assignedAgent: 'Anna Bianchi' },
    { id: 'FID-2025-003', debtor: 'Innovazione Digitale SpA', originalAmount: 32000, remainingAmount: 32000, daysPastDue: 7, riskLevel: 'low', lastContact: '2025-09-22', contactMethod: 'email', recoveryStage: 'early', assignedAgent: 'Giuseppe Verde' },
    { id: 'FID-2025-004', debtor: 'Catania Construction Group', originalAmount: 125000, remainingAmount: 95000, daysPastDue: 180, riskLevel: 'critical', lastContact: '2025-08-30', contactMethod: 'letter', recoveryStage: 'legal', assignedAgent: 'Maria Neri' },
    { id: 'FID-2025-005', debtor: 'Etna Energy Solutions', originalAmount: 18900, remainingAmount: 15120, daysPastDue: 45, riskLevel: 'medium', lastContact: '2025-09-18', contactMethod: 'phone', recoveryStage: 'formal', assignedAgent: 'Francesco Blu' }
  ]);

  const [selectedStage, setSelectedStage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getRiskBadge = (risk: string) => {
    const styles = {
      low: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      medium: 'bg-amber-50 border-amber-200 text-amber-700', 
      high: 'bg-orange-50 border-orange-200 text-orange-700',
      critical: 'bg-red-50 border-red-200 text-red-700'
    };
    return styles[risk as keyof typeof styles];
  };

  const getStageColor = (stage: string) => {
    const colors = {
      early: 'text-blue-600 bg-blue-50',
      formal: 'text-indigo-600 bg-indigo-50',
      legal: 'text-purple-600 bg-purple-50',
      collection: 'text-red-600 bg-red-50'
    };
    return colors[stage as keyof typeof colors];
  };

  const filteredDebts = debts.filter(debt => {
    const matchesSearch = debt.debtor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'all' || debt.recoveryStage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const totalPortfolio = debts.reduce((sum, debt) => sum + debt.remainingAmount, 0);
  const criticalCases = debts.filter(d => d.riskLevel === 'critical').length;
  const avgDaysPastDue = Math.round(debts.reduce((sum, debt) => sum + debt.daysPastDue, 0) / debts.length);
  const recoveryRate = Math.round(((debts.reduce((sum, debt) => sum + (debt.originalAmount - debt.remainingAmount), 0) / debts.reduce((sum, debt) => sum + debt.originalAmount, 0)) * 100));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      
      {/* Modern Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-white/20 to-white/30 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/30">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Fides Recovery Hub
                </h1>
                <p className="text-sm text-blue-100 mt-0.5">Piattaforma Gestione Recupero Crediti</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <div className="text-blue-100">
                  <span className="font-medium text-white">€{totalPortfolio.toLocaleString()}</span>
                  <span className="ml-2">Portfolio Attivo</span>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <div className="text-blue-100">
                  <span className="font-medium text-red-300">{criticalCases}</span>
                  <span className="ml-2">Casi Critici</span>
                </div>
              </div>
              
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 border border-white/20">
                <Users2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Hero Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 rounded-3xl blur opacity-50 group-hover:opacity-70 transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                  <Banknote className="w-7 h-7 text-white" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/70" />
              </div>
              <p className="text-blue-100 text-sm font-medium mb-1">Portfolio Totale</p>
              <p className="text-3xl font-bold text-white mb-2">€{totalPortfolio.toLocaleString()}</p>
              <div className="flex items-center text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-300 font-medium">+8.2% vs Q2</span>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 rounded-3xl blur opacity-50 group-hover:opacity-70 transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <Star className="w-5 h-5 text-white/70" />
              </div>
              <p className="text-blue-100 text-sm font-medium mb-1">Tasso Recupero</p>
              <p className="text-3xl font-bold text-white mb-2">{recoveryRate}%</p>
              <div className="flex items-center text-xs">
                <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
                <span className="text-blue-200 font-medium">Target: 75%</span>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 rounded-3xl blur opacity-50 group-hover:opacity-70 transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <Zap className="w-5 h-5 text-white/70" />
              </div>
              <p className="text-blue-100 text-sm font-medium mb-1">Casi Critici</p>
              <p className="text-3xl font-bold text-white mb-2">{criticalCases}</p>
              <div className="flex items-center text-xs">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-red-300 font-medium">Azione Immediata</span>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 rounded-3xl blur opacity-50 group-hover:opacity-70 transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <TrendingDown className="w-5 h-5 text-white/70" />
              </div>
              <p className="text-blue-100 text-sm font-medium mb-1">Media Giorni Scaduti</p>
              <p className="text-3xl font-bold text-white mb-2">{avgDaysPastDue}</p>
              <div className="flex items-center text-xs">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                <span className="text-cyan-300 font-medium">-5 gg vs mese scorso</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Controls */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Ricerca debitore o pratica..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-white/50 focus:border-white/30 transition-all backdrop-blur-sm text-white placeholder-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <div className="flex bg-white/10 rounded-2xl p-1 backdrop-blur-sm">
                {['all', 'early', 'formal', 'legal', 'collection'].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(stage)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedStage === stage
                        ? 'bg-white/20 text-white shadow-sm backdrop-blur-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {stage === 'all' && 'Tutti'}
                    {stage === 'early' && 'Iniziale'}
                    {stage === 'formal' && 'Formale'} 
                    {stage === 'legal' && 'Legale'}
                    {stage === 'collection' && 'Recupero'}
                  </button>
                ))}
              </div>
              
              <button className="px-6 py-2 bg-white/20 text-white rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-lg flex items-center gap-2 backdrop-blur-sm border border-white/30">
                <FileText className="w-4 h-4" />
                Report
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Debt Records */}
        <div className="space-y-4">
          {filteredDebts.map((debt) => (
            <div key={debt.id} className="group bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:bg-white/15">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  
                  {/* Left: Company Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                        <Building2 className="w-6 h-6 text-white/80" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-white text-lg mb-1 truncate">{debt.debtor}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="font-mono">{debt.id}</span>
                          <span>•</span>
                          <span>{debt.assignedAgent}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center: Financial Info */}
                  <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
                    <div className="text-center">
                      <p className="text-sm text-white/60 font-medium">Importo Residuo</p>
                      <p className="text-2xl font-bold text-white">€{debt.remainingAmount.toLocaleString()}</p>
                      {debt.remainingAmount < debt.originalAmount && (
                        <p className="text-xs text-green-300 mt-1">
                          -€{(debt.originalAmount - debt.remainingAmount).toLocaleString()} recuperati
                        </p>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-white/60 font-medium">Giorni Scaduti</p>
                      <p className={`text-2xl font-bold ${debt.daysPastDue > 90 ? 'text-red-300' : debt.daysPastDue > 30 ? 'text-orange-300' : 'text-white'}`}>
                        {debt.daysPastDue}
                      </p>
                      <p className="text-xs text-white/50 mt-1">gg dalla scadenza</p>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getRiskBadge(debt.riskLevel)}`}>
                        {debt.riskLevel.charAt(0).toUpperCase() + debt.riskLevel.slice(1)} Risk
                      </span>
                      <span className={`inline-flex px-3 py-1 rounded-xl text-xs font-medium ${getStageColor(debt.recoveryStage)}`}>
                        {debt.recoveryStage.charAt(0).toUpperCase() + debt.recoveryStage.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-xs text-white/60">
                        {debt.contactMethod === 'email' ? <Mail className="w-3 h-3 mr-1" /> : <Phone className="w-3 h-3 mr-1" />}
                        {new Date(debt.lastContact).toLocaleDateString('it-IT')}
                      </div>
                      <button className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white/70 transition-colors group-hover:bg-white/30 group-hover:text-white backdrop-blur-sm border border-white/20">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Signature Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Fides Recovery Platform</p>
              <p className="text-xs text-white/60">Demo by Stefania Deliso • React + TypeScript + Tailwind</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FidesRecoveryPlatform;