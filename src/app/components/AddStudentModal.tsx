import { useState } from 'react';
import { X, Camera, BookOpen, Users, Eye, Target } from 'lucide-react';
import { AttentionType, Difficulty, StudentLevel } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const attentionTypeOptions = [
  {
    type: 'reforco' as AttentionType,
    icon: BookOpen,
    label: 'Reforço acadêmico',
    description: 'Sessões com assistente',
    color: 'bg-[#FF6B00]'
  },
  {
    type: 'pais' as AttentionType,
    icon: Users,
    label: 'Conversa com pais',
    description: 'Reunião e acompanhamento',
    color: 'bg-[#1A1AFF]'
  },
  {
    type: 'monitorar' as AttentionType,
    icon: Eye,
    label: 'Monitorar',
    description: 'Observação sem ação imediata',
    color: 'bg-[#5A5A7A]'
  },
  {
    type: 'pedagogico' as AttentionType,
    icon: Target,
    label: 'Ajuste pedagógico',
    description: 'Mudança de abordagem em sala',
    color: 'bg-[#B44FFF]'
  }
];

const difficultyOptions: Difficulty[] = [
  'Pronúncia',
  'Gramática',
  'Vocabulário',
  'Listening',
  'Bloqueio emocional',
  'Ritmo',
  'Outro'
];

const levelOptions: StudentLevel[] = [
  'Kids 1', 'Kids 2', 'Kids 3', 'Kids 4', 'Kids 5', 'Kids 6',
  'Teens 1', 'Teens 2', 'Teens 3', 'Teens 4', 'Teens 5', 'Teens 6'
];

export function AddStudentModal({ isOpen, onClose }: AddStudentModalProps) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<StudentLevel>('Kids 1');
  const [selectedAttentionTypes, setSelectedAttentionTypes] = useState<AttentionType[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [observation, setObservation] = useState('');

  const toggleAttentionType = (type: AttentionType) => {
    setSelectedAttentionTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleSubmit = () => {
    // In a real app, this would save the student
    console.log({ name, level, selectedAttentionTypes, selectedDifficulties, observation });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[24px] shadow-[0_-8px_40px_rgba(10,10,46,0.2)] max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-[rgba(26,26,46,0.1)] px-6 py-4 flex items-center justify-between rounded-t-[24px]">
              <h2 className="text-2xl font-black text-[#1A1A2E]" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Adicionar aluno
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#F4F4F8] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#5A5A7A]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
                  Nome do aluno
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite o nome completo"
                  className="w-full px-4 py-3 bg-[#F4F4F8] rounded-[14px] border border-transparent focus:border-[#FF6B00] focus:outline-none transition-colors"
                />
              </div>

              {/* Level Selector */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
                  Nível
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as StudentLevel)}
                  className="w-full px-4 py-3 bg-[#F4F4F8] rounded-[14px] border border-transparent focus:border-[#FF6B00] focus:outline-none transition-colors"
                >
                  {levelOptions.map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
                  Foto do aluno
                </label>
                <div className="border-2 border-dashed border-[rgba(26,26,46,0.2)] rounded-[14px] p-8 text-center hover:border-[#FF6B00]/40 transition-colors cursor-pointer">
                  <Camera className="w-12 h-12 text-[#5A5A7A] mx-auto mb-3" />
                  <p className="text-sm text-[#5A5A7A]">Clique para fazer upload</p>
                </div>
              </div>

              {/* Attention Type Selector */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-3">
                  Tipo de atenção
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {attentionTypeOptions.map(option => {
                    const Icon = option.icon;
                    const isSelected = selectedAttentionTypes.includes(option.type);
                    return (
                      <button
                        key={option.type}
                        onClick={() => toggleAttentionType(option.type)}
                        className={`p-4 rounded-[14px] border-2 text-left transition-all ${
                          isSelected
                            ? `${option.color} text-white border-transparent shadow-[0_4px_20px_rgba(10,10,46,0.15)]`
                            : 'bg-white text-[#1A1A2E] border-[rgba(26,26,46,0.1)] hover:border-[rgba(26,26,46,0.2)]'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                          isSelected ? 'bg-white/20' : 'bg-[#F4F4F8]'
                        }`}>
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#5A5A7A]'}`} />
                        </div>
                        <div className="font-bold mb-1">{option.label}</div>
                        <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-[#5A5A7A]'}`}>
                          {option.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty Pills */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-3">
                  Dificuldades identificadas
                </label>
                <div className="flex flex-wrap gap-2">
                  {difficultyOptions.map(difficulty => {
                    const isSelected = selectedDifficulties.includes(difficulty);
                    return (
                      <button
                        key={difficulty}
                        onClick={() => toggleDifficulty(difficulty)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-[#FF6B00] text-white'
                            : 'bg-white text-[#5A5A7A] border border-[rgba(26,26,46,0.1)] hover:border-[#FF6B00]/30'
                        }`}
                      >
                        {difficulty}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Observation Text Area */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
                  Observação
                </label>
                <textarea
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  placeholder="Descreva o que foi observado sobre o aluno..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#F4F4F8] rounded-[14px] border border-transparent focus:border-[#FF6B00] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!name || selectedAttentionTypes.length === 0}
                className="w-full bg-[#FF6B00] text-white py-4 rounded-[14px] font-bold shadow-[0_4px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_6px_28px_rgba(255,107,0,0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
              >
                Adicionar aluno
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
