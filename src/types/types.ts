
export interface Contato {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  complemento?: string;
  latitude: number;
  longitude: number;
}

export interface ContatoRequest {
  nome: string;
  cpf: string;
  telefone: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  complemento?: string;
}

export interface JwtResponse {
  token: string;
  type: string;
}