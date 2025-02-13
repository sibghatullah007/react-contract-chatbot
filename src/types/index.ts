export interface UploadResponse {
    contract_id: string;
    summary: string;
  }
  
  export interface ChatMessage {
    text: string;
    sender: "user" | "bot";
  }
  
  export interface ChatResponse {
    answer: string;
  }
  