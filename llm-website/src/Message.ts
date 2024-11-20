export type Message = {
  type: "apiMessage" | "userMessage";
  message: string;
  isStreaming?: boolean;
  // sourceDocs?: Document[];
};

export interface messageState {
  messages: Message[];
  pending?: string;
  history: [string, string][];
  // id: number;
}
