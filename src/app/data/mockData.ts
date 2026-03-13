import { Student, Session, AIPrescription, User } from '../types';

export const mockUser: User = {
  name: 'Ana Silva',
  role: 'Coordenador',
  avatar: 'https://i.pravatar.cc/150?img=47'
};

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Lucas Henrique',
    photo: 'https://i.pravatar.cc/150?img=12',
    level: 'Kids 3',
    attentionTypes: ['reforco', 'pedagogico'],
    stage: 'plano-ativo',
    lastUpdate: new Date('2026-03-10'),
    urgent: false,
    addedBy: 'Prof. Mariana Costa',
    difficulties: ['Pronúncia', 'Listening'],
    observation: 'Aluno apresenta dificuldade em sons específicos do inglês, principalmente "th" e "r". Precisa de reforço individualizado.'
  },
  {
    id: '2',
    name: 'Beatriz Oliveira',
    photo: 'https://i.pravatar.cc/150?img=45',
    level: 'Teens 2',
    attentionTypes: ['pais', 'monitorar'],
    stage: 'diagnostico',
    lastUpdate: new Date('2026-03-05'),
    urgent: true,
    addedBy: 'Prof. Carlos Mendes',
    difficulties: ['Bloqueio emocional', 'Vocabulário'],
    observation: 'Apresenta ansiedade em apresentações orais. Pais solicitaram reunião para discutir estratégias de apoio.'
  },
  {
    id: '3',
    name: 'Gabriel Santos',
    photo: 'https://i.pravatar.cc/150?img=33',
    level: 'Kids 5',
    attentionTypes: ['reforco'],
    stage: 'progresso-inicial',
    lastUpdate: new Date('2026-03-12'),
    urgent: false,
    addedBy: 'Prof. Julia Ferreira',
    difficulties: ['Gramática', 'Ritmo'],
    observation: 'Dificuldade com tempos verbais. Está respondendo bem às sessões de reforço.'
  },
  {
    id: '4',
    name: 'Maria Eduarda',
    photo: 'https://i.pravatar.cc/150?img=23',
    level: 'Teens 4',
    attentionTypes: ['pedagogico'],
    stage: 'consolidando',
    lastUpdate: new Date('2026-03-11'),
    urgent: false,
    addedBy: 'Prof. Roberto Lima',
    difficulties: ['Listening', 'Vocabulário'],
    observation: 'Ajuste na abordagem em sala resultou em melhor engajamento. Continuar monitorando.'
  },
  {
    id: '5',
    name: 'Pedro Costa',
    photo: 'https://i.pravatar.cc/150?img=52',
    level: 'Kids 2',
    attentionTypes: ['monitorar'],
    stage: 'identificado',
    lastUpdate: new Date('2026-03-01'),
    urgent: true,
    addedBy: 'Prof. Ana Paula',
    difficulties: ['Ritmo'],
    observation: 'Criança está um pouco mais lenta que a turma, mas sem dificuldades específicas. Observar evolução.'
  },
  {
    id: '6',
    name: 'Sofia Rodrigues',
    photo: 'https://i.pravatar.cc/150?img=16',
    level: 'Kids 4',
    attentionTypes: ['reforco', 'pais'],
    stage: 'quase-la',
    lastUpdate: new Date('2026-03-13'),
    urgent: false,
    addedBy: 'Prof. Mariana Costa',
    difficulties: ['Pronúncia'],
    observation: 'Progresso excelente nas últimas semanas. Próxima da alta.'
  }
];

export const mockSessions: Session[] = [
  {
    id: 's1',
    studentId: '1',
    date: new Date('2026-03-10'),
    duration: 30,
    notes: 'Trabalhamos pronúncia de "th" com espelho. Lucas mostrou melhora significativa.',
    assistant: 'Juliana Mendes',
    progress: 'good'
  },
  {
    id: 's2',
    studentId: '1',
    date: new Date('2026-03-05'),
    duration: 30,
    notes: 'Primeira sessão de diagnóstico. Identificados sons problemáticos.',
    assistant: 'Juliana Mendes',
    progress: 'moderate'
  },
  {
    id: 's3',
    studentId: '3',
    date: new Date('2026-03-12'),
    duration: 45,
    notes: 'Revisão de past simple e past continuous. Aluno fez exercícios práticos com 80% de acertos.',
    assistant: 'Carlos Alberto',
    progress: 'excellent'
  },
  {
    id: 's4',
    studentId: '6',
    date: new Date('2026-03-13'),
    duration: 30,
    notes: 'Última sessão de reforço. Sofia está pronta para seguir sozinha.',
    assistant: 'Juliana Mendes',
    progress: 'excellent'
  }
];

export const mockPrescriptions: AIPrescription[] = [
  {
    studentId: '1',
    approach: 'Trabalho focado em fonética com uso de espelho e repetição guiada. Exercícios de listening com ênfase nos sons problemáticos.',
    materials: 'Mirror technique flashcards, áudio com pronúncia exagerada, trabalho com pares mínimos (think/sink, right/light)',
    frequency: '2x por semana, sessões de 30 minutos',
    lastUpdated: new Date('2026-03-08')
  },
  {
    studentId: '2',
    approach: 'Criar ambiente seguro para prática oral. Começar com apresentações em pequenos grupos antes de apresentações maiores.',
    materials: 'Role-play cards, tópicos de interesse pessoal, gravações para auto-avaliação sem julgamento',
    frequency: 'Acompanhamento em sala + reunião com pais quinzenal',
    lastUpdated: new Date('2026-03-06')
  },
  {
    studentId: '3',
    approach: 'Sistematização de tempos verbais através de linha do tempo visual e prática contextualizada.',
    materials: 'Timeline posters, story-building activities, grammar games focados em verb tenses',
    frequency: '1x por semana, sessões de 45 minutos',
    lastUpdated: new Date('2026-03-09')
  }
];
