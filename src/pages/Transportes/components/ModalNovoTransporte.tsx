import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { TransporteApi } from "@/types";

interface ModalProps {
  aberto: boolean;
  onFechar: () => void;
  onSalvar: (dados: Omit<TransporteApi, "id">) => Promise<void>;
  salvando: boolean;
}

export function ModalNovoTransporte({ aberto, onFechar, onSalvar, salvando }: ModalProps) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<TransporteApi["tipo"]>("Ônibus");
  const [pontos, setPontos] = useState(100);
  const [taxa, setTaxa] = useState(0.03);

  if (!aberto) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;
    await onSalvar({ nome: nome.trim(), tipo, valorPontos: Number(pontos), taxaCarbono: Number(taxa) });
    setNome("");
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-white/15">
        <h3 className="text-xl font-bold text-white mb-2">Cadastrar Transporte</h3>
        <p className="text-sm text-slate-400 mb-6">
          Envia requisição POST para o endpoint <code>/transportes</code> da API Java.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nome da Rota</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Linha 4-Amarela"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Transporte</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TransporteApi["tipo"])}
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Ônibus">Ônibus</option>
              <option value="Metrô">Metrô</option>
              <option value="Trem">Trem</option>
              <option value="Bicicleta">Bicicleta</option>
              <option value="VLT">VLT</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Pontos Ganhos</label>
              <input
                type="number"
                required
                min="0"
                value={pontos}
                onChange={(e) => setPontos(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Taxa CO₂ (kg/km)</label>
              <input
                type="number"
                step="0.01"
                required
                min="0"
                value={taxa}
                onChange={(e) => setTaxa(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button type="button" variante="secundaria" onClick={onFechar} disabled={salvando}>
              Cancelar
            </Button>
            <Button type="submit" variante="primaria" disabled={salvando}>
              {salvando ? "Enviando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}