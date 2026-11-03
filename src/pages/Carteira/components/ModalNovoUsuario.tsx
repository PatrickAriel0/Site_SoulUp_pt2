import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { UsuarioApi } from "@/types";

interface ModalUsuarioProps {
  aberto: boolean;
  onFechar: () => void;
  onSalvar: (dados: Omit<UsuarioApi, "id">) => Promise<void>;
  salvando: boolean;
}

export function ModalNovoUsuario({ aberto, onFechar, onSalvar, salvando }: ModalUsuarioProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  if (!aberto) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSalvar({ nome: nome.trim(), email: email.trim(), cpf: cpf.trim() });
    setNome("");
    setEmail("");
    setCpf("");
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-white/15">
        <h3 className="text-xl font-bold text-white mb-2">Cadastrar Novo Usuário</h3>
        <p className="text-sm text-slate-400 mb-6">Envia requisição POST para <code>/usuarios</code>.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Carlos Oliveira"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: carlos@email.com"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">CPF</label>
            <input
              type="text"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Ex: 123.456.789-00"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button type="button" variante="secundaria" onClick={onFechar} disabled={salvando}>
              Cancelar
            </Button>
            <Button type="submit" variante="primaria" disabled={salvando}>
              {salvando ? "Salvando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}