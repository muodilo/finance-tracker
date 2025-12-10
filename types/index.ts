export interface UserDocument {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
  photoURL?: string;
  phoneNumber?: string;
}

export interface ExpenseDocument {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  createdAt: Date;
}