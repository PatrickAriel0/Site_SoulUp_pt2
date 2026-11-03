import { Card } from "@/components/ui/Card";
import type { UsuarioApi, CartaoPontosApi } from "@/types";

interface CardUsuarioProps {
  usuarios: UsuarioApi[];
  usuarioSelecionado: UsuarioApi | null;
  cartao: CartaoPontosApi | null;
  onSelecionar: (usuario: UsuarioApi) => void;
}

export function CardUsuario({ usuarios, usuarioSelecionado, cartao, onSelecionar }: CardUsuarioProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-base font-bold text-white mb-3">Usuário Ativo</h3>
        <div className="space-y-2 mb-4">
          <label className="text-xs text-slate-400 font-semibold uppercase">Selecione o Usuário</label>
          <select
            value={usuarioSelecionado?.id || ""}
            onChange={(e) => {
              const u = usuarios.find((user) => user.id === Number(e.target.value));
              if (u) onSelecionar(u);
            }}
            className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white"
          >
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome} ({u.cpf})
              </option>
            ))}
          </select>
        </div>

        {usuarioSelecionado && (
          <div className="pt-4 border-t border-white/10 text-sm space-y-1 text-slate-300">
            <p><span className="font-semibold text-white">E-mail:</span> {usuarioSelecionado.email}</p>
            <p><span className="font-semibold text-white">CPF:</span> {usuarioSelecionado.cpf}</p>
          </div>
        )}
      </Card>

      <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl shadow-lg border border-emerald-400/30">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-200 font-bold">
              Bilhete Integrado SoulUp
            </span>
            <p className="text-lg font-mono font-bold mt-1">{cartao?.numeroCartao || "CP-000"}</p>
          </div>
          <span className="text-2xl">🌱</span>
        </div>
        <div>
          <span className="text-xs text-emerald-100">Saldo Disponível</span>
          <p className="text-3xl font-black mt-1">{cartao?.saldoPontos || 0} pts</p>
        </div>
      </div>
    </div>
  );
}