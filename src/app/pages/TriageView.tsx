import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Sparkles, Check, X } from 'lucide-react';
import { AttentionType } from '../types';
import { motion } from 'motion/react';

interface TriageStudent {
  id: string;
  name: string;
  photo: string;
  level: string;
  observation: string;
  professorName: string;
  date: Date;
  aiSuggestion: AttentionType;
  difficulties: string[];
}

const mockTriageStudents: TriageStudent[] = [
  {
    id: 't1',
    name: 'João Pedro Silva',
    photo: 'https://i.pravatar.cc/150?img=60',
    level: 'Kids 4',
    observation: 'Aluno demonstra grande dificuldade em compreender áudios, mesmo em velocidade reduzida. Necessita repetição constante das instruções.',
    professorName: 'Prof. Carla Souza',
    date: new Date('2026-03-12'),
    aiSuggestion: 'reforco',
    difficulties: ['Listening', 'Vocabulário']
  },
  {
    id: 't2',
    name: 'Ana Clara Mendes',
    photo: 'https://i.pravatar.cc/150?img=44',
    level: 'Teens 3',
    observation: 'Demonstra ansiedade extrema ao falar em inglês na frente da turma. Pais relataram que ela estuda muito em casa mas trava nas aulas.',
    professorName: 'Prof. Roberto Lima',
    date: new Date('2026-03-11'),
    aiSuggestion: 'pais',
    difficulties: ['Bloqueio emocional']
  },
  {
    id: 't3',
    name: 'Rafael Costa',
    photo: 'https://i.pravatar.cc/150?img=14',
    level: 'Kids 6',
    observation: 'Aluno está um pouco abaixo da turma mas não apresenta dificuldades específicas. Pode ser apenas questão de maturidade.',
    professorName: 'Prof. Mariana Costa',
    date: new Date('2026-03-13'),
    aiSuggestion: 'monitorar',
    difficulties: ['Ritmo']
  }
];

const attentionTypeInfo: Record<AttentionType, { label: string; color: string; bgColor: string }> = {
  reforco: { label: 'Reforço acadêmico', color: 'text-[#FF6B00]', bgColor: 'bg-[#FF6B00]' },
  pais: { label: 'Conversa com pais', color: 'text-[#1A1AFF]', bgColor: 'bg-[#1A1AFF]' },
  monitorar: { label: 'Monitorar', color: 'text-[#5A5A7A]', bgColor: 'bg-[#5A5A7A]' },
  pedagogico: { label: 'Ajuste pedagógico', color: 'text-[#B44FFF]', bgColor: 'bg-[#B44FFF]' }
};

export function TriageView() {
  const [students, setStudents] = useState(mockTriageStudents);
  const [selectedPath, setSelectedPath] = useState<Record<string, AttentionType>>({});

  const handleApprove = (studentId: string, suggestion: AttentionType) => {
    console.log(`Approved ${suggestion} for student ${studentId}`);
    setStudents(prev => prev.filter(s => s.id !== studentId));
  };

  const handleChangePath = (studentId: string) => {
    const path = selectedPath[studentId];
    if (path) {
      console.log(`Changed path to ${path} for student ${studentId}`);
      setStudents(prev => prev.filter(s => s.id !== studentId));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 text-[#5A5A7A] hover:text-[#FF6B00] transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Voltar</span>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-[#1A1A2E] mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Triagem de <span className="text-[#FF6B00]">alunos</span>
        </h1>
        <p className="text-[#5A5A7A]">
          Revise e aprove as sugestões de atenção para novos alunos
        </p>
      </div>

      {/* Stats */}
      <div className="bg-amber-50 border border-amber-200 rounded-[14px] p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-lg">{students.length}</span>
        </div>
        <div>
          <div className="font-bold text-amber-900">Aguardando triagem</div>
          <div className="text-sm text-amber-700">Alunos precisam de sua aprovação</div>
        </div>
      </div>

      {/* Student Cards */}
      <div className="space-y-6">
        {students.length === 0 ? (
          <div className="bg-white rounded-[14px] p-12 text-center shadow-[0_8px_28px_rgba(10,10,46,.10)]">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-black text-[#1A1A2E] mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Tudo em dia!
            </h3>
            <p className="text-[#5A5A7A]">Não há alunos aguardando triagem no momento.</p>
          </div>
        ) : (
          students.map((student, index) => {
            const suggestion = attentionTypeInfo[student.aiSuggestion];
            const selectedType = selectedPath[student.id];
            
            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[14px] p-6 shadow-[0_8px_28px_rgba(10,10,46,.10)] border-2 border-amber-200"
              >
                {/* Student Header */}
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={student.photo} 
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-300"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-black text-[#1A1A2E]" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {student.name}
                      </h3>
                      <span className="px-3 py-1 bg-[#F4F4F8] text-[#5A5A7A] text-xs font-semibold rounded-full">
                        {student.level}
                      </span>
                    </div>
                    
                    <div className="text-sm text-[#5A5A7A] mb-2">
                      Identificado por <span className="font-semibold text-[#1A1A2E]">{student.professorName}</span> • {new Date(student.date).toLocaleDateString('pt-BR')}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {student.difficulties.map(diff => (
                        <span 
                          key={diff}
                          className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full"
                        >
                          {diff}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Observation */}
                <div className="bg-[#F4F4F8] rounded-[14px] p-4 mb-4">
                  <div className="text-sm font-semibold text-[#1A1A2E] mb-1">Observação do professor</div>
                  <p className="text-sm text-[#5A5A7A]">{student.observation}</p>
                </div>

                {/* AI Suggestion */}
                <div className="bg-gradient-to-br from-[#B44FFF]/10 to-[#B44FFF]/5 rounded-[14px] p-4 mb-4 border border-[#B44FFF]/20">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#B44FFF] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#1A1A2E] mb-1">Sugestão da IA</div>
                      <div className={`font-bold ${suggestion.color}`}>
                        {suggestion.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(student.id, student.aiSuggestion)}
                    className="flex-1 bg-[#00994D] text-white py-3 px-4 rounded-[14px] font-bold flex items-center justify-center gap-2 hover:bg-[#00994D]/90 transition-all shadow-[0_4px_20px_rgba(0,153,77,0.2)]"
                  >
                    <Check className="w-5 h-5" />
                    Aprovar sugestão
                  </button>

                  <div className="flex-1 flex gap-2">
                    <select
                      value={selectedType || ''}
                      onChange={(e) => setSelectedPath({...selectedPath, [student.id]: e.target.value as AttentionType})}
                      className="flex-1 px-4 py-3 bg-white border-2 border-[rgba(26,26,46,0.1)] rounded-[14px] text-sm font-semibold focus:border-[#FF6B00] focus:outline-none"
                    >
                      <option value="">Escolher outro caminho</option>
                      <option value="reforco">Reforço acadêmico</option>
                      <option value="pais">Conversa com pais</option>
                      <option value="monitorar">Monitorar</option>
                      <option value="pedagogico">Ajuste pedagógico</option>
                    </select>
                    
                    <button
                      onClick={() => handleChangePath(student.id)}
                      disabled={!selectedType}
                      className="px-4 bg-[#FF6B00] text-white rounded-[14px] font-bold hover:bg-[#FF6B00]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
