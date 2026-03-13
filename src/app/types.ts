export type AttentionType = 'reforco' | 'pais' | 'monitorar' | 'pedagogico';
export type StudentLevel = 'Kids 1' | 'Kids 2' | 'Kids 3' | 'Kids 4' | 'Kids 5' | 'Kids 6' | 'Teens 1' | 'Teens 2' | 'Teens 3' | 'Teens 4' | 'Teens 5' | 'Teens 6';
export type StudentStage = 'identificado' | 'diagnostico' | 'plano-ativo' | 'progresso-inicial' | 'consolidando' | 'quase-la' | 'alta';
export type UserRole = 'Coordenador' | 'Professor' | 'Assistente';
export type Difficulty = 'Pronúncia' | 'Gramática' | 'Vocabulário' | 'Listening' | 'Bloqueio emocional' | 'Ritmo' | 'Outro';

export interface Student {
  id: string;
  name: string;
  photo?: string;
  level: StudentLevel;
  attentionTypes: AttentionType[];
  stage: StudentStage;
  lastUpdate: Date;
  urgent: boolean;
  addedBy: string;
  difficulties: Difficulty[];
  observation: string;
}

export interface Session {
  id: string;
  studentId: string;
  date: Date;
  duration: number;
  notes: string;
  assistant: string;
  progress: 'excellent' | 'good' | 'moderate' | 'poor';
}

export interface AIPrescription {
  studentId: string;
  approach: string;
  materials: string;
  frequency: string;
  lastUpdated: Date;
}

export interface User {
  name: string;
  role: UserRole;
  avatar?: string;
}
