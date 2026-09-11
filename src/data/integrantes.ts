import type { Integrante } from "@/types";

export const integrantes: Integrante[] = [
  {
    rm: "573589",
    nome: "Patrick Ariel",
    turma: "1TDSPK",
    funcao: "Product Owner (P.O.)",
    bio: "Responsável por priorizar as entregas, organizar os requisitos do produto e alinhar o desenvolvimento da SoulUp aos objetivos da sprint. Também atua na configuração do projeto, versionamento e documentação da equipe.",
    foto: "/fotos/patrickariel_foto.png",
    github: "https://github.com/PatrickAriel0",
    linkedin: "https://www.linkedin.com/in/patrick-ariel",
    habilidades: ["Product Ownership", "Git/GitHub", "React", "Documentação"],
  },
  {
    rm: "571202",
    nome: "Bruno Pires",
    turma: "1TDSPK",
    funcao: "Scrum Master",
    bio: "Responsável pela organização das sprints e pela comunicação entre a equipe e a disciplina. Atuou na estrutura das páginas e na padronização do repositório.",
    foto: "/fotos/brunopires_foto.jpeg",
    github: "https://github.com/brunogmanhaes-cell",
    linkedin: "https://www.linkedin.com/in/bruno-pires-manh%C3%A3es-ba7ab9401/",
    habilidades: ["Gestão de Sprint", "HTML", "CSS", "Git"],
  },
  {
    rm: "573547",
    nome: "Pedro Henrique",
    turma: "1TDSPK",
    funcao: "Desenvolvedor Front-End",
    bio: "Participou da componentização da interface e da revisão do código, cuidando para que os componentes fossem reaproveitados entre as páginas.",
    foto: "/fotos/pedrohenrique_foto.jpeg",
    github: "https://github.com/PedrinhoSatz",
    linkedin: "https://www.linkedin.com/in/pedro-henrique-0b1827355",
    habilidades: ["React", "Componentização", "Tailwind"],
  },
  {
    rm: "568745",
    nome: "Gustavo Correia",
    turma: "1TDSPK",
    funcao: "Desenvolvedor Front-End",
    bio: "Contribuiu com a navegação entre páginas e com os ajustes visuais da interface, alinhando o resultado ao protótipo definido no Figma.",
    foto: "/fotos/gustavocorreia_foto.jpeg",
    github: "https://github.com/romoaldo67",
    linkedin: "https://www.linkedin.com/in/gustavo-correia-456027410/",
    habilidades: ["Figma", "CSS", "Navegação"],
  },
  {
    rm: "572418",
    nome: "Gustavo Gonçalves",
    turma: "1TDSPK",
    funcao: "Desenvolvedor Front-End",
    bio: "Atua no desenvolvimento Front-End da solução, com participação na Home, na área de integrantes e na lógica de impacto ambiental, contribuindo para a integração entre interface, dados e experiência do usuário.",
    foto: "/fotos/gustavogoncalves_foto.jpg",
    github: "https://github.com/TheK1ngBr",
    linkedin: "https://www.linkedin.com/in/gustavo-gonçalves-903596403",
    habilidades: ["React", "TypeScript", "Lógica", "Responsividade"],
  },
];

export function buscarIntegrantePorRm(rm: string): Integrante | undefined {
  return integrantes.find((integrante) => integrante.rm === rm);
}

export function formatarRmIntegrante(rm: string): string {
  return `RM ${rm}`;
}
