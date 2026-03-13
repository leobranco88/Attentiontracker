import { useState } from 'react';
import { Search, Plus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { mockStudents } from '../data/mockData';
import { AttentionType } from '../types';
import { AddStudentModal } from '../components/AddStudentModal';
import { motion } from 'motion/react';

const attentionTypeLabels: Record<AttentionType, string> = {
  reforco: 'Reforço',
  pais: 'Conv. Pais',
  monitorar: 'Monitorando',
  pedagogico: 'Ajuste Pedag.'
};

const attentionTypeColors: Record<AttentionType, string> = {
  reforco: 'bg-[#FF6B00]/10 text-[#FF6B00] border-[#FF6B00]/20',
  pais: 'bg-[#1A1AFF]/10 text-[#1A1AFF] border-[#1A1AFF]/20',
  monitorar: 'bg-[#5A5A7A]/10 text-[#5A5A7A] border-[#5A5A7A]/20',
  pedagogico: 'bg-[#B44FFF]/10 text-[#B44FFF] border-[#B44FFF]/20'
};

const stageLabels: Record<string, string> = {
  'identificado': 'Identificado',
  'diagnostico': 'Em diagnóstico',
  'plano-ativo': 'Plano ativo',
  'progresso-inicial': 'Progresso inicial',
  'consolidando': 'Consolidando',
  'quase-la': 'Quase lá',
  'alta': 'Alta'
};

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | AttentionType>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const getDaysSinceUpdate = (date: Date) => {
    const today = new Date('2026-03-13'); // Current date from the prompt
    const diff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const stats = {
    emAtencao: mockStudents.length,
    planoAtivo: mockStudents.filter(s => s.stage === 'plano-ativo').length,
    altasMes: mockStudents.filter(s => s.stage === 'alta').length,
    semUpdate: mockStudents.filter(s => getDaysSinceUpdate(s.lastUpdate) > 7).length
  };

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || student.attentionTypes.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-[#1A1A2E]" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Lista de <span className="text-[#FF6B00]">atenção</span>
        </h1>
        <Link 
          to="/triage"
          className="px-4 py-2 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition-all flex items-center gap-2"
        >
          <span className="w-5 h-5 bg-white text-amber-500 rounded-full flex items-center justify-center font-black text-sm">3</span>
          Triagem
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-white rounded-[14px] p-6 shadow-[0_8px_28px_rgba(10,10,46,.10)] border border-[rgba(26,26,46,0.06)]"
        >
          <div className="text-sm text-[#5A5A7A] mb-1">Em atenção</div>
          <div className="text-3xl font-black text-[#FF6B00]" style={{ fontFamily: 'Nunito, sans-serif' }}>{stats.emAtencao}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[14px] p-6 shadow-[0_8px_28px_rgba(10,10,46,.10)] border border-[rgba(26,26,46,0.06)]"
        >
          <div className="text-sm text-[#5A5A7A] mb-1">Plano ativo</div>
          <div className="text-3xl font-black text-[#1A1AFF]" style={{ fontFamily: 'Nunito, sans-serif' }}>{stats.planoAtivo}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[14px] p-6 shadow-[0_8px_28px_rgba(10,10,46,.10)] border border-[rgba(26,26,46,0.06)]"
        >
          <div className="text-sm text-[#5A5A7A] mb-1">Altas no mês</div>
          <div className="text-3xl font-black text-[#00994D]" style={{ fontFamily: 'Nunito, sans-serif' }}>{stats.altasMes}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[14px] p-6 shadow-[0_8px_28px_rgba(10,10,46,.10)] border border-[rgba(26,26,46,0.06)]"
        >
          <div className="text-sm text-[#5A5A7A] mb-1">Sem update +7d</div>
          <div className="text-3xl font-black text-[#D63030]" style={{ fontFamily: 'Nunito, sans-serif' }}>{stats.semUpdate}</div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5A5A7A]" />
          <input
            type="text"
            placeholder="Buscar aluno..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-[14px] border border-[rgba(26,26,46,0.1)] shadow-[0_2px_12px_rgba(10,10,46,0.04)] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 transition-shadow"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedFilter === 'all' 
                ? 'bg-[#1A1A2E] text-white' 
                : 'bg-white text-[#5A5A7A] border border-[rgba(26,26,46,0.1)] hover:border-[#1A1A2E]/30'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedFilter('reforco')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedFilter === 'reforco' 
                ? 'bg-[#FF6B00] text-white' 
                : 'bg-white text-[#5A5A7A] border border-[rgba(26,26,46,0.1)] hover:border-[#FF6B00]/30'
            }`}
          >
            Reforço
          </button>
          <button
            onClick={() => setSelectedFilter('pais')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedFilter === 'pais' 
                ? 'bg-[#1A1AFF] text-white' 
                : 'bg-white text-[#5A5A7A] border border-[rgba(26,26,46,0.1)] hover:border-[#1A1AFF]/30'
            }`}
          >
            Conv. Pais
          </button>
          <button
            onClick={() => setSelectedFilter('monitorar')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedFilter === 'monitorar' 
                ? 'bg-[#5A5A7A] text-white' 
                : 'bg-white text-[#5A5A7A] border border-[rgba(26,26,46,0.1)] hover:border-[#5A5A7A]/30'
            }`}
          >
            Monitorando
          </button>
          <button
            onClick={() => setSelectedFilter('pedagogico')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedFilter === 'pedagogico' 
                ? 'bg-[#B44FFF] text-white' 
                : 'bg-white text-[#5A5A7A] border border-[rgba(26,26,46,0.1)] hover:border-[#B44FFF]/30'
            }`}
          >
            Ajuste Pedag.
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="space-y-3">
        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-[14px] p-12 text-center shadow-[0_8px_28px_rgba(10,10,46,.10)]">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-black text-[#1A1A2E] mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Nenhum aluno encontrado
            </h3>
            <p className="text-[#5A5A7A]">Tente ajustar os filtros ou adicionar um novo aluno.</p>
          </div>
        ) : (
          filteredStudents.map((student, index) => {
            const daysSince = getDaysSinceUpdate(student.lastUpdate);
            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/student/${student.id}`}>
                  <div className="bg-white rounded-[14px] p-5 shadow-[0_4px_20px_rgba(10,10,46,.08)] border border-[rgba(26,26,46,0.06)] hover:shadow-[0_8px_32px_rgba(10,10,46,.12)] hover:border-[#FF6B00]/20 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      {/* Photo */}
                      <div className={`relative flex-shrink-0 ${student.urgent ? 'ring-4 ring-[#FF6B00]/30 rounded-full' : ''}`}>
                        <img 
                          src={student.photo} 
                          alt={student.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        {student.urgent && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6B00] rounded-full border-2 border-white animate-pulse"></div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-black text-[#1A1A2E]" style={{ fontFamily: 'Nunito, sans-serif' }}>
                            {student.name}
                          </h3>
                          <span className="px-3 py-1 bg-[#F4F4F8] text-[#5A5A7A] text-xs font-semibold rounded-full">
                            {student.level}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {/* Attention Type Pills */}
                          {student.attentionTypes.slice(0, 4).map(type => (
                            <span 
                              key={type}
                              className={`px-3 py-1 text-xs font-semibold rounded-full border ${attentionTypeColors[type]}`}
                            >
                              {attentionTypeLabels[type]}
                            </span>
                          ))}
                          
                          {/* Stage Tag */}
                          <span className="px-3 py-1 bg-white border border-[rgba(26,26,46,0.1)] text-[#1A1A2E] text-xs font-semibold rounded-full">
                            {stageLabels[student.stage]}
                          </span>

                          {/* Days Since Update */}
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            daysSince > 7 
                              ? 'bg-[#D63030]/10 text-[#D63030]' 
                              : 'bg-[#00994D]/10 text-[#00994D]'
                          }`}>
                            {daysSince === 0 ? 'Hoje' : `${daysSince}d atrás`}
                          </span>
                        </div>
                      </div>

                      {/* Chevron */}
                      <ChevronRight className="w-5 h-5 text-[#5A5A7A] group-hover:text-[#FF6B00] group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>

      {/* FAB Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-8 right-8 bg-[#FF6B00] text-white px-6 py-4 rounded-full shadow-[0_8px_28px_rgba(255,107,0,0.3)] hover:shadow-[0_12px_36px_rgba(255,107,0,0.4)] hover:scale-105 transition-all flex items-center gap-2 font-semibold"
      >
        <Plus className="w-5 h-5" />
        Adicionar aluno
      </button>

      {/* Add Student Modal */}
      <AddStudentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}