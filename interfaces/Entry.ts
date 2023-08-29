export interface Entry {
  _id: string;
  description: string;
  createdAt: Date;
  status: EntryStatus;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';
