import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Sparkles, Plus, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { mockStudents, mockSessions, mockPrescriptions } from '../data/mockData';
import { AttentionType } from '../types';
import { motion } from 'motion/react';

const attentionTypeLabels: Record<AttentionType, string> = {
  reforco: 'Reforço',
  pais: 'Conversas com Pais',
  monitorar: 'Monitoramento',
  pedagogico: 'Ajuste Pedagógico'
};

const stageInfo = [
  { key: 'identificado', label: 'Identificado' },
  { key: 'diagnostico', label: 'Em diagnóstico' },
  { key: 'plano-ativo', label: 'Plano ativo' },
  { key: 'progresso-inicial', label: 'Progresso inicial' },
  { key: 'consolidando', label: 'Consolidando' },
  { key: 'quase-la', label: 'Quase lá' },
  { key: 'alta', label: 'Alta' }
];

const progressColors = {
  excellent: 'text-[#00994D]',
  good: 'text-[#1A1AFF]',
  moderate: 'text-[#FF6B00]',
  poor: 'text-[#D63030]'
};

const progressLabels = {
  excellent: 'Excelente',
  good: 'Bom',
  moderate: 'Moderado',
  poor: 'Precisa melhorar'
};

export function StudentDetail() {
  const { id } = useParams();
  const student = mockStudents.find(s => s.id === id);
  const [activeTab, setActiveTab] = useState<AttentionType>(student?.attentionTypes[0] || 'reforco');

  if (!student) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-black text-[#1A1A2E]">Aluno não encontrado</h2>
        <Link to="/" className="text-[#FF6B00] hover:underline mt-4 inline-block">
          Voltar para lista
        </Link>
      </div>
    );
  }

  const sessions = mockSessions.filter(s => s.studentId === id);
  const prescription = mockPrescriptions.find(p => p.studentId === id);
  const currentStageIndex = stageInfo.findIndex(s => s.key === student.stage);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 text-[#5A5A7A] hover:text-[#FF6B00] transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Voltar</span>
      </Link>

      {/* Student Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[14px] p-8 shadow-[0_8px_28px_rgba(10,10,46,.10)] border border-[rgba(26,26,46,0.06)]"
      >
        <div className="flex items-start gap-6">
          <img 
            src={student.photo} 
            alt={student.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-[#FF6B00]/20"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-[#1A1A2E]" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {student.name}
              </h1>
              <span className="px-3 py-1 bg-[#F4F4F8] text-[#5A5A7A] text-sm font-semibold rounded-full">
                {student.level}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {student.attentionTypes.map(type => (
                <span 
                  key={type}
                  className="px-3 py-1 bg-[#FF6B00]/10 text-[#FF6B00] text-sm font-semibold rounded-full border border-[#FF6B00]/20"
                >
                  {attentionTypeLabels[type]}
                </span>
              ))}
            </div>

            <p className="text-sm text-[#5A5A7A]">
              Adicionado por <span className="font-semibold text-[#1A1A2E]">{student.addedBy}</span>
            </p>
          </div>
        </div>

        {/* Observation */}
        <div className="mt-6 p-4 bg-[#F4F4F8] rounded-[14px]">
          <div className="text-sm font-semibold text-[#1A1A2E] mb-1">Observação inicial</div>
          <p className="text-sm text-[#5A5A7A]">{student.observation}</p>
        </div>

        {/* Difficulties */}
        <div className="mt-4">
          <div className="text-sm font-semibold text-[#1A1A2E] mb-2">Dificuldades</div>
          <div className="flex flex-wrap gap-2">
            {student.difficulties.map(diff => (
              <span 
                key={diff}
                className="px-3 py-1 bg-white border border-[rgba(26,26,46,0.1)] text-[#1A1A2E] text-sm font-medium rounded-full"
              >
                {diff}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-[14px] p-6 shadow-[0_8px_28px_rgba(10,10,46,.10)] border border-[rgba(26,26,46,0.06)]"
      >
        <h2 className="text-lg font-black text-[#1A1A2E] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Progresso
        </h2>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-[#F4F4F8]">
            <div 
              className="h-full bg-[#FF6B00] transition-all duration-500"
              style={{ width: `${(currentStageIndex / (stageInfo.length - 1)) * 100}%` }}
            />
          </div>

          {/* Stage Dots */}
          <div className="relative flex justify-between">
            {stageInfo.map((stage, index) => {
              const isCompleted = index <= currentStageIndex;
              const isCurrent = index === currentStageIndex;
              
              return (
                <div key={stage.key} className="flex flex-col items-center" style={{ width: '14.28%' }}>
                  <div 
                    className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-[#FF6B00] border-white shadow-[0_0_0_2px_#FF6B00]' 
                        : 'bg-white border-[#F4F4F8]'
                    } ${isCurrent ? 'scale-110' : ''}`}
                  >
                    {isCompleted && <CheckCircle className="w-5 h-5 text-white" />}
                  </div>
                  <div className={`mt-2 text-xs text-center font-semibold ${
                    isCompleted ? 'text-[#1A1A2E]' : 'text-[#5A5A7A]'
                  }`}>
                    {stage.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Tabs for Multiple Attention Types */}
      {student.attentionTypes.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {student.attentionTypes.map(type => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                activeTab === type
                  ? 'bg-[#FF6B00] text-white'
                  : 'bg-white text-[#5A5A7A] border border-[rgba(26,26,46,0.1)] hover:border-[#FF6B00]/30'
              }`}
            >
              {attentionTypeLabels[type]}
            </button>
          ))}
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Prescription Card */}
        {prescription && activeTab === 'reforco' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[14px] p-6 shadow-[0_8px_28px_rgba(10,10,46,.10)] border border-[rgba(26,26,46,0.06)]"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#B44FFF] rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-black text-[#1A1A2E]" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Prescrição IA
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-semibold text-[#1A1A2E] mb-1">Abordagem</div>
                <p className="text-sm text-[#5A5A7A]">{prescription.approach}</p>
              </div>

              <div>
                <div className="text-sm font-semibold text-[#1A1A2E] mb-1">Materiais</div>
                <p className="text-sm text-[#5A5A7A]">{prescription.materials}</p>
              </div>

              <div>
                <div className="text-sm font-semibold text-[#1A1A2E] mb-1">Frequência</div>
                <p className="text-sm text-[#5A5A7A]">{prescription.frequency}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sessions Card */}
        {activeTab === 'reforco' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[14px] p-6 shadow-[0_8px_28px_rgba(10,10,46,.10)] border border-[rgba(26,26,46,0.06)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-[#1A1A2E]" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Sessões de reforço
              </h3>
              <button className="p-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {sessions.length === 0 ? (
                <p className="text-sm text-[#5A5A7A] text-center py-8">
                  Nenhuma sessão registrada ainda
                </p>
              ) : (
                sessions.map(session => (
                  <div key={session.id} className="p-4 bg-[#F4F4F8] rounded-[14px]">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-semibold text-[#1A1A2E]">
                          {new Date(session.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-xs text-[#5A5A7A]">
                          {session.duration} min • {session.assistant}
                        </div>
                      </div>
                      <span className={`text-xs font-semibold ${progressColors[session.progress]}`}>
                        {progressLabels[session.progress]}
                      </span>
                    </div>
                    <p className="text-sm text-[#5A5A7A]">{session.notes}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Other attention types content */}
        {activeTab === 'pais' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[14px] p-6 shadow-[0_8px_28px_rgba(10,10,46,.10)] border border-[rgba(26,26,46,0.06)] lg:col-span-2"
          >
            <h3 className="text-lg font-black text-[#1A1A2E] mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Conversas com Pais
            </h3>
            <div className="text-center py-8 text-[#5A5A7A]">
              <Users className="w-12 h-12 mx-auto mb-3 text-[#1A1AFF]" />
              <p>Registre reuniões e acompanhamentos com os pais</p>
              <button className="mt-4 px-6 py-2 bg-[#1A1AFF] text-white rounded-full font-semibold hover:bg-[#1A1AFF]/90 transition-colors">
                Agendar reunião
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4"
      >
        <button className="flex-1 bg-[#00994D] text-white py-4 rounded-[14px] font-bold shadow-[0_4px_20px_rgba(0,153,77,0.3)] hover:shadow-[0_6px_28px_rgba(0,153,77,0.4)] hover:scale-[1.02] transition-all">
          Avançar estágio
        </button>
        <button className="flex-1 bg-white text-[#D63030] border-2 border-[#D63030] py-4 rounded-[14px] font-bold hover:bg-[#D63030]/5 transition-all">
          Solicitar revisão
        </button>
      </motion.div>
    </div>
  );
}