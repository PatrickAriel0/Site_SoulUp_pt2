import { useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { useTituloPagina } from "@/hooks/useTituloPagina";

/** Formato dos dados capturados pelo formulario de contato. */
interface FormularioContato {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

const ASSUNTOS = [
  "Dúvida sobre a plataforma",
  "Conversão de pontos",
  "Parceria institucional",
  "Suporte técnico",
  "Outro assunto",
];

const INFORMACOES = [
  { rotulo: "Product Owner", valor: "Patrick Ariel", icone: "◆" },
  { rotulo: "Repositório", valor: "github.com/PatrickAriel0/Site_SoulUp_pt2", icone: "◈" },
  { rotulo: "Turma", valor: "1TDSPK — FIAP", icone: "◉" },
];

export default function Contato() {
  useTituloPagina("Contato");

  const [enviado, setEnviado] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormularioContato>({
    // defaultValues evita o salto de campo nao controlado para controlado
    defaultValues: { nome: "", email: "", assunto: ASSUNTOS[0], mensagem: "" },
  });

  const mensagemAtual = watch("mensagem");

  async function aoEnviar(dados: FormularioContato) {
    // A Sprint 03 nao consome API: a submissao apenas confirma os dados validados.
    // O await simula a espera para que o estado isSubmitting fique visivel.
    await new Promise((resolver) => setTimeout(resolver, 600));

    console.info("Formulário validado com sucesso:", dados);
    setEnviado(true);
    reset();
  }

  const classeCampo = (temErro: boolean): string =>
    `w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors ${
      temErro
        ? "border-red-400/60 focus:border-red-400"
        : "border-white/10 focus:border-neon-400/50"
    }`;

  return (
    <>
      <section className="pb-10 pt-12 sm:pt-20">
        <Container>
          <Badge>Contato</Badge>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Fale com a NepTune Labs
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">
            Dúvidas sobre a plataforma, sugestões ou interesse em parceria? Preencha
            o formulário e a equipe retorna o contato.
          </p>
        </Container>
      </section>

      <section className="pb-12 sm:pb-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="space-y-4">
              {INFORMACOES.map((info) => (
                <Card key={info.rotulo} comHover>
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-neon-400/20 to-eco-400/20 text-lg text-neon-300">
                      {info.icone}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        {info.rotulo}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-medium text-white">
                        {info.valor}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card>
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Envie sua mensagem
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Todos os campos marcados são obrigatórios.
              </p>

              <form
                onSubmit={handleSubmit(aoEnviar)}
                noValidate
                className="mt-6 space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="nome"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Nome completo
                    </label>
                    <input
                      id="nome"
                      type="text"
                      placeholder="Seu nome"
                      aria-invalid={Boolean(errors.nome)}
                      aria-describedby={errors.nome ? "erro-nome" : undefined}
                      className={classeCampo(Boolean(errors.nome))}
                      {...register("nome", {
                        required: "Informe seu nome.",
                        minLength: {
                          value: 3,
                          message: "O nome precisa ter ao menos 3 caracteres.",
                        },
                      })}
                    />
                    {errors.nome && (
                      <span
                        id="erro-nome"
                        role="alert"
                        className="mt-1.5 block text-xs text-red-400"
                      >
                        {errors.nome.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="voce@email.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "erro-email" : undefined}
                      className={classeCampo(Boolean(errors.email))}
                      {...register("email", {
                        required: "Informe seu e-mail.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                          message: "Digite um e-mail válido.",
                        },
                      })}
                    />
                    {errors.email && (
                      <span
                        id="erro-email"
                        role="alert"
                        className="mt-1.5 block text-xs text-red-400"
                      >
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="assunto"
                    className="mb-1.5 block text-sm font-medium text-slate-300"
                  >
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-3 text-sm text-white transition-colors focus:border-neon-400/50"
                    {...register("assunto", { required: true })}
                  >
                    {ASSUNTOS.map((assunto) => (
                      <option key={assunto} value={assunto}>
                        {assunto}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="mensagem"
                    className="mb-1.5 block text-sm font-medium text-slate-300"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    rows={5}
                    placeholder="Descreva sua dúvida ou sugestão..."
                    aria-invalid={Boolean(errors.mensagem)}
                    aria-describedby={errors.mensagem ? "erro-mensagem" : undefined}
                    className={`${classeCampo(Boolean(errors.mensagem))} resize-y`}
                    {...register("mensagem", {
                      required: "Escreva sua mensagem.",
                      minLength: {
                        value: 10,
                        message: "A mensagem precisa ter ao menos 10 caracteres.",
                      },
                      maxLength: {
                        value: 500,
                        message: "A mensagem pode ter no máximo 500 caracteres.",
                      },
                    })}
                  />

                  <div className="mt-1.5 flex items-start justify-between gap-4">
                    {errors.mensagem ? (
                      <span
                        id="erro-mensagem"
                        role="alert"
                        className="text-xs text-red-400"
                      >
                        {errors.mensagem.message}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="shrink-0 font-mono text-xs text-slate-500">
                      {mensagemAtual.length}/500
                    </span>
                  </div>
                </div>

                {enviado && (
                  <p
                    role="status"
                    className="rounded-xl border border-eco-400/30 bg-eco-500/10 px-4 py-3 text-sm text-eco-300"
                  >
                    Mensagem enviada com sucesso. A equipe retornará em breve.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  larguraTotal
                  tamanho="lg"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                </Button>
              </form>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
